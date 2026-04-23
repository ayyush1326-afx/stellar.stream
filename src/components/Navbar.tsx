"use client";

import { useState } from "react";
import Link from "next/link";
import WalletConnect from "./WalletConnect";

const Logo = () => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className="relative w-10 h-10 flex items-center justify-center">
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-500"></div>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transform group-hover:scale-105 transition-transform duration-500">
        {/* Stream Wave */}
        <path d="M4 17C10 17 12 10 17 10C22 10 24 17 30 17" stroke="url(#stream-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Outer S */}
        <path d="M24 12C24 9 20 7 17 7C12 7 9 11 9 15C9 19 14 20 17 21C21 22 25 24 25 28C25 32 20 33 17 33C13 33 10 32 8 28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Inner Diamond/Star */}
        <path d="M17 14L18.5 17L21.5 18.5L18.5 20L17 23L15.5 20L12.5 18.5L15.5 17L17 14Z" fill="url(#stream-gradient)"/>
        
        <defs>
          <linearGradient id="stream-gradient" x1="4" y1="10" x2="30" y2="33" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366F1" />
            <stop offset="1" stopColor="#D946EF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <span className="text-2xl font-black tracking-tighter text-white group-hover:text-primary transition-colors duration-300">
      Stellar<span className="font-light text-slate-300">Stream</span>
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

