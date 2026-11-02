import React, { useEffect, useRef } from 'react';

const INTEGRATIONS = [
  'OpenAI',
  'Anthropic',
  'Google Gemini',
  'vLLM / Ollama',
  'LangGraph',
  'CrewAI',
  'GitHub',
  'GitLab',
  'Slack',
  'Microsoft Teams',
  'Jira',
  'Linear',
  'AWS Private VPC',
  'Azure Sovereign',
  'GCP India / Global'
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
            <b data-n="3" data-s="s">&lt;3s</b>
            <span>Sandbox spin-up time</span>
          </div>
          <div>
            <b data-n="100" data-s="%">100%</b>
            <span>Prompts, diffs & tools audited</span>
          </div>
          <div>
            <b data-n="0" data-s="">0</b>
            <span>Master credentials exposed</span>
          </div>
          <div>
            <b data-n="99.99" data-s="%">99.99%</b>
            <span>Enterprise SLA (SOC 2 ready)</span>
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

