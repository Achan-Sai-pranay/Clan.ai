import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Cpu, 
  Terminal, 
  Activity, 
  AlertTriangle, 
  Search, 
  Filter, 
  Play, 
  Pause, 
  RotateCcw, 
  Users, 
  CheckCircle2, 
  XCircle, 
  DollarSign, 
  Clock, 
  ChevronRight,
  ExternalLink,
  Layers,
  Database,
  Lock,
  Zap,
  Sparkles
} from 'lucide-react';

export default function FleetDashboard({ onBackToLanding }) {
  const [selectedWorkspace, setSelectedWorkspace] = useState('Production Fleet');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState(null);

  // Agent Fleet Mock Data
  const [agents, setAgents] = useState([
    {
      id: 'agt-01',
      name: 'sentry-auto-triager',
      role: 'Error Monitoring & Auto-PR Fix',
      model: 'Claude 3.5 Sonnet',
      status: 'active',
      sessionsToday: 1420,
      spendUSD: 14.80,
      budgetLimitUSD: 50.00,
      policiesCount: 4,
      lastAction: 'Dispatched clean bugfix PR #912 to github-repo',
      tools: ['sentry_api', 'github_pr_create', 'slack_notify'],
      timeTravelSnapshots: 12,
      consensusEnabled: true,
    },
    {
      id: 'agt-02',
      name: 'postgres-schema-migrator',
      role: 'DDL Verification & Staging Migrations',
      model: 'GPT-4o (Reasoning)',
      status: 'quorum_required',
      sessionsToday: 48,
      spendUSD: 3.20,
      budgetLimitUSD: 15.00,
      policiesCount: 8,
      lastAction: 'Awaiting 2-of-2 consensus mesh for staging index creation',
      tools: ['postgres_admin', 'migration_dryrun', 'datadog_metrics'],
      timeTravelSnapshots: 48,
      consensusEnabled: true,
    },
    {
      id: 'agt-03',
      name: 'stripe-reconciliation-bot',
      role: 'Dispute & Invoice Anomaly Audit',
      model: 'Claude 3.5 Sonnet',
      status: 'active',
      sessionsToday: 830,
      spendUSD: 38.40,
      budgetLimitUSD: 100.00,
      policiesCount: 11,
      lastAction: 'Cross-referenced 410 ledger entries with Stripe balance',
      tools: ['stripe_api', 'postgres_read_only', 'quickbooks_sync'],
      timeTravelSnapshots: 34,
      consensusEnabled: true,
    },
    {
      id: 'agt-04',
      name: 'github-security-pr-reviewer',
      role: 'Static Analysis & Dependency Gate',
      model: 'Gemini 1.5 Pro',
      status: 'active',
      sessionsToday: 2190,
      spendUSD: 18.50,
      budgetLimitUSD: 75.00,
      policiesCount: 6,
      lastAction: 'Flagged insecure crypto hashing in PR #1042',
      tools: ['github_api', 'semgrep_cli', 'vault_secrets'],
      timeTravelSnapshots: 28,
      consensusEnabled: false,
    },
    {
      id: 'agt-05',
      name: 'customer-data-exfil-bot',
      role: 'Automated CRM Enrichment (Rogue)',
      model: 'Llama-3-70b (Local)',
      status: 'intercepted',
      sessionsToday: 12,
      spendUSD: 0.12,
      budgetLimitUSD: 10.00,
      policiesCount: 5,
      lastAction: 'BLOCKED: Attempted to export raw plaintext credit cards',
      tools: ['salesforce_api', 'raw_db_query'],
      timeTravelSnapshots: 2,
      consensusEnabled: true,
    },
    {
      id: 'agt-06',
      name: 'recursive-seo-indexer',
      role: 'Automated Competitor Sitemap Scraper',
      model: 'Claude 3.5 Sonnet',
      status: 'throttled',
      sessionsToday: 9500,
      spendUSD: 25.00,
      budgetLimitUSD: 25.00,
      policiesCount: 3,
      lastAction: 'THROTTLED: Hit strict $25.00 daily spend circuit breaker',
      tools: ['browser_automation', 'vector_store'],
      timeTravelSnapshots: 6,
      consensusEnabled: false,
    }
  ]);

  // Toggle agent active / paused state
  const handleToggleAgent = (id, e) => {
    e.stopPropagation();
    setAgents(agents.map(a => {
      if (a.id === id) {
        const nextStatus = a.status === 'paused' ? 'active' : 'paused';
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  const filteredAgents = agents.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || a.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100 pt-20 pb-16 font-sans">
      
      {/* Top Banner / Workspace Bar */}
      <div className="border-b border-white/[0.08] bg-[#0c0f18]/90 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-slate-400">Workspace:</span>
              <select
                value={selectedWorkspace}
                onChange={(e) => setSelectedWorkspace(e.target.value)}
                className="bg-[#14192b] border border-white/[0.1] text-xs font-semibold text-white rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500"
              >
                <option>Production Fleet (Acme Corp)</option>
                <option>Payments &amp; Billing Fleet</option>
                <option>Core Infrastructure Team</option>
                <option>Data &amp; AI Security Fleet</option>
              </select>
            </div>
            
            <span className="hidden sm:inline text-slate-600">&bull;</span>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All 6 Guardrails Synchronized</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
            >
              ← Back to Product Showcase
            </button>
            <button
              onClick={() => alert("Scaffolded new agent dialog: You can launch new agents with 'guild deploy' CLI")}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <span>+ Deploy Agent</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Executive Fleet Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="p-4 rounded-xl bg-[#0e1220] border border-white/[0.08]">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Active Agent Fleet</span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">18 Live</div>
            <div className="text-[11px] text-emerald-400 font-mono mt-1">● 0 unmanaged shadow agents</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0e1220] border border-white/[0.08]">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Pre-Dispatch Blocks (24h)</span>
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">142 Intercepts</div>
            <div className="text-[11px] text-rose-300 font-mono mt-1">100% prevented prior to DB write</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0e1220] border border-white/[0.08]">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Budget Throttled</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">$14,820.50</div>
            <div className="text-[11px] text-amber-300 font-mono mt-1">Runaway loop killswitches active</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0e1220] border border-white/[0.08]">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Time-Travel Snapshots</span>
              <RotateCcw className="w-4 h-4 text-violet-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">130 Ledgers</div>
            <div className="text-[11px] text-violet-300 font-mono mt-1">Ready for 1-click state rewind</div>
          </div>

        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 rounded-2xl bg-[#0d101b] border border-white/[0.08] mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by agent name or responsibility..."
              className="w-full bg-[#14192b] border border-white/[0.08] text-xs text-white rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-emerald-500 placeholder-slate-500 font-mono"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {['all', 'active', 'quorum_required', 'intercepted', 'throttled', 'paused'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                  filterStatus === st
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05]'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>

        </div>

        {/* Agent Table & Detail Drawer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Table (8 or 12 cols) */}
          <div className={`${selectedAgent ? 'lg:col-span-8' : 'lg:col-span-12'} rounded-2xl bg-[#0c0f18] border border-white/[0.08] overflow-hidden shadow-2xl`}>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                
                <thead className="bg-[#121626] border-b border-white/[0.08] text-slate-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Agent Name</th>
                    <th className="py-3 px-4">Model &amp; Runtime</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Spend (Today)</th>
                    <th className="py-3 px-4">Differentiators</th>
                    <th className="py-3 px-4 text-right">Emergency Control</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/[0.06]">
                  {filteredAgents.map((agent) => {
                    const isSelected = selectedAgent?.id === agent.id;
                    return (
                      <tr
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-emerald-500/[0.07]' : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        {/* Name & Role */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-white font-mono flex items-center gap-2">
                            <span>{agent.name}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-sans truncate max-w-xs">
                            {agent.role}
                          </div>
                        </td>

                        {/* Model */}
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-slate-300">
                            {agent.model}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4">
                          {agent.status === 'active' && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                              Active
                            </span>
                          )}
                          {agent.status === 'quorum_required' && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
                              <Users className="w-3 h-3 text-cyan-400" />
                              Quorum Guard
                            </span>
                          )}
                          {agent.status === 'intercepted' && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-bold">
                              <ShieldAlert className="w-3 h-3 text-rose-400" />
                              Intercepted
                            </span>
                          )}
                          {agent.status === 'throttled' && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                              <DollarSign className="w-3 h-3 text-amber-400" />
                              Budget Capped
                            </span>
                          )}
                          {agent.status === 'paused' && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                              <Pause className="w-3 h-3" />
                              Paused
                            </span>
                          )}
                        </td>

                        {/* Spend Progress */}
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="text-white font-bold">${agent.spendUSD.toFixed(2)}</span>
                            <span className="text-slate-500">/ ${agent.budgetLimitUSD.toFixed(2)}</span>
                          </div>
                          <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                agent.spendUSD / agent.budgetLimitUSD > 0.8 ? 'bg-amber-400' : 'bg-emerald-400'
                              }`}
                              style={{ width: `${Math.min((agent.spendUSD / agent.budgetLimitUSD) * 100, 100)}%` }}
                            />
                          </div>
                        </td>

                        {/* Differentiators */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            {agent.timeTravelSnapshots > 0 && (
                              <span 
                                title={`${agent.timeTravelSnapshots} rollback snapshots stored`}
                                className="p-1 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20"
                              >
                                <RotateCcw className="w-3 h-3" />
                              </span>
                            )}
                            {agent.consensusEnabled && (
                              <span 
                                title="Cross-agent adversarial mesh verification enabled"
                                className="p-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                              >
                                <Users className="w-3 h-3" />
                              </span>
                            )}
                            <span className="text-[10px] text-slate-400">
                              {agent.policiesCount} rules
                            </span>
                          </div>
                        </td>

                        {/* Action Killswitch */}
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={(e) => handleToggleAgent(agent.id, e)}
                            className={`p-1.5 rounded-lg border transition-all ${
                              agent.status === 'paused'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30'
                                : 'bg-rose-500/10 text-rose-300 border-rose-500/20 hover:bg-rose-500/20'
                            }`}
                            title={agent.status === 'paused' ? 'Resume agent' : 'Emergency killswitch'}
                          >
                            {agent.status === 'paused' ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                          </button>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>

          </div>

          {/* Right: Selected Agent Detail Drawer (4 cols) */}
          {selectedAgent && (
            <div className="lg:col-span-4 rounded-2xl bg-[#0e1220] border border-white/[0.1] p-5 font-mono shadow-2xl relative">
              
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-bold text-xs truncate max-w-[200px]">{selectedAgent.name}</span>
                </div>
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="text-slate-400 hover:text-white p-1 rounded"
                >
                  ✕
                </button>
              </div>

              {/* Status pill & role */}
              <div className="mb-4">
                <p className="text-xs font-sans text-slate-300 mb-2">{selectedAgent.role}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">ID:</span>
                  <span className="text-emerald-400">{selectedAgent.id}</span>
                  <span className="text-slate-500">&bull;</span>
                  <span className="text-slate-300">{selectedAgent.model}</span>
                </div>
              </div>

              {/* Unique Differentiator Features on this Agent */}
              <div className="p-3.5 rounded-xl bg-[#080910] border border-violet-500/20 mb-4 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-violet-300 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  <span>Differentiator Controls</span>
                </div>
                
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400">Time-Travel Ledger:</span>
                  <button
                    onClick={() => alert(`Initiating state rollback to step ${selectedAgent.timeTravelSnapshots - 1}`)}
                    className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 text-[11px] hover:bg-violet-500/30 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Rewind ({selectedAgent.timeTravelSnapshots})</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400">Consensus Mesh:</span>
                  <span className="text-cyan-300 text-[11px]">
                    {selectedAgent.consensusEnabled ? 'Active (2/2 Shadow Quorum)' : 'Disabled'}
                  </span>
                </div>
              </div>

              {/* Connected Tools & Scopes */}
              <div className="mb-4">
                <div className="text-xs text-slate-400 mb-2">Authorized Tool Scopes:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAgent.tools.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Last Dispatched Action */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-4">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Last Audit Event:</div>
                <p className="text-xs text-slate-200 font-sans leading-snug">
                  {selectedAgent.lastAction}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                <button
                  onClick={() => alert(`Configured pre-dispatch rules for ${selectedAgent.name}`)}
                  className="w-full py-2 rounded-lg text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.09] text-white border border-white/[0.1] transition-colors"
                >
                  Configure Pre-Dispatch Policies ({selectedAgent.policiesCount})
                </button>
                <button
                  onClick={(e) => handleToggleAgent(selectedAgent.id, e)}
                  className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors ${
                    selectedAgent.status === 'paused'
                      ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold'
                      : 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30'
                  }`}
                >
                  {selectedAgent.status === 'paused' ? '▶ Resume Execution' : '⏹ Emergency Pause Agent'}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
