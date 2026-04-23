"use client";

import { useState } from "react";
import Link from "next/link";
import WalletConnect from "./WalletConnect";

const Logo = () => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className="relative w-10 h-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg group-hover:bg-primary/30 transition-all duration-500"></div>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
        <path d="M12 4L24 10L12 16L4 10L12 4Z" fill="url(#logo-gradient)" fillOpacity="0.9"/>
        <path d="M12 16L24 22L12 28L4 22L12 16Z" fill="white" fillOpacity="0.2"/>
        <path d="M12 10V22M24 10V22M4 10V22" stroke="white" strokeWidth="0.5" strokeOpacity="0.3"/>
        <defs>
          <linearGradient id="logo-gradient" x1="4" y1="4" x2="24" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366F1" />
            <stop offset="1" stopColor="#D946EF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors duration-300">
      Stellar<span className="font-light">Stream</span>
    </span>
  </div>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/[0.06] bg-background/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link href="/feed" className="text-slate-400 hover:text-white font-medium transition-colors text-sm tracking-wide">
                Feed
              </Link>
              <Link href="/upload" className="text-slate-400 hover:text-white font-medium transition-colors text-sm tracking-wide">
                Create
              </Link>
              <Link href="/dashboard" className="text-slate-400 hover:text-white font-medium transition-colors text-sm tracking-wide">
                Metrics
              </Link>
              <Link href="/my-content" className="text-slate-400 hover:text-white font-medium transition-colors text-sm tracking-wide">
                My Content
              </Link>
              <Link href="/history" className="text-slate-400 hover:text-white font-medium transition-colors text-sm tracking-wide">
                History
              </Link>
            </div>
            
            <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
            
            <div className="hidden lg:flex items-center gap-2 bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Stellar Testnet
            </div>
            
            <div className="flex items-center">
              <WalletConnect />
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
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
        className={`md:hidden overflow-hidden transition-all duration-500 bg-background/95 backdrop-blur-2xl border-t border-white/5 ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 py-8 space-y-6">
          <Link href="/feed" onClick={() => setMenuOpen(false)} className="block text-xl font-medium text-slate-400 hover:text-white transition-colors">
            Feed
          </Link>
          <Link href="/upload" onClick={() => setMenuOpen(false)} className="block text-xl font-medium text-slate-400 hover:text-white transition-colors">
            Create Content
          </Link>
          <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="block text-xl font-medium text-slate-400 hover:text-white transition-colors">
            Metrics Dashboard
          </Link>
          <Link href="/my-content" onClick={() => setMenuOpen(false)} className="block text-xl font-medium text-slate-400 hover:text-white transition-colors">
            My Content
          </Link>
          <Link href="/history" onClick={() => setMenuOpen(false)} className="block text-xl font-medium text-slate-400 hover:text-white transition-colors">
            Transaction History
          </Link>
          
          <div className="pt-8 border-t border-white/5 flex flex-col gap-6">
            <div className="flex items-center justify-between">
               <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Network</span>
               <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">
                Testnet
              </div>
            </div>
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
}

