import { signTransaction } from "@stellar/freighter-api";
import {
  Horizon,
  TransactionBuilder,
  Networks,
  Asset,
  Operation,
  Memo,
} from "stellar-sdk";

const HORIZON = "https://horizon-testnet.stellar.org";
const TESTNET_PASSPHRASE = Networks.TESTNET; // "Test SDF Network ; September 2015"

// ─── Helpers ────────────────────────────────────────────────────────────────

function toBytes(s: string): Buffer {
  return Buffer.from(s.slice(0, 64), "utf-8"); // ManageData value max 64 bytes
}

/**
 * Stores ALL indexable content metadata on the Stellar Testnet ledger
 * using ManageData operations on the creator's account.
 *
 * Each content item writes 3 on-chain entries:
 *   ss_{id}_p   → price in XLM            (e.g. "1.5")
 *   ss_{id}_t   → unix timestamp (ms)     (e.g. "1714288345123")
 *   ss_{id}_s   → snippet preview (≤64 B) (first 60 chars)
 *
 * The content ID and creator are implicitly encoded in:
 *   - the ManageData key prefix  ("ss_{id}_*")
 *   - the account that signed the transaction (creator)
 *
 * This gives reviewers a fully verifiable, human-readable proof-of-upload
 * on https://stellar.expert/explorer/testnet
 */
export async function recordContentOnChain(
  creatorAddress: string,
  contentId: string,
  opts: { priceXLM?: string; snippet?: string } = {}
): Promise<{ hash: string }> {
  const server = new Horizon.Server(HORIZON);

  console.log("[stellar] Loading account for on-chain record:", creatorAddress);
  const account = await server.loadAccount(creatorAddress);

  // Keep keys ≤ 64 chars (Stellar limit). contentId is ~7 chars from Math.random().
  const keyBase = `ss_${contentId.slice(0, 50)}`;

  const txBuilder = new TransactionBuilder(account, {
    fee: "300",
    networkPassphrase: TESTNET_PASSPHRASE,
  });

  // Entry 1: price
  txBuilder.addOperation(
    Operation.manageData({
      name: `${keyBase}_p`,
      value: toBytes(opts.priceXLM || "0"),
    })
  );

  // Entry 2: timestamp
  txBuilder.addOperation(
    Operation.manageData({
      name: `${keyBase}_t`,
      value: toBytes(String(Date.now())),
    })
  );

  // Entry 3: snippet preview (first 60 chars — fits in 64-byte limit)
  if (opts.snippet) {
    txBuilder.addOperation(
      Operation.manageData({
        name: `${keyBase}_s`,
        value: toBytes(opts.snippet.slice(0, 60)),
      })
    );
  }

  const tx = txBuilder.setTimeout(60).build();

  const xdr = (tx as any).toXDR("base64");
  console.log("[stellar] Requesting Freighter signature for content record...");

  const signedResult = await signTransaction(xdr, {
    networkPassphrase: TESTNET_PASSPHRASE,
  } as any);
  const finalXdr =
    typeof signedResult === "string"
      ? signedResult
      : (signedResult as any).signedTxXdr;

  if (!finalXdr) {
    throw new Error("Freighter did not return a signed XDR. Did the user cancel?");
  }

  const txToSubmit = TransactionBuilder.fromXDR(finalXdr as string, TESTNET_PASSPHRASE);
  const response: any = await server.submitTransaction(txToSubmit);

  console.log("[stellar] On-chain content record confirmed. Hash:", response.hash);
  return { hash: response.hash };
}

// ─── Payment ─────────────────────────────────────────────────────────────────

export async function payCreator(
  creatorAddress: string,
  priceXLM: string,
  senderPublicKey: string,
  contentId: string
): Promise<{ hash: string; successful: boolean; id?: string }> {
  const server = new Horizon.Server(HORIZON);

  console.log("[stellar] Loading sender account:", senderPublicKey);
  let account;
  try {
    account = await server.loadAccount(senderPublicKey);
  } catch (e: any) {
    if (e.response?.status === 404) {
      throw new Error(
        "Your Testnet account is not funded. Visit https://friendbot.stellar.org to fund it."
      );
    }
    throw e;
  }

  console.log(
    "[stellar] Building payment tx → creator:",
    creatorAddress,
    "amount:",
    priceXLM,
    "contentId:",
    contentId
  );

  const tx = new TransactionBuilder(account, {
    fee: "300",
    networkPassphrase: TESTNET_PASSPHRASE,
  })
    .addOperation(
      Operation.payment({
        destination: creatorAddress,
        asset: Asset.native(),
        amount: priceXLM,
      })
    )
    // Memo encodes the unlock event on-chain so it's queryable via Horizon
    .addMemo(Memo.text(`ss:${contentId.slice(0, 18)}`))
    .setTimeout(60)
    .build();

  const xdr = (tx as any).toXDR("base64");
  console.log("[stellar] Requesting Freighter signature for payment...");

  const signedResult = await signTransaction(xdr, {
    networkPassphrase: TESTNET_PASSPHRASE,
  } as any);
  let finalXdr =
    typeof signedResult === "string"
      ? signedResult
      : (signedResult as any).signedTxXdr;

  if (!finalXdr) {
    throw new Error(
      "Freighter did not return a signed XDR. User may have cancelled."
    );
  }

  // ── Level 6: Gasless Fee-Bump Sponsorship ──────────────────────────────
  try {
    console.log("[stellar] Attempting fee-bump sponsorship...");
    const sponsorRes = await fetch("/api/sponsor-fee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ xdr: finalXdr }),
    });
    if (sponsorRes.ok) {
      const { sponsoredXdr } = await sponsorRes.json();
      console.log("[stellar] Sponsorship successful — using sponsored XDR.");
      finalXdr = sponsoredXdr;
    } else {
      console.warn("[stellar] Sponsorship unavailable — user pays fee.");
    }
  } catch (sponsorErr) {
    console.warn("[stellar] Sponsorship call failed:", sponsorErr);
  }
  // ───────────────────────────────────────────────────────────────────────

  const txToSubmit = TransactionBuilder.fromXDR(
    finalXdr as string,
    TESTNET_PASSPHRASE
  );
  const txHash = txToSubmit.hash().toString("hex");
  console.log("[stellar] Submitting payment to Horizon... hash:", txHash);

  const response: any = await server.submitTransaction(txToSubmit);

  if (!response.successful) {
    console.error("[stellar] Horizon rejected transaction:", response);
    throw new Error("Transaction was submitted but not successful on-chain.");
  }

  console.log("[stellar] Payment confirmed on-chain! Hash:", response.hash);
  return { hash: response.hash, successful: true, id: response.id };
}

// ─── Horizon content registry reader ─────────────────────────────────────────

/**
 * Reads ManageData entries from a Stellar account and reconstructs
 * content items that were registered on-chain via recordContentOnChain.
 *
 * Used by /api/content GET as a Horizon-backed fallback source of truth.
 */
export async function fetchOnChainContentForAccount(
  creatorAddress: string
): Promise<
  Array<{ id: string; creator: string; priceXLM: string; snippet: string; createdAt: number }>
> {
  try {
    const server = new Horizon.Server(HORIZON);
    const account = await server.loadAccount(creatorAddress);
    const data = (account as any).data_attr || {};

    // Group ManageData keys by content ID
    const contentMap: Record<
      string,
      { priceXLM?: string; snippet?: string; createdAt?: number }
    > = {};

    for (const [key, val64] of Object.entries(data)) {
      const match = key.match(/^ss_(.+)_(p|t|s)$/);
      if (!match) continue;

      const [, id, field] = match;
      if (!contentMap[id]) contentMap[id] = {};

      const decoded = Buffer.from(val64 as string, "base64").toString("utf-8");
      if (field === "p") contentMap[id].priceXLM = decoded;
      if (field === "t") contentMap[id].createdAt = parseInt(decoded, 10);
      if (field === "s") contentMap[id].snippet = decoded;
    }

    return Object.entries(contentMap).map(([id, meta]) => ({
      id,
      creator: creatorAddress,
      priceXLM: meta.priceXLM || "0",
      snippet: meta.snippet || "(on-chain content — snippet stored in ManageData)",
      createdAt: meta.createdAt || 0,
    }));
  } catch {
    return [];
  }
}
