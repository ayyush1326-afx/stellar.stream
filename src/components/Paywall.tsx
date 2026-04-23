"use client";

import { useState } from "react";
import { ContentItem } from "@/lib/store";
import { getAddress, isConnected } from "@stellar/freighter-api";
import { payCreator } from "@/lib/stellar";
import { addLocalTx } from "@/lib/txHistory";
import toast from "react-hot-toast";

export default function Paywall({ item }: { item: ContentItem }) {
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUnlock = async () => {
    setLoading(true);
    try {
      if (!(await isConnected())) {
        toast.error("Please connect your Freighter wallet to unlock this content.");
        setLoading(false);
        return;
      }

      const { address } = await getAddress();
      if (!address) {
        toast.error("Wallet address not found.");
        setLoading(false);
        return;
      }

      // If the user is the creator, let them view it
      if (address === item.creator) {
        toast("Creator access granted: Author view unlocked.");
        setUnlocked(true);
        setLoading(false);
        return;
      }

      // Await stellar testnet payment via Freighter
      const response = await payCreator(item.creator, item.priceXLM, address);
      console.log("[Paywall] Payment response:", response);
      
      // Record the transaction locally for instant History page display
      try {
        const txRecord = {
          id: response?.id || response?.hash || String(Date.now()),
          hash: response?.hash || "",
          contentSnippet: item.snippet.slice(0, 60) + "...",
          creator: item.creator,
          amount: `${item.priceXLM} XLM`,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          source: "local" as const,
        };
        console.log("[Paywall] Saving tx record:", txRecord);
        addLocalTx(txRecord);
        console.log("[Paywall] Transaction saved to localStorage successfully");
      } catch (storageErr) {
        console.error("[Paywall] Failed to save tx to localStorage:", storageErr);
      }

      setUnlocked(true);
      toast.success("Transaction Confirmed! Content Unlocked.");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to process payment. Ensure you have Testnet XLM.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass glass-hover rounded-[2rem] p-8 relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-tighter">
            {item.creator.slice(0, 2)}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            Creator: {item.creator.slice(0, 6)}...{item.creator.slice(-4)}
          </div>
        </div>
        <div className="text-sm font-bold text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full">
           {item.priceXLM} XLM
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white leading-tight">{item.snippet.slice(0, 60)}...</h3>
        <p className="text-slate-400 leading-relaxed font-normal">{item.snippet}</p>

        {unlocked ? (
          <div className="mt-8 pt-8 border-t border-white/5 animate-fade-in">
            <div className="flex items-center gap-2 mb-4 text-emerald-400 text-xs font-bold uppercase tracking-widest">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Standard License Unlocked
            </div>
            <p className="text-slate-200 whitespace-pre-wrap leading-relaxed text-lg bg-white/5 p-6 rounded-2xl border border-white/5">{item.fullContent}</p>
          </div>
        ) : (
          <div className="mt-8 pt-8 border-t border-white/5 relative">
            <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-background via-background/90 to-transparent z-10 flex flex-col items-center justify-center pt-10">
              <button
                onClick={handleUnlock}
                disabled={loading}
                className={`group px-8 py-4 bg-primary text-white rounded-xl font-bold transition-all duration-300 hover:bg-primary-hover shadow-lg shadow-primary/20 flex flex-col items-center gap-2 ${loading ? 'animate-beam scale-95' : 'hover:-translate-y-1'}`}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span className="uppercase tracking-widest text-[10px]">Processing Pulse</span>
                  </div>
                ) : (
                  <>
                    <span className="text-base">Unlock Full Access</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] opacity-60 font-medium">Verify {item.priceXLM} XLM Flow</span>
                  </>
                )}
              </button>
              <p className="mt-4 text-[10px] text-slate-500 uppercase tracking-widest font-semibold italic">End-to-End Encrypted Settlement</p>
            </div>
            <p className="text-slate-700 blur-[6px] select-none text-lg leading-relaxed">{item.fullContent.slice(0, 150)}...</p>
          </div>
        )}
      </div>
    </div>
  );
}

