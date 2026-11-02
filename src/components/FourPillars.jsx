import React, { useState } from 'react';
import { 
  Code2, 
  Rocket, 
  ShieldCheck, 
  Share2, 
  ChevronRight, 
  Terminal, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Lock, 
  GitFork,
  ArrowRight
} from 'lucide-react';

export default function FourPillars() {
  const [activePillar, setActivePillar] = useState('govern');

  const pillars = [
    {
      id: 'build',
      title: 'Build',
      subtitle: 'Developer-First Surfaces',
      icon: Code2,
      badge: 'SDK & CLI',
      color: 'emerald',
      description: 'Scaffold, simulate, and unit-test autonomous agent logic locally before shipping to production fleets.',
      bullets: [
        'Open-source TypeScript & Python SDKs',
        'Powerful CLI: guild init, guild test --adversarial, guild deploy',
        'Full Model Context Protocol (MCP) server & client integration',
        'Local mock runtime with deterministic tool stubs'
      ],
      codeSample: `// define an agent with guild SDK
import { Agent, Guardrail } from '@guild/sdk';

export const triageAgent = new Agent({
  name: 'sentry-auto-triager',
  model: 'anthropic/claude-3-5-sonnet',
  tools: [githubTool, sentryTool],
  guardrails: [
    Guardrail.maxSpendPerSession(5.00),
    Guardrail.denyDestructiveWrites(['drop', 'truncate', 'delete']),
    Guardrail.requireQuorum({ minApprovals: 2 })
  ]
});`
    },
    {
      id: 'deploy',
      title: 'Deploy',
      subtitle: 'Managed Event Runtime',
      icon: Rocket,
      badge: 'Serverless Fleet',
      color: 'cyan',
      description: 'Run agents on an ultra-scalable event-driven runtime that executes on webhooks, DB changes, and schedules.',
      bullets: [
        'Event-driven triggers: Webhooks, Kafka, Cron, DB CDC events',
        'Multi-model routing: OpenAI, Claude, Gemini, DeepSeek, Local Ollama',
        'Zero cold-starts with persistent lightweight memory threads',
        'Instant canary rollouts and automated environment promotion'
      ],
      codeSample: `$ guild deploy --prod --fleet=payments-team

✓ Packaging 12 agent modules...
✓ Validating pre-dispatch policies...
✓ Synchronizing cross-agent consensus mesh...
✓ Fleet live at https://fleet.guild.ai/v1/workspaces/acme
[DEPLOYED] 42 worker replicas warm and listening.`
    },
    {
      id: 'govern',
      title: 'Govern',
      subtitle: 'Pre-Dispatch Control Plane',
      icon: ShieldCheck,
      badge: 'Zero-Trust Safety',
      color: 'violet',
      description: 'Stop unauthorized actions before they occur. Guild intercepts every tool invocation in sub-milliseconds.',
      bullets: [
        'Pre-dispatch policy interception: Zero writes to prod without sign-off',
        'Unit-economic budget killswitches & token throttle ceilings',
        'Zero-trust credential mapping: Agents never touch raw API keys',
        'Immutable SOC2 audit trail with SHA-256 state hashing'
      ],
      codeSample: `# guild.policy.yaml
version: 2
rules:
  - id: pol-strict-prod-guard
    target: "db:cluster:prod-*"
    allow: ["SELECT", "EXPLAIN"]
    deny: ["DROP", "TRUNCATE", "UPDATE without WHERE"]
    action: PAUSE_AND_ALERT_SECURITY
    max_budget_per_execution_usd: 0.25`
    },
    {
      id: 'share',
      title: 'Share',
      subtitle: 'Enterprise Agent Hub',
      icon: Share2,
      badge: 'Collaboration',
      color: 'indigo',
      description: 'The internal App Store & Docker Hub for agents. Share verified blueprints and capabilities across teams.',
      bullets: [
        'Curated Agent Hub with 40+ production-ready blueprints',
        'Workspace segmentation: Frontend, Platform, DevSecOps, Billing',
        'Role-Based Access Control (RBAC) and Okta SAML SSO',
        'Versioned registry with semantic version pinning'
      ],
      codeSample: `$ guild hub search "pr reviewer"

NAME                AUTHOR       RATING  RUNS     VERSION
github-security-pr  @devsecops   5.0/5   142.1k   v2.4.0
sentry-auto-fixer   @platform    4.9/5   98.4k    v1.8.2
db-migration-lint   @infra       4.9/5   34.0k    v3.1.0

Fork with: guild fork github-security-pr`
    }
  ];

  const current = pillars.find(p => p.id === activePillar) || pillars[2];

  return (
    <section id="pillars" className="py-24 bg-[#0a0d16] relative overflow-hidden">
      
      {/* Background radial lights */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold tracking-wide mb-4">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>THE 4 FOUNDATIONAL PILLARS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            The Complete Lifecycle for Autonomous AI
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            From local TypeScript scaffolding to enterprise-wide governance, Guild manages the full lifecycle of your autonomous software.
          </p>
        </div>

        {/* 4 Pillars Tab Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-12">
          {pillars.map((p) => {
            const Icon = p.icon;
            const isSelected = activePillar === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePillar(p.id)}
                className={`p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#14192b] border-emerald-500/50 shadow-lg shadow-emerald-500/10 scale-[1.02]'
                    : 'bg-[#0e111d] border-white/[0.08] hover:border-white/[0.18] opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/[0.05] text-slate-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                    isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/[0.05] text-slate-500'
                  }`}>
                    {p.badge}
                  </span>
                </div>
                <div>
                  <div className="text-base font-bold text-white mb-0.5">{p.title}</div>
                  <div className="text-xs text-slate-400 font-normal">{p.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Showcase Card */}
        <div className="rounded-2xl bg-[#0e1220] border border-white/[0.1] p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                <span>Pillar {pillars.findIndex(p => p.id === current.id) + 1} of 4</span>
                <span>&bull;</span>
                <span className="uppercase">{current.title} Engine</span>
              </div>

              <h3 className="text-3xl font-extrabold text-white tracking-tight leading-snug">
                {current.subtitle}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-3 pt-2">
                {current.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Code / CLI Preview (6 cols) */}
            <div className="lg:col-span-6">
              <div className="rounded-xl bg-[#070910] border border-white/[0.1] overflow-hidden shadow-2xl font-mono text-xs">
                
                {/* Code Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#0d101b] border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                    <span className="text-slate-400 text-[11px] ml-2">
                      {current.id === 'build' ? 'agent.config.ts' : current.id === 'deploy' ? 'terminal — guild-cli' : current.id === 'govern' ? 'policy.config.yaml' : 'agent-hub-cli'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500">read-only</span>
                </div>

                {/* Code body */}
                <pre className="p-4 text-slate-300 overflow-x-auto leading-relaxed max-h-[340px]">
                  <code>{current.codeSample}</code>
                </pre>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
