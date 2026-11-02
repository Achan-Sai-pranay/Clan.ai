import React, { useState, useEffect, useRef } from 'react';

const TASKS = [
  'fix issue #402',
  'patch CVE-2024-81',
  'migrate postgres schema',
  'run sister test suite',
  'refactor billing auth',
  'review PR #482',
  'sanitize shell command',
  'hot-swap to Claude 3.5',
  'intercept rm -rf /prod',
  'enforce $5 budget cap',
  'pause for human approval',
  'auto-verify PR branch'
];

const STATUS_LABELS = {
  boot: 'booting',
  run: 'running',
  wait: 'needs approval',
  done: 'done',
  fail: 'denied'
};

const RUNTIMES = ['py', 'node', 'sh'];
const rnd = (a) => a[Math.floor(Math.random() * a.length)];

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  // Fleet state
  const [fleet, setFleet] = useState(() =>
    TASKS.map((t, i) => ({
      id: 'sbx_' + (1000 + i * 37).toString(16),
      t,
      s: rnd(['run', 'run', 'boot', 'done']),
      runtime: rnd(RUNTIMES),
      flash: false
    }))
  );

  const [logs, setLogs] = useState([
    { id: 1, text: '<b>sbx_3f8</b> boot &lt;3s · microVM isolated' },
    { id: 2, text: '<b>sbx_41d</b> pre-dispatch: blocked destructive rm -rf' }
  ]);

  const addLog = (msg) => {
    setLogs((prev) => [{ id: Date.now() + Math.random(), text: msg }, ...prev.slice(0, 5)]);
  };

  // Live fleet task transitions
  useEffect(() => {
    const nextMap = { boot: 'run', run: null, wait: null, done: 'boot', fail: 'boot' };

    const interval = setInterval(() => {
      setFleet((currentFleet) => {
        const randomIndex = Math.floor(Math.random() * currentFleet.length);
        const item = currentFleet[randomIndex];

        if (item.s === 'wait') return currentFleet;

        let nextStatus = nextMap[item.s];
        if (item.s === 'run') {
          nextStatus = Math.random() < 0.35 ? 'wait' : Math.random() < 0.5 ? 'done' : null;
        }

        if (!nextStatus) return currentFleet;

        const waitingCount = currentFleet.filter((x) => x.s === 'wait').length;
        if (nextStatus === 'wait' && waitingCount >= 2) return currentFleet;

        const updatedTask = nextStatus === 'boot' ? rnd(TASKS) : item.t;

        const logMsg =
          nextStatus === 'boot'
            ? `<b>${item.id}</b> sandbox boot &lt;3s`
            : nextStatus === 'run'
            ? `<b>${item.id}</b> pre-dispatch check passed`
            : nextStatus === 'wait'
            ? `<b>${item.id}</b> paused for human lead approval`
            : `<b>${item.id}</b> verified PR emitted`;

        addLog(logMsg);

        return currentFleet.map((f, idx) =>
          idx === randomIndex
            ? { ...f, s: nextStatus, t: updatedTask, flash: true }
            : f
        );
      });
    }, 900);

    return () => clearInterval(interval);
  }, []);

  // Clear flash state after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setFleet((current) =>
        current.some((f) => f.flash)
          ? current.map((f) => (f.flash ? { ...f, flash: false } : f))
          : current
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [fleet]);

  // Handle Approve / Deny action in the queue
  const handleApproval = (decision) => {
    const waitingItem = fleet.find((x) => x.s === 'wait');
    if (!waitingItem) return;

    const newStatus = decision === 'ok' ? 'run' : 'fail';
    addLog(`<b>${waitingItem.id}</b> ${decision === 'ok' ? 'approved by you' : 'denied by you'}`);

    setFleet((current) =>
      current.map((f) =>
        f.id === waitingItem.id
          ? { ...f, s: newStatus, flash: true }
          : f
      )
    );
  };

  const runningCount = fleet.filter((f) => f.s === 'run').length;
  const waitingFleet = fleet.filter((f) => f.s === 'wait');

  const handleCopy = () => {
    navigator.clipboard.writeText('pip install clan-sdk');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Canvas quiet sandbox grid animation
  useEffect(() => {
    const host = heroRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    const S = 32;
    let cs = 0;
    let rw = 0;
    let energy = new Float32Array(0);
    let animationId;

    const resize = () => {
      const r = host.getBoundingClientRect();
      const d = Math.min(window.devicePixelRatio || 1, 2);
      width = r.width;
      height = r.height;
      canvas.width = r.width * d;
      canvas.height = r.height * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);

      cs = Math.ceil(width / S);
      rw = Math.ceil(height / S);
      energy = new Float32Array(cs * rw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      let col = '176,228,204';
      try {
        const csStyle = getComputedStyle(document.documentElement);
        const hex = csStyle.getPropertyValue('--a').trim();
        const n = parseInt(hex.replace('#', ''), 16);
        if (!isNaN(n)) {
          col = [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(',');
        }
      } catch (e) {}

      if (Math.random() < 0.3) {
        const i = Math.floor(Math.random() * energy.length);
        if (energy[i] < 0.05) energy[i] = 0.55;
      }

      for (let j = 0; j < rw; j++) {
        for (let i = 0; i < cs; i++) {
          const k = j * cs + i;
          const v = energy[k];
          const cx = i * S + S / 2;
          const cy = j * S + S / 2;

          ctx.fillStyle = `rgba(${col}, .07)`;
          ctx.fillRect(cx - 1, cy - 1, 2, 2);

          if (v < 0.02) {
            energy[k] = 0;
            continue;
          }

          const z = 2 + v * 4;
          ctx.fillStyle = `rgba(${col}, ${v * 0.5})`;
          ctx.fillRect(cx - z / 2, cy - z / 2, z, z);
          energy[k] = v * 0.965;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <header className="hero" ref={heroRef}>
      <canvas
        ref={canvasRef}
        className="fx"
        style={{
          maskImage: 'linear-gradient(#000 45%, transparent)',
          WebkitMaskImage: 'linear-gradient(#000 45%, transparent)'
        }}
      />
      <div className="w">
        <div className="hd">
          <span className="pill m">
            <span className="dot"></span>Enterprise AI Control Plane · Sovereign & SOC 2 Ready
          </span>
          <h1>
            Models and agents are disposable. <em>Our infrastructure is the permanent control layer.</em>
          </h1>
          <p className="sub">
            The infrastructure and governance operating system for enterprise AI software development. Spin up ephemeral sandboxes in &lt;3s, enforce least-privilege IAM and pre-dispatch command filters, eliminate run-away token bills, and hot-swap failing models across your entire fleet.
          </p>
          <div className="cta">
            <a className="btn p" href="#arch">Explore Control Plane →</a>
            <a className="btn" href="#differentiators">Why We Differentiate</a>
            <span className="inst m" id="cp" onClick={handleCopy}>
              <span>$</span>
              <span>pip install <b>clan-sdk</b></span>
              <span>{copied ? '✓' : '⧉'}</span>
            </span>
          </div>
        </div>

        {/* Live Fleet Console */}
        <div className="console">
          <div className="ch m">
            <b>fleet · private-vpc · us-east</b>
            <span className="sp">
              <span>active sandboxes <b id="nr">{runningCount}</b></span>
              <span>human approvals <b id="nw">{waitingFleet.length}</b></span>
              <span>boot time <b>&lt;3s</b></span>
            </span>
          </div>

          <div className="cb">
            {/* Grid of 12 Sandboxes */}
            <div className="fleet" id="fleet">
              {fleet.map((item) => (
                <div key={item.id} className={`t m ${item.flash ? 'flash' : ''}`}>
                  <div className="id">
                    <span>{item.id}</span>
                    <span>{item.runtime}</span>
                  </div>
                  <div className="tk">{item.t}</div>
                  <span className={`st s-${item.s}`}>
                    {STATUS_LABELS[item.s]}
                  </span>
                </div>
              ))}
            </div>

            {/* Side: Approval queue + Live Trace */}
            <div className="side">
              <h5>Approval queue (Human-in-the-loop)</h5>
              <div className="apr" id="apr">
                {waitingFleet.length > 0 ? (
                  <div className="ap m">
                    <div><b>{waitingFleet[0].id}</b> paused for escalation</div>
                    <div className="k">schema.alter_column --force</div>
                    <div className="r">
                      <button className="btn p" onClick={() => handleApproval('ok')}>Approve</button>
                      <button className="btn" onClick={() => handleApproval('no')}>Deny</button>
                    </div>
                  </div>
                ) : (
                  <div className="none">No pending escalation requests.</div>
                )}
              </div>

              <h5 style={{ borderTop: '1px solid var(--line)' }}>Live trace</h5>
              <div className="log m" id="log">
                {logs.map((item) => (
                  <div key={item.id} dangerouslySetInnerHTML={{ __html: item.text }} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
