import React, { useState, useEffect, useRef } from 'react';

/**
 * Exact 3D Isometric Exploded Architectural Visual inspired by E2B (e2b.dev)
 * Features:
 * 1. Top floating Sandbox Matrix (4x8 grid of 32 beveled keycaps with live blinking LEDs)
 * 2. Middle vivid Core Engine Slab with E2B stencil, Lifecycle, Network, Storage, Observability & physical ruler ticks
 * 3. Bottom Cloud Substrate with E2B Cloud & Your Cloud checkered pixel plates
 * 4. Three 3D satellite peripheral chips (SECRETS IN, MCP TOOLS OUT, MODEL CALLS OUT) with orbital dashed lines
 * 5. Interactive 3D mouse parallax tilt effect
 */
export default function E2BArchitectureVisual() {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeLedIndices, setActiveLedIndices] = useState([4, 11, 18, 23, 27, 30]);
  const [activeSection, setActiveSection] = useState(null);
  const [accentColor, setAccentColor] = useState('orange'); // 'orange' (exact e2b) | 'emerald' (helm)

  // Subtle 3D mouse tilt parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * 14, // tilt X based on vertical mouse
      y: x * 18   // tilt Y based on horizontal mouse
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Periodically toggle random LEDs like real sandboxes booting & terminating
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLedIndices((prev) => {
        const next = [...prev];
        const randomKey = Math.floor(Math.random() * 32);
        if (next.includes(randomKey)) {
          return next.filter((k) => k !== randomKey);
        } else {
          return next.length < 8 ? [...next, randomKey] : next.slice(1).concat(randomKey);
        }
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Theme palettes: Exact E2B fiery orange vs Helm emerald
  const isOrange = accentColor === 'orange';
  const cTop = isOrange ? '#FF4514' : '#5CC79C';
  const cFront = isOrange ? '#CC3009' : '#3E8E6E';
  const cSide = isOrange ? '#8E1F04' : '#285A48';
  const cText = isOrange ? '#120300' : '#061710';
  const cGlow = isOrange ? 'rgba(255, 69, 20, 0.25)' : 'rgba(92, 199, 156, 0.25)';

  return (
    <div className="relative w-full max-w-5xl mx-auto my-12 select-none">
      
      {/* Top Controls: Color Accent Switcher & Section Inspector Pill */}
      <div className="flex items-center justify-between mb-4 px-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Palettes:</span>
          <button
            onClick={() => setAccentColor('orange')}
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
              isOrange
                ? 'bg-[#FF4514] text-white font-bold shadow-md shadow-[#FF4514]/30'
                : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#FF4514]"></span>
            <span>E2B Original</span>
          </button>
          <button
            onClick={() => setAccentColor('emerald')}
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
              !isOrange
                ? 'bg-[#5CC79C] text-slate-950 font-bold shadow-md shadow-[#5CC79C]/30'
                : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#5CC79C]"></span>
            <span>Helm Theme</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-500 hidden sm:block">
          {activeSection ? (
            <span className="text-white bg-white/[0.08] px-2 py-0.5 rounded border border-white/[0.1]">
              Inspecting: <strong className={isOrange ? 'text-[#FF4514]' : 'text-[#5CC79C]'}>{activeSection}</strong>
            </span>
          ) : (
            <span>Interactive 3D Layer Stack · Hover to tilt</span>
          )}
        </div>
      </div>

      {/* Main 3D Interactive Canvas Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full bg-[#030404] rounded-2xl border border-white/[0.08] overflow-hidden p-2 sm:p-6 shadow-2xl transition-transform duration-200 ease-out flex items-center justify-center min-h-[460px] sm:min-h-[580px]"
        style={{
          perspective: '1400px',
        }}
      >
        {/* Subtle radial background glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${cGlow} 0%, transparent 70%)`
          }}
        />

        {/* 3D Tilted SVG Surface */}
        <div
          className="relative w-full transition-transform duration-300 ease-out transform-gpu"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          <svg
            viewBox="0 0 1024 620"
            className="w-full h-auto overflow-visible select-none"
            style={{ filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.85))' }}
          >
            <defs>
              {/* Core Gradients */}
              <linearGradient id="topGridPlate" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a1c1d" />
                <stop offset="50%" stopColor="#131415" />
                <stop offset="100%" stopColor="#0d0e0f" />
              </linearGradient>

              <linearGradient id="topKeyCap" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#25282a" />
                <stop offset="100%" stopColor="#141517" />
              </linearGradient>

              {/* Laser / Orbit dashed stroke animation */}
              <linearGradient id="orbitGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
              </linearGradient>

              {/* Checkerboard Pattern for Cloud Substrate */}
              <pattern id="checkerPattern" width="8" height="8" patternUnits="userSpaceOnUse">
                <rect width="4" height="4" fill="rgba(255,255,255,0.14)" />
                <rect x="4" y="4" width="4" height="4" fill="rgba(255,255,255,0.14)" />
              </pattern>
            </defs>

            {/* =========================================================================
                LAYER 0: 3D DASHED ORBITAL PATHS & CONNECTORS
            ========================================================================= */}
            <g id="orbital-rays" opacity="0.75">
              {/* Outer Orbit Ellipse */}
              <ellipse
                cx="512"
                cy="320"
                rx="460"
                ry="210"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.2"
                strokeDasharray="5,6"
                className="animate-pulse"
                style={{ animationDuration: '4s' }}
              />

              {/* Inner Orbit Ellipse */}
              <ellipse
                cx="512"
                cy="325"
                rx="400"
                ry="180"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
                strokeDasharray="4,5"
              />

              {/* Connector ray: Secrets (Right) into core */}
              <line
                x1="860"
                y1="275"
                x2="780"
                y2="330"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
                strokeDasharray="3,4"
              />

              {/* Connector ray: MCP Tools (Left) out of core */}
              <line
                x1="220"
                y1="340"
                x2="155"
                y2="375"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
                strokeDasharray="3,4"
              />

              {/* Connector ray: Model Calls (Bottom) out of core */}
              <line
                x1="510"
                y1="435"
                x2="530"
                y2="495"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
                strokeDasharray="3,4"
              />
            </g>

            {/* =========================================================================
                LAYER 1: BOTTOM CLOUD SUBSTRATE (Z = -70)
            ========================================================================= */}
            <g id="bottom-substrate" transform="translate(0, 48)">
              {/* Extruded Front and Right Bevel Faces */}
              {/* Front Face */}
              <polygon
                points="210,352 640,562 640,576 210,366"
                fill="#0a0c0d"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.8"
              />
              {/* Right Face */}
              <polygon
                points="640,562 820,474 820,488 640,576"
                fill="#121517"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.8"
              />

              {/* Top Face of Bottom Plate */}
              <polygon
                points="390,264 820,474 640,562 210,352"
                fill="#131517"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
              />

              {/* Checkerboard Area 1: E2B CLOUD / HELM CLOUD */}
              <polygon
                points="230,358 400,275 490,319 320,402"
                fill="url(#checkerPattern)"
                opacity="0.85"
              />
              {/* Cloud Badge Plate */}
              <polygon
                points="270,360 370,311 410,331 310,380"
                fill="#0d0f10"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.8"
              />
              {/* Badge Icon + Label */}
              <text
                x="340"
                y="348"
                fill="#ffffff"
                fontSize="11"
                fontFamily="'JetBrains Mono', monospace"
                fontWeight="700"
                letterSpacing="1"
                transform="rotate(26, 340, 348) skewX(-28)"
              >
                ⬡ {isOrange ? 'E2B' : 'HELM'} CLOUD
              </text>

              {/* Checkerboard Area 2: YOUR CLOUD */}
              <polygon
                points="495,486 630,420 720,464 585,530"
                fill="url(#checkerPattern)"
                opacity="0.85"
              />
              {/* Your Cloud Badge Plate */}
              <polygon
                points="525,488 625,439 665,459 565,508"
                fill="#0d0f10"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.8"
              />
              <text
                x="595"
                y="476"
                fill="#ffffff"
                fontSize="11"
                fontFamily="'JetBrains Mono', monospace"
                fontWeight="700"
                letterSpacing="1"
                transform="rotate(26, 595, 476) skewX(-28)"
              >
                ☁ YOUR CLOUD
              </text>

              {/* Scattered Dither Matrix on Ground */}
              <g fill="rgba(255,255,255,0.3)">
                <rect x="710" y="380" width="3" height="3" />
                <rect x="725" y="372" width="3" height="3" />
                <rect x="740" y="386" width="3" height="3" />
                <rect x="760" y="410" width="3" height="3" />
                <rect x="780" y="400" width="3" height="3" />
                <rect x="750" y="430" width="3" height="3" />
              </g>
            </g>

            {/* =========================================================================
                LAYER 2: MIDDLE VIVID ORANGE CORE ENGINE SLAB (Z = 0)
            ========================================================================= */}
            <g id="middle-core-slab" transform="translate(0, 0)">
              {/* Extruded Front Bevel with Ruler Ticks */}
              <polygon
                points="210,310 650,525 650,548 210,333"
                fill={cFront}
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="1"
              />

              {/* Extruded Right Bevel */}
              <polygon
                points="650,525 830,437 830,460 650,548"
                fill={cSide}
                stroke="rgba(0,0,0,0.4)"
                strokeWidth="1"
              />

              {/* Physical Millimeter Ruler Tick Marks along Front Edge */}
              <g stroke="#ffffff" strokeWidth="1" opacity="0.8">
                {Array.from({ length: 44 }).map((_, i) => {
                  const t = i / 43;
                  const x1 = 210 + (650 - 210) * t;
                  const y1 = 310 + (525 - 310) * t;
                  const isLong = i % 5 === 0;
                  const h = isLong ? 12 : 6;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x1}
                      y2={y1 + h}
                      stroke={isLong ? '#ffffff' : 'rgba(255,255,255,0.6)'}
                    />
                  );
                })}
              </g>

              {/* Top Face of Orange Slab */}
              <polygon
                points="390,222 830,437 650,525 210,310"
                fill={cTop}
                stroke="rgba(0,0,0,0.25)"
                strokeWidth="1.2"
                style={{
                  filter: 'drop-shadow(0 0 12px ' + cGlow + ')'
                }}
              />

              {/* Section 1: E2B / HELM Pixel Stencil Logo */}
              <g
                onMouseEnter={() => setActiveSection('BRAND LOGO')}
                onMouseLeave={() => setActiveSection(null)}
                className="cursor-pointer"
              >
                <text
                  x="280"
                  y="295"
                  fill={cText}
                  fontSize="28"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight="900"
                  letterSpacing="-1"
                  transform="rotate(26, 280, 295) skewX(-28)"
                >
                  {isOrange ? 'E2B' : 'HELM'}
                </text>
                <line
                  x1="260"
                  y1="315"
                  x2="330"
                  y2="349"
                  stroke={cText}
                  strokeWidth="1.5"
                  strokeDasharray="2,3"
                />
              </g>

              {/* Vertical Divider 1 */}
              <line
                x1="340"
                y1="285"
                x2="310"
                y2="360"
                stroke="rgba(0,0,0,0.25)"
                strokeWidth="1.2"
              />

              {/* Section 2: LIFECYCLE */}
              <g
                onMouseEnter={() => setActiveSection('LIFECYCLE')}
                onMouseLeave={() => setActiveSection(null)}
                className="cursor-pointer hover:opacity-80"
              >
                {/* Pixel 3D Cube Icon */}
                <g transform="translate(385, 305) scale(0.9)">
                  {/* Cube top */}
                  <polygon points="12,0 24,6 12,12 0,6" fill={cText} />
                  {/* Cube left */}
                  <polygon points="0,6 12,12 12,24 0,18" fill="rgba(0,0,0,0.55)" />
                  {/* Cube right */}
                  <polygon points="12,12 24,6 24,18 12,24" fill="rgba(0,0,0,0.35)" />
                </g>
                <text
                  x="375"
                  y="346"
                  fill={cText}
                  fontSize="9.5"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight="700"
                  letterSpacing="1"
                  transform="rotate(26, 375, 346) skewX(-28)"
                >
                  LIFECYCLE
                </text>
              </g>

              {/* Vertical Divider 2 */}
              <line
                x1="450"
                y1="339"
                x2="420"
                y2="414"
                stroke="rgba(0,0,0,0.25)"
                strokeWidth="1.2"
              />

              {/* Section 3: NETWORK */}
              <g
                onMouseEnter={() => setActiveSection('NETWORK')}
                onMouseLeave={() => setActiveSection(null)}
                className="cursor-pointer hover:opacity-80"
              >
                {/* Pixel Wireframe Globe Icon */}
                <g transform="translate(485, 355) scale(0.85)">
                  <circle cx="14" cy="14" r="13" fill="none" stroke={cText} strokeWidth="2.5" />
                  <ellipse cx="14" cy="14" rx="7" ry="13" fill="none" stroke={cText} strokeWidth="2" />
                  <line x1="1" y1="14" x2="27" y2="14" stroke={cText} strokeWidth="2" />
                  <line x1="3" y1="8" x2="25" y2="8" stroke={cText} strokeWidth="1.5" />
                  <line x1="3" y1="20" x2="25" y2="20" stroke={cText} strokeWidth="1.5" />
                </g>
                <text
                  x="475"
                  y="396"
                  fill={cText}
                  fontSize="9.5"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight="700"
                  letterSpacing="1"
                  transform="rotate(26, 475, 396) skewX(-28)"
                >
                  NETWORK
                </text>
              </g>

              {/* Vertical Divider 3 */}
              <line
                x1="555"
                y1="390"
                x2="525"
                y2="465"
                stroke="rgba(0,0,0,0.25)"
                strokeWidth="1.2"
              />

              {/* Section 4: STORAGE */}
              <g
                onMouseEnter={() => setActiveSection('STORAGE')}
                onMouseLeave={() => setActiveSection(null)}
                className="cursor-pointer hover:opacity-80"
              >
                {/* Pixel Horizontal Disk / Stack Bars Icon */}
                <g transform="translate(585, 400) scale(0.9)">
                  <rect x="0" y="4" width="28" height="6" rx="2" fill={cText} />
                  <rect x="0" y="14" width="28" height="6" rx="2" fill={cText} />
                </g>
                <text
                  x="575"
                  y="442"
                  fill={cText}
                  fontSize="9.5"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight="700"
                  letterSpacing="1"
                  transform="rotate(26, 575, 442) skewX(-28)"
                >
                  STORAGE
                </text>
              </g>

              {/* Vertical Divider 4 */}
              <line
                x1="660"
                y1="442"
                x2="630"
                y2="517"
                stroke="rgba(0,0,0,0.25)"
                strokeWidth="1.2"
              />

              {/* Section 5: OBSERVABILITY */}
              <g
                onMouseEnter={() => setActiveSection('OBSERVABILITY')}
                onMouseLeave={() => setActiveSection(null)}
                className="cursor-pointer hover:opacity-80"
              >
                {/* Pixel Magnifying Glass / Probe Icon */}
                <g transform="translate(690, 448) scale(0.85)">
                  <circle cx="12" cy="12" r="10" fill="none" stroke={cText} strokeWidth="3" />
                  <line x1="19" y1="19" x2="28" y2="28" stroke={cText} strokeWidth="3.5" strokeLinecap="round" />
                </g>
                <text
                  x="675"
                  y="490"
                  fill={cText}
                  fontSize="9.5"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight="700"
                  letterSpacing="1"
                  transform="rotate(26, 675, 490) skewX(-28)"
                >
                  OBSERVABILITY
                </text>
              </g>
            </g>

            {/* =========================================================================
                LAYER 3: TOP SANDBOX MATRIX SLAB (Z = +75)
            ========================================================================= */}
            <g id="top-sandbox-matrix" transform="translate(0, -68)">
              {/* Outer Slab Extruded Bevel (Front and Right) */}
              <polygon
                points="210,230 650,445 650,460 210,245"
                fill="#101213"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="0.8"
              />
              <polygon
                points="650,445 830,357 830,372 650,460"
                fill="#181a1b"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="0.8"
              />

              {/* Top Face Base Plate */}
              <polygon
                points="390,142 830,357 650,445 210,230"
                fill="url(#topGridPlate)"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.2"
              />

              {/* 4 Rows x 8 Columns = 32 Floating Raised Keycap Rectangles */}
              <g id="keys-grid">
                {Array.from({ length: 4 }).map((_, row) => {
                  return Array.from({ length: 8 }).map((_, col) => {
                    const keyIndex = row * 8 + col;
                    const isActive = activeLedIndices.includes(keyIndex);

                    // Fractional positions along length (col: 0..7) and width (row: 0..3)
                    const u0 = 0.04 + col * 0.118;
                    const u1 = u0 + 0.098;
                    const v0 = 0.06 + row * 0.23;
                    const v1 = v0 + 0.18;

                    // Compute 4 2D isometric coordinates for this keycap
                    // TopCorner = 390, 142
                    // RightCorner = 830, 357 (vector U = 440, 215)
                    // LeftCorner = 210, 230  (vector V = -180, 88)
                    const getPt = (u, v) => ({
                      x: 390 + 440 * u - 180 * v,
                      y: 142 + 215 * u + 88 * v
                    });

                    const pTop = getPt(u0, v0);
                    const pRight = getPt(u1, v0);
                    const pBottom = getPt(u1, v1);
                    const pLeft = getPt(u0, v1);

                    const ptsString = `${pTop.x},${pTop.y} ${pRight.x},${pRight.y} ${pBottom.x},${pBottom.y} ${pLeft.x},${pLeft.y}`;

                    // Center for LED light
                    const ledX = (pTop.x + pBottom.x) / 2 + 10;
                    const ledY = (pTop.y + pBottom.y) / 2 + 5;

                    return (
                      <g key={keyIndex} className="transition-all duration-300">
                        {/* Keycap Bevel front */}
                        <polygon
                          points={`${pLeft.x},${pLeft.y} ${pBottom.x},${pBottom.y} ${pBottom.x},${pBottom.y + 2.5} ${pLeft.x},${pLeft.y + 2.5}`}
                          fill="#0d0e0f"
                        />
                        {/* Keycap Bevel right */}
                        <polygon
                          points={`${pBottom.x},${pBottom.y} ${pRight.x},${pRight.y} ${pRight.x},${pRight.y + 2.5} ${pBottom.x},${pBottom.y + 2.5}`}
                          fill="#17181a"
                        />

                        {/* Top Face of Keycap */}
                        <polygon
                          points={ptsString}
                          fill="url(#topKeyCap)"
                          stroke="rgba(255,255,255,0.08)"
                          strokeWidth="0.8"
                          className="hover:fill-[#2d3034] transition-colors"
                        />

                        {/* Two subtle engraved hatch lines on key */}
                        <line
                          x1={pLeft.x * 0.7 + pTop.x * 0.3}
                          y1={pLeft.y * 0.7 + pTop.y * 0.3}
                          x2={pLeft.x * 0.5 + pRight.x * 0.5}
                          y2={pLeft.y * 0.5 + pRight.y * 0.5}
                          stroke="rgba(255,255,255,0.08)"
                          strokeWidth="0.8"
                        />

                        {/* Active LED Light Indicator */}
                        {isActive && (
                          <g>
                            {/* Glowing halo */}
                            <circle
                              cx={ledX}
                              cy={ledY}
                              r="5"
                              fill="#ffffff"
                              opacity="0.3"
                              className="animate-ping"
                            />
                            {/* Crisp square white LED pixel */}
                            <rect
                              x={ledX - 2.5}
                              y={ledY - 2.5}
                              width="5"
                              height="5"
                              fill="#ffffff"
                              stroke="#cce5ff"
                              strokeWidth="0.5"
                            />
                          </g>
                        )}
                      </g>
                    );
                  });
                })}
              </g>
            </g>

            {/* =========================================================================
                LAYER 4: 3 FLOATING SATELLITE CHIPS & CALLOUT LABELS
            ========================================================================= */}
            {/* 1. RIGHT CHIP: SECRETS · IN */}
            <g id="chip-secrets" transform="translate(865, 275)">
              {/* Chip 3D Plate */}
              <polygon
                points="0,10 55,-17 110,10 55,37"
                fill="#111315"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
              />
              <polygon
                points="0,10 55,37 55,44 0,17"
                fill="#070809"
              />
              <polygon
                points="55,37 110,10 110,17 55,44"
                fill="#181a1d"
              />

              {/* Pixel Key / Padlock Icon on chip */}
              <g transform="translate(47, 4) scale(0.85)">
                <rect x="2" y="7" width="12" height="9" rx="1" fill="#ffffff" />
                <path d="M4,7 V4 A4,4 0 0,1 12,4 V7" fill="none" stroke="#ffffff" strokeWidth="2" />
                <circle cx="8" cy="11" r="1.5" fill="#000000" />
              </g>

              {/* Text label underneath */}
              <text
                x="55"
                y="68"
                fill="#ffffff"
                fontSize="11"
                fontFamily="'JetBrains Mono', monospace"
                fontWeight="700"
                letterSpacing="1.2"
                textAnchor="middle"
              >
                SECRETS · IN
              </text>
            </g>

            {/* 2. LEFT CHIP: MCP TOOLS · OUT */}
            <g id="chip-mcp" transform="translate(60, 345)">
              {/* Chip 3D Plate */}
              <polygon
                points="0,10 55,-17 110,10 55,37"
                fill="#111315"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
              />
              <polygon
                points="0,10 55,37 55,44 0,17"
                fill="#070809"
              />
              <polygon
                points="55,37 110,10 110,17 55,44"
                fill="#181a1d"
              />

              {/* Pixel Asterisk / MCP CPU Hub Icon on chip */}
              <g transform="translate(46, 3) scale(0.9)">
                <rect x="5" y="5" width="8" height="8" fill="#ffffff" />
                <line x1="9" y1="1" x2="9" y2="4" stroke="#ffffff" strokeWidth="2" />
                <line x1="9" y1="14" x2="9" y2="17" stroke="#ffffff" strokeWidth="2" />
                <line x1="1" y1="9" x2="4" y2="9" stroke="#ffffff" strokeWidth="2" />
                <line x1="14" y1="9" x2="17" y2="9" stroke="#ffffff" strokeWidth="2" />
              </g>

              {/* Text label underneath */}
              <text
                x="55"
                y="68"
                fill="#ffffff"
                fontSize="11"
                fontFamily="'JetBrains Mono', monospace"
                fontWeight="700"
                letterSpacing="1.2"
                textAnchor="middle"
              >
                MCP TOOLS · OUT
              </text>
            </g>

            {/* 3. BOTTOM CHIP: MODEL CALLS · OUT */}
            <g id="chip-models" transform="translate(510, 505)">
              {/* Chip 3D Plate */}
              <polygon
                points="0,10 55,-17 110,10 55,37"
                fill="#111315"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
              />
              <polygon
                points="0,10 55,37 55,44 0,17"
                fill="#070809"
              />
              <polygon
                points="55,37 110,10 110,17 55,44"
                fill="#181a1d"
              />

              {/* Pixel 3x3 Neural Matrix Icon on chip */}
              <g transform="translate(48, 5) scale(0.85)">
                <circle cx="3" cy="3" r="1.8" fill="#ffffff" />
                <circle cx="10" cy="3" r="1.8" fill="#ffffff" />
                <circle cx="17" cy="3" r="1.8" fill="#ffffff" />
                <circle cx="3" cy="10" r="1.8" fill="#ffffff" />
                <circle cx="10" cy="10" r="1.8" fill="#ffffff" />
                <circle cx="17" cy="10" r="1.8" fill="#ffffff" />
                <circle cx="3" cy="17" r="1.8" fill="#ffffff" />
                <circle cx="10" cy="17" r="1.8" fill="#ffffff" />
                <circle cx="17" cy="17" r="1.8" fill="#ffffff" />
              </g>

              {/* Text label underneath */}
              <text
                x="55"
                y="68"
                fill="#ffffff"
                fontSize="11"
                fontFamily="'JetBrains Mono', monospace"
                fontWeight="700"
                letterSpacing="1.2"
                textAnchor="middle"
              >
                MODEL CALLS · OUT
              </text>
            </g>

          </svg>
        </div>

        {/* Floating Interactive Badge at Bottom-Right */}
        <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-500 bg-black/60 px-2.5 py-1 rounded-md border border-white/[0.06] backdrop-blur-md hidden sm:flex items-center gap-2 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{activeLedIndices.length} ACTIVE SANDBOXES (MICROVM)</span>
        </div>

      </div>

    </div>
  );
}
