import React from 'react';
import E2BArchitectureVisual from './E2BArchitectureVisual';

export default function Architecture() {
  return (
    <section id="arch" className="relative py-20 border-t border-white/[0.08] overflow-visible">
      <div className="w">
        <div className="max-w-3xl mb-8">
          <span className="ey">Control Plane Architecture</span>
          <h2>The permanent governance layer between your code and AI agents.</h2>
          <p className="ld">
            Companies cannot safely run autonomous agents in production without security guardrails, cost controls, and audit trails. 
            Our platform sits between your systems and agent models—isolating code execution in ephemeral microVMs, enforcing least-privilege IAM, and hot-swapping failing models transparently.
          </p>
        </div>

        {/* 3D Sticky Left + Scrollable Right Specs Layout */}
        <E2BArchitectureVisual />

      </div>
    </section>
  );
}
