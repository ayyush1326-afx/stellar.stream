import Link from "next/link";
import WalletConnect from "./WalletConnect";

export default function Navbar() {
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
          <div className="flex items-center gap-6">
            <Link href="/feed" className="text-gray-300 hover:text-white font-medium transition-colors">
              Feed
            </Link>
            <Link href="/upload" className="text-gray-300 hover:text-white font-medium transition-colors">
              Create
            </Link>
            <Link href="/history" className="text-gray-300 hover:text-white font-medium transition-colors">
              History
            </Link>
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
}
