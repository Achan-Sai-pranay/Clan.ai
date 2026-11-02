import React, { useEffect, useRef } from 'react';

export default function BackgroundEffects() {
  const pgRef = useRef(null);
  const treeCanvasRef = useRef(null);

  useEffect(() => {
    // 1. Mouse move spotlight
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 2. Scroll progress indicator
    const handleScroll = () => {
      const h = document.documentElement;
      const progress = (window.scrollY / (h.scrollHeight - window.innerHeight || 1)) * 100;
      if (pgRef.current) {
        pgRef.current.style.width = `${progress}%`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. Margin Fork-Tree commit graph animation
    const canvas = treeCanvasRef.current;
    if (!canvas) return;

    const tx = canvas.getContext('2d');
    const TW = 72;
    let BR = [];
    let animationFrameId;

    const trInit = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      const Hh = document.documentElement.scrollHeight;
      canvas.width = TW * d;
      canvas.height = window.innerHeight * d;
      canvas.style.width = TW + 'px';
      canvas.style.height = window.innerHeight + 'px';
      tx.setTransform(d, 0, 0, d, 0, 0);
      canvas.style.display = window.innerWidth >= 1300 ? 'block' : 'none';

      BR = [];
      let y = 300, n = 0;
      while (y < Hh - 400) {
        const len = 380 + Math.random() * 420;
        BR.push({ s: y, e: y + len, l: 1 + (n++ % 3), m: Math.random() < 0.7 });
        y += len * 0.55 + 120;
      }
    };

    const tree = () => {
      if (canvas.style.display === 'none') return;
      const sy = window.scrollY;
      const H = window.innerHeight;
      const head = H * 0.45;
      const X = 18;
      tx.clearRect(0, 0, TW, H);

      let col = '176,228,204';
      try {
        const cs = getComputedStyle(document.documentElement);
        const hex = cs.getPropertyValue('--a').trim();
        const n = parseInt(hex.replace('#', ''), 16);
        if (!isNaN(n)) {
          col = [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(',');
        }
      } catch (e) {}

      const paint = (al) => {
        tx.strokeStyle = tx.fillStyle = `rgba(${col},${al})`;
        tx.lineWidth = 1.2;
        tx.beginPath();
        tx.moveTo(X, 0);
        tx.lineTo(X, H);
        tx.stroke();

        for (let cy = (((140 - sy) % 170) + 170) % 170; cy < H; cy += 170) {
          tx.beginPath();
          tx.arc(X, cy, 3, 0, 7);
          tx.fill();
        }

        for (const b of BR) {
          const ys = b.s - sy;
          const ye = b.e - sy;
          if (ye < -40 || ys > H + 40) continue;
          const lx = X + b.l * 14;

          tx.beginPath();
          tx.moveTo(X, ys);
          tx.bezierCurveTo(X, ys + 18, lx, ys + 8, lx, ys + 26);
          tx.lineTo(lx, ye - 26);
          if (b.m) tx.bezierCurveTo(lx, ye - 8, X, ye - 18, X, ye);
          tx.stroke();

          tx.beginPath();
          tx.arc(lx, b.m ? ye : ye - 26, 2.5, 0, 7);
          b.m ? tx.fill() : tx.stroke();
        }
      };

      paint(0.13);
      tx.save();
      tx.beginPath();
      tx.rect(0, 0, TW, head);
      tx.clip();
      paint(0.65);
      tx.restore();

      tx.strokeStyle = `rgba(${col},.9)`;
      tx.beginPath();
      tx.arc(X, head, 5, 0, 7);
      tx.stroke();
      tx.font = '8px JetBrains Mono, monospace';
      tx.fillStyle = `rgba(${col},.8)`;
      tx.fillText('HEAD', X + 9, head + 3);
    };

    trInit();
    const ro = new ResizeObserver(trInit);
    ro.observe(document.body);
    window.addEventListener('resize', trInit);

    const loop = () => {
      tree();
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', trInit);
      ro.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div id="spot"></div>
      <div id="pg" ref={pgRef}></div>
      <canvas
        ref={treeCanvasRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          zIndex: 0,
          display: 'none',
        }}
      />
    </>
  );
}
