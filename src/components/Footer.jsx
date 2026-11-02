import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="w">
        <div className="fg">
          <div>
            <a className="logo" href="#">
              <i></i>Clan
            </a>
            <p style={{ marginTop: '12px', maxWidth: '240px' }}>
              The enterprise control plane and governance operating system for autonomous AI agents.
            </p>
          </div>
          <div>
            <h4>Platform</h4>
            <ul>
              <li><a href="#arch">Control Plane</a></li>
              <li><a href="#machine">Ephemeral Sandboxes</a></li>
              <li><a href="#machine">Agent IAM & Proxy</a></li>
              <li><a href="#machine">Token Governance</a></li>
            </ul>
          </div>
          <div>
            <h4>Differentiators</h4>
            <ul>
              <li><a href="#differentiators">Sovereign & On-Prem</a></li>
              <li><a href="#differentiators">Sister Test Gates</a></li>
              <li><a href="#differentiators">Human-in-the-Loop</a></li>
              <li><a href="#machine">Internal Agent Hub</a></li>
            </ul>
          </div>
          <div>
            <h4>Developers</h4>
            <ul>
              <li><a href="#dev">SDKs (Python/TS/Go)</a></li>
              <li><a href="#">CLI Documentation</a></li>
              <li><a href="#">Security & Audit Logs</a></li>
            </ul>
          </div>
          <div>
            <h4>Trust & Security</h4>
            <ul>
              <li><a href="#">SOC 2 Compliance</a></li>
              <li><a href="#">Air-Gapped Deployment</a></li>
              <li><a href="#">Least-Privilege RBAC</a></li>
            </ul>
          </div>
        </div>
        <p style={{ marginTop: '36px' }} className="m">
          © {new Date().getFullYear()} Clan, Inc.
        </p>
      </div>
    </footer>
  );
}
