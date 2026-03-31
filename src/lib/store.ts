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
    creator: "GBHCOSVWZSTUDRY4COOCRM3QE5LHQMQI2XMKSDQ5A23T7B4YMY4XHQ73",
    snippet: "Why Stellar Soroban is the future of Smart Contracts — a deep dive into fees, state expiration, and the Rust VM model...",
    fullContent: "Soroban, the smart contract platform built on Stellar, is a game changer for decentralized applications. Unlike Ethereum's Solidity-based EVM, Soroban leverages Rust and WebAssembly (WASM) to deliver deterministic, sandboxed execution with predictable gas costs.\n\nKey innovations include:\n1. State Expiration: Contracts and their data have built-in TTLs, reducing chain bloat.\n2. Predictable Fees: Transaction costs are calculable before submission.\n3. Rust Safety: Memory-safe language eliminates entire classes of vulnerabilities.\n4. Interoperability: Native access to Stellar's asset ledger, DEX, and payment channels.\n\nFor creators, this means building paywalls, subscriptions, and micropayment flows that cost fractions of a cent to execute — making $0.05 article purchases viable for the first time.",
    priceXLM: "0.5",
    createdAt: Date.now() - 100000,
  },
  {
    id: "2",
    creator: "GDJ22R2BJWX75WLZXVWNYXQ4PZUXUI3OCMZ4L6RWSTOGISGZQMKXDHHU",
    snippet: "10 Design Patterns Every Blockchain Developer Should Know in 2026...",
    fullContent: "Whether you are building on Ethereum, Solana, or Stellar, these 10 patterns will elevate your smart contract architecture:\n\n1. Factory Pattern — Deploy multiple contract instances from a template.\n2. Proxy Pattern — Upgrade contract logic without changing the address.\n3. Oracle Pattern — Bridge off-chain data on-chain securely.\n4. Escrow Pattern — Hold funds until conditions are met.\n5. Governance Pattern — On-chain voting and proposal execution.\n6. Token Vault — Locked staking or time-locked deposits.\n7. Access Control — Role-based permissions for contract functions.\n8. Event-Driven — Emit events for frontend reactivity.\n9. Batch Operations — Process multiple actions in one transaction.\n10. Circuit Breaker — Emergency stop mechanisms for critical bugs.",
    priceXLM: "1.0",
    createdAt: Date.now() - 50000,
  },
  {
    id: "3",
    creator: "GBB7J3Y2X3B63G6A4QJBNY4GZK64XQYWKUBOD3P63S3MBDL2YZXWQJ55",
    snippet: "Exclusive art drop: 'Nebula Genesis' — a limited digital masterpiece inspired by cosmic creation...",
    fullContent: "🎨 Nebula Genesis\n\nThis piece explores the birth of stars through generative algorithms and hand-painted overlays. Created using a custom WASM shader running on Soroban, each viewing generates a unique color palette based on the viewer's wallet address hash.\n\nTechnical Details:\n- Rendering Engine: Custom WebGL + WASM pipeline\n- Color Seed: SHA-256 of viewer address, mapped to HSL space\n- Resolution: 4096x4096px, exported as lossless PNG\n- Ownership: Verified on-chain via Soroban event logs\n\nBy unlocking this content, you gain access to the full-resolution download and the generative shader source code.",
    priceXLM: "2.0",
    createdAt: Date.now() - 20000,
  }
];


export const getFeed = () => store;

export const addContent = (item: ContentItem) => {
  store = [item, ...store];
};

export const getContentById = (id: string) => store.find(i => i.id === id);
