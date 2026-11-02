import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  Play, 
  FileCode, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  RotateCcw
} from 'lucide-react';

export default function CodePlayground() {
  const [activeSnippet, setActiveSnippet] = useState('sdk');
  const [copied, setCopied] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState(null);

  const snippets = {
    sdk: {
      filename: "agent.service.ts",
      language: "typescript",
      code: `import { Agent, Guardrail, ModelProvider } from '@guild/sdk';
import { PostgresTool, SlackTool } from '@guild/tools';

// Define enterprise agent with pre-dispatch policies & rollback
export const dbaAgent = new Agent({
  name: 'prod-dba-guardian',
  model: ModelProvider.Claude_3_5_Sonnet,
  tools: [new PostgresTool(), new SlackTool()],
  
  // High-assurance governance rules
  guardrails: [
    // Pre-dispatch interception: halts destructive operations
    Guardrail.denyOperations(['DROP TABLE', 'TRUNCATE', 'ALTER OWNER']),
    
    // Spend limiter: circuit breaker at $10.00
    Guardrail.maxSessionBudgetUSD(10.00),

    // Innovation 1: Deterministic state rollback micro-snapshots
    Guardrail.enableTimeTravelRollback({
      snapshotStrategy: 'two-phase-compensating',
      maxRollbackSteps: 20
    }),

    // Innovation 2: Cross-agent adversarial shadow quorum
    Guardrail.requireConsensusMesh({
      shadowAuditorModel: 'openai/gpt-4o',
      minQuorumPercent: 100
    })
  ]
});`
    },
    policy: {
      filename: "guild.policy.yaml",
      language: "yaml",
      code: `version: "2.1"
fleet: "production-core"

# Declarative Pre-Dispatch Interceptor Rules
policies:
  - id: "pol-prod-zero-trust"
    target_tools: 
      - "postgres_admin"
      - "aws_iam_role"
    enforcement: PRE_DISPATCH_BLOCK
    allowed_actions: ["SELECT", "EXPLAIN", "LIST"]
    denied_actions: ["DROP", "DELETE *", "TRUNCATE"]
    remediation: "Trigger Slack alert to #security-war-room"

  # Spend rate limiters
  - id: "pol-budget-governance"
    max_tokens_per_hour: 2500000
    max_usd_per_agent_session: 15.00
    action_on_exceed: "FREEZE_AND_NOTIFY"

  # Architectural Differentiator 1: Time Travel
  - id: "pol-compensating-rollback"
    auto_compensate_external_mutations: true
    revert_on_anomaly_score_above: 0.85`
    },
    cli: {
      filename: "terminal session",
      language: "bash",
      code: `# 1. Install Guild CLI
$ npm install -g @guild/cli

# 2. Authenticate with enterprise workspace
$ guild auth login --workspace=acme-corp

# 3. Simulate agent with adversarial fuzzing & jailbreak tests
$ guild test ./agent.service.ts --adversarial --quorum

# 4. Deploy to managed event-driven runtime
$ guild deploy --prod --fleet=payments

✓ 12 Agents synchronized with pre-dispatch interceptor.
✓ Consensus mesh established across 4 nodes.
✓ Time-travel compensating ledger mounted.`
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeSnippet].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    setSimulating(true);
    setTerminalOutput("Compiling agent definition and compiling pre-dispatch AST...");

    setTimeout(() => {
      setTerminalOutput(
        "✓ AST syntax valid.\n" +
        "✓ Checking policy constraints against SOC2 baseline...\n" +
        "✓ Quorum node ping: 0.6ms response.\n" +
        "✓ Time-travel compensating ledger attached.\n\n" +
        "[SUCCESS] Agent 'prod-dba-guardian' ready for production dispatch."
      );
      setSimulating(false);
    }, 1200);
  };

  return (
    <section id="playground" className="py-24 bg-[#0a0d16] border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold tracking-wide mb-3">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>DEVELOPER FIRST SURFACES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Code-Driven Governance
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Configure guards in TypeScript or declarative YAML. Test locally, deploy via CLI, govern globally.
          </p>
        </div>

        {/* Code Editor Container */}
        <div className="rounded-2xl bg-[#08090f] border border-white/[0.1] shadow-2xl overflow-hidden font-mono text-xs">
          
          {/* Top Bar with Tabs and Copy */}
          <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#0d101b] border-b border-white/[0.08] gap-3">
            
            {/* Snippet Tabs */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => { setActiveSnippet('sdk'); setTerminalOutput(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                  activeSnippet === 'sdk'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>agent.service.ts</span>
              </button>
              <button
                onClick={() => { setActiveSnippet('policy'); setTerminalOutput(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                  activeSnippet === 'policy'
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>guild.policy.yaml</span>
              </button>
              <button
                onClick={() => { setActiveSnippet('cli'); setTerminalOutput(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                  activeSnippet === 'cli'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>CLI Workflow</span>
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRunSimulation}
                disabled={simulating}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                <Play className={`w-3 h-3 fill-slate-950 ${simulating ? 'animate-spin' : ''}`} />
                <span>{simulating ? 'Testing...' : 'Test AST Check'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors flex items-center gap-1"
                title="Copy code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

          </div>

          {/* Code Text Area */}
          <div className="p-5 overflow-x-auto text-slate-300 bg-[#08090e] leading-relaxed max-h-[380px]">
            <pre>
              <code>{snippets[activeSnippet].code}</code>
            </pre>
          </div>

          {/* Simulation Output Drawer if triggered */}
          {terminalOutput && (
            <div className="p-4 bg-[#0a0d16] border-t border-white/[0.08] text-xs font-mono text-emerald-400">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Dry-Run Pre-Dispatch Output:</span>
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed text-emerald-300">
                {terminalOutput}
              </pre>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
