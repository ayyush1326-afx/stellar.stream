"use client";

import { useEffect, useState } from "react";
import { ContentItem } from "@/lib/store";
import Paywall from "@/components/Paywall";

export default function FeedPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4 inline-block">
          Discover Content
        </h1>
        <p className="text-slate-400 font-light text-lg">Pay per view. No strings attached.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-slate-500 glass rounded-3xl">
          No content available yet. Be the first to upload!
        </div>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <Paywall key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
