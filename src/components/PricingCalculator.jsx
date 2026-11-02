import React, { useState } from 'react';

export default function PricingCalculator() {
  const [concurrent, setConcurrent] = useState(50);
  const [hours, setHours] = useState(8);
  const [vcpu, setVcpu] = useState(2);

  const estimateMonthly = Math.round(concurrent * hours * 30 * vcpu * 0.05);

  return (
    <section id="pricing">
      <div className="w rv">
        <span className="ey">Pricing</span>
        <h2>Billed by the second. Estimate yours.</h2>
        <p className="ld">Illustrative rates for layout purposes — replace with your real pricing.</p>

        <div className="calc">
          {/* Sliders Card */}
          <div className="card">
            <div className="sl">
              <label>
                Concurrent sandboxes <b id="v1">{concurrent}</b>
              </label>
              <input
                type="range"
                id="r1"
                min="1"
                max="500"
                value={concurrent}
                onChange={(e) => setConcurrent(Number(e.target.value))}
              />
            </div>

            <div className="sl">
              <label>
                Hours active per day <b id="v2">{hours}</b>
              </label>
              <input
                type="range"
                id="r2"
                min="1"
                max="24"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
              />
            </div>

            <div className="sl" style={{ margin: 0 }}>
              <label>
                vCPU per sandbox <b id="v3">{vcpu}</b>
              </label>
              <input
                type="range"
                id="r3"
                min="1"
                max="8"
                value={vcpu}
                onChange={(e) => setVcpu(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Estimate Card */}
          <div className="card est">
            <small className="m">ESTIMATED / MONTH</small>
            <b id="est">${estimateMonthly.toLocaleString()}</b>
            <small>Free tier includes credits and 20 concurrent sandboxes.</small>
            <div className="cta" style={{ marginTop: '20px' }}>
              <a className="btn p" href="#">Start free</a>
              <a className="btn" href="#">Talk to sales</a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

