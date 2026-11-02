import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Layers, 
  Zap, 
  ExternalLink, 
  Github, 
  Menu, 
  X, 
  ChevronRight,
  Sparkles,
  Activity,
  LayoutDashboard
} from 'lucide-react';

export default function Navbar({ activeView, setActiveView, onOpenDemo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#08090e]/80 backdrop-blur-xl border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveView('landing')} 
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-cyan-500 to-indigo-600 p-[1px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
                <div className="w-full h-full bg-[#0d0f17] rounded-[11px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                    GUILD<span className="text-emerald-400">.AI</span>
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold tracking-wide">
                    CONTROL PLANE
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => { setActiveView('landing'); document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-3 py-1.5 text-xs lg:text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors font-medium"
            >
              The 4 Pillars
            </button>
            <button
              onClick={() => { setActiveView('landing'); document.getElementById('differentiators')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-3 py-1.5 text-xs lg:text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors font-medium flex items-center gap-1.5"
            >
              <span>Unique Tech</span>
              <span className="text-[9px] bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-mono px-1.5 py-0.2 rounded font-bold uppercase tracking-wider animate-pulse">
                2 Features
              </span>
            </button>
            <button
              onClick={() => { setActiveView('landing'); document.getElementById('visualizer')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-3 py-1.5 text-xs lg:text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors font-medium"
            >
              Pre-Dispatch Guard
            </button>
            <button
              onClick={() => { setActiveView('landing'); document.getElementById('agenthub')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-3 py-1.5 text-xs lg:text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors font-medium"
            >
              Agent Hub
            </button>
            <button
              onClick={() => { setActiveView('landing'); document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-3 py-1.5 text-xs lg:text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors font-medium"
            >
              SDK & CLI
            </button>
          </div>

          {/* View Switcher & Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* View Switcher Pill */}
            <div className="flex items-center bg-[#121624] p-1 rounded-xl border border-white/[0.08] shadow-inner">
              <button
                onClick={() => setActiveView('landing')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  activeView === 'landing'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Showcase</span>
              </button>
              <button
                onClick={() => setActiveView('dashboard')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  activeView === 'dashboard'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Fleet Console</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              </button>
            </div>

            {/* GitHub Link */}
            <a
              href="https://github.com/Achan-Sai-pranay/startup-1"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors border border-transparent hover:border-white/[0.08]"
              title="GitHub Repo"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Launch Console Button */}
            <button
              onClick={() => setActiveView('dashboard')}
              className="relative group overflow-hidden px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 shadow-md shadow-emerald-500/20 transition-all duration-300 hover:scale-[1.02] flex items-center gap-1.5"
            >
              <span>Open Fleet</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setActiveView(activeView === 'landing' ? 'dashboard' : 'landing')}
              className="px-2.5 py-1 text-[11px] font-mono rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
            >
              {activeView === 'landing' ? 'Console' : 'Landing'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-6 bg-[#0c0e17] border-b border-white/[0.08] space-y-2">
          <button
            onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-white/[0.04] rounded-lg font-medium"
          >
            Product Landing
          </button>
          <button
            onClick={() => { setActiveView('dashboard'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm text-emerald-400 hover:bg-white/[0.04] rounded-lg font-medium flex items-center justify-between"
          >
            <span>Live Fleet Console</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">Live</span>
          </button>
          <button
            onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); document.getElementById('differentiators')?.scrollIntoView(); }}
            className="w-full text-left px-3 py-2 text-sm text-violet-300 hover:bg-white/[0.04] rounded-lg font-medium"
          >
            2 Unique Differentiators
          </button>
          <button
            onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); document.getElementById('visualizer')?.scrollIntoView(); }}
            className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-white/[0.04] rounded-lg font-medium"
          >
            Pre-Dispatch Interceptor
          </button>
          <a
            href="https://github.com/Achan-Sai-pranay/startup-1"
            target="_blank"
            rel="noreferrer"
            className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-white/[0.04] rounded-lg font-medium flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>
        </div>
      )}
    </nav>
  );
}
