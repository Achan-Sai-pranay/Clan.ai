import React from 'react';

export default function Differentiators() {
  return (
    <section className="alt">
      <div className="w rv">
        <span className="ey">Your differentiators</span>
        <h2>What Helm does that the others don’t.</h2>

        <div className="grid g3">
          {/* Differentiator 1 */}
          <div className="card">
            <h3>Autonomous Time-Travel State Repair</h3>
            <p>
              When an agent hallucinates mid-workflow, our two-phase compensating ledger safely rewinds database mutations, cloud assets, and API writes back to Step 0 with zero corrupted state.
            </p>
          </div>

          {/* Differentiator 2 */}
          <div className="card">
            <h3>Cross-Agent Adversarial Consensus Mesh</h3>
            <p>
              High-privilege tool invocations (DDL writes, payment dispatch, IAM edits) require a zero-latency shadow quorum across heterogeneous models before cryptographic execution tokens are signed.
            </p>
          </div>

          {/* Differentiator 3 */}
          <div className="card">
            <h3>Sub-Millisecond Pre-Dispatch Interception</h3>
            <p>
              Unlike traditional logging platforms that audit actions after the disaster has already happened, Helm halts unauthorized tool calls in 0.8ms pre-execution with strict unit-economic budget killswitches.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

