import React from 'react';
import { Cpu, Github, ExternalLink, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onSwitchToConsole }) {
  return (
    <footer className="bg-[#05060a] border-t border-white/[0.08] text-slate-400 font-sans">
      
      {/* High-conversion banner above footer links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 border border-white/[0.1] p-8 sm:p-12 text-center relative overflow-hidden backdrop-blur-xl shadow-2xl">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to govern your AI agent fleet?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Join enterprise engineering teams who rely on Guild for sub-millisecond pre-dispatch safety and time-travel state recovery.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={onSwitchToConsole}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Interactive Fleet Console</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href="https://github.com/Achan-Sai-pranay/startup-1"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition-all flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>Star on GitHub</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-4 border-t border-white/[0.05]">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-bold text-white tracking-tight text-base">GUILD.AI</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                CONTROL PLANE
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The vendor-neutral control plane and governance runtime for autonomous AI agents. 
              Featuring deterministic time-travel state rollback and multi-agent adversarial quorum.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All 42k Agent Nodes Operational (99.99%)</span>
            </div>
          </div>

          {/* Column 1: Pillars */}
          <div className="space-y-2.5 text-xs">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">Platform Pillars</div>
            <div><a href="#pillars" className="hover:text-emerald-400 transition-colors">Build (TypeScript &amp; CLI)</a></div>
            <div><a href="#pillars" className="hover:text-emerald-400 transition-colors">Deploy (Managed Runtime)</a></div>
            <div><a href="#pillars" className="hover:text-emerald-400 transition-colors">Govern (Pre-Dispatch)</a></div>
            <div><a href="#pillars" className="hover:text-emerald-400 transition-colors">Share (Enterprise Hub)</a></div>
          </div>

          {/* Column 2: 2 Differentiators */}
          <div className="space-y-2.5 text-xs">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">Differentiators</div>
            <div><a href="#differentiators" className="hover:text-violet-400 transition-colors">Time-Travel State Repair</a></div>
            <div><a href="#differentiators" className="hover:text-cyan-400 transition-colors">Consensus Mesh Quorum</a></div>
            <div><a href="#visualizer" className="hover:text-emerald-400 transition-colors">Pre-Dispatch Interceptor</a></div>
            <div><a href="#agenthub" className="hover:text-emerald-400 transition-colors">40+ Agent Blueprints</a></div>
          </div>

          {/* Column 3: Resources & Git */}
          <div className="space-y-2.5 text-xs">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">Repository &amp; OSS</div>
            <div>
              <a 
                href="https://github.com/Achan-Sai-pranay/startup-1" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div><a href="#playground" className="hover:text-white transition-colors">TypeScript SDK Docs</a></div>
            <div><a href="#playground" className="hover:text-white transition-colors">CLI Specification</a></div>
            <div><a href="#visualizer" className="hover:text-white transition-colors">Architecture Whitepaper</a></div>
          </div>

        </div>

        {/* Bottom sub-footer */}
        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Guild AI Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hover:text-slate-400 transition-colors">SOC2 Type II Certified</span>
            <span>&bull;</span>
            <span className="hover:text-slate-400 transition-colors">Model Context Protocol (MCP)</span>
            <span>&bull;</span>
            <span className="hover:text-slate-400 transition-colors">Zero-Retention Data Plane</span>
          </div>
        </div>

      </div>

    </footer>
  );
}
