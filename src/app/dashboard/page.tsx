'use client';

/**
 * 📊 Metrics Indexing Dashboard (Level 6 Feature)
 * -----------------------------------------------
 * Visualizes real-time project metrics (DAU, TVL, Tx Volume)
 * based on the Data Indexing Architecture.
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MetricsDashboard() {
    const [metrics, setMetrics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchMetrics = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/metrics');
            const data = await res.json();
            setMetrics(data);
        } catch (error) {
            console.error("Dashboard Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMetrics();
    }, []);

    const StatsCard = ({ title, value, icon, delay }: { title: string; value: string; icon: string; delay: number }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay * 0.1, duration: 0.5 }}
            className="glass glass-hover rounded-2xl p-6"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xl">
                    {icon}
                </div>
                <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{title}</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold accent-text mb-2 inline-block">
                        Metrics Dashboard
                    </h1>
                    <p className="text-slate-400 font-normal text-base">
                        Real-time data indexing from the Stellar Horizon API.
                    </p>
                </div>
                <button
                    onClick={fetchMetrics}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
                    disabled={loading}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {loading ? "Syncing..." : "Refresh"}
                </button>
            </div>

            {loading && !metrics ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-28 rounded-2xl bg-white/5" />)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Total Value Locked"
                        value={metrics?.total_value_locked || "0 XLM"}
                        icon="💎"
                        delay={0}
                    />
                    <StatsCard
                        title="Daily Active Users"
                        value={metrics?.daily_active_users || "0"}
                        icon="👥"
                        delay={1}
                    />
                    <StatsCard
                        title="Transactions Indexed"
                        value={metrics?.total_transactions || "0"}
                        icon="⚡"
                        delay={2}
                    />
                    <StatsCard
                        title="Retention Rate"
                        value={metrics?.retention_rate || "0%"}
                        icon="📈"
                        delay={3}
                    />
                </div>
            )}

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 glass rounded-3xl p-8"
                >
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Network Health (Live Indexing)
                    </h2>
                    <div className="space-y-0">
                        <div className="flex justify-between items-center text-sm border-b border-white/5 py-4">
                            <span className="text-slate-500 text-xs uppercase tracking-widest font-semibold">Network Passphrase</span>
                            <span className="font-mono text-primary text-xs">Test SDF Network ; September 2015</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-white/5 py-4">
                            <span className="text-slate-500 text-xs uppercase tracking-widest font-semibold">Horizon Endpoint</span>
                            <span className="font-mono text-slate-300 text-xs">horizon-testnet.stellar.org</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-white/5 py-4">
                            <span className="text-slate-500 text-xs uppercase tracking-widest font-semibold">Gasless Sponsorship</span>
                            <span className="text-emerald-400 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Active (Fee Bump Ready)
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm py-4">
                            <span className="text-slate-500 text-xs uppercase tracking-widest font-semibold">Smart Contract</span>
                            <span className="text-slate-300 text-xs font-mono">Soroban (Rust/WASM)</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass rounded-3xl p-8 relative overflow-hidden"
                >
                    <h2 className="text-lg font-bold text-white mb-6">Protocol Security</h2>
                    <ul className="space-y-4 text-sm text-slate-300">
                        <li className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[10px]">✓</span>
                            CEI Pattern Implementation
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[10px]">✓</span>
                            Checked Arithmetic
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[10px]">✓</span>
                            Non-Custodial Pool
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[10px]">✓</span>
                            Direct-to-Creator Settlement
                        </li>
                    </ul>
                    <div className="absolute -bottom-6 -right-6 text-[120px] opacity-[0.03] leading-none">🛡️</div>
                </motion.div>
            </div>
        </div>
    );
}
