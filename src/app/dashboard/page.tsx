'use client';

/**
 * 📊 Metrics Indexing Dashboard (Level 6 Feature)
 * -----------------------------------------------
 * This page visualizes the real-time project metrics (DAU, TVL, and Tx Volume)
 * based on the Data Indexing Architecture.
 */

import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Activity, Wallet, RefreshCw } from 'lucide-react';
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

    const StatsCard = ({ title, value, icon: Icon, color }: any) => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F4D03F]/30 transition-all group"
        >
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-${color}/20 text-${color}`}>
                    <Icon size={24} />
                </div>
                <div>
                    <p className="text-sm text-gray-400">{title}</p>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#F4D03F] transition-colors">{value}</h3>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-[#000000] text-white p-8 pt-32">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                            <LayoutDashboard className="text-[#F4D03F]" />
                            Metrics Indexing Hub
                        </h1>
                        <p className="text-gray-400">Real-time data indexing from the Stellar Horizon API.</p>
                    </div>
                    <button 
                        onClick={fetchMetrics}
                        className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                        disabled={loading}
                    >
                        <RefreshCw className={loading ? 'animate-spin' : ''} size={20} />
                    </button>
                </div>

                {loading && !metrics ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-32 rounded-2xl bg-white/5" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatsCard 
                            title="Total Value Locked" 
                            value={metrics?.total_value_locked} 
                            icon={Wallet} 
                            color="yellow" 
                        />
                        <StatsCard 
                            title="Daily Active Users" 
                            value={metrics?.daily_active_users} 
                            icon={Users} 
                            color="blue" 
                        />
                        <StatsCard 
                            title="Tx Indexed (DAU)" 
                            value={metrics?.total_transactions} 
                            icon={Activity} 
                            color="green" 
                        />
                        <StatsCard 
                            title="Retention Rate" 
                            value={metrics?.retention_rate} 
                            icon={Activity} 
                            color="purple" 
                        />
                    </div>
                )}

                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
                        <h2 className="text-xl font-semibold mb-6">Network Health (Live Indexing)</h2>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
                                <span className="text-gray-400">Network Passphrase</span>
                                <span className="font-mono text-yellow-500">Test SDF Network ; September 2015</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
                                <span className="text-gray-400">Current Ledger Index</span>
                                <span className="font-mono">#523412</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
                                <span className="text-gray-400">Gasless Sponsorship API</span>
                                <span className="text-green-500 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> 
                                    Active (Fee Bump Ready)
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-8 rounded-3xl bg-[#F4D03F]/5 border border-[#F4D03F]/20 relative overflow-hidden">
                        <h2 className="text-xl font-semibold mb-4 text-[#F4D03F]">Protocol Security</h2>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex items-center gap-2">✅ CEI Implementation</li>
                            <li className="flex items-center gap-2">✅ Checked Arithmetic</li>
                            <li className="flex items-center gap-2">✅ Non-Custodial Pool</li>
                        </ul>
                        <div className="absolute -bottom-10 -right-10 opacity-10">
                            <Activity size={180} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
