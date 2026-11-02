import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const isLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialTheme = document.documentElement.dataset.theme || (isLight ? 'light' : 'dark');
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  };

  return (
    <>
      <div className="bar">
        <b>Sovereign & On-Premises</b> · Private VPC deployment for global & regional enterprises is generally available →
      </div>
      <nav>
        <div className="w">
          <a className="logo" href="#">
            <i></i>Clan
          </a>
          <ul>
            <li><a href="#arch">Architecture</a></li>
            <li><a href="#machine">Platform Features</a></li>
            <li><a href="#differentiators">Differentiators</a></li>
            <li><a href="#dev">Developers</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>
          <button 
            className="btn ic" 
            id="th" 
            aria-label="Toggle theme" 
            onClick={toggleTheme}
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 1.8a6.2 6.2 0 0 1 0 12.4z" fill="currentColor" />
            </svg>
          </button>
          <a className="btn" href="#">Sign in</a>
          <a className="btn p" href="#">Start free</a>
        </div>
      </nav>
    </>
  );
}
