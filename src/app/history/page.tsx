"use client";

import { useState, useEffect, useCallback } from "react";
import { getAddress, isConnected } from "@stellar/freighter-api";
import { getLocalTxs, TxRecord } from "@/lib/txHistory";

export default function HistoryPage() {
  const [address, setAddress] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<TxRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Robust wallet check that handles different Freighter API versions
  const getWalletAddress = async (): Promise<string | null> => {
    try {
      const connected = await isConnected();
      // Handle both boolean and object return types
      const isReady = typeof connected === "boolean" ? connected : (connected as any)?.isConnected;
      
      if (!isReady) return null;

      const result = await getAddress();
      // Handle both string and object return types
      const addr = typeof result === "string" ? result : result?.address;
      return addr || null;
    } catch (e) {
      console.warn("Freighter check failed:", e);
      return null;
    }
  };

  const loadHistory = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      // 1. Always load local transactions first (works without wallet)
      const localTxs = getLocalTxs();
      console.log("[History] Local transactions found:", localTxs.length);

      // 2. Try to get wallet address
      const addr = await getWalletAddress();
      console.log("[History] Wallet address:", addr);
      
      if (addr) {
        setAddress(addr);

        // 3. Fetch from Horizon (both payments and uploads)
        let horizonTxs: TxRecord[] = [];
        try {
          // Fetch payment transactions (content unlocks)
          const paymentsResponse = await fetch(
            `https://horizon-testnet.stellar.org/accounts/${addr}/payments?order=desc&limit=25`
          );
          
          if (paymentsResponse.ok) {
            const paymentsData = await paymentsResponse.json();
            const paymentRecords = paymentsData._embedded?.records || [];
            console.log("[History] Horizon payment records fetched:", paymentRecords.length);

            const paymentTxs = paymentRecords
              .filter((r: any) => r.type === "payment" && r.from === addr)
              .map((r: any) => ({
                id: r.id || String(Math.random()),
                hash: r.transaction_hash || "",
                contentSnippet: "Premium Content Unlock",
                creator: r.to || "Unknown",
                amount: `${r.amount} ${r.asset_type === "native" ? "XLM" : r.asset_code}`,
                date: new Date(r.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                source: "horizon" as const,
                type: "payment" as const,
              }));
            horizonTxs.push(...paymentTxs);
            console.log("[History] Horizon outgoing payments:", paymentTxs.length);
          } else {
            console.warn("[History] Horizon payments returned status:", paymentsResponse.status);
          }

          // Fetch upload transactions (ManageData operations)
          const operationsResponse = await fetch(
            `https://horizon-testnet.stellar.org/accounts/${addr}/operations?order=desc&limit=50`
          );
          
          if (operationsResponse.ok) {
            const operationsData = await operationsResponse.json();
            const operationRecords = operationsData._embedded?.records || [];
            console.log("[History] Horizon operation records fetched:", operationRecords.length);

            const uploadTxs = operationRecords
              .filter((r: any) => r.type === "manage_data" && r.name?.startsWith("ss_"))
              .reduce((acc: any[], r: any) => {
                // Group by transaction hash to avoid duplicates (3 ManageData ops per upload)
                if (!acc.find((tx) => tx.hash === r.transaction_hash)) {
                  const contentId = r.name.match(/^ss_(.+)_[pts]$/)?.[1] || "unknown";
                  acc.push({
                    id: r.id || String(Math.random()),
                    hash: r.transaction_hash || "",
                    contentSnippet: `Content Upload (ID: ${contentId.slice(0, 7)})`,
                    creator: addr,
                    amount: "On-Chain Record",
                    date: new Date(r.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    source: "horizon" as const,
                    type: "upload" as const,
                  });
                }
                return acc;
              }, []);
            horizonTxs.push(...uploadTxs);
            console.log("[History] Horizon upload operations:", uploadTxs.length);
          } else {
            console.warn("[History] Horizon operations returned status:", operationsResponse.status);
          }
        } catch (horizonErr) {
          console.warn("[History] Horizon fetch failed:", horizonErr);
        }

        // 4. Merge: deduplicate by hash, prefer horizon data
        const horizonHashes = new Set(horizonTxs.map((t) => t.hash).filter(Boolean));
        const uniqueLocalTxs = localTxs.filter(
          (t) => !t.hash || !horizonHashes.has(t.hash)
        );
        const merged = [...uniqueLocalTxs, ...horizonTxs];

        // Sort newest first
        merged.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          if (isNaN(dateA) && isNaN(dateB)) return 0;
          if (isNaN(dateA)) return 1;
          if (isNaN(dateB)) return -1;
          return dateB - dateA;
        });

        setTransactions(merged);
      } else {
        // No wallet connected — still show local txs if any exist
        if (localTxs.length > 0) {
          setAddress("local-only");
          setTransactions(localTxs);
        }
      }
    } catch (err: any) {
      console.error("[History] Failed to load history:", err);
      setError(err.message || "Failed to load transaction history");
      
      // Fallback: try to show local txs even on error
      const localTxs = getLocalTxs();
      if (localTxs.length > 0) {
        setTransactions(localTxs);
        setAddress("local-only");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // Re-fetch when user navigates back to this tab/page
  useEffect(() => {
    const handleFocus = () => {
      console.log("[History] Window focused, reloading data...");
      loadHistory(true);
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [loadHistory]);

  const showWalletNotConnected = !address && transactions.length === 0;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold accent-text mb-2 inline-block">
            Transaction History
          </h1>
          <p className="text-slate-400 font-normal text-base">
            Your on-chain payment history from Stellar Testnet.
          </p>
        </div>
        {!showWalletNotConnected && (
          <button
            onClick={() => loadHistory(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {refreshing ? "Syncing..." : "Refresh"}
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-slate-700 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : showWalletNotConnected ? (
        <div className="text-center py-20 glass rounded-3xl">
          <div className="text-4xl mb-4">🔒</div>
          <p className="text-slate-300 text-lg font-semibold mb-2">
            Wallet not connected
          </p>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Connect your Freighter wallet to view your transaction history.
          </p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-20 glass rounded-3xl">
          <div className="text-4xl mb-4">📭</div>
          <p className="text-slate-300 text-lg font-semibold mb-2">
            No payments found
          </p>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Once you unlock content on the Feed page, your payments will appear
            here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-6 flex items-center justify-between">
            <span>{transactions.length} transaction{transactions.length !== 1 ? "s" : ""}</span>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live
            </span>
          </div>

          {transactions.map((tx, idx) => (
            <div
              key={tx.hash + tx.id + idx}
              className="glass glass-hover rounded-2xl p-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-6 h-6 rounded-full ${tx.type === "upload" ? "bg-gradient-to-br from-purple-500 to-pink-500" : "bg-gradient-to-br from-primary to-accent"} flex items-center justify-center flex-shrink-0`}>
                      {tx.type === "upload" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="font-semibold text-white text-sm truncate">
                      {tx.contentSnippet}
                    </p>
                    {tx.source === "local" && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full font-bold uppercase tracking-wider flex-shrink-0">
                        Pending Sync
                      </span>
                    )}
                    {tx.type === "upload" && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full font-bold uppercase tracking-wider flex-shrink-0">
                        Upload
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {tx.type === "upload" ? "Creator" : "To"}: {tx.creator.slice(0, 8)}...{tx.creator.slice(-4)}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`font-bold ${tx.type === "upload" ? "text-purple-400" : "text-primary"} text-lg`}>{tx.amount}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{tx.date}</p>
                  {tx.hash && (
                    <a
                      href={`https://stellar.expert/explorer/testnet/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-primary/50 hover:text-primary transition-colors underline decoration-primary/20 mt-1 inline-block"
                    >
                      View on Explorer →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
