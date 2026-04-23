import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StellarStream - Pay per View DApp",
  description: "Decentralized content monetization powered by Stellar Soroban. Unlock premium content with trustless micropayments.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#030014] text-white selection:bg-indigo-500/30`}>
        <div className="fixed top-0 -left-4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none"></div>
        <div className="fixed top-0 -right-4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none"></div>
        <div className="fixed -bottom-8 left-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none"></div>
        <Navbar />
        <Toaster position="bottom-right" toastOptions={{ style: { background: '#1e1e2f', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
        <main className="relative z-10 pt-20 min-h-[calc(100vh-200px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
