import React, { useEffect, useRef } from 'react';

export default function Architecture() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const host = wrapRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const x = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let P = [];
    let gx = [0, 0];
    let F = [];
    let K = [];
    let animationId;

    const resize = () => {
      const r = host.getBoundingClientRect();
      const d = Math.min(window.devicePixelRatio || 1, 2);
      width = r.width;
      height = r.height;
      canvas.width = r.width * d;
      canvas.height = r.height * d;
      x.setTransform(d, 0, 0, d, 0, 0);

      const R = Math.max(5, Math.round(height / 85));
      P = [];
      gx = [width * 0.303, width * 0.697];
      F = [];

      for (let rIdx = 0; rIdx < R; rIdx++) {
        const y = 26 + (rIdx * (height - 52)) / (R - 1);
        const jx = width * (0.12 + Math.random() * 0.76);
        const y2 = y + (Math.random() < 0.5 ? -1 : 1) * (14 + Math.random() * 20);
        const pts = [[0, y], [jx, y], [jx, y2], [width, y2]];
        const cum = [0];
        for (let i = 1; i < 4; i++) {
          cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
        }
        P.push({ pts, cum, L: cum[3] });
      }

      K = Array.from({ length: R * 2 }, (_, i) => ({
        r: i % R,
        s: Math.random() * P[i % R].L,
        v: 0.9 + Math.random() * 1.2,
        p: 0,
        st: 0,
        g: 0,
        a: 1
      }));
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const at = (path, s) => {
      let i = 1;
      while (i < 3 && s > path.cum[i]) i++;
      const f = (s - path.cum[i - 1]) / (path.cum[i] - path.cum[i - 1] || 1);
      const a = path.pts[i - 1];
      const b = path.pts[i];
      return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
    };

    const draw = () => {
      x.clearRect(0, 0, width, height);

      let col = '176,228,204';
      let okc = '92,199,156';
      try {
        const csStyle = getComputedStyle(document.documentElement);
        const hex = csStyle.getPropertyValue('--a').trim();
        const n = parseInt(hex.replace('#', ''), 16);
        if (!isNaN(n)) col = [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(',');
        const okh = csStyle.getPropertyValue('--ok').trim();
        const on = parseInt(okh.replace('#', ''), 16);
        if (!isNaN(on)) okc = [(on >> 16) & 255, (on >> 8) & 255, on & 255].join(',');
      } catch (e) {}

      x.lineWidth = 1;

      for (const pItem of P) {
        x.strokeStyle = `rgba(${col},.13)`;
        x.beginPath();
        x.moveTo(pItem.pts[0][0], pItem.pts[0][1]);
        for (let i = 1; i < 4; i++) {
          x.lineTo(pItem.pts[i][0], pItem.pts[i][1]);
        }
        x.stroke();

        for (const g of gx) {
          const y = g < pItem.pts[1][0] ? pItem.pts[0][1] : pItem.pts[3][1];
          x.strokeStyle = `rgba(${col},.4)`;
          x.strokeRect(g - 4, y - 8, 8, 16);
        }
      }

      for (const k of K) {
        const pItem = P[k.r];
        if (!pItem) continue;

        if (k.st === 1) {
          if (--k.p <= 0) {
            const y = at(pItem, k.s)[1];
            if (Math.random() < 0.78) {
              F.push({ x: gx[k.g], y, ok: 1, t: 40 });
              k.st = 0;
              k.g++;
            } else {
              F.push({ x: gx[k.g], y, ok: 0, t: 40 });
              k.st = 2;
            }
          }
        } else if (k.st === 2) {
          k.a -= 0.03;
          if (k.a <= 0) {
            k.s = 0;
            k.g = 0;
            k.st = 0;
            k.a = 1;
          }
        } else {
          k.s += k.v;
          const q = at(pItem, k.s);
          if (k.g < 2 && q[0] >= gx[k.g]) {
            k.st = 1;
            k.p = 40;
          }
          if (k.s >= pItem.L) {
            k.s = 0;
            k.g = 0;
          }
        }

        const c = k.st === 1 ? '242,184,75' : k.st === 2 ? '255,99,112' : col;
        for (let t = 0; t < 5; t++) {
          const z = at(pItem, Math.max(0, k.s - t * 7));
          x.fillStyle = `rgba(${c},${k.a * (0.9 - t * 0.17)})`;
          x.fillRect(z[0] - 3, z[1] - 1.5, 6, 3);
        }
      }

      x.font = '12px JetBrains Mono, monospace';
      F = F.filter((f) => --f.t > 0);
      for (const f of F) {
        x.fillStyle = f.ok ? `rgba(${okc},${f.t / 40})` : `rgba(255,99,112,${f.t / 40})`;
        x.fillText(f.ok ? '✓' : '✕', f.x - 4, f.y - 12);
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
    <section id="arch">
      <div className="w rv">
        <span className="ey">Where Helm fits</span>
        <h2>Your agent is the product. Helm is the boundary.</h2>
        <p className="ld">
          Bring any model, framework or harness. Helm runs the machine underneath and enforces policy on everything that crosses it.
        </p>

        <div className="archwrap" id="archwrap" ref={wrapRef}>
          <canvas
            ref={canvasRef}
            className="fx"
            style={{
              maskImage: 'linear-gradient(transparent, #000 15%, #000 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(transparent, #000 15%, #000 85%, transparent)'
            }}
          />

          <div className="arch">
            {/* Column 01: Your agents */}
            <div className="col">
              <h4>01 · Your agents</h4>
              <div className="bx">Coding agents<span>any harness</span></div>
              <div className="bx">Support &amp; ops<span>LangGraph</span></div>
              <div className="bx">Data &amp; evals<span>custom</span></div>
            </div>

            <div className="ar"><i>→</i></div>

            {/* Column 02: Helm Control Plane */}
            <div className="col core">
              <h4>02 · Helm control plane</h4>
              <div className="bx">Sandbox runtime<span>microVM</span></div>
              <div className="bx">Policy &amp; approvals<span>enforced</span></div>
              <div className="bx">Secrets vault<span>never exposed</span></div>
              <div className="bx">Traces &amp; spend<span>real time</span></div>
            </div>

            <div className="ar"><i>→</i></div>

            {/* Column 03: Your stack */}
            <div className="col">
              <h4>03 · Your stack</h4>
              <div className="bx">Models<span>any vendor</span></div>
              <div className="bx">Tools · MCP<span>200+</span></div>
              <div className="bx">Data &amp; repos<span>your VPC</span></div>
            </div>
          </div>

          <div className="base m">
            <span><b>Helm Cloud</b> · US · EU · APAC</span>
            <span><b>Your cloud</b> · AWS · GCP · Azure</span>
            <span><b>Self-hosted</b> · one node</span>
          </div>
        </div>

      </div>
    </section>
  );
}
