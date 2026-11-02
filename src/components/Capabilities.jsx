import React, { useState, useEffect } from 'react';

const EXEC_LINES = [
  '$ python analyze.py sales.csv',
  '✓ loaded 8,412 rows',
  '✓ wrote report.pdf'
];

const LIFECYCLE_STATES = ['RUN', 'PAUSE', 'UNBILLED', 'RESUME', 'SNAPSHOT', 'FORK ×12'];

export default function Capabilities() {
  // Demo 1: Execution terminal step-by-step typing
  const [execStep, setExecStep] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setExecStep((prev) => (prev + 1) % 4);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  // Demo 4: Live CPU Sparkline
  const [sparkPoints, setSparkPoints] = useState(() =>
    Array.from({ length: 30 }, () => 30 + Math.random() * 20)
  );
  const [cpuUsage, setCpuUsage] = useState(71);

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

  // Demo 5: Secrets vault toggle
  const [secretMask, setSecretMask] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSecretMask((prev) => prev ^ 1);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  // Demo 6: Lifecycle active pill
  const [activeLifecycleIndex, setActiveLifecycleIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLifecycleIndex((prev) => (prev + 1) % LIFECYCLE_STATES.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const sparklineString = sparkPoints
    .map((v, i) => `${(i * 200) / 29},${60 - v}`)
    .join(' ');

  return (
    <section id="machine" className="alt">
      <div className="w rv">
        <span className="ey">Capabilities</span>
        <h2>Everything an agent needs, nothing it can abuse.</h2>

        <div className="grid g3">
          {/* Card 1: Execution */}
          <div className="card">
            <div className="demo m" id="d-exec">
              {EXEC_LINES.slice(0, execStep || 1).map((line, i) => (
                <div key={i} className={i ? 'g' : ''}>
                  {line}
                </div>
              ))}
              <div>▍</div>
            </div>
            <h3>Execution</h3>
            <p>Commands, code, a PTY or a full desktop in an isolated machine.</p>
          </div>

          {/* Card 2: Network */}
          <div className="card">
            <div className="demo m">
              <div><span className="g">allow</span> api.openai.com</div>
              <div><span className="g">allow</span> api.github.com</div>
              <div><span className="g">allow</span> *.internal.corp:443</div>
              <div><span className="r">deny&nbsp;</span> 0.0.0.0/0</div>
            </div>
            <h3>Network</h3>
            <p>Ingress and egress under your policy, never around it.</p>
          </div>

          {/* Card 3: Storage */}
          <div className="card">
            <div className="demo m">
              <div>/home/user</div>
              <div>&nbsp;├ app/</div>
              <div>&nbsp;├ data/sales.csv</div>
              <div>&nbsp;├ <span className="g">report.pdf</span> · written 2s ago</div>
              <div>&nbsp;└ mnt/s3://acme-data</div>
            </div>
            <h3>Storage</h3>
            <p>A persistent filesystem plus your own buckets.</p>
          </div>

          {/* Card 4: Observability */}
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
                cpu <span className="k" id="cpu">{cpuUsage}%</span> · mem 1.2 GiB
              </div>
            </div>
            <h3>Observability</h3>
            <p>Metrics, logs, and signed webhooks for every session.</p>
          </div>

          {/* Card 5: Secrets vault */}
          <div className="card">
            <div className="demo m">
              <div>agent&nbsp;&nbsp;› Authorization: <span id="sk1">$STRIPE_KEY</span></div>
              <div>
                egress › Authorization:{' '}
                <span className="g" id="sk2">
                  {secretMask ? 'sk_live_••••••••' : 'sk_live_51Nz••••'}
                </span>
              </div>
              <div className="c" style={{ marginTop: '6px' }}>
                value never enters the sandbox
              </div>
            </div>
            <h3>Secrets vault</h3>
            <p>Keys an agent can use but never read.</p>
          </div>

          {/* Card 6: Lifecycle */}
          <div className="card">
            <div className="demo">
              <div className="pls" id="lc">
                {LIFECYCLE_STATES.map((state, idx) => (
                  <span
                    key={state}
                    className={idx === activeLifecycleIndex ? 'on' : ''}
                  >
                    {state}
                  </span>
                ))}
              </div>
            </div>
            <h3>Lifecycle</h3>
            <p>Pause, resume, snapshot and fork. Paused sandboxes aren’t billed.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
