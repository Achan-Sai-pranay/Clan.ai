import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  RotateCcw, 
  Users, 
  Zap, 
  Layers, 
  Lock, 
  Cpu, 
  Terminal, 
  Activity, 
  CheckCircle2, 
  XCircle,
  Eye,
  Sliders,
  Play,
  RefreshCw,
  Sparkles
} from 'lucide-react';

/**
 * Beyond E2B: The Next-Gen Autonomous Control & Time-Travel Stack
 * 
 * What makes this radically different from E2B:
 * 1. E2B is just a dumb sandbox container.
 * 2. THIS PLATFORM adds:
 *    - Differentiator 1: "Autonomous Time-Travel State Repair" (2-phase compensating rollback ledger)
 *    - Differentiator 2: "Cross-Agent Adversarial Consensus Mesh" (Heterogeneous model quorum)
 *    - True Differential 3D Depth (Exploded view slider separating the layers in true 3D space)
 *    - Interactive 32-node Sandbox Fleet (Hover & click any microVM keycap to inspect real live telemetry)
 *    - "Simulate Rogue Action & Time-Travel Rollback" interactive trigger
 */
export default function E2BArchitectureVisual() {
  const containerRef = useRef(null);

  // 3D Parallax & Exploded View States
  const [tilt, setTilt] = useState({ x: -12, y: 15 });
  const [explodeLevel, setExplodeLevel] = useState(1.4); // 0.8 (compact) to 2.4 (fully exploded)
  const [isExploded, setIsExploded] = useState(false);

  // Interactive Sandbox Fleet States (32 keys)
  const [activeLeds, setActiveLeds] = useState([3, 7, 12, 18, 22, 29]);
  const [selectedSandbox, setSelectedSandbox] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);

  // Rogue Simulation & Time-Travel Rollback States (The Big Differentiator)
  const [simState, setSimState] = useState('idle'); // 'idle' | 'rogue_attempt' | 'quorum_veto' | 'time_travel_rewind' | 'restored'
  const [simLog, setSimLog] = useState('System ready. Hover over any layer or click a sandbox to inspect.');

  // Mouse Parallax Physics
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * 22, // pitch
      y: x * 26   // yaw
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: -10, y: 14 });
  };

  // Toggle random LEDs simulating active workloads
  useEffect(() => {
    if (simState !== 'idle') return;
    const interval = setInterval(() => {
      setActiveLeds((prev) => {
        const next = [...prev];
        const randomKey = Math.floor(Math.random() * 32);
        if (next.includes(randomKey)) {
          return next.filter((k) => k !== randomKey);
        } else {
          return next.length < 9 ? [...next, randomKey] : next.slice(1).concat(randomKey);
        }
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [simState]);

  // Trigger the Interactive Rogue Action + Time-Travel Rollback Sequence
  const triggerSimulation = () => {
    setSimState('rogue_attempt');
    setSimLog('⚠️ SANDBOX #14: Agent attempted unauthorized DDL mutation: "DROP TABLE prod_users"');

    // Step 2: Adversarial Quorum intercepts
    setTimeout(() => {
      setSimState('quorum_veto');
      setSimLog('🛡️ CONSENSUS MESH: Shadow Auditor (GPT-4o) and Policy Guard VETO tool call in 0.6ms!');
    }, 1200);

    // Step 3: Time-Travel Engine engages compensating rollback
    setTimeout(() => {
      setSimState('time_travel_rewind');
      setSimLog('⏪ TIME-TRAVEL ENGINE: Engaging two-phase compensating ledger. Rewinding state to Step 3...');
    }, 2400);

    // Step 4: Fully restored cleanly
    setTimeout(() => {
      setSimState('restored');
      setSimLog('✓ STATE CLEANLY RECOVERED: 0 bytes corrupted. Audit signature sealed.');
      setTimeout(() => setSimState('idle'), 3500);
    }, 3800);
  };

  // Pre-configured mock data for sandbox keys
  const getSandboxData = (idx) => {
    const isRogue = simState !== 'idle' && simState !== 'restored' && idx === 14;
    return {
      id: `sbx_${(1000 + idx * 43).toString(16)}`,
      index: idx,
      runtime: idx % 3 === 0 ? 'Python 3.12' : idx % 3 === 1 ? 'Node.js 22' : 'Go 1.23',
      task: isRogue ? 'DROP TABLE prod_users (BLOCKED)' : idx % 4 === 0 ? 'PR Code Review' : idx % 4 === 1 ? 'SQL Query Aggregation' : 'Stripe Invoice Audit',
      spend: `$${(0.02 + idx * 0.08).toFixed(2)}`,
      bootTime: '58ms',
      status: isRogue ? 'INTERCEPTED' : activeLeds.includes(idx) ? 'RUNNING' : 'WARM_STANDBY',
      timeTravelLedger: `${4 + (idx % 8)} snapshots`,
      quorumProtected: true
    };
  };

  const currentElevation = isExploded ? 2.2 : explodeLevel;

  return (
    <div className="relative w-full max-w-6xl mx-auto my-12 select-none font-sans">
      
      {/* Top Interactive Controls & Differentiator Bar */}
      <div className="bg-[#0b0e14] border border-white/[0.08] rounded-2xl p-4 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Differentiator Title Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 p-[1px] shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-[#0d1017] rounded-[11px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm tracking-tight">Helm Autonomous Control Stack</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                BEYOND RAW SANDBOXES
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              E2B stops at the sandbox. We add <strong className="text-violet-400">Time-Travel Rollback</strong> and <strong className="text-cyan-400">Adversarial Quorum Mesh</strong>.
            </p>
          </div>
        </div>

        {/* Right: Interactive 3D Explode & Rogue Attack Simulation Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          
          {/* Explode View Toggle */}
          <button
            onClick={() => setIsExploded(!isExploded)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              isExploded
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                : 'bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.08]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isExploded ? 'Compact Stack' : 'Explode 3D Layers'}</span>
          </button>

          {/* SIMULATE ROGUE ATTACK & ROLLBACK BUTTON */}
          <button
            onClick={triggerSimulation}
            disabled={simState !== 'idle'}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 shadow-lg ${
              simState === 'idle'
                ? 'bg-gradient-to-r from-rose-500 via-violet-600 to-cyan-500 text-white hover:scale-[1.02] shadow-violet-500/20'
                : 'bg-slate-800 text-slate-400 cursor-wait'
            }`}
          >
            <Play className={`w-3.5 h-3.5 fill-current ${simState !== 'idle' ? 'animate-spin' : ''}`} />
            <span>{simState === 'idle' ? 'Test Rogue Mutation & Auto-Rollback' : 'Running Simulation...'}</span>
          </button>

        </div>

      </div>

      {/* Main 3D Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full bg-[#050608] rounded-3xl border border-white/[0.08] overflow-hidden p-4 sm:p-8 shadow-2xl flex flex-col items-center justify-center min-h-[580px] sm:min-h-[660px]"
        style={{ perspective: '1600px' }}
      >
        {/* Dynamic ambient backlights based on simulation state */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background:
              simState === 'rogue_attempt'
                ? 'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.25) 0%, transparent 65%)'
                : simState === 'quorum_veto'
                ? 'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.25) 0%, transparent 65%)'
                : simState === 'time_travel_rewind'
                ? 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.28) 0%, transparent 65%)'
                : 'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.12) 0%, transparent 70%)'
          }}
        />

        {/* Live HUD Status Ribbon */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090c12]/90 border border-white/[0.1] text-xs font-mono text-slate-300 backdrop-blur-md">
            <span className={`w-2 h-2 rounded-full ${
              simState === 'idle'
                ? 'bg-emerald-400 animate-pulse'
                : simState === 'rogue_attempt'
                ? 'bg-rose-500 animate-ping'
                : simState === 'quorum_veto'
                ? 'bg-cyan-400 animate-bounce'
                : 'bg-violet-400 animate-pulse'
            }`} />
            <span className="font-semibold text-white">{simLog}</span>
          </div>

          <div className="text-[11px] font-mono text-slate-400 bg-[#090c12]/80 px-2.5 py-1 rounded-lg border border-white/[0.06] backdrop-blur-md hidden sm:block">
            <span>Hover keys to inspect microVM · Drag to tilt</span>
          </div>
        </div>

        {/* TRUE 3D STACK CONTAINER WITH DIFFERENTIAL PARALLAX */}
        <div
          className="relative w-full max-w-4xl transition-transform duration-200 ease-out transform-gpu mt-6"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          <svg
            viewBox="0 0 1024 640"
            className="w-full h-auto overflow-visible select-none"
            style={{ filter: 'drop-shadow(0 30px 45px rgba(0,0,0,0.9))' }}
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="gridPlateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a1c20" />
                <stop offset="50%" stopColor="#121316" />
                <stop offset="100%" stopColor="#0a0b0d" />
              </linearGradient>

              <linearGradient id="timeTravelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>

              {/* Laser / Orbit dashed stroke */}
              <linearGradient id="laserBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff4514" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>

              {/* Checkerboard Pattern for Cloud Substrate */}
              <pattern id="checker3D" width="8" height="8" patternUnits="userSpaceOnUse">
                <rect width="4" height="4" fill="rgba(255,255,255,0.12)" />
                <rect x="4" y="4" width="4" height="4" fill="rgba(255,255,255,0.12)" />
              </pattern>
            </defs>

            {/* =========================================================================
                ORBITAL LASER BEAMS & SATELLITE PATHS
            ========================================================================= */}
            <g id="orbital-rays" opacity="0.6">
              <ellipse
                cx="512"
                cy="320"
                rx="470"
                ry="210"
                fill="none"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="1.2"
                strokeDasharray="6,6"
              />
              <ellipse
                cx="512"
                cy="325"
                rx="410"
                ry="180"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
                strokeDasharray="4,5"
              />
            </g>

            {/* =========================================================================
                LAYER 1: BOTTOM CLOUD SUBSTRATE (Z = -65 * elevation)
            ========================================================================= */}
            <g
              id="layer-bottom-substrate"
              transform={`translate(0, ${48 * currentElevation})`}
              className="transition-transform duration-500 ease-out"
            >
              {/* Bevel extrusion */}
              <polygon points="210,352 640,562 640,576 210,366" fill="#08090a" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
              <polygon points="640,562 820,474 820,488 640,576" fill="#0f1113" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
              {/* Top Face */}
              <polygon points="390,264 820,474 640,562 210,352" fill="#111315" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />

              {/* Substrate Regions */}
              <polygon points="230,358 400,275 490,319 320,402" fill="url(#checker3D)" opacity="0.75" />
              <polygon points="270,360 370,311 410,331 310,380" fill="#090a0c" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
              <text x="340" y="348" fill="#ffffff" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="700" letterSpacing="1" transform="rotate(26, 340, 348) skewX(-28)">
                ⬡ HELM CLOUD
              </text>

              <polygon points="495,486 630,420 720,464 585,530" fill="url(#checker3D)" opacity="0.75" />
              <polygon points="525,488 625,439 665,459 565,508" fill="#090a0c" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
              <text x="595" y="476" fill="#ffffff" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="700" letterSpacing="1" transform="rotate(26, 595, 476) skewX(-28)">
                ☁ YOUR CLOUD
              </text>
            </g>

            {/* =========================================================================
                LAYER 2: MIDDLE CORE ENGINE SLAB (VIVID ACCENT SLAB)
            ========================================================================= */}
            <g
              id="layer-middle-engine"
              transform="translate(0, 0)"
              className="transition-transform duration-500 ease-out"
            >
              {/* Front Face with Ruler Markings */}
              <polygon points="210,310 650,525 650,548 210,333" fill="#cc3009" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
              <polygon points="650,525 830,437 830,460 650,548" fill="#881e04" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />

              {/* Physical Millimeter Ruler Marks */}
              <g stroke="#ffffff" strokeWidth="1" opacity="0.8">
                {Array.from({ length: 44 }).map((_, i) => {
                  const t = i / 43;
                  const x1 = 210 + (650 - 210) * t;
                  const y1 = 310 + (525 - 310) * t;
                  const isLong = i % 5 === 0;
                  return <line key={i} x1={x1} y1={y1} x2={x1} y2={y1 + (isLong ? 12 : 6)} stroke={isLong ? '#ffffff' : 'rgba(255,255,255,0.6)'} />;
                })}
              </g>

              {/* Top Face of Core Slab */}
              <polygon
                points="390,222 830,437 650,525 210,310"
                fill={simState === 'quorum_veto' ? '#06b6d4' : simState === 'time_travel_rewind' ? '#8b5cf6' : '#ff4514'}
                stroke="rgba(0,0,0,0.25)"
                strokeWidth="1.2"
                className="transition-colors duration-500"
              />

              {/* 5 Core Engine Zones */}
              {/* 1. Stencil Logo */}
              <text x="280" y="295" fill="#120300" fontSize="28" fontFamily="'JetBrains Mono', monospace" fontWeight="900" letterSpacing="-1" transform="rotate(26, 280, 295) skewX(-28)">
                HELM
              </text>

              {/* 2. LIFECYCLE */}
              <g
                onMouseEnter={() => setHoveredSection('LIFECYCLE: 58ms microVM snapshot restore')}
                onMouseLeave={() => setHoveredSection(null)}
                className="cursor-pointer"
              >
                <g transform="translate(385, 305) scale(0.9)">
                  <polygon points="12,0 24,6 12,12 0,6" fill="#120300" />
                  <polygon points="0,6 12,12 12,24 0,18" fill="rgba(0,0,0,0.55)" />
                  <polygon points="12,12 24,6 24,18 12,24" fill="rgba(0,0,0,0.35)" />
                </g>
                <text x="375" y="346" fill="#120300" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" fontWeight="700" letterSpacing="1" transform="rotate(26, 375, 346) skewX(-28)">
                  LIFECYCLE
                </text>
              </g>

              {/* 3. NETWORK / POLICY */}
              <g
                onMouseEnter={() => setHoveredSection('NETWORK: Zero-trust ingress/egress allowlists')}
                onMouseLeave={() => setHoveredSection(null)}
                className="cursor-pointer"
              >
                <g transform="translate(485, 355) scale(0.85)">
                  <circle cx="14" cy="14" r="13" fill="none" stroke="#120300" strokeWidth="2.5" />
                  <ellipse cx="14" cy="14" rx="7" ry="13" fill="none" stroke="#120300" strokeWidth="2" />
                  <line x1="1" y1="14" x2="27" y2="14" stroke="#120300" strokeWidth="2" />
                </g>
                <text x="475" y="396" fill="#120300" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" fontWeight="700" letterSpacing="1" transform="rotate(26, 475, 396) skewX(-28)">
                  NETWORK
                </text>
              </g>

              {/* 4. STORAGE & SNAPSHOTS */}
              <g
                onMouseEnter={() => setHoveredSection('STORAGE: Copy-on-write diff layers & S3 buckets')}
                onMouseLeave={() => setHoveredSection(null)}
                className="cursor-pointer"
              >
                <g transform="translate(585, 400) scale(0.9)">
                  <rect x="0" y="4" width="28" height="6" rx="2" fill="#120300" />
                  <rect x="0" y="14" width="28" height="6" rx="2" fill="#120300" />
                </g>
                <text x="575" y="442" fill="#120300" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" fontWeight="700" letterSpacing="1" transform="rotate(26, 575, 442) skewX(-28)">
                  STORAGE
                </text>
              </g>

              {/* 5. OBSERVABILITY */}
              <g
                onMouseEnter={() => setHoveredSection('OBSERVABILITY: Real-time traces, metrics & OTLP spans')}
                onMouseLeave={() => setHoveredSection(null)}
                className="cursor-pointer"
              >
                <g transform="translate(690, 448) scale(0.85)">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="#120300" strokeWidth="3" />
                  <line x1="19" y1="19" x2="28" y2="28" stroke="#120300" strokeWidth="3.5" strokeLinecap="round" />
                </g>
                <text x="675" y="490" fill="#120300" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" fontWeight="700" letterSpacing="1" transform="rotate(26, 675, 490) skewX(-28)">
                  OBSERVABILITY
                </text>
              </g>
            </g>

            {/* =========================================================================
                ⭐ OUR DIFFERENTIATOR 1 & 2: THE HOLOGRAPHIC GOVERNANCE WAFER (Z = +20)
                This layer sits between the engine and the keys!
            ========================================================================= */}
            <g
              id="layer-differentiators"
              transform={`translate(0, ${-22 * currentElevation})`}
              className="transition-transform duration-500 ease-out"
            >
              {/* Holographic glowing perimeter */}
              <polygon
                points="390,185 830,400 650,488 210,273"
                fill="rgba(139, 92, 246, 0.12)"
                stroke="url(#timeTravelGrad)"
                strokeWidth="1.5"
                strokeDasharray="6,4"
              />

              {/* Two Prominent Innovation Chips on the Hologram */}
              {/* Left Badge: TIME-TRAVEL STATE REWIND ENGINE */}
              <g
                onClick={triggerSimulation}
                className="cursor-pointer hover:opacity-100 transition-opacity"
              >
                <polygon
                  points="260,295 440,383 410,398 230,310"
                  fill="rgba(139, 92, 246, 0.4)"
                  stroke="#8b5cf6"
                  strokeWidth="1.2"
                />
                <text
                  x="330"
                  y="346"
                  fill="#ffffff"
                  fontSize="10"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight="700"
                  letterSpacing="0.8"
                  transform="rotate(26, 330, 346) skewX(-28)"
                >
                  ⏪ TIME-TRAVEL LEDGER
                </text>
              </g>

              {/* Right Badge: CROSS-AGENT ADVERSARIAL QUORUM */}
              <g className="cursor-pointer">
                <polygon
                  points="470,398 680,500 650,515 440,413"
                  fill="rgba(6, 182, 212, 0.4)"
                  stroke="#06b6d4"
                  strokeWidth="1.2"
                />
                <text
                  x="560"
                  y="456"
                  fill="#ffffff"
                  fontSize="10"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight="700"
                  letterSpacing="0.8"
                  transform="rotate(26, 560, 456) skewX(-28)"
                >
                  🛡️ ADVERSARIAL QUORUM MESH
                </text>
              </g>
            </g>

            {/* =========================================================================
                LAYER 3: TOP SANDBOX MATRIX (Z = +70 * elevation)
                32 Interactive MicroVM Keycaps with Individual Click & Hover
            ========================================================================= */}
            <g
              id="layer-top-sandboxes"
              transform={`translate(0, ${-68 * currentElevation})`}
              className="transition-transform duration-500 ease-out"
            >
              {/* Base plate bevel */}
              <polygon points="210,230 650,445 650,458 210,243" fill="#0d0e10" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
              <polygon points="650,445 830,357 830,370 650,458" fill="#151719" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
              <polygon points="390,142 830,357 650,445 210,230" fill="url(#gridPlateGrad)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />

              {/* 32 Individual Interactive Raised Keycaps */}
              {Array.from({ length: 4 }).map((_, row) => {
                return Array.from({ length: 8 }).map((_, col) => {
                  const idx = row * 8 + col;
                  const isActive = activeLeds.includes(idx);
                  const isSelected = selectedSandbox?.index === idx;
                  const isRogueTarget = simState !== 'idle' && simState !== 'restored' && idx === 14;

                  // Fractional coords
                  const u0 = 0.04 + col * 0.118;
                  const u1 = u0 + 0.098;
                  const v0 = 0.06 + row * 0.23;
                  const v1 = v0 + 0.18;

                  const getPt = (u, v) => ({
                    x: 390 + 440 * u - 180 * v,
                    y: 142 + 215 * u + 88 * v
                  });

                  const pTop = getPt(u0, v0);
                  const pRight = getPt(u1, v0);
                  const pBottom = getPt(u1, v1);
                  const pLeft = getPt(u0, v1);

                  const pts = `${pTop.x},${pTop.y} ${pRight.x},${pRight.y} ${pBottom.x},${pBottom.y} ${pLeft.x},${pLeft.y}`;
                  const ledX = (pTop.x + pBottom.x) / 2 + 10;
                  const ledY = (pTop.y + pBottom.y) / 2 + 5;

                  return (
                    <g
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSandbox(getSandboxData(idx));
                      }}
                      className="cursor-pointer group"
                    >
                      {/* Bevel front */}
                      <polygon
                        points={`${pLeft.x},${pLeft.y} ${pBottom.x},${pBottom.y} ${pBottom.x},${pBottom.y + 2.5} ${pLeft.x},${pLeft.y + 2.5}`}
                        fill={isRogueTarget ? '#9f1239' : '#0a0b0d'}
                      />
                      {/* Bevel right */}
                      <polygon
                        points={`${pBottom.x},${pBottom.y} ${pRight.x},${pRight.y} ${pRight.x},${pRight.y + 2.5} ${pBottom.x},${pBottom.y + 2.5}`}
                        fill={isRogueTarget ? '#881337' : '#141517'}
                      />

                      {/* Top Face of Keycap */}
                      <polygon
                        points={pts}
                        fill={
                          isRogueTarget
                            ? '#f43f5e'
                            : isSelected
                            ? '#38bdf8'
                            : '#191b1f'
                        }
                        stroke={
                          isRogueTarget
                            ? '#ffe4e6'
                            : isSelected
                            ? '#ffffff'
                            : 'rgba(255,255,255,0.1)'
                        }
                        strokeWidth={isSelected || isRogueTarget ? 1.5 : 0.8}
                        className="transition-colors duration-200 group-hover:fill-[#2a2d33]"
                      />

                      {/* Hatch Lines */}
                      <line
                        x1={pLeft.x * 0.7 + pTop.x * 0.3}
                        y1={pLeft.y * 0.7 + pTop.y * 0.3}
                        x2={pLeft.x * 0.5 + pRight.x * 0.5}
                        y2={pLeft.y * 0.5 + pRight.y * 0.5}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="0.8"
                      />

                      {/* Active LED Light */}
                      {isActive && (
                        <g>
                          <circle
                            cx={ledX}
                            cy={ledY}
                            r="4.5"
                            fill={isRogueTarget ? '#fda4af' : '#ffffff'}
                            opacity="0.35"
                            className="animate-ping"
                          />
                          <rect
                            x={ledX - 2.5}
                            y={ledY - 2.5}
                            width="5"
                            height="5"
                            fill={isRogueTarget ? '#ffffff' : '#ffffff'}
                            stroke="#5cc79c"
                            strokeWidth="0.5"
                          />
                        </g>
                      )}
                    </g>
                  );
                });
              })}
            </g>

            {/* =========================================================================
                LAYER 4: 4 SATELLITE CHIPS INCLUDING QUORUM GUARD
            ========================================================================= */}
            {/* 1. SECRETS · IN */}
            <g id="sat-secrets" transform="translate(865, 275)" className="cursor-pointer hover:scale-105 transition-transform">
              <polygon points="0,10 55,-17 110,10 55,37" fill="#0d0f12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
              <polygon points="0,10 55,37 55,44 0,17" fill="#060708" />
              <polygon points="55,37 110,10 110,17 55,44" fill="#141618" />
              <g transform="translate(47, 4) scale(0.85)">
                <rect x="2" y="7" width="12" height="9" rx="1" fill="#ffffff" />
                <path d="M4,7 V4 A4,4 0 0,1 12,4 V7" fill="none" stroke="#ffffff" strokeWidth="2" />
              </g>
              <text x="55" y="68" fill="#ffffff" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="700" letterSpacing="1.2" textAnchor="middle">
                SECRETS · IN
              </text>
            </g>

            {/* 2. MCP TOOLS · OUT */}
            <g id="sat-mcp" transform="translate(60, 345)" className="cursor-pointer hover:scale-105 transition-transform">
              <polygon points="0,10 55,-17 110,10 55,37" fill="#0d0f12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
              <polygon points="0,10 55,37 55,44 0,17" fill="#060708" />
              <polygon points="55,37 110,10 110,17 55,44" fill="#141618" />
              <g transform="translate(46, 3) scale(0.9)">
                <rect x="5" y="5" width="8" height="8" fill="#ffffff" />
                <line x1="9" y1="1" x2="9" y2="4" stroke="#ffffff" strokeWidth="2" />
                <line x1="9" y1="14" x2="9" y2="17" stroke="#ffffff" strokeWidth="2" />
                <line x1="1" y1="9" x2="4" y2="9" stroke="#ffffff" strokeWidth="2" />
                <line x1="14" y1="9" x2="17" y2="9" stroke="#ffffff" strokeWidth="2" />
              </g>
              <text x="55" y="68" fill="#ffffff" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="700" letterSpacing="1.2" textAnchor="middle">
                MCP TOOLS · OUT
              </text>
            </g>

            {/* 3. MODEL CALLS · OUT */}
            <g id="sat-models" transform="translate(510, 505)" className="cursor-pointer hover:scale-105 transition-transform">
              <polygon points="0,10 55,-17 110,10 55,37" fill="#0d0f12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
              <polygon points="0,10 55,37 55,44 0,17" fill="#060708" />
              <polygon points="55,37 110,10 110,17 55,44" fill="#141618" />
              <g transform="translate(48, 5) scale(0.85)">
                <circle cx="3" cy="3" r="1.8" fill="#ffffff" />
                <circle cx="10" cy="3" r="1.8" fill="#ffffff" />
                <circle cx="17" cy="3" r="1.8" fill="#ffffff" />
                <circle cx="3" cy="10" r="1.8" fill="#ffffff" />
                <circle cx="10" cy="10" r="1.8" fill="#ffffff" />
                <circle cx="17" cy="10" r="1.8" fill="#ffffff" />
              </g>
              <text x="55" y="68" fill="#ffffff" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="700" letterSpacing="1.2" textAnchor="middle">
                MODEL CALLS · OUT
              </text>
            </g>

            {/* 4. ⭐ OUR 4TH SATELLITE CHIP: QUORUM MESH (DIFFERENTIATOR) */}
            <g id="sat-quorum" transform="translate(860, 430)" className="cursor-pointer hover:scale-105 transition-transform">
              <polygon points="0,10 55,-17 110,10 55,37" fill="#0b171f" stroke="#06b6d4" strokeWidth="1.2" />
              <polygon points="0,10 55,37 55,44 0,17" fill="#040d12" />
              <polygon points="55,37 110,10 110,17 55,44" fill="#0e232e" />
              <g transform="translate(47, 4) scale(0.85)">
                <circle cx="6" cy="6" r="3.5" fill="#06b6d4" />
                <circle cx="14" cy="12" r="3.5" fill="#06b6d4" />
                <line x1="6" y1="6" x2="14" y2="12" stroke="#06b6d4" strokeWidth="1.5" />
              </g>
              <text x="55" y="68" fill="#06b6d4" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="700" letterSpacing="1.2" textAnchor="middle">
                QUORUM · SYNC
              </text>
            </g>

          </svg>
        </div>

        {/* Selected MicroVM Sandbox Inspection Drawer */}
        {selectedSandbox && (
          <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:w-96 bg-[#0a0d14]/95 border border-white/[0.12] rounded-2xl p-4 shadow-2xl backdrop-blur-xl z-30 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-bold">{selectedSandbox.id}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.05] text-slate-400">
                  Key #{selectedSandbox.index}
                </span>
              </div>
              <button
                onClick={() => setSelectedSandbox(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Runtime:</span>
                <span className="text-slate-200">{selectedSandbox.runtime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Workload:</span>
                <span className="text-emerald-300 font-semibold">{selectedSandbox.task}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">State Rollback:</span>
                <span className="text-violet-400 font-bold">{selectedSandbox.timeTravelLedger}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Quorum Mesh:</span>
                <span className="text-cyan-400 font-bold">2/2 Shadow Quorum Active</span>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[10px] text-slate-500">Boot: {selectedSandbox.bootTime}</span>
              <button
                onClick={triggerSimulation}
                className="px-2.5 py-1 rounded bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 text-[10px] font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Test Rewind</span>
              </button>
            </div>
          </div>
        )}

        {/* Section Hover Tooltip */}
        {hoveredSection && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0d1017]/95 border border-white/[0.15] text-white text-xs font-mono px-4 py-2 rounded-xl backdrop-blur-md shadow-2xl z-20 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{hoveredSection}</span>
          </div>
        )}

      </div>

      {/* Comparison Grid below 3D model explaining our differentiators vs E2B */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        
        {/* E2B Baseline */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono">
          <div className="text-slate-400 font-bold mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            <span>Traditional Agent Cloud (E2B baseline)</span>
          </div>
          <p className="text-slate-400 leading-relaxed font-sans text-xs">
            Provides isolated Linux microVMs. If an agent executes bad SQL or corrupts a file, it only logs the crash after failure. No rollback, no pre-execution quorum.
          </p>
        </div>

        {/* Our Startup */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-violet-500/[0.07] to-cyan-500/[0.07] border border-violet-500/30 text-xs font-mono">
          <div className="text-white font-bold mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300">Helm / Guild AI (Our Architecture)</span>
          </div>
          <p className="text-slate-300 leading-relaxed font-sans text-xs">
            Wraps every sandbox in an <strong>Autonomous Time-Travel Ledger</strong> (rewinding bad state in 40ms) and an <strong>Adversarial Quorum Mesh</strong> (shadow models verifying safety before tool dispatch).
          </p>
        </div>

      </div>

    </div>
  );
}
