import React, { useState } from 'react';
import { ArrowRight, Sparkles, Activity } from 'lucide-react';

interface HeroProps {
  onAnalyze: (idea: string) => void;
  isAnalyzing: boolean;
}

const Hero: React.FC<HeroProps> = ({ onAnalyze, isAnalyzing }) => {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim().length > 10) {
      onAnalyze(idea);
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-indigo-400 text-sm font-medium mb-4">
          <Sparkles size={16} />
          <span>Powered by Gemini 2.5 Flash</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          Validate your startup idea <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            in seconds.
          </span>
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Stop guessing. Get an instant AI-powered audit of your business concept, including SWOT analysis, market viability score, and strategic blind spots.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-slate-900 rounded-2xl p-2 flex flex-col md:flex-row items-center gap-2 border border-slate-800 shadow-2xl">
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., A subscription service for organic dog food tailored to breed..."
              className="w-full bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 text-lg px-4 py-3"
              disabled={isAnalyzing}
            />
            <button
              type="submit"
              disabled={isAnalyzing || idea.length < 10}
              className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="animate-spin" size={20} />
                  Analyzing...
                </>
              ) : (
                <>
                  Generate Audit <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-3 text-left pl-2">
            *Try to be specific for better results. 100% Free Preliminary Audit.
          </p>
        </form>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-slate-400">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
            <div className="text-2xl font-bold text-white mb-1">24/7</div>
            <div className="text-sm">Instant Availability</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
            <div className="text-2xl font-bold text-white mb-1">Data-Driven</div>
            <div className="text-sm">Gemini Powered Insights</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
            <div className="text-2xl font-bold text-white mb-1">Secure</div>
            <div className="text-sm">Private Analysis</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;