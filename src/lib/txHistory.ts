/**
 * Local transaction history store.
 * Persists to localStorage so transactions survive page refreshes.
 * Horizon can take a few seconds to index, so we record locally first.
 */

export interface TxRecord {
  id: string;
  hash: string;
  contentSnippet: string;
  creator: string;
  amount: string;
  date: string;
  source: "local" | "horizon";
  type?: "payment" | "upload";
}

const STORAGE_KEY = "stellarstream_tx_history";

function getStoredTxs(): TxRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredTxs(txs: TxRecord[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(txs));
}

export function addLocalTx(tx: TxRecord) {
  const existing = getStoredTxs();
  // Prevent duplicates
  if (existing.some((t) => t.hash === tx.hash)) return;
  const updated = [tx, ...existing];
  saveStoredTxs(updated);
}

export function getLocalTxs(): TxRecord[] {
  return getStoredTxs();
}

export function clearLocalTxs() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
