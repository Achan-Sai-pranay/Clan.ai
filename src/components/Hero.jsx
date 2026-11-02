import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  Zap, 
  ChevronRight, 
  Copy, 
  Check, 
  Cpu, 
  Layers, 
  ArrowUpRight,
  Lock,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function Hero({ onExploreConsole, onOpenVisualizer }) {
  const [copied, setCopied] = useState(false);
  const installCmd = "npx @guild/cli@latest init my-agent-fleet";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Dynamic ambient lighting & glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-500/20 via-cyan-500/15 to-indigo-500/20 blur-[130px] -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-emerald-500/10 blur-[100px] -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[250px] bg-cyan-500/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Floating pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-mono tracking-tight mb-8 backdrop-blur-md shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-white">Next-Gen Control Plane:</span>
          <span>Time-Travel State Repair + Adversarial Mesh Consensus</span>
          <ChevronRight className="w-3.5 h-3.5 text-emerald-400 ml-0.5" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
          The Control Plane for{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            AI Agents.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-normal mb-10 leading-relaxed">
          Manage, govern, monitor, and scale every autonomous agent in production. 
          Stop rogue tool calls with <span className="text-emerald-400 font-medium">pre-dispatch interception</span>, 
          enforce strict token budgets, and <span className="text-cyan-400 font-medium">autonomously rewind bad mutations</span> before they reach enterprise systems.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          
          <button
            onClick={onExploreConsole}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 group"
          >
            <span>Launch Live Fleet Console</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={onOpenVisualizer}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.12] hover:border-emerald-500/40 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Test Pre-Dispatch Interceptor</span>
          </button>

        </div>

        {/* Interactive CLI Install Command Bar */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#0c0f18]/90 border border-white/[0.1] backdrop-blur-md font-mono text-xs text-slate-300 shadow-2xl group hover:border-emerald-500/30 transition-all">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-500 select-none">$</span>
              <span className="text-emerald-300 truncate">{installCmd}</span>
            </div>
            <button
              onClick={handleCopy}
              className="ml-3 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors shrink-0 flex items-center gap-1.5"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] text-emerald-400 font-sans">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px] text-slate-400 font-sans hidden sm:inline">Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            Model-agnostic &bull; MCP Native &bull; TypeScript &amp; Python SDKs &bull; Open-source core
          </p>
        </div>

        {/* Live Fleet Telemetry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
            <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>42.8k</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Autonomous Agents Managed</p>
            <div className="text-[10px] text-emerald-400 font-mono mt-2 flex items-center gap-1">
              <span>↑ +28% this month</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
            <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
              <span>0.8</span>
              <span className="text-emerald-400 text-lg font-mono">ms</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Pre-Dispatch Policy Intercept</p>
            <div className="text-[10px] text-cyan-400 font-mono mt-2 flex items-center gap-1">
              <span>Zero measurable runtime lag</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
            <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-1">
              <span>100%</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-400 mt-1">Destructive Call Containment</p>
            <div className="text-[10px] text-emerald-400 font-mono mt-2 flex items-center gap-1">
              <span>0 prod breaches reported</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
            <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              <span>$4.2M</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Enterprise Token Spend Guarded</p>
            <div className="text-[10px] text-indigo-400 font-mono mt-2 flex items-center gap-1">
              <span>Throttled runaway loops</span>
            </div>
          </div>

        </div>

        {/* Framework & Model Agnostic Ecosystem bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-6">
            Vendor-neutral control plane compatible across models &amp; agent frameworks
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 text-xs sm:text-sm font-semibold tracking-wide">
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-orange-400"></span> Claude 3.5 Sonnet
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> OpenAI GPT-4o
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span> Google Gemini 1.5
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span> LangChain &amp; LangGraph
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span> CrewAI &amp; AutoGen
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Model Context Protocol (MCP)
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
