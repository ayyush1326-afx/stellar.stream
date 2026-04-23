import Link from "next/link";

const Logo = () => (
  <div className="flex items-center gap-2 mb-4">
    <div className="relative w-8 h-8 flex items-center justify-center">
      <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md"></div>
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
        <path d="M12 4L24 10L12 16L4 10L12 4Z" fill="url(#footer-logo-gradient)" fillOpacity="0.9"/>
        <path d="M12 16L24 22L12 28L4 22L12 16Z" fill="white" fillOpacity="0.2"/>
        <defs>
          <linearGradient id="footer-logo-gradient" x1="4" y1="4" x2="24" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366F1" />
            <stop offset="1" stopColor="#D946EF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <span className="text-lg font-bold tracking-tight text-white">
      Stellar<span className="font-light">Stream</span>
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

