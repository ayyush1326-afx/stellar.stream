"use client";

import { useEffect, useState } from "react";
import { getAddress, isConnected } from "@stellar/freighter-api";
import { ContentItem } from "@/lib/store";
import Link from "next/link";
import toast from "react-hot-toast";

export default function MyContentPage() {
  const [address, setAddress] = useState<string | null>(null);
  const [myItems, setMyItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyContent() {
      try {
        if (await isConnected()) {
          const { address: addr } = await getAddress();
          if (addr) {
            setAddress(addr);
            
            // Fetch all content and filter by creator
            const res = await fetch("/api/content");
            const allContent: ContentItem[] = await res.json();
            
            const filtered = allContent.filter(item => item.creator === addr);
            setMyItems(filtered);
          }
        }
      } catch (err) {
        console.error("Failed to load my content", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMyContent();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500 mb-2">
            My Content
          </h1>
          <p className="text-slate-400 font-light">
            Manage the premium content you've published.
          </p>
        </div>
        <Link href="/upload" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10 flex items-center gap-2">
          <span>+</span> Create New
        </Link>
      </div>

      {!address ? (
        <div className="text-center py-20 glass rounded-3xl">
          <p className="text-slate-400 text-lg mb-2">🔒 Wallet not connected</p>
          <p className="text-slate-500">Connect your Freighter wallet to view your published content.</p>
        </div>
      ) : loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-slate-700 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
      ) : myItems.length === 0 ? (
        <div className="text-center py-20 glass rounded-3xl">
          <p className="text-slate-400 text-lg mb-4">You haven't published any content yet.</p>
          <Link href="/upload" className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-500/25">
            Start Publishing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myItems.map((item) => (
            <div key={item.id} className="glass p-6 rounded-2xl relative group">
              <div className="absolute top-4 right-4 bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold px-3 py-1 rounded-full">
                {item.priceXLM} XLM
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 pr-16 line-clamp-1">
                {item.snippet.slice(0, 40)}...
              </h3>
              
              <div className="text-sm text-slate-400 mb-6 bg-black/50 p-3 rounded-xl border border-white/5 line-clamp-2">
                {item.fullContent}
              </div>
              
              <div className="flex justify-between items-center text-xs text-slate-500 border-t border-white/10 pt-4 mt-auto">
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(item.id);
                    toast.success("Content ID copied!");
                  }}
                  className="font-mono bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors flex items-center gap-1 group/btn"
                >
                  ID: {item.id.slice(0,8)}...
                  <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity">📋</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
