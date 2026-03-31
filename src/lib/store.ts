export interface ContentItem {
  id: string;
  creator: string;
  snippet: string;
  fullContent: string;
  priceXLM: string;
  createdAt: number;
}

// In-memory mock store since it's an MVP without a dedicated DB
// In production, this would be Supabase or IPFS.
let store: ContentItem[] = [
  {
    id: "1",
    creator: "GBV...MOCK",
    snippet: "Why Stellar Soroban is the future of Smart Contracts...",
    fullContent: "Here is the full 2,000 word essay about Soroban's state expiration, rust environment, and fees...",
    priceXLM: "0.5",
    createdAt: Date.now() - 10000,
  }
];

export const getFeed = () => store;

export const addContent = (item: ContentItem) => {
  store = [item, ...store];
};

export const getContentById = (id: string) => store.find(i => i.id === id);
