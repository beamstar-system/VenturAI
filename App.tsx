import React, { useState } from 'react';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import { analyzeBusinessIdea } from './services/geminiService';
import { AppStep, AnalysisResult, LeadData } from './types';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.LANDING);
  const [currentIdea, setCurrentIdea] = useState('');
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (idea: string) => {
    setCurrentIdea(idea);
    setStep(AppStep.ANALYZING);
    try {
      const result = await analyzeBusinessIdea(idea);
      setAnalysisData(result);
      setStep(AppStep.LOCKED_DASHBOARD);
    } catch (error) {
      console.error("Analysis failed", error);
      // In a real app, handle error UI here
      setStep(AppStep.LANDING);
      alert("Something went wrong with the AI analysis. Please try again.");
    }
  };

  const handleUnlock = (lead: LeadData) => {
    console.log("Lead captured:", lead);
    // Simulate API call to save lead
    setTimeout(() => {
      setStep(AppStep.FULL_DASHBOARD);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setStep(AppStep.LANDING)}>
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">
                    V
                </div>
                <span className="text-xl font-bold text-white tracking-tight">Ventur<span className="text-indigo-400">AI</span></span>
            </div>
            {step !== AppStep.LANDING && (
                <button 
                    onClick={() => setStep(AppStep.LANDING)}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                    New Audit
                </button>
            )}
        </div>
      </header>

      <main className="pt-16">
        {step === AppStep.LANDING && (
            <Hero onAnalyze={handleAnalyze} isAnalyzing={false} />
        )}

        {step === AppStep.ANALYZING && (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-6" />
                <h2 className="text-2xl font-bold text-white mb-2">Analyzing your vision...</h2>
                <div className="text-slate-400 max-w-md text-center space-y-1">
                    <p>Evaluating market fit...</p>
                    <p>Calculating competitive density...</p>
                    <p>Generating SWOT matrix...</p>
                </div>
            </div>
        )}

        {(step === AppStep.LOCKED_DASHBOARD || step === AppStep.FULL_DASHBOARD) && analysisData && (
            <Dashboard 
                data={analysisData} 
                isLocked={step === AppStep.LOCKED_DASHBOARD}
                onUnlock={handleUnlock}
                originalIdea={currentIdea}
            />
        )}
      </main>

      <footer className="py-8 text-center text-slate-600 text-sm">
        <p>&copy; {new Date().getFullYear()} VenturAI Validator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;