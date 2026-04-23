import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center p-4">
      <div className="text-center space-y-10 max-w-5xl mx-auto mt-20 md:mt-32">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary/80 text-xs font-semibold tracking-wider uppercase mb-2 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Decentralized Content Protocol
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-[1.1] animate-slide-up">
          The future of <br className="hidden md:block"/>
          <span className="accent-text">Content Monetization.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 font-normal leading-relaxed animate-fade-in [animation-delay:200ms]">
          No subscriptions, no middleman. Connect your wallet and pay exactly for what you consume. 
          Powered by Stellar Soroban for instant, trustless micropayments.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in [animation-delay:400ms]">
          <Link href="/feed" className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-hover transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-1">
            Browse Content
          </Link>
          <Link href="/upload" className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
            Become a Creator
          </Link>
        </div>
      </div>

      {/* Trust & Stats Section */}
      <div className="mt-40 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl w-full mx-auto px-4 py-12 border-y border-white/5 animate-fade-in [animation-delay:600ms]">
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">0.01 XLM</div>
          <div className="text-sm text-slate-500 uppercase tracking-widest">Min. Payment</div>
        </div>
        <div className="text-center border-l border-white/5">
          <div className="text-3xl font-bold mb-1">~5s</div>
          <div className="text-sm text-slate-500 uppercase tracking-widest">Settlement</div>
        </div>
        <div className="text-center border-l border-white/5">
          <div className="text-3xl font-bold mb-1">100%</div>
          <div className="text-sm text-slate-500 uppercase tracking-widest">On-Chain</div>
        </div>
        <div className="text-center border-l border-white/5">
          <div className="text-3xl font-bold mb-1">0%</div>
          <div className="text-sm text-slate-500 uppercase tracking-widest">Platform Fee</div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-40 max-w-6xl mx-auto w-full px-4 mb-40">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Revolutionizing Access</h2>
          <div className="h-1.5 w-20 rounded-full accent-gradient"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass glass-hover p-10 rounded-3xl group">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 border border-primary/20 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Pay-per-View</h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              Unlock specific articles, videos, or assets with precise micropayments. Only pay for what you actually use.
            </p>
          </div>

          <div className="glass glass-hover p-10 rounded-3xl group">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 border border-accent/20 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Instant Settlement</h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              No pending withdrawals. Funds are transferred directly from users to creators' wallets via Soroban contracts.
            </p>
          </div>

          <div className="glass glass-hover p-10 rounded-3xl group">
            <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/20 text-indigo-400 transition-colors group-hover:bg-indigo-500 group-hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Pure On-Chain</h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              Complete transparency. Every transaction and access permit is immutable and verifiable on the Stellar ledger.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

