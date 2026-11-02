import React, { useState } from 'react';
import { 
  Share2, 
  Search, 
  Star, 
  Download, 
  GitFork, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Terminal
} from 'lucide-react';

export default function AgentHub({ onDeployToFleet }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hubSearch, setHubSearch] = useState('');

  const categories = ['All', 'DevOps & Infra', 'Security & Audit', 'Data & SQL', 'Customer Ops', 'Code Review'];

  const templates = [
    {
      id: 'tmpl-01',
      title: 'Sentry Auto-PR Triager',
      category: 'DevOps & Infra',
      author: '@guild-labs',
      verified: true,
      rating: 4.9,
      runsCount: '184k',
      modelRecommended: 'Claude 3.5 Sonnet',
      description: 'Listens to Sentry exception webhooks, clones repository branch, replicates stack trace, and opens a clean PR with unit tests.',
      differentiators: ['Time-Travel Rollback on failed test suite', 'Consensus Mesh on PR merge approval'],
      mcpServers: ['github', 'sentry', 'slack']
    },
    {
      id: 'tmpl-02',
      title: 'PostgreSQL Zero-Downtime DBA',
      category: 'Data & SQL',
      author: '@database-core',
      verified: true,
      rating: 5.0,
      runsCount: '92k',
      modelRecommended: 'GPT-4o Reasoning',
      description: 'Analyzes slow query pg_stat_statements, validates schema migration locks, and scaffolds concurrent indexes safely.',
      differentiators: ['Pre-dispatch DROP TABLE interception', 'Inverse SQL transaction ledger'],
      mcpServers: ['postgres', 'datadog']
    },
    {
      id: 'tmpl-03',
      title: 'GitHub SOC2 Security Gate',
      category: 'Security & Audit',
      author: '@infosec-elite',
      verified: true,
      rating: 4.9,
      runsCount: '310k',
      modelRecommended: 'Gemini 1.5 Pro',
      description: 'Scans incoming pull requests for hardcoded secrets, dangerous regex ReDoS, and IAM privilege escalations.',
      differentiators: ['Shadow Adversarial Quorum', 'Zero raw secrets exposure in agent context'],
      mcpServers: ['github', 'vault', 'trivy']
    },
    {
      id: 'tmpl-04',
      title: 'Stripe MRR Discrepancy Auditor',
      category: 'Customer Ops',
      author: '@fintech-guild',
      verified: true,
      rating: 4.8,
      runsCount: '45k',
      modelRecommended: 'Claude 3.5 Sonnet',
      description: 'Reconciles Stripe customer subscriptions with internal billing records. Catches unbilled prorations and chargebacks.',
      differentiators: ['Strict $5.00 dollar spend killswitch', 'Quorum verification for refund tool calls'],
      mcpServers: ['stripe', 'postgres', 'zendesk']
    },
    {
      id: 'tmpl-05',
      title: 'Kubernetes Pod CrashLoop Healer',
      category: 'DevOps & Infra',
      author: '@cloud-native',
      verified: true,
      rating: 4.9,
      runsCount: '78k',
      modelRecommended: 'GPT-4o',
      description: 'Extracts OOMKilled and exit code 137 container logs, adjusts memory limits dynamically, and triggers blue-green rollout.',
      differentiators: ['Automated pod rollback if error rate spikes', 'Quorum check on deployment spec'],
      mcpServers: ['kubernetes', 'grafana', 'pagerduty']
    },
    {
      id: 'tmpl-06',
      title: 'High-Impact TypeScript Refactorer',
      category: 'Code Review',
      author: '@guild-labs',
      verified: true,
      rating: 4.7,
      runsCount: '63k',
      modelRecommended: 'Claude 3.5 Sonnet',
      description: 'Refactors legacy callbacks to async/await and converts JavaScript files to strict TypeScript with zero `any` types.',
      differentiators: ['Git time-travel commit rollback', 'Deterministic AST verification'],
      mcpServers: ['filesystem', 'tsc_runner']
    }
  ];

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(hubSearch.toLowerCase()) || 
                          t.description.toLowerCase().includes(hubSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="agenthub" className="py-24 bg-[#08090e] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold tracking-wide mb-3">
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>THE ENTERPRISE AGENT HUB</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Pre-Configured Agent Blueprints
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Don't build from scratch. Scaffold production-ready agents fortified with pre-dispatch guardrails, time-travel rollback, and MCP integration.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={hubSearch}
                onChange={(e) => setHubSearch(e.target.value)}
                placeholder="Search 40+ blueprints..."
                className="bg-[#121626] border border-white/[0.1] text-xs text-white rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-cyan-500 font-mono w-64"
              />
            </div>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === c
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-[#0d101b] border border-white/[0.08] p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 hover:scale-[1.01] shadow-xl group"
            >
              <div>
                
                {/* Card Top */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 font-mono text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.rating}</span>
                    <span className="text-slate-500">({item.runsCount})</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-2 flex items-center gap-2">
                  <span>{item.title}</span>
                  {item.verified && (
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" title="Guild Verified Blueprint" />
                  )}
                </h3>

                {/* Description */}
                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Differentiators Badge Box */}
                <div className="p-2.5 rounded-xl bg-[#07080f] border border-white/[0.06] mb-4 space-y-1">
                  <div className="text-[10px] uppercase font-mono text-violet-400 font-semibold tracking-wider">
                    Included Protections:
                  </div>
                  {item.differentiators.map((diff, i) => (
                    <div key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                      <span>{diff}</span>
                    </div>
                  ))}
                </div>

                {/* MCP Integrations */}
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="text-[10px] text-slate-500 font-mono">MCP:</span>
                  {item.mcpServers.map((m) => (
                    <span key={m} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.03] text-slate-400 border border-white/[0.04]">
                      {m}
                    </span>
                  ))}
                </div>

              </div>

              {/* Bottom Card Actions */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div className="text-[11px] text-slate-500 font-mono">
                  by <span className="text-slate-400">{item.author}</span>
                </div>
                <button
                  onClick={onDeployToFleet}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-white/[0.06] hover:bg-cyan-500 hover:text-slate-950 transition-all duration-200 flex items-center gap-1.5"
                >
                  <GitFork className="w-3.5 h-3.5" />
                  <span>Scaffold &amp; Deploy</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
