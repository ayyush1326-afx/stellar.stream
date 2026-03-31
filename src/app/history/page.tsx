"use client";

import { useState, useEffect } from "react";
import { getAddress, isConnected } from "@stellar/freighter-api";

interface Transaction {
  id: string;
  contentSnippet: string;
  creator: string;
  amount: string;
  date: string;
}

export default function HistoryPage() {
  const [address, setAddress] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      if (await isConnected()) {
        const { address: addr } = await getAddress();
        if (addr) {
          setAddress(addr);
          // Fetch user's Stellar transactions from Horizon Testnet
          const response = await fetch(
            `https://horizon-testnet.stellar.org/accounts/${addr}/payments?order=desc&limit=20`
          );
          const data = await response.json();
          const records = data._embedded?.records || [];

          const txList: Transaction[] = records
            .filter((r: any) => r.type === "payment" && r.from === addr)
            .map((r: any, i: number) => ({
              id: r.id || String(i),
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
            }));

          setTransactions(txList);
        }
      }
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 inline-block">
          Transaction History
        </h1>
        <p className="text-slate-400 font-light text-lg">
          Your on-chain payment history from Stellar Testnet.
        </p>
      </div>

      {!address ? (
        <div className="text-center py-20 glass rounded-3xl">
          <p className="text-slate-400 text-lg mb-2">🔒 Wallet not connected</p>
          <p className="text-slate-500">Connect your Freighter wallet to view your transaction history.</p>
        </div>
      ) : loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin"></div>
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-20 glass rounded-3xl">
          <p className="text-slate-400 text-lg mb-2">No payments found</p>
          <p className="text-slate-500">Once you unlock content, your payments will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="glass rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-white/10 transition-all"
            >
              <div className="flex-1">
                <p className="font-semibold text-white mb-1">{tx.contentSnippet}</p>
                <p className="text-sm text-slate-400 font-mono">
                  To: {tx.creator.slice(0, 8)}...{tx.creator.slice(-4)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-cyan-400">{tx.amount}</p>
                <p className="text-xs text-slate-500">{tx.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
