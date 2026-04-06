import { signTransaction } from "@stellar/freighter-api";
import { Horizon, TransactionBuilder, Networks, Asset, Operation } from "stellar-sdk";

export async function payCreator(creatorAddress: string, priceXLM: string, senderPublicKey: string) {
  try {
    const server = new Horizon.Server("https://horizon-testnet.stellar.org");
    
    console.log("Loading account:", senderPublicKey);
    let account;
    try {
      account = await server.loadAccount(senderPublicKey);
    } catch (e: any) {
      if (e.response?.status === 404) {
        throw new Error("Your account is not funded on Testnet. Please fund it via Friendbot.");
      }
      throw e;
    }

    console.log("Building transaction for:", creatorAddress, "amount:", priceXLM);
    const TESTNET_PASSPHRASE = "Test SDF Network ; September 2015";
    const tx = new TransactionBuilder(account, {
      fee: "100",
      networkPassphrase: TESTNET_PASSPHRASE,
    })
      .addOperation(
        Operation.payment({
          destination: creatorAddress,
          asset: Asset.native(),
          amount: priceXLM,
        })
      )
      .setTimeout(30)
      .build();

    let xdr = (tx as any).toXDR("base64");
    console.log("Requesting signature from Freighter for XDR:", xdr);
    
    let signedXdr = await signTransaction(xdr, { network: "TESTNET" } as any);
    console.log("Signature response received:", signedXdr);
    
    let finalXdr = typeof signedXdr === 'string' ? signedXdr : (signedXdr as any).signedTxXdr;
    
    if (!finalXdr) {
      throw new Error("Failed to get signed transaction from Freighter (User may have canceled)");
    }

    // --- Level 6: Fee Sponsorship Logic ---
    try {
        console.log("Attempting Fee Sponsorship (Gasless)...");
        const sponsorRes = await fetch('/api/sponsor-fee', {
            method: 'POST',
            body: JSON.stringify({ xdr: finalXdr })
        });
        
        if (sponsorRes.ok) {
            const { sponsoredXdr } = await sponsorRes.json();
            console.log("Sponsorship successful! Using sponsored XDR.");
            finalXdr = sponsoredXdr;
        } else {
            console.warn("Sponsorship unavailable, proceeding with user-paid transaction.");
        }
    } catch (sponsorErr) {
        console.error("Sponsorship call failed:", sponsorErr);
    }
    // ---------------------------------------

    const txToSubmit = TransactionBuilder.fromXDR(finalXdr as string, "Test SDF Network ; September 2015");
    const txHash = txToSubmit.hash().toString('hex');
    console.log("Submitting transaction to Horizon... Hash:", txHash);
    
    const response: any = await server.submitTransaction(txToSubmit);
    
    if (!response.successful) {
      console.error("Horizon response unsuccessful:", response);
      throw new Error("Transaction was not successful on the network.");
    }

    console.log("Transaction successfully submitted! Hash:", response.hash);
    return response;
  } catch (error: any) {
    console.error("Payment Error Trace:", error);
    if (error?.response?.data?.extras?.result_codes) {
      const codes = error.response.data.extras.result_codes;
      console.error("Horizon Error Codes:", codes);
      throw new Error(`Stellar Error: ${JSON.stringify(codes)} (check if you have enough XLM)`);
    }
    throw new Error(error.message || "Unknown error during payment");
  }
}
