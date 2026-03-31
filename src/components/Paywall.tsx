"use client";

import { useState } from "react";
import { ContentItem } from "@/lib/store";
import { getAddress, isConnected } from "@stellar/freighter-api";
import { payCreator } from "@/lib/stellar";
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
        setUnlocked(true);
        setLoading(false);
        return;
      }

      // Await stellar testnet payment via Freighter
      await payCreator(item.creator, item.priceXLM, address);
      
      setUnlocked(true);
      toast.success("Payment successful! Content unlocked.");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to process payment. Make sure you are on Testnet and have XLM.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden transition-all hover:bg-white/10">
      <div className="flex justify-between items-start mb-4">
        <div className="text-xs font-mono text-slate-400 bg-black/50 px-3 py-1 rounded-full">
          Creator: {item.creator.slice(0, 5)}...{item.creator.slice(-4)}
        </div>
        <div className="text-sm font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-3 py-1 rounded-full">
          {item.priceXLM} XLM
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-slate-200 mb-6">{item.snippet}</p>

        {unlocked ? (
          <div className="mt-6 pt-6 border-t border-white/10 animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
               Full Content Unlocked
            </h3>
            <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{item.fullContent}</p>
          </div>
        ) : (
          <div className="mt-6 pt-6 border-t border-white/10 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/80 to-transparent z-10 flex flex-col items-center justify-end pb-4">
              <button
                onClick={handleUnlock}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:shadow-pink-500/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  `Pay ${item.priceXLM} XLM to Unlock`
                )}
              </button>
            </div>
            <p className="text-slate-500 blur-sm select-none">{item.fullContent.slice(0, 100)}...</p>
          </div>
        )}
      </div>
    </div>
  );
}
