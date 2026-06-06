import React from 'react';
import { Sparkles, Briefcase, Award, Zap, Shield, FileText } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onLoadSample: () => void;
}

export default function LandingHero({ onStart, onLoadSample }: HeroProps) {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-slate-50 dark:bg-[#0a0a0c] text-slate-700 dark:text-slate-200 font-sans transition-colors duration-300">
      {/* Decorative Grid Overlay and Glowing Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      
      {/* Immersive blur effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-32 pb-16 flex flex-col items-center justify-center flex-grow text-center">
        {/* Metric Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-8 shadow-sm dark:shadow-[0_0_15px_rgba(99,102,241,0.15)]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          The Ultimate ATS-Optimized Editor
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-7xl font-display font-medium tracking-tight text-slate-900 dark:text-white max-w-4xl leading-[1.1] mb-6">
          Craft a Standout Resume <br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 dark:from-indigo-400 dark:via-purple-400 dark:to-emerald-400 bg-clip-text text-transparent">
            That Lands the Interview
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-sans mb-12 leading-relaxed">
          The premium single-screen builder with realistic real-time preview, expert-approved structures, and lossless A4 PDF export. Zero sign-up required.
        </p>

        {/* CTA Buttons Row */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 w-full sm:w-auto">
          <button
            onClick={onStart}
            id="btn-hero-start"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-black bg-white hover:bg-slate-100 border border-slate-200/80 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all font-sans tracking-wide flex items-center justify-center gap-2 cursor-pointer"
          >
            <Briefcase className="w-5 h-5 text-indigo-600" />
            Start Building Resume
          </button>
          
          <button
            onClick={onLoadSample}
            id="btn-hero-sample"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-black bg-white hover:bg-slate-100 border border-slate-200 hover:scale-[1.02] active:scale-[0.98] transition-all font-sans tracking-wide flex items-center justify-center gap-2 cursor-pointer"
          >
            <Zap className="w-5 h-5 text-amber-500" />
            Try with Sample Data
          </button>
        </div>

        {/* Mini Features Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-950/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800/60 hover:border-indigo-400 dark:hover:border-indigo-500/30 text-left flex gap-4 transition-all duration-300 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 h-fit">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-850 dark:text-white font-sans text-sm mb-1">ATS Friendly Code</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                Structured schemas engineered carefully to rank top in automated HR screening bots.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-950/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800/60 hover:border-indigo-400 dark:hover:border-indigo-500/30 text-left flex gap-4 transition-all duration-300 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 h-fit">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-855 text-slate-850 dark:text-white font-sans text-sm mb-1">Instant Auto-Save</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                No database accounts needed. Restores your work seamlessly right where you left off.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-950/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800/60 hover:border-indigo-400 dark:hover:border-indigo-500/30 text-left flex gap-4 transition-all duration-300 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 h-fit">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-850 dark:text-white font-sans text-sm mb-1">Print-Precise PDFs</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                Polished A4 templates optimized with crisp margins, clear headers, and zero cutoff.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="relative z-10 w-full py-8 border-t border-slate-200/60 dark:border-slate-900/60 text-center text-xs text-slate-500">
        <p className="font-sans">© 2026 Resume Builder. Fully client-contained, privacy-focused application.</p>
      </footer>
    </div>
  );
}
