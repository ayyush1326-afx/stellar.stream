import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-4xl mx-auto mt-[-10vh]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Live on Stellar Testnet
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 leading-tight">
          Unlock Premium Content with <br className="hidden md:block"/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Micropayments.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          No subscriptions. Just connect your Freighter wallet and pay tiny amounts in XLM to read exactly what you want.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/feed" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all duration-300 transform hover:-translate-y-1">
            Browse Content
          </Link>
          <Link href="/upload" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/5 transition-all duration-300">
            I'm a Creator
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-32 max-w-6xl mx-auto w-full px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-indigo-500/30"></div>
            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30 text-indigo-400 font-bold text-xl">1</div>
            <h3 className="text-xl font-bold text-white mb-3">Connect Wallet</h3>
            <p className="text-slate-400 leading-relaxed">
              Link your Freighter wallet on the Stellar Testnet. No email or password required.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-purple-500/30"></div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/30 text-purple-400 font-bold text-xl">2</div>
            <h3 className="text-xl font-bold text-white mb-3">Discover or Create</h3>
            <p className="text-slate-400 leading-relaxed">
              Browse the feed for premium content, or upload your own work and set a custom price in XLM.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-pink-500/30"></div>
            <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6 border border-pink-500/30 text-pink-400 font-bold text-xl">3</div>
            <h3 className="text-xl font-bold text-white mb-3">Pay-per-View</h3>
            <p className="text-slate-400 leading-relaxed">
              Unlock specific content with instant, low-fee micropayments executed via Soroban Smart Contracts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
