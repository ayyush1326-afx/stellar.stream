import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              StellarStream
            </span>
            <p className="text-slate-500 mt-3 text-sm leading-relaxed">
              Micropayments for premium content. Powered by Stellar & Soroban Smart Contracts.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="/feed" className="text-slate-400 hover:text-white transition-colors text-sm">Browse Content</Link></li>
              <li><Link href="/upload" className="text-slate-400 hover:text-white transition-colors text-sm">Create Content</Link></li>
              <li><Link href="/history" className="text-slate-400 hover:text-white transition-colors text-sm">Transaction History</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3">
              <li><a href="https://developers.stellar.org" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm">Stellar Docs</a></li>
              <li><a href="https://soroban.stellar.org" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm">Soroban SDK</a></li>
              <li><a href="https://freighter.app" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm">Freighter Wallet</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} StellarStream. Built on Stellar Testnet.
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-slate-500">Testnet Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
