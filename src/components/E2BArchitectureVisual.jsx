import React, { useState, useEffect, useRef } from 'react';

/**
 * 3D Isometric Control Plane Architecture (Claude Engine + E2B Split Sticky Layout)
 * 
 * - Left side: Sticky / pinned 3D isometric diagram with interactive mouse tilt,
 *   animated packet transit, gate interception, human-in-the-loop pause, and explode slider.
 * - Right side: Scrollable legends & specs (E2B-style "Through the Boundary",
 *   Task In / Route / Gate / PR Out lifecycle steps, and Budget / Circuit breaker gauges).
 */
export default function E2BArchitectureVisual() {
  const stageRef = useRef(null);
  const svgRef = useRef(null);

  // 3D Engine State
  const [explodeGap, setExplodeGap] = useState(88); // 55 to 115
  const [hoveredLayer, setHoveredLayer] = useState(-1);
  const [tiltTarget, setTiltTarget] = useState(0);

  // References to keep requestAnimationFrame loop updated without recreating
  const stateRef = useRef({
    th: 0,
    tt: 0,
    g: 88,
    hl: -1,
  });

  stateRef.current.g = explodeGap;
  stateRef.current.hl = hoveredLayer;
  stateRef.current.tt = tiltTarget;

  // Track scroll position to conditionally highlight steps
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Mouse tilt on the 3D stage
  const handlePointerMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    setTiltTarget(normalizedX * 1.1);
  };

  const handlePointerLeave = () => {
    setTiltTarget(0);
    setHoveredLayer(-1);
  };

  // SVG Render Loop
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let animId;
    const CX = 390;
    const CY = 510;

    const MINT = [168, 230, 207];
    const VIO = [226, 240, 235];
    const CY2 = [140, 196, 226];
    const RED = [251, 113, 133];
    const S = [340, 260, 260, 260, 260];
    const Hh = [12, 8, 10, 3, 3];

    const meta = [
      ['YOUR CLOUD · VPC', 'AWS · Azure · GCP · on-prem'],
      ['EPHEMERAL SANDBOXES', 'one microVM per task'],
      ['CONTROL PLANE', 'router · budget · audit'],
      ['POLICY & IAM GATE', 'scoped secrets · RBAC'],
      ['AGENT FLEET', 'any model, hot-swappable']
    ];

    const P = (x, y, z, th) => {
      const c = Math.cos(th), s = Math.sin(th);
      const rx = x * c - y * s;
      const ry = x * s + y * c;
      return [CX + (rx - ry) * 0.866, CY + (rx + ry) * 0.5 - z];
    };

    const D = (x, y, th) => {
      const c = Math.cos(th), s = Math.sin(th);
      return x * c - y * s + x * s + y * c;
    };

    const pt = (a) => a.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    const rgb = (c, k, a) => `rgba(${(c[0] * k) | 0},${(c[1] * k) | 0},${(c[2] * k) | 0},${a})`;

    function box(x, y, z, w, d, h, top, side, a = 1, st = 'none', sw = 1, dash = '', th) {
      const c = Math.cos(th), s = Math.sin(th);
      const Q = [
        [x, y],
        [x + w, y],
        [x + w, y + d],
        [x, y + d]
      ];
      const N = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0]
      ];
      let o = '';
      for (let i = 0; i < 4; i++) {
        const n = N[i];
        const nx = n[0] * c - n[1] * s;
        const ny = n[0] * s + n[1] * c;
        if (nx + ny <= 0) continue;
        const A = Q[i];
        const B = Q[(i + 1) % 4];
        const k = 0.62 + 0.28 * (nx - ny);
        o += `<polygon points="${pt([
          P(A[0], A[1], z, th),
          P(B[0], B[1], z, th),
          P(B[0], B[1], z + h, th),
          P(A[0], A[1], z + h, th)
        ])}" fill="${rgb(side, k, a)}" stroke="${st}" stroke-width="${sw * 0.6}"/>`;
      }
      return (
        o +
        `<polygon points="${pt(
          Q.map((q) => P(q[0], q[1], z + h, th))
        )}" fill="${rgb(top, 1, a)}" stroke="${st}" stroke-width="${sw}"${
          dash ? ` stroke-dasharray="${dash}"` : ''
        }/>`
      );
    }

    const ln = (x1, y1, x2, y2, z, st, w = 1, th) => {
      const a = P(x1, y1, z, th);
      const b = P(x2, y2, z, th);
      return `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${st}" stroke-width="${w}"/>`;
    };

    const cols = [-84, -28, 28, 84];

    const tag = (x, y, z, s, c = '#e8f1ee', f = 10, w = 600, th) => {
      const p = P(x, y, z, th);
      return `<text x="${p[0].toFixed(1)}" y="${p[1].toFixed(1)}" fill="${c}" font-size="${f}" font-weight="${w}" text-anchor="middle" font-family="'JetBrains Mono', monospace">${s}</text>`;
    };

    const io = (z, a, b, c, into, th) => {
      let p = null;
      [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1]
      ].forEach((v) => {
        const q = P(v[0] * 130, v[1] * 130, z, th);
        if (!p || q[0] < p[0]) p = q;
      });
      const y = p[1];
      const f = 'font-family="\'JetBrains Mono\', monospace"';
      return `<rect x="12" y="${y - 19}" width="118" height="38" rx="8" fill="rgba(10,14,18,0.85)" stroke="${c}" stroke-width="1.2"/><text x="22" y="${y - 3}" fill="${c}" font-size="10.5" font-weight="700" ${f}>${a}</text><text x="22" y="${y + 11}" fill="#9fb3ac" font-size="9.5" ${f}>${b}</text><line x1="${into ? 130 : p[0] - 6}" y1="${y}" x2="${into ? p[0] - 6 : 130}" y2="${y}" stroke="${c}" stroke-dasharray="3 3" marker-end="url(#ar)"/>`;
    };

    let th = 0;

    const frame = (now) => {
      const t = matchMedia('(prefers-reduced-motion: reduce)').matches ? 2600 : now;
      const tt = stateRef.current.tt;
      const g = stateRef.current.g;
      const hl = stateRef.current.hl;

      th += (tt + Math.sin(t / 2600) * 0.05 - th) * 0.07;

      const Z = [0, 1, 2, 3, 4].map((k) => k * g);
      const top = (k) => Z[k] + Hh[k];

      // Flying telemetry packets
      const pk = [];
      const zT = top(4) + 34;
      const zE = top(1) + 34;

      [
        [1, 0, 0],
        [2, 2, 0.3],
        [0, 2, 0.6],
        [3, 1, 0.85]
      ].forEach(([i, j, ph]) => {
        const T = 4200;
        const p = ((t + ph * T) % T) / T;
        pk.push({ x: cols[i], y: cols[j], z: zT + (zE - zT) * p, c: MINT, r: false });
      });

      // Red malicious packet getting blocked
      let red = null;
      let hold = false;
      {
        const T = 7000;
        const p = ((t + 1800) % T) / T;
        const zg = top(3) + 9;
        if (p < 0.45) {
          pk.push((red = { x: 28, y: -28, z: zT + (zg - zT) * (p / 0.45), c: RED, r: true }));
        } else if (p < 0.78) {
          hold = true;
          pk.push((red = { x: 28, y: -28, z: zg, c: RED, r: true }));
        }
      }

      // Yellow packet pausing for human confirmation
      let ah = false;
      {
        const T = 11000;
        const p = ((t + 4000) % T) / T;
        const zc = top(2) + 12;
        let az = null;
        if (p < 0.3) az = zT + (zc - zT) * (p / 0.3);
        else if (p < 0.55) {
          az = zc;
          ah = true;
        } else if (p < 0.85) {
          az = zc + (zE - zc) * ((p - 0.55) / 0.3);
        }
        if (az !== null) pk.push({ x: 110, y: -80, z: az, c: [251, 191, 36], r: false });
      }

      const bucket = (p) => {
        let b = -1;
        for (let k = 0; k < 5; k++) if (p.z >= top(k)) b = k;
        return b;
      };

      const cube = (x, y, z, s, h, tc, sc, a = 1) =>
        box(x - s / 2, y - s / 2, z, s, s, h, tc, sc, a, 'none', 1, '', th);

      let o =
        '<defs><marker id="ar" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L8,4L0,8z" fill="#9fb3ac"/></marker></defs>';

      const labels = [];
      [
        [-130, -130],
        [130, -130],
        [-130, 130]
      ].forEach(([x, y]) => {
        const a = P(x, y, 12, th);
        const b = P(x, y, top(4), th);
        o += `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="rgba(255,255,255,.14)" stroke-dasharray="2 5"/>`;
      });

      for (let k = 0; k < 5; k++) {
        const z = Z[k];
        const s2 = S[k] / 2;
        const on = hl === k;
        let l = '';
        const st = on ? 'rgba(168,230,207,.95)' : 'rgba(255,255,255,.2)';

        // Layer 0: Your Cloud / VPC
        if (k === 0) {
          l += box(-s2, -s2, z, S[k], S[k], 12, [22, 34, 31], [12, 19, 17], 1, st, on ? 1.6 : 1, '', th);
          for (let i = 1; i < 8; i++) {
            const u = -s2 + (S[k] * i) / 8;
            l +=
              ln(u, -s2, u, s2, z + 12, 'rgba(168,230,207,.10)', 1, th) +
              ln(-s2, u, s2, u, z + 12, 'rgba(168,230,207,.10)', 1, th);
          }
          l +=
            `<polygon points="${pt(
              [
                [-150, -150],
                [150, -150],
                [150, 150],
                [-150, 150]
              ].map((q) => P(q[0], q[1], z + 12, th))
            )}" fill="rgba(168,230,207,.05)" stroke="rgba(168,230,207,.6)" stroke-dasharray="6 5"/>` +
            tag(105, 105, z + 16, 'YOUR NETWORK BOUNDARY', '#b5ecd4', 9, 700, th);
        }

        // Layer 1: Ephemeral Sandboxes (Grid of microVMs)
        if (k === 1) {
          l += box(-s2, -s2, z, S[k], S[k], 8, [17, 27, 43], [9, 15, 25], 1, st, on ? 1.6 : 1, '', th);
          const cs = [];
          for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) cs.push([i, j]);
          cs.sort((a, b) => D(cols[a[0]], cols[a[1]], th) - D(cols[b[0]], cols[b[1]], th));
          cs.forEach(([i, j]) => {
            const act = (i * 3 + j * 5 + Math.floor(t / 1300)) % 6 === 0;
            const h = act ? 22 + 4 * Math.sin(t / 260 + i) : 14;
            l += cube(cols[i], cols[j], z + 8, 38, h, act ? MINT : [34, 48, 70], act ? [70, 125, 105] : [19, 29, 44]);
            if (act) l += tag(cols[i], cols[j], z + 8 + h + 10, 'PR ✓', '#b5ecd4', 9, 700, th);
          });
        }

        // Layer 2: Control Plane (Router, Budget, Audit)
        if (k === 2) {
          l += box(-s2, -s2, z, S[k], S[k], 10, [13, 38, 34], [7, 22, 20], 1, st, on ? 1.6 : 1, '', th);
          const ch = [
            [-110, MINT, 'ROUTER', 'hot-swap'],
            [-35, CY2, 'BUDGET', '$142/$500'],
            [40, VIO, 'AUDIT', 1280 + Math.floor(t / 400) + ' evts']
          ];
          ch.sort((a, b) => D(a[0], 0, th) - D(b[0], 0, th));
          ch.forEach(([x, c, n, m]) => {
            l +=
              box(x, -31, z + 10, 62, 62, 14 + (on ? 4 : 0), c, c.map((v) => v * 0.45), 1, 'none', 1, '', th) +
              tag(x + 31, 0, z + 44, n, '#ffffff', 9.5, 700, th) +
              tag(x + 31, 0, z + 33, m, '#cfeee0', 8.5, 400, th);
          });
          if (ah) {
            const r = 14 + 6 * Math.sin(t / 140);
            l +=
              `<polygon points="${pt(
                [
                  [-1, -1],
                  [1, -1],
                  [1, 1],
                  [-1, 1]
                ].map((v) => P(110 + v[0] * r, -80 + v[1] * r, z + 10, th))
              )}" fill="rgba(251,191,36,.22)" stroke="#fbbf24" stroke-width="2"/>` +
              tag(110, -80, z + 38, 'ASKING HUMAN…', '#fbbf24', 9.5, 700, th);
          }
        }

        // Layer 3: Policy & IAM Gate (Command Filter & Block)
        if (k === 3) {
          const blk = hold;
          l += box(
            -s2,
            -s2,
            z,
            S[k],
            S[k],
            3,
            blk ? RED : VIO,
            blk ? RED : VIO,
            blk ? 0.26 : 0.16,
            on ? 'rgba(168,230,207,.95)' : blk ? 'rgba(251,113,133,.9)' : 'rgba(226,240,235,.85)',
            1.3,
            '7 5',
            th
          );
          const sx = -s2 + S[k] * ((t / 2600) % 1);
          l +=
            ln(sx, -s2, sx, s2, z + 3, 'rgba(240,250,246,.8)', 2, th) +
            tag(-60, 105, z + 10, 'SCOPED TOKENS · RBAC · PRE-DISPATCH', '#e4f3ec', 8.5, 700, th);
          if (hold) {
            const r = 20 + 8 * Math.sin(t / 120);
            const q = [
              [-1, -1],
              [1, -1],
              [1, 1],
              [-1, 1]
            ].map((v) => P(red.x + v[0] * r, red.y + v[1] * r, z + 3, th));
            l +=
              `<polygon points="${pt(q)}" fill="rgba(251,113,133,.25)" stroke="#fb7185" stroke-width="2"/>` +
              tag(red.x, red.y, z + 42, '✕ BLOCKED', '#fb7185', 10.5, 700, th);
          }
        }

        // Layer 4: Agent Fleet
        if (k === 4) {
          l += box(-s2, -s2, z, S[k], S[k], 3, [226, 232, 240], [226, 232, 240], 0.07, st, on ? 1.6 : 1, '4 5', th);
          const ag = [
            [-85, -50, 'Claude'],
            [-35, 70, 'Gemini'],
            [25, -80, 'GPT'],
            [60, 35, 'Llama'],
            [95, -15, 'Claude']
          ].sort((a, b) => D(a[0], a[1], th) - D(b[0], b[1], th));
          ag.forEach(([x, y, n]) => {
            const bad = n === 'Gemini' && t % 9000 < 3500;
            const zz = z + 14 + 5 * Math.sin(t / 700 + x);
            l +=
              cube(x, y, zz, 30, 26, bad ? RED : [226, 232, 240], bad ? RED.map((v) => v * 0.5) : [100, 116, 139]) +
              tag(x, y, zz + 38, bad ? 'Gemini ✕ → Claude' : n, bad ? '#fb7185' : '#cbd5e1', 9, 600, th);
          });
        }

        o += `<g data-i="${k}" style="cursor:pointer" opacity="${hl < 0 || on ? 1 : 0.45}">${l}</g>`;

        // Render traveling packets
        pk.filter((p) => bucket(p) === k)
          .sort((a, b) => D(a.x, a.y, th) - D(b.x, b.y, th))
          .forEach((p) => {
            o += cube(p.x, p.y, p.z, 13, 13, p.c, p.c.map((v) => v * 0.5));
          });

        // Layer anchor on the right
        let best = null;
        [
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, 1]
        ].forEach((v) => {
          const q = P(v[0] * s2, v[1] * s2, top(k), th);
          if (!best || q[0] > best[0]) best = q;
        });
        labels.push([k, best, on]);
      }

      // Connecting lines to right labels inside SVG
      labels.forEach(([k, b, on]) => {
        const y = b[1].toFixed(1);
        o += `<g data-i="${k}" style="cursor:pointer"><line x1="${(b[0] + 8).toFixed(1)}" y1="${y}" x2="630" y2="${y}" stroke="${
          on ? '#b5ecd4' : 'rgba(255,255,255,.24)'
        }" stroke-dasharray="3 4"/><circle cx="${b[0].toFixed(1)}" cy="${y}" r="3.5" fill="${
          on ? '#b5ecd4' : '#9fb3ac'
        }"/><text x="640" y="${(b[1] - 3).toFixed(1)}" fill="${
          on ? '#b5ecd4' : '#e8f1ee'
        }" font-size="11" font-weight="700" letter-spacing="0.8" font-family="'JetBrains Mono', monospace">${
          meta[k][0]
        }</text><text x="640" y="${(b[1] + 12).toFixed(1)}" fill="#8aa099" font-size="10" font-family="'JetBrains Mono', monospace">${
          meta[k][1]
        }</text></g>`;
      });

      // Left badges
      o += io(top(4), 'TASK IN', 'issue #402', '#93c5fd', 1, th);
      o += io(top(1), 'PR OUT', 'tests passed ✓', '#b5ecd4', 0, th);
      o += io(top(2), 'ASK A HUMAN', 'Slack · #eng', '#fbbf24', 0, th);

      // Top HUD indicator
      const hud = hold
        ? ['✕ BLOCKED  rm -rf /prod/db  ·  policy: destructive command', '#fb7185']
        : ah
        ? ['⏸ PAUSED  ·  asked #eng on Slack: enum or text column?', '#fbbf24']
        : ['✓ 4 tasks dispatched  ·  scoped tokens issued  ·  budget ok', '#b5ecd4'];

      o += `<text x="24" y="38" fill="${hud[1]}" font-size="12" font-weight="700" font-family="'JetBrains Mono', monospace">${hud[0]}</text>`;

      svg.innerHTML = o;
      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Listen to pointer movements on the SVG to detect layer hover
  const handleSvgPointerMove = (e) => {
    const target = e.target.closest('[data-i]');
    setHoveredLayer(target ? +target.dataset.i : -1);
  };

  const layersInfo = [
    {
      id: 4,
      name: '04 · AGENT FLEET',
      sub: 'Any model, hot-swappable',
      desc: 'Coding agents running on Claude 3.5, GPT-4o, Gemini 1.5 or local models. If a model hallucinates, the control layer hot-swaps it transparently.'
    },
    {
      id: 3,
      name: '03 · POLICY & IAM GATE',
      sub: 'Scoped secrets · RBAC · Pre-dispatch intercept',
      desc: 'Our Pre-Dispatch Policy Interceptor checks every tool invocation before execution. Destructive shell commands (rm -rf /prod/db) are halted in 0.6ms.'
    },
    {
      id: 2,
      name: '02 · CONTROL PLANE',
      sub: 'Router · Budget killswitch · Audit ledger',
      desc: 'Enforces hard per-session token/dollar budgets, orchestrates human approvals via Slack, and hashes every step into an immutable SOC2 audit trail.'
    },
    {
      id: 1,
      name: '01 · EPHEMERAL SANDBOXES',
      sub: 'One isolated microVM per task',
      desc: 'Repo in, verified pull request out. MicroVM boots in 58ms, runs the test suite, emits the patch, and is completely destroyed. Zero lingering state.'
    },
    {
      id: 0,
      name: '00 · YOUR CLOUD · VPC',
      sub: 'AWS · Azure · GCP · on-prem',
      desc: 'Runs inside your virtual private cloud. Sovereign by default: your proprietary code, customer records, and training data never leave your network.'
    }
  ];

  return (
    <div className="w-full my-8">
      
      {/* SECTION WRAPPER: Split Sticky Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
        
        {/* =========================================================================
            LEFT COLUMN: STICKY 3D DIAGRAM (Pins to viewport as user scrolls right side)
        ========================================================================= */}
        <div className="lg:col-span-7 lg:sticky lg:top-24 z-20">
          
          <div
            ref={stageRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="card relative rounded-2xl border border-white/[0.1] bg-[#070b09] p-3 sm:p-5 shadow-2xl overflow-hidden"
          >
            {/* Ambient radial glow */}
            <div className="absolute inset-0 bg-radial-gradient from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

            {/* SVG 3D Canvas */}
            <svg
              ref={svgRef}
              viewBox="0 0 820 680"
              role="img"
              aria-label="Isometric diagram of Helm control plane"
              onPointerMove={handleSvgPointerMove}
              className="w-full h-auto select-none touch-pan-y"
            />

            {/* Bottom Controls Bar: Explode Slider + Legend hint */}
            <div className="bar mt-3 pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-slate-300 font-semibold">Explode 3D:</span>
                <input
                  type="range"
                  min="55"
                  max="115"
                  value={explodeGap}
                  onChange={(e) => setExplodeGap(+e.target.value)}
                  className="accent-[#a8e6cf] w-28 cursor-pointer"
                />
              </label>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="flex items-center gap-1 text-[#a8e6cf]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a8e6cf]"></span> Green: Allowed
                </span>
                <span className="flex items-center gap-1 text-[#fb7185]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fb7185]"></span> Red: Blocked
                </span>
              </div>
            </div>

          </div>

          <p className="text-[11px] font-mono text-slate-500 mt-2 text-center hidden lg:block">
            Diagram remains pinned while you scroll through architecture specifications ↓
          </p>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: SCROLLABLE LEGENDS, E2B SPECS, LIFECYCLE & BUDGETS
        ========================================================================= */}
        <div className="lg:col-span-5 space-y-6">

          {/* 1. LAYER INSPECTION CARDS (Hovering highlights corresponding 3D layer) */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#a8e6cf] font-bold">
              [ 01 · CONTROL PLANE ARCHITECTURE ]
            </div>
            
            {layersInfo.map((l) => (
              <div
                key={l.id}
                onMouseEnter={() => setHoveredLayer(l.id)}
                onMouseLeave={() => setHoveredLayer(-1)}
                className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                  hoveredLayer === l.id
                    ? 'bg-[#131d18] border-[#a8e6cf] shadow-md shadow-[#a8e6cf]/15 scale-[1.01]'
                    : 'bg-[#0a0d0c] border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-white tracking-wide">
                    {l.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#a8e6cf]">
                    Layer {l.id}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 mb-1.5">
                  {l.sub}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {l.desc}
                </p>
              </div>
            ))}
          </div>

          {/* 2. [ THROUGH THE BOUNDARY ] (Directly matching E2B reference screenshot) */}
          <div className="p-5 rounded-2xl bg-[#090d0b] border border-[#285A48] shadow-xl space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#a8e6cf] font-bold">
              [ THROUGH THE BOUNDARY ]
            </div>

            <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug">
              Any model, any tool, your data, your keys.
            </h3>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              The sandbox reaches out under your egress policy, never around it. 
              Zero raw credentials touch the agent context.
            </p>

            <div className="divide-y divide-white/[0.08] text-xs font-mono pt-1">
              <div className="py-2.5 flex items-start justify-between gap-4">
                <span className="text-white font-bold shrink-0">Model calls</span>
                <span className="text-slate-400 text-right">Anthropic · OpenAI · Gemini · open weights</span>
              </div>
              <div className="py-2.5 flex items-start justify-between gap-4">
                <span className="text-white font-bold shrink-0">MCP tools</span>
                <span className="text-slate-400 text-right">200+ servers, called from inside sandbox</span>
              </div>
              <div className="py-2.5 flex items-start justify-between gap-4">
                <span className="text-white font-bold shrink-0">Your data</span>
                <span className="text-slate-400 text-right">buckets · repos · private internal APIs</span>
              </div>
              <div className="py-2.5 flex items-start justify-between gap-4">
                <span className="text-[#a8e6cf] font-bold shrink-0">Secrets vault</span>
                <span className="text-slate-300 text-right">Dynamic egress injection (never leaked)</span>
              </div>
            </div>
          </div>

          {/* 3. LIFECYCLE STEPS: TASK IN -> ROUTE -> GATE -> PR OUT */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#a8e6cf] font-bold">
              [ 02 · EXECUTION LIFECYCLE FLOW ]
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              <div className="step bg-[#0a0d0c] border border-white/[0.08] rounded-xl p-3.5 hover:border-[#a8e6cf]/40 transition-colors">
                <span className="n text-xs font-mono font-bold text-[#8fd9bb] block mb-1">
                  01 · TASK IN
                </span>
                <b className="text-xs font-bold text-white block mb-1">A task arrives</b>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  An issue like #402 arrives via webhook from GitHub, Jira, Linear or Slack.
                </p>
              </div>

              <div className="step bg-[#0a0d0c] border border-white/[0.08] rounded-xl p-3.5 hover:border-[#a8e6cf]/40 transition-colors">
                <span className="n text-xs font-mono font-bold text-[#8fd9bb] block mb-1">
                  02 · ROUTE
                </span>
                <b className="text-xs font-bold text-white block mb-1">Right agent, right model</b>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  The control plane picks an agent and automatically hot-swaps models if one fails.
                </p>
              </div>

              <div className="step bg-[#0a0d0c] border border-white/[0.08] rounded-xl p-3.5 hover:border-[#a8e6cf]/40 transition-colors">
                <span className="n text-xs font-mono font-bold text-[#8fd9bb] block mb-1">
                  03 · GATE
                </span>
                <b className="text-xs font-bold text-white block mb-1">The gate checks everything</b>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Scoped, short-lived tokens only. Destructive actions are blocked pre-execution.
                </p>
              </div>

              <div className="step bg-[#0a0d0c] border border-white/[0.08] rounded-xl p-3.5 hover:border-[#a8e6cf]/40 transition-colors">
                <span className="n text-xs font-mono font-bold text-[#8fd9bb] block mb-1">
                  04 · PR OUT
                </span>
                <b className="text-xs font-bold text-white block mb-1">Sandbox, then verified PR</b>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Work runs in a throwaway microVM. Tests pass, PR is opened, sandbox destroyed.
                </p>
              </div>

            </div>
          </div>

          {/* 4. BUDGET & CIRCUIT BREAKER SECTION */}
          <section className="budget bg-[#0a0d0c] border border-white/[0.1] rounded-2xl p-5 shadow-xl space-y-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#a8e6cf] font-bold mb-1">
                [ 03 · FINANCIAL SAFEGUARDS ]
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">Never a surprise bill</h2>
              <p className="text-xs text-slate-400">Hard ceilings enforced per task, developer, and repository.</p>
            </div>

            {/* Progress Bars */}
            <div className="space-y-3 font-mono text-xs">
              
              <div className="brow">
                <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                  <span>Per task · issue #402</span>
                  <span className="text-[#a8e6cf] font-bold">$0.84 / $2.00</span>
                </div>
                <div className="track h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="fill h-full bg-gradient-to-r from-[#a8e6cf] to-[#7dd3c0] rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              <div className="brow">
                <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                  <span>Per developer · this month</span>
                  <span className="text-[#a8e6cf] font-bold">$61 / $120</span>
                </div>
                <div className="track h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="fill h-full bg-gradient-to-r from-[#a8e6cf] to-[#7dd3c0] rounded-full" style={{ width: '51%' }}></div>
                </div>
              </div>

              <div className="brow">
                <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                  <span>Per repo · web-app</span>
                  <span className="text-[#a8e6cf] font-bold">$142 / $500</span>
                </div>
                <div className="track h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="fill h-full bg-gradient-to-r from-[#a8e6cf] to-[#7dd3c0] rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>

            </div>

            {/* Mini Stats Tiles */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="tile bg-[#060807] border border-white/[0.08] rounded-xl p-3">
                <b className="text-xl font-bold text-white block">45</b>
                <span className="text-[11px] text-slate-400">verified PRs this month</span>
              </div>
              <div className="tile bg-[#060807] border border-white/[0.08] rounded-xl p-3">
                <b className="text-xl font-bold text-[#a8e6cf] block">$3.16</b>
                <span className="text-[11px] text-slate-400">average cost per PR</span>
              </div>
            </div>

            {/* Circuit Breaker Pill */}
            <div className="breaker border border-dashed border-[#fbbf24]/50 bg-[#fbbf24]/[0.06] rounded-xl p-3 text-xs text-amber-200 leading-snug">
              <strong className="text-[#fbbf24]">⚡ Circuit breaker:</strong> Same tool error encountered three times; agent execution halted automatically. Approx. $38 saved this week.
            </div>
          </section>

        </div>

      </div>

    </div>
  );
}
