import React, { useState } from 'react';

const CODE_SNIPPETS = {
  python: `# Spin up a governed agent sandbox
from clan import Clan

clan = Clan(vpc="aws-ap-south-1") # or local on-prem
box = clan.sandbox.create(
    repo="github.com/corp/billing-service",
    budget_usd=2.00,
    filter_destructive_cmds=True,
    fallback_model="gemini-1.5-pro"
)

# Run agent with least-privilege proxy & human escalation
result = box.execute(
    agent="cve-patcher",
    on_ambiguity="slack:#eng-leads"
)`,
  typescript: `// Spin up a governed agent sandbox
import { Clan } from '@clan/sdk';

const clan = new Clan({ vpc: 'aws-ap-south-1' });
const box = await clan.sandbox.create({
  repo: 'github.com/corp/billing-service',
  budgetUsd: 2.00,
  filterDestructiveCmds: true,
  fallbackModel: 'claude-3-5-sonnet'
});

// Run agent with least-privilege proxy & human escalation
const result = await box.execute({
  agent: 'cve-patcher',
  onAmbiguity: 'slack:#eng-leads'
});`,
  go: `// Spin up a governed agent sandbox
c := clan.New(clan.VPC("aws-ap-south-1"))
box, _ := c.Sandbox.Create(ctx, &clan.Config{
    Repo:                  "github.com/corp/billing-service",
    BudgetUSD:             2.00,
    FilterDestructiveCmds: true,
    FallbackModel:         "gemini-1.5-pro",
})

result, _ := box.Execute(ctx, "cve-patcher", clan.OnAmbiguity("slack:#eng-leads"))`
};

export default function DeveloperSection() {
  const [activeTab, setActiveTab] = useState('python');

  return (
    <section id="dev">
      <div className="w rv">
        <div className="dev">
          
          {/* Left Text */}
          <div>
            <span className="ey">Developer SDK & CI Integration</span>
            <h2>Complete Control in a Single SDK Call</h2>
            <p className="ld">One consistent control layer across any model, agent framework, or private VPC.</p>
            <ul className="chk">
              <li>Python, TypeScript and Go SDKs</li>
              <li>Pre-dispatch command filtering & scoped IAM tokens</li>
              <li>Hot-swapping fallback models on test failure</li>
              <li>Automated sister sandbox verification before PR review</li>
            </ul>
          </div>

          {/* Right Console */}
          <div className="console" style={{ margin: 0 }}>
            <div className="tabs" id="tabs">
              <button
                className={activeTab === 'python' ? 'on' : ''}
                onClick={() => setActiveTab('python')}
              >
                python
              </button>
              <button
                className={activeTab === 'typescript' ? 'on' : ''}
                onClick={() => setActiveTab('typescript')}
              >
                typescript
              </button>
              <button
                className={activeTab === 'go' ? 'on' : ''}
                onClick={() => setActiveTab('go')}
              >
                go
              </button>
            </div>

            <div className="code m" id="code">
              {activeTab === 'python' && (
                <>
                  <span className="c"># Spin up a governed agent sandbox</span>{'\n'}
                  <span className="k">from</span> clan <span className="k">import</span> Clan{'\n\n'}
                  clan = Clan(vpc=<span className="s">"aws-ap-south-1"</span>){'\n'}
                  box = clan.sandbox.create({'\n'}
                  {'    '}repo=<span className="s">"github.com/corp/billing"</span>,{'\n'}
                  {'    '}budget_usd=<span className="s">2.00</span>,{'\n'}
                  {'    '}filter_destructive_cmds=<span className="k">True</span>,{'\n'}
                  {'    '}fallback_model=<span className="s">"gemini-1.5-pro"</span>{'\n'}
                  ){'\n\n'}
                  <span className="c"># Run agent with human escalation</span>{'\n'}
                  box.execute(agent=<span className="s">"patcher"</span>, on_ambiguity=<span className="s">"slack:#eng-lead"</span>)
                </>
              )}
              {activeTab === 'typescript' && (
                <>
                  <span className="c">// Spin up a governed agent sandbox</span>{'\n'}
                  <span className="k">import</span> {'{ Clan }'} <span className="k">from</span> <span className="s">'@clan/sdk'</span>;{'\n\n'}
                  <span className="k">const</span> clan = <span className="k">new</span> Clan({'{ vpc: '} <span className="s">'aws-ap-south-1'</span> {'}'});{'\n'}
                  <span className="k">const</span> box = <span className="k">await</span> clan.sandbox.create({'{'}{'\n'}
                  {'  '}repo: <span className="s">'github.com/corp/billing'</span>,{'\n'}
                  {'  '}budgetUsd: <span className="s">2.00</span>,{'\n'}
                  {'  '}filterDestructiveCmds: <span className="k">true</span>,{'\n'}
                  {'  '}fallbackModel: <span className="s">'claude-3-5-sonnet'</span>{'\n'}
                  {'}'});{'\n\n'}
                  <span className="k">await</span> box.execute({'{ agent: '} <span className="s">'patcher'</span>, onAmbiguity: <span className="s">'slack:#eng-lead'</span> {'}'});
                </>
              )}
              {activeTab === 'go' && (
                <>
                  <span className="c">// Spin up a governed agent sandbox</span>{'\n'}
                  c := clan.New(clan.VPC(<span className="s">"aws-ap-south-1"</span>)){'\n'}
                  box, _ := c.Sandbox.Create(ctx, &clan.Config{'{'}{'\n'}
                  {'    '}Repo: <span className="s">"github.com/corp/billing"</span>,{'\n'}
                  {'    '}BudgetUSD: <span className="s">2.00</span>,{'\n'}
                  {'    '}FilterDestructiveCmds: <span className="k">true</span>,{'\n'}
                  {'    '}FallbackModel: <span className="s">"gemini-1.5-pro"</span>,{'\n'}
                  {'}'}){'\n\n'}
                  box.Execute(ctx, <span className="s">"patcher"</span>, clan.OnAmbiguity(<span className="s">"slack:#eng-lead"</span>))
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

