import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="w">
        <div className="fg">
          <div>
            <a className="logo" href="#">
              <i></i>Helm
            </a>
            <p style={{ marginTop: '12px', maxWidth: '240px' }}>
              The runtime and control plane for AI agents.
            </p>
          </div>
          <div>
            <h4>Product</h4>
            <ul>
              <li><a href="#">Runtime</a></li>
              <li><a href="#">Governance</a></li>
              <li><a href="#">Observability</a></li>
            </ul>
          </div>
          <div>
            <h4>Developers</h4>
            <ul>
              <li><a href="#">Docs</a></li>
              <li><a href="#">SDKs</a></li>
              <li><a href="#">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Trust</h4>
            <ul>
              <li><a href="#">Security</a></li>
              <li><a href="#">Status</a></li>
              <li><a href="#">Trust center</a></li>
            </ul>
          </div>
        </div>
        <p style={{ marginTop: '36px' }} className="m">
          © {new Date().getFullYear()} Helm, Inc.
        </p>
      </div>
    </footer>
  );
}
