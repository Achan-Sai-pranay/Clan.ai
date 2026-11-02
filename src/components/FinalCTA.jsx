import React, { useEffect, useRef } from 'react';

const LOGS = [
  'sandbox boot <3s',
  'pre-dispatch: rm -rf blocked',
  'scoped secret proxy injected',
  'token budget ok ($0.84 / $2.00)',
  'hot-swap fallback -> Claude 3.5',
  'human approval: slack #eng-leads',
  'sister sandbox test pass',
  'soc2 audit hash signed',
  'unapproved egress blocked',
  'agent.emit clean PR #402',
  'sandbox auto-destroyed',
  'zero state leaked'
];

export default function FinalCTA() {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let columns = [];
    let animationId;

    const resize = () => {
      const r = host.getBoundingClientRect();
      const d = Math.min(window.devicePixelRatio || 1, 2);
      width = r.width;
      height = r.height;
      canvas.width = r.width * d;
      canvas.height = r.height * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);

      const n = Math.max(2, Math.floor(width / 200));
      columns = Array.from({ length: n }, (_, i) => ({
        x: i * (width / n) + 12,
        y: Math.random() * 400,
        v: 0.25 + Math.random() * 0.45,
        o: i * 3
      }));
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

      ctx.font = '11px JetBrains Mono, monospace';
      const H = Math.ceil((height + 20) / 18) * 18;

      for (const c of columns) {
        c.y += c.v;
        for (let k = 0; k * 18 < H + 18; k++) {
          const ty = (((k * 18 - c.y) % H) + H) % H;
          ctx.fillStyle = `rgba(${col}, ${Math.max(0.04, 0.05 + 0.16 * (1 - ty / height))})`;
          ctx.fillText(LOGS[(k + c.o) % LOGS.length], c.x, ty);
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
    <section>
      <div className="w rv">
        <div className="fin" ref={hostRef}>
          <canvas
            ref={canvasRef}
            className="fx"
            style={{
              maskImage: 'radial-gradient(ellipse at center, transparent 18%, #000 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 18%, #000 80%)'
            }}
          />
          <span className="ey">Deploy the Control Plane</span>
          <h2>Models and agents are disposable. Your control layer is permanent.</h2>
          <p className="ld" style={{ margin: '0 auto' }}>
            Available for on-premise private VPC, sovereign regions, and enterprise air-gapped clusters. SOC 2 and ISO compliance ready.
          </p>
          <div className="cta">
            <a className="btn p" href="#">Book Technical Demo →</a>
            <a className="btn" href="#arch">Explore Architecture</a>
          </div>
        </div>
      </div>
    </section>
  );
}

