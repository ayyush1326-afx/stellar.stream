"use client";

import { useState } from "react";
import Link from "next/link";
import WalletConnect from "./WalletConnect";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                StellarStream
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/feed" className="text-gray-300 hover:text-white font-medium transition-colors">
              Feed
            </Link>
            <Link href="/upload" className="text-gray-300 hover:text-white font-medium transition-colors">
              Create
            </Link>
            <Link href="/my-content" className="text-gray-300 hover:text-white font-medium transition-colors">
              My Content
            </Link>
            <Link href="/history" className="text-gray-300 hover:text-white font-medium transition-colors">
              History
            </Link>
            <div className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Stellar Testnet
            </div>
            <WalletConnect />
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-t border-white/5 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 py-4 space-y-3 bg-black/80 backdrop-blur-lg">
          <Link href="/feed" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white font-medium py-2 transition-colors">
            Feed
          </Link>
          <Link href="/upload" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white font-medium py-2 transition-colors">
            Create
          </Link>
          <Link href="/my-content" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white font-medium py-2 transition-colors">
            My Content
          </Link>
          <Link href="/history" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white font-medium py-2 transition-colors">
            History
          </Link>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Testnet
            </div>
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
}
