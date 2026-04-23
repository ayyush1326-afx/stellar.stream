import Link from "next/link";

const Logo = () => (
  <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
    <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 17C10 17 12 10 17 10C22 10 24 17 30 17" stroke="url(#footer-stream)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 12C24 9 20 7 17 7C12 7 9 11 9 15C9 19 14 20 17 21C21 22 25 24 25 28C25 32 20 33 17 33C13 33 10 32 8 28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 14L18.5 17L21.5 18.5L18.5 20L17 23L15.5 20L12.5 18.5L15.5 17L17 14Z" fill="url(#footer-stream)"/>
      <defs>
        <linearGradient id="footer-stream" x1="4" y1="10" x2="30" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#D946EF" />
        </linearGradient>
      </defs>
    </svg>
    <span className="text-xl font-black tracking-tighter text-white">
      Stellar<span className="font-light text-slate-300">Stream</span>
    </span>
  </div>
);

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] mt-40 bg-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo />
            <p className="text-slate-500 mt-4 text-base leading-relaxed max-w-sm">
              The premier decentralized protocol for high-frequency micro-monetization. 
              Empowering creators with instant, trustless settlement on the Stellar network.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/feed" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Browse Feed</Link></li>
              <li><Link href="/upload" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Create Content</Link></li>
              <li><Link href="/my-content" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Dashboard</Link></li>
              <li><Link href="/history" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">History</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Network</h4>
            <ul className="space-y-4">
              <li><a href="https://developers.stellar.org" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Stellar Docs</a></li>
              <li><a href="https://soroban.stellar.org" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Soroban SDK</a></li>
              <li><a href="https://freighter.app" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Freighter Wallet</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-xs font-medium">
            &copy; {new Date().getFullYear()} StellarStream Protocol. All rights reserved. 
          </p>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Testnet Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

