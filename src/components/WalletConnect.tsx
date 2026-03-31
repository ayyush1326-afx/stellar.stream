"use client";

import { useState, useEffect } from "react";
import {
  isConnected,
  requestAccess,
  getAddress,
} from "@stellar/freighter-api";

export default function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      if (await isConnected()) {
        const addr = await getAddress();
        if (addr.address) {
          setAddress(addr.address);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const connectWallet = async () => {
    try {
      if (await isConnected()) {
        const access = await requestAccess();
        if (access) {
          const addr = await getAddress();
          if (addr.address) {
            setAddress(addr.address);
          }
        }
      } else {
        alert("Please install Freighter Wallet extension.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center">
      {address ? (
        <div className="px-4 py-2 border border-slate-700 rounded-full bg-slate-800 text-white text-sm font-medium">
          {address.slice(0, 5)}...{address.slice(-4)}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-full font-medium shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.7)] transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
