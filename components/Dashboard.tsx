import React, { useState } from 'react';
import { AnalysisResult, LeadData } from '../types';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { Lock, CheckCircle, AlertTriangle, TrendingUp, ShieldAlert, FileText, Zap } from 'lucide-react';

interface DashboardProps {
  data: AnalysisResult;
  isLocked: boolean;
  onUnlock: (lead: LeadData) => void;
  originalIdea: string;
}

const Dashboard: React.FC<DashboardProps> = ({ data, isLocked, onUnlock, originalIdea }) => {
  const [leadForm, setLeadForm] = useState<LeadData>({ name: '', email: '', companyName: '' });

  const scoreData = [
    { name: 'Score', value: data.score },
    { name: 'Remaining', value: 100 - data.score },
  ];
  
  const COLORS = [data.score > 70 ? '#10b981' : data.score > 40 ? '#f59e0b' : '#ef4444', '#1e293b'];

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUnlock(leadForm);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div>
                <h2 className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-1">Analysis Target</h2>
                <h1 className="text-xl md:text-2xl font-bold text-white">"{originalIdea}"</h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <div className="text-sm text-slate-400">Overall Viability</div>
                    <div className="text-3xl font-bold text-white">{data.score}/100</div>
                </div>
                <div className="w-16 h-16">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                        <Pie
                            data={scoreData}
                            cx="50%"
                            cy="50%"
                            innerRadius={20}
                            outerRadius={30}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            stroke="none"
                        >
                            {scoreData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* The Verdict Section (Always Visible) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 md:p-8">
                <h3 className="text-indigo-400 font-medium mb-2 flex items-center gap-2">
                    <Zap size={18} /> AI Verdict
                </h3>
                <p className="text-2xl md:text-3xl font-light text-white leading-relaxed mb-4">
                    {data.oneLineVerdict}
                </p>
                <div className="h-px w-full bg-slate-700/50 my-4"></div>
                <p className="text-slate-300">
                    {data.executiveSummary}
                </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-center">
                 <h3 className="text-slate-400 font-medium mb-4 flex items-center gap-2">
                    <TrendingUp size={18} /> Est. Market Potential
                </h3>
                <div className="text-xl font-semibold text-white">
                    {data.estimatedMarketSize}
                </div>
                <div className="mt-4 text-sm text-slate-500">
                    Based on current industry trends and similar vertical performance.
                </div>
            </div>
        </div>

        {/* LOCKED CONTENT AREA */}
        <div className="relative">
             {isLocked && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm rounded-2xl border border-slate-800/50">
                    <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-500"></div>
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 mb-4">
                                <Lock size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Unlock Full Analysis</h2>
                            <p className="text-slate-400 text-sm">
                                Enter your details to reveal the detailed SWOT breakdown and exclusive marketing hooks generated for your idea.
                            </p>
                        </div>
                        
                        <form onSubmit={handleLeadSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    value={leadForm.name}
                                    onChange={e => setLeadForm({...leadForm, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Work Email</label>
                                <input 
                                    required
                                    type="email" 
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    value={leadForm.email}
                                    onChange={e => setLeadForm({...leadForm, email: e.target.value})}
                                />
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-colors mt-2">
                                Reveal My Report
                            </button>
                            <p className="text-[10px] text-center text-slate-500 mt-2">
                                We respect your privacy. No spam.
                            </p>
                        </form>
                    </div>
                </div>
            )}

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isLocked ? 'filter blur-md opacity-50 select-none' : ''}`}>
                {/* SWOT Analysis */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-2">SWOT Matrix</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase text-xs tracking-wider">
                                <CheckCircle size={14} /> Strengths
                            </div>
                            <ul className="space-y-2">
                                {data.swot.strengths.map((s, i) => (
                                    <li key={i} className="text-sm text-slate-300 bg-slate-800/50 p-2 rounded border-l-2 border-emerald-500">{s}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-3">
                             <div className="flex items-center gap-2 text-amber-400 font-semibold uppercase text-xs tracking-wider">
                                <AlertTriangle size={14} /> Weaknesses
                            </div>
                            <ul className="space-y-2">
                                {data.swot.weaknesses.map((s, i) => (
                                    <li key={i} className="text-sm text-slate-300 bg-slate-800/50 p-2 rounded border-l-2 border-amber-500">{s}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-3">
                             <div className="flex items-center gap-2 text-blue-400 font-semibold uppercase text-xs tracking-wider">
                                <TrendingUp size={14} /> Opportunities
                            </div>
                            <ul className="space-y-2">
                                {data.swot.opportunities.map((s, i) => (
                                    <li key={i} className="text-sm text-slate-300 bg-slate-800/50 p-2 rounded border-l-2 border-blue-500">{s}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-3">
                             <div className="flex items-center gap-2 text-rose-400 font-semibold uppercase text-xs tracking-wider">
                                <ShieldAlert size={14} /> Threats
                            </div>
                            <ul className="space-y-2">
                                {data.swot.threats.map((s, i) => (
                                    <li key={i} className="text-sm text-slate-300 bg-slate-800/50 p-2 rounded border-l-2 border-rose-500">{s}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Marketing Hooks & Strategy */}
                <div className="space-y-6">
                     <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-2 flex items-center gap-2">
                            <FileText size={18} /> Generated Marketing Hooks
                        </h3>
                        <div className="space-y-4">
                            {data.marketingHooks.map((hook, i) => (
                                <div key={i} className="group relative bg-indigo-900/10 hover:bg-indigo-900/20 border border-indigo-500/20 p-4 rounded-xl transition-all">
                                    <span className="absolute -top-3 -left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                                        Angle {i + 1}
                                    </span>
                                    <p className="text-indigo-100 italic">"{hook}"</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Next Steps</h3>
                        <div className="space-y-4">
                            <button className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                                Download PDF Report
                            </button>
                            <button className="w-full py-3 border border-slate-700 text-slate-300 font-semibold rounded-xl hover:bg-slate-800 transition-colors">
                                Schedule Consultant Call
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;