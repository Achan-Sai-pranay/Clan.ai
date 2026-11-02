import React from 'react';
import E2BArchitectureVisual from './E2BArchitectureVisual';

export default function Architecture() {
  return (
    <section id="arch" className="relative py-20 border-t border-white/[0.08] overflow-visible">
      <div className="w">
        <div className="max-w-3xl mb-8">
          <span className="ey">Where Helm fits</span>
          <h2>Every agent governed. You get the controls.</h2>
          <p className="ld">
            Companies can’t trust AI agents in production: no guardrails, surprise bills, no audit trail. 
            Helm sits between your agents and your systems, and every task flows top to bottom through it.
          </p>
        </div>

        {/* 3D Sticky Left + Scrollable Right Specs Layout */}
        <E2BArchitectureVisual />

      </div>
    </section>
  );
}
