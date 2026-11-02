import React, { useState } from 'react';

const CODE_SNIPPETS = {
  python: `# boot a governed sandbox
from helm import Helm

box = Helm().sandbox.create(budget="$5")
box.run("agent.py", approve=["github.merge"])`,
  typescript: `// boot a governed sandbox
import { Helm } from '@helm/sdk'

const box = await new Helm().sandbox.create({ budget: '$5' })
await box.run('agent.ts', { approve: ['github.merge'] })`,
  go: `// boot a governed sandbox
box, _ := helm.New().Sandbox.Create(ctx, helm.Budget("$5"))
box.Run(ctx, "agent.go", helm.Approve("github.merge"))`
};

export default function DeveloperSection() {
  const [activeTab, setActiveTab] = useState('python');

  return (
    <section id="dev">
      <div className="w rv">
        <div className="dev">
          
          {/* Left Text */}
          <div>
            <span className="ey">Developers</span>
            <h2>Four lines from zero to a governed agent.</h2>
            <p className="ld">Same SDK in our cloud, yours, or on one node.</p>
            <ul className="chk">
              <li>Python, TypeScript and Go SDKs</li>
              <li>Works with any agent framework</li>
              <li>Moving clouds is a config change</li>
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
                  <span className="c"># boot a governed sandbox</span>{'\n'}
                  <span className="k">from</span> helm <span className="k">import</span> Helm{'\n\n'}
                  box = Helm().sandbox.create(budget=<span className="s">"$5"</span>){'\n'}
                  box.run(<span className="s">"agent.py"</span>, approve=[<span className="s">"github.merge"</span>])
                </>
              )}
              {activeTab === 'typescript' && (
                <>
                  <span className="c">// boot a governed sandbox</span>{'\n'}
                  <span className="k">import</span> {'{ Helm }'} <span className="k">from</span> <span className="s">'@helm/sdk'</span>{'\n\n'}
                  <span className="k">const</span> box = <span className="k">await</span> <span className="k">new</span> Helm().sandbox.create({'{ budget: '} <span className="s">'$5'</span> {'}'}){'\n'}
                  <span className="k">await</span> box.run(<span className="s">'agent.ts'</span>, {'{ approve: ['}<span className="s">'github.merge'</span>{'] }'})
                </>
              )}
              {activeTab === 'go' && (
                <>
                  <span className="c">// boot a governed sandbox</span>{'\n'}
                  box, _ := helm.New().Sandbox.Create(ctx, helm.Budget(<span className="s">"$5"</span>)){'\n'}
                  box.Run(ctx, <span className="s">"agent.go"</span>, helm.Approve(<span className="s">"github.merge"</span>))
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
