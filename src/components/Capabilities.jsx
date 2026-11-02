import React, { useState, useEffect } from 'react';

const EXEC_LINES = [
  '$ git clone repo.git sandbox (<3s)',
  '✓ isolated microVM bubble active',
  '✓ test suite passed (42/42)',
  '✓ emitted clean PR #402 · sandbox auto-destroyed'
];

const AGENT_SKILLS = [
  'DB Migration Agent',
  'CVE Patching Agent',
  'Schema Refactor Agent',
  'Flaky Test Resolver',
  'API Sync Agent'
];

const SWAP_MODELS = [
  { name: 'Claude 3.5 Sonnet', status: 'Active (Fast)' },
  { name: 'Gemini 1.5 Pro', status: 'Fallback Ready' },
  { name: 'GPT-4o', status: 'Standby' },
  { name: 'vLLM / Local Weights', status: 'Air-gapped' }
];

export default function Capabilities() {
  // Demo 1: Execution terminal step-by-step typing
  const [execStep, setExecStep] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setExecStep((prev) => (prev + 1) % (EXEC_LINES.length + 1));
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  // Demo 3: Live Model Swapper
  const [activeModelIdx, setActiveModelIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModelIdx((prev) => (prev + 1) % SWAP_MODELS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Demo 4: Live CPU Sparkline
  const [sparkPoints, setSparkPoints] = useState(() =>
    Array.from({ length: 30 }, () => 30 + Math.random() * 20)
  );
  const [cpuUsage, setCpuUsage] = useState(58);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkPoints((prev) => {
        const next = [...prev.slice(1), 15 + Math.random() * 35];
        const lastVal = next[next.length - 1];
        setCpuUsage(Math.round(40 + (60 - lastVal) * 1.2));
        return next;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Demo 5: Budget / Circuit Breaker State
  const [breakerActive, setBreakerActive] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setBreakerActive((prev) => !prev);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Demo 6: Internal Agent Hub Active Pill
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSkillIndex((prev) => (prev + 1) % AGENT_SKILLS.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const sparklineString = sparkPoints
    .map((v, i) => `${(i * 200) / 29},${60 - v}`)
    .join(' ');

  return (
    <section id="machine" className="alt">
      <div className="w rv">
        <span className="ey">Core Platform Features</span>
        <h2>The 6 Pillars of the Enterprise Control Plane</h2>

        <div className="grid g3">
          {/* Feature 1: Ephemeral Sandboxed Workspaces */}
          <div className="card">
            <div className="demo m" id="d-exec">
              {EXEC_LINES.slice(0, execStep || 1).map((line, i) => (
                <div key={i} className={i ? 'g' : ''}>
                  {line}
                </div>
              ))}
              <div>▍</div>
            </div>
            <h3>1. Ephemeral Sandboxed Workspaces</h3>
            <p>Spins up isolated microVMs in &lt;3s. Clones repo, runs linters and test suites inside an isolated bubble, emits clean PRs, and auto-destroys with zero leaked state.</p>
          </div>

          {/* Feature 2: Agent IAM & Least-Privilege Security */}
          <div className="card">
            <div className="demo m">
              <div><span className="g">proxy</span> scoped-token injected</div>
              <div><span className="g">rbac&nbsp;</span> junior agent: read-only staging</div>
              <div><span className="r">deny&nbsp;</span> rm -rf /prod/db (blocked)</div>
              <div><span className="r">deny&nbsp;</span> unauthorized egress to external IP</div>
            </div>
            <h3>2. Agent IAM & Least-Privilege Security</h3>
            <p>Treats agents like digital employees. Scoped proxy secrets, RBAC, and pre-dispatch command filters that halt destructive shell actions instantly.</p>
          </div>

          {/* Feature 3: Swappable Agent Engine */}
          <div className="card">
            <div className="demo m">
              <div className="c mb-1">Decoupled model orchestrator:</div>
              {SWAP_MODELS.map((m, idx) => (
                <div key={m.name} className={idx === activeModelIdx ? 'g font-bold' : 'text-slate-400'}>
                  {idx === activeModelIdx ? '▶ ' : '  '}{m.name} · <span className="text-[10px]">{m.status}</span>
                </div>
              ))}
              <div className="c mt-1 text-[10px]">auto-swap if agent loops or fails tests twice</div>
            </div>
            <h3>3. Swappable Agent Engine</h3>
            <p>Decouple agent prompts from underlying models. Hot-swap failing agents across OpenAI, Anthropic, Gemini, or local vLLM/Ollama without rewriting code.</p>
          </div>

          {/* Feature 4: Centralized Observability & Audit Trail */}
          <div className="card">
            <div className="demo">
              <svg className="spk" viewBox="0 0 200 60" preserveAspectRatio="none">
                <polyline
                  id="spk"
                  fill="none"
                  stroke="var(--a)"
                  strokeWidth="2"
                  points={sparklineString}
                />
              </svg>
              <div className="m">
                audit stream <span className="k" id="cpu">SOC 2 / ISO</span> · SHA-256 verified
              </div>
            </div>
            <h3>4. Centralized Observability & Audit Trail</h3>
            <p>Every single prompt, LLM response, tool invocation, bash command, and file diff is cryptographically timestamped for compliance and zero code exfiltration proof.</p>
          </div>

          {/* Feature 5: Financial Governance & Token Budgeting */}
          <div className="card">
            <div className="demo m">
              <div>hard_cap  › <span className="g">$2.00 per task limit</span></div>
              <div>team_cost › <span className="g">Frontend: $240 / 45 PRs</span></div>
              <div className={breakerActive ? 'r font-bold' : ''}>
                circuit_breaker › {breakerActive ? 'HALTED (error loop ×3)' : 'Monitoring loops (0/3)'}
              </div>
              <div className="c mt-1 text-[10px]">zero runaway $10,000 monthly invoices</div>
            </div>
            <h3>5. Financial Governance & Token Budgeting</h3>
            <p>Strict token and dollar ceilings per repo, developer, and task. Circuit breakers halt executions when an agent encounters the same tool error 3 times.</p>
          </div>

          {/* Feature 6: Internal Agent Hub & Managed Skills Center */}
          <div className="card">
            <div className="demo">
              <div className="pls" id="lc">
                {AGENT_SKILLS.map((skill, idx) => (
                  <span
                    key={skill}
                    className={idx === activeSkillIndex ? 'on' : ''}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <h3>6. Internal Agent Hub & Skills Center</h3>
            <p>An internal enterprise app store. Senior engineers package DB migration or security patching agents once; any engineer across the firm deploys with 1-click.</p>
          </div>

        </div>
      </div>
    </section>
  );
}

