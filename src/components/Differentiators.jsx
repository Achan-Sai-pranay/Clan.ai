import React from 'react';

export default function Differentiators() {
  return (
    <section id="differentiators" className="alt">
      <div className="w rv">
        <span className="ey">Strategic Differentiators</span>
        <h2>Why Enterprises Choose Our Control Plane Over Fragile Coding Bots</h2>

        <div className="grid g3">
          {/* Differentiator 1 */}
          <div className="card">
            <div className="text-xs font-mono text-[#a8e6cf] mb-2 font-bold">[ 01 · SOVEREIGN DEPLOYMENT ]</div>
            <h3>Self-Hosted & Sovereign Cloud</h3>
            <p>
              Global and regional enterprises (banks, insurance, defense, GCCs) cannot send proprietary code to foreign third-party clouds. We offer On-Premise and Private VPC deployments running on local AWS/Azure/GCP regions or fully air-gapped servers with open-source models.
            </p>
          </div>

          {/* Differentiator 2 */}
          <div className="card">
            <div className="text-xs font-mono text-[#a8e6cf] mb-2 font-bold">[ 02 · NATIVE VERIFICATION ]</div>
            <h3>Automated CI/CD Native Verification</h3>
            <p>
              Instead of dumping unverified code on engineers, our platform executes your existing test suite inside an isolated sister sandbox—automatically generating video and log proofs that all unit, lint, and regression tests passed before human review.
            </p>
          </div>

          {/* Differentiator 3 */}
          <div className="card">
            <div className="text-xs font-mono text-[#a8e6cf] mb-2 font-bold">[ 03 · HUMAN-IN-THE-LOOP ]</div>
            <h3>Human-in-the-Loop Escalation</h3>
            <p>
              When an agent encounters ambiguous architectural choices (e.g., PostgreSQL enum vs text column), rather than hallucinating or failing, it pauses sandbox execution and pings the engineering lead via Slack or Microsoft Teams. Execution resumes only upon response.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

