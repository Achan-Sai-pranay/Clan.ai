import React, { useEffect, useRef } from 'react';

const INTEGRATIONS = [
  'OpenAI',
  'Anthropic',
  'Gemini',
  'LangGraph',
  'CrewAI',
  'Mastra',
  'GitHub',
  'Slack',
  'Jira',
  'Postgres',
  'AWS',
  'GCP',
  'Azure'
];

export default function StatsIntegrations() {
  const statsRef = useRef(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    let animated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || animated) return;
          animated = true;
          observer.unobserve(entry.target);

          const counters = entry.target.querySelectorAll('[data-n]');
          counters.forEach((c) => {
            const targetNum = parseFloat(c.getAttribute('data-n'));
            const suffix = c.getAttribute('data-s') || '';
            let t = 0;

            const updateCount = () => {
              t += 0.035;
              const v = targetNum * (1 - Math.pow(1 - Math.min(t, 1), 3));
              c.textContent = (targetNum % 1 ? v.toFixed(2) : Math.round(v)) + suffix;
              if (t < 1) requestAnimationFrame(updateCount);
            };
            requestAnimationFrame(updateCount);
          });
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="alt">
      <div className="w rv" ref={statsRef}>
        <div className="stats">
          <div>
            <b data-n="64" data-s="ms">64ms</b>
            <span>Median sandbox boot</span>
          </div>
          <div>
            <b data-n="100" data-s="%">100%</b>
            <span>Actions audited</span>
          </div>
          <div>
            <b data-n="200" data-s="+">200+</b>
            <span>Tools via MCP</span>
          </div>
          <div>
            <b data-n="99.99" data-s="%">99.99%</b>
            <span>Uptime SLA</span>
          </div>
        </div>

        <div className="integ">
          {INTEGRATIONS.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
