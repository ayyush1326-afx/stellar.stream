"use client";

import { useState } from "react";
import { getAddress, isConnected } from "@stellar/freighter-api";
import { useRouter } from "next/navigation";
import { ContentItem } from "@/lib/store";
import toast from "react-hot-toast";

export default function UploadPage() {
  const router = useRouter();
  const [snippet, setSnippet] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!(await isConnected())) {
        toast.error("Please connect Freighter wallet first.");
        setLoading(false);
        return;
      }

      const { address } = await getAddress();
      if (!address) {
        toast.error("Wallet address not found.");
        setLoading(false);
        return;
      }

      const newItem: ContentItem = {
        id: Math.random().toString(36).substring(7),
        creator: address,
        snippet,
        fullContent,
        priceXLM: price,
        createdAt: Date.now(),
      };

      // Mock save to API
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });

      toast.success("Content published successfully!");
      router.push("/feed");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-12 mb-20 glass rounded-3xl mt-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-[64px] opacity-30"></div>
      
      <h1 className="text-3xl font-black mb-2 tracking-tight">Post Premium Content</h1>
      <p className="text-slate-400 mb-8 font-light">Set a price in XLM and let users pay to unlock it.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Free Snippet (Visible to everyone)</label>
          <textarea
            required
            value={snippet}
            onChange={(e) => setSnippet(e.target.value)}
            className="w-full h-24 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
            placeholder="Give them a taste..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Full Content (Locked)</label>
          <textarea
            required
            value={fullContent}
            onChange={(e) => setFullContent(e.target.value)}
            className="w-full h-48 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
            placeholder="The exclusive content..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Price (XLM)</label>
          <input
            type="number"
            required
            step="0.1"
            min="0.1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
            placeholder="0.5"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all disabled:opacity-50 flex justify-center items-center"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            "Lock & Publish Content"
          )}
        </button>
      </form>
    </div>
  );
}
