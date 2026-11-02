import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Cpu, 
  Terminal, 
  Activity, 
  Zap, 
  Lock, 
  AlertOctagon, 
  CheckCircle2, 
  Clock, 
  Coins, 
  ArrowRight,
  Filter,
  PlayCircle
} from 'lucide-react';

export default function ControlPlaneVisualizer() {
  const [selectedScenario, setSelectedScenario] = useState('attack');
  const [activeTab, setActiveTab] = useState('live');

  const scenarios = {
    safe: {
      title: "Authorized Read Query",
      prompt: "SELECT count(*) FROM billing_subscriptions WHERE status = 'active';",
      model: "Claude 3.5 Sonnet",
      intent: "Read-only analytics aggregation",
      policyDecision: "ALLOWED",
      statusColor: "emerald",
      latency: "0.7ms",
      budgetCost: "$0.003",
      ruleTriggered: "Rule #POL-102: Whitelisted Read Replicas",
      outcome: "Query passed pre-dispatch verification and executed on read-replica pool.",
      logs: [
        { time: "16:04:12.102", type: "INBOUND", msg: "Agent received task from Slack bot trigger" },
        { time: "16:04:12.241", type: "REASONING", msg: "Model generated SQL tool call: read_postgres_metrics()" },
        { time: "16:04:12.242", type: "INTERCEPT", msg: "Guild Pre-Dispatch Policy Engine engaged" },
        { time: "16:04:12.242", type: "PASSED", msg: "Target: db-replica-01. Read-only verified. Budget within $0.50 threshold" },
        { time: "16:04:12.243", type: "DISPATCH", msg: "JWT signed tool token dispatched. Execution completed in 18ms" }
      ]
    },
    attack: {
      title: "Rogue Drop Table Attack",
      prompt: "Clean up outdated tables: DROP TABLE enterprise_accounts_prod CASCADE;",
      model: "GPT-4o (Hallucinated / Jailbroken)",
      intent: "Destructive mutation on production cluster",
      policyDecision: "INTERCEPTED & PAUSED",
      statusColor: "rose",
      latency: "0.5ms",
      budgetCost: "$0.000 (Execution Prevented)",
      ruleTriggered: "Rule #POL-992: Zero-Trust Prod Mutation Block",
      outcome: "CRITICAL: Destructive action halted pre-dispatch. Zero database state changed. Incident logged to SOC2 SIEM.",
      logs: [
        { time: "16:05:01.312", type: "INBOUND", msg: "Agent prompt received with elevated admin persona" },
        { time: "16:05:01.488", type: "REASONING", msg: "Agent attempted system tool call: db_query(DROP TABLE...)" },
        { time: "16:05:01.489", type: "INTERCEPT", msg: "GUILD POLICY ENGINE PRE-DISPATCH HALT!" },
        { time: "16:05:01.489", type: "VETO", msg: "BLOCKED: Mutation violates Prod Invariance Policy (#POL-992)" },
        { time: "16:05:01.490", type: "ACTION", msg: "Execution quarantined. Slack alert dispatched to @security-team" }
      ]
    },
    budget: {
      title: "Runaway Spending Loop",
      prompt: "Search the web recursively for all 50,000 competitors and synthesize vector embeddings",
      model: "Claude 3.5 Sonnet",
      intent: "Uncapped token consumption loop",
      policyDecision: "THROTTLED BY BUDGET",
      statusColor: "amber",
      latency: "0.9ms",
      budgetCost: "Hit $10.00 / $10.00 Limit",
      ruleTriggered: "Rule #POL-441: Per-Session Dollar Killswitch",
      outcome: "Circuit breaker tripped at $10.00 spend threshold. Prevented $850+ accidental runaway bill.",
      logs: [
        { time: "16:06:22.012", type: "LOOP", msg: "Agent step 42/1000 initiating external web scrape" },
        { time: "16:06:22.180", type: "COST_CALC", msg: "Cumulative session cost: $9.98. Next step projection: $12.40" },
        { time: "16:06:22.181", type: "TRIP", msg: "GUILD BUDGET KILLSWITCH TRIPPED: Limit $10.00 reached" },
        { time: "16:06:22.181", type: "PAUSE", msg: "Agent execution frozen gracefully. State snapshot saved" },
        { time: "16:06:22.182", type: "NOTIFY", msg: "Budget increase requested sent to Workspace Admin" }
      ]
    }
  };

  const current = scenarios[selectedScenario];

  return (
    <section id="visualizer" className="py-24 bg-[#08090e] border-y border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <Activity className="w-4 h-4 animate-pulse" />
              <span className="uppercase tracking-wider font-semibold">Live Pre-Dispatch Runtime Simulation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pre-Dispatch Governance in Action
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              See how Guild intercepts autonomous tool calls before they execute against databases, APIs, or enterprise credentials.
            </p>
          </div>

          {/* Scenario Selectors */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 bg-[#101422] p-1.5 rounded-xl border border-white/[0.08]">
            <button
              onClick={() => setSelectedScenario('attack')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                selectedScenario === 'attack'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
              <span>Rogue Mutation</span>
            </button>
            <button
              onClick={() => setSelectedScenario('budget')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                selectedScenario === 'budget'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>Budget Throttle</span>
            </button>
            <button
              onClick={() => setSelectedScenario('safe')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                selectedScenario === 'safe'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Safe Dispatch</span>
            </button>
          </div>
        </div>

        {/* Visualizer Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Architectural Flow Visualizer (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0c0f18] border border-white/[0.1] p-6 shadow-2xl relative overflow-hidden">
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Pipeline: Interception Pipeline #FLT-928
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Evaluation latency: <strong className="text-emerald-400">{current.latency}</strong>
              </span>
            </div>

            {/* Architecture Steps Flow */}
            <div className="space-y-4">
              
              {/* Step 1: Inbound Agent Intention */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-semibold text-white">1. Agent LLM Tool Invocation</span>
                    <span className="font-mono text-[11px] text-slate-400">{current.model}</span>
                  </div>
                  <div className="font-mono text-xs text-emerald-300/90 bg-[#08090f] p-2.5 rounded-lg border border-white/[0.05] truncate">
                    {current.prompt}
                  </div>
                </div>
              </div>

              {/* Interceptor Divider Node */}
              <div className="relative py-2 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dashed border-emerald-500/30"></div>
                </div>
                <div className="relative px-4 py-1 rounded-full bg-[#141a29] border border-emerald-500/50 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5 shadow-lg shadow-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>GUILD PRE-DISPATCH ENGINE INTERCEPTION</span>
                </div>
              </div>

              {/* Step 2: Policy Interception Card */}
              <div className={`p-4 rounded-xl border transition-all ${
                current.statusColor === 'rose'
                  ? 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                  : current.statusColor === 'amber'
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                  : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5">
                    {current.statusColor === 'rose' && <AlertOctagon className="w-4 h-4 text-rose-400" />}
                    {current.statusColor === 'amber' && <Coins className="w-4 h-4 text-amber-400" />}
                    {current.statusColor === 'emerald' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    <span>Verdict: {current.policyDecision}</span>
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/[0.08]">
                    {current.ruleTriggered}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans mb-3">
                  {current.outcome}
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-white/[0.08]">
                  <div>Cost Guard: <strong className="text-white">{current.budgetCost}</strong></div>
                  <div>Policy Lag: <strong className="text-white">{current.latency}</strong></div>
                </div>
              </div>

              {/* Step 3: Enterprise Target State */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400">Target Environment:</span>
                  <span className="text-white font-semibold">Postgres Prod Cluster #01</span>
                </div>
                <span className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                  current.statusColor === 'rose'
                    ? 'bg-rose-500/20 text-rose-300'
                    : current.statusColor === 'amber'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {current.statusColor === 'rose' ? 'Protected (Zero Writes)' : current.statusColor === 'amber' ? 'Paused (Throttled)' : 'Query Executed'}
                </span>
              </div>

            </div>

          </div>

          {/* Right: Real-time Event Stream Terminal (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#090b12] border border-white/[0.1] p-5 font-mono shadow-2xl flex flex-col h-full min-h-[420px]">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08] text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-200 font-semibold">Audit Stream</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                LIVE 60 FPS
              </span>
            </div>

            {/* Terminal Log lines */}
            <div className="flex-1 space-y-2 overflow-y-auto pr-1 text-xs">
              {current.logs.map((log, i) => (
                <div key={i} className="p-2 rounded bg-white/[0.02] hover:bg-white/[0.04] transition-colors border border-transparent hover:border-white/[0.05]">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-0.5">
                    <span>{log.time}</span>
                    <span className={`px-1.5 py-0.2 rounded font-bold ${
                      log.type === 'VETO' || log.type === 'TRIP'
                        ? 'text-rose-400 bg-rose-500/10'
                        : log.type === 'PASSED'
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : 'text-cyan-400 bg-cyan-500/10'
                    }`}>
                      {log.type}
                    </span>
                  </div>
                  <div className="text-slate-300 leading-snug">
                    {log.msg}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Terminal Status */}
            <div className="pt-3 mt-3 border-t border-white/[0.06] text-[11px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Immutable SHA-256 Audit Trail
              </span>
              <span className="text-slate-500">SOC2 Type II</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
