import React, { useEffect, useRef } from 'react';

const LOGS = [
  'tool.call ok',
  'sbx_3e8 boot 64ms',
  'approval granted',
  'policy.allow github.pr',
  'llm.call 1.1s',
  'secret.inject ok',
  'trace.flush 214 spans',
  'budget 82%',
  'egress deny 0.0.0.0/0',
  'snapshot saved',
  'fork x12 ready',
  'agent.done exit 0'
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
          <span className="ey">Get started</span>
          <h2>Give every agent a machine.</h2>
          <p className="ld" style={{ margin: '0 auto' }}>
            Free to start. SOC 2 and GDPR ready. No credit card.
          </p>
          <div className="cta">
            <a className="btn p" href="#">Start building →</a>
            <a className="btn" href="#">Talk to an engineer</a>
          </div>
        </div>
      </div>
    </section>
  );
}

