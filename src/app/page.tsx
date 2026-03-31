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
    </div>
  );
}
