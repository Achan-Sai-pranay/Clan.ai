import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ControlPlaneVisualizer from './components/ControlPlaneVisualizer';
import UniqueDifferentiators from './components/UniqueDifferentiators';
import FourPillars from './components/FourPillars';
import AgentHub from './components/AgentHub';
import CodePlayground from './components/CodePlayground';
import EnterpriseFeatures from './components/EnterpriseFeatures';
import FleetDashboard from './components/FleetDashboard';
import Footer from './components/Footer';

export default function App() {
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'dashboard'

  return (
    <div className="min-h-screen bg-[#08090E] text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-300 font-sans">
      
      {/* Top Fixed Navigation */}
      <Navbar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onOpenDemo={() => setActiveView('dashboard')}
      />

      {/* Main View Switcher */}
      {activeView === 'landing' ? (
        <main>
          {/* 1. Hero Section */}
          <Hero 
            onExploreConsole={() => setActiveView('dashboard')}
            onOpenVisualizer={() => {
              document.getElementById('visualizer')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 2. OUR 2 UNIQUE ARCHITECTURAL DIFFERENTIATORS */}
          <UniqueDifferentiators />

          {/* 3. Live Interactive Pre-Dispatch Policy Visualizer */}
          <ControlPlaneVisualizer />

          {/* 4. The 4 Foundational Pillars (Build, Deploy, Govern, Share) */}
          <FourPillars />

          {/* 5. Enterprise Agent Hub (40+ Blueprints) */}
          <AgentHub onDeployToFleet={() => setActiveView('dashboard')} />

          {/* 6. Code & CLI Playground */}
          <CodePlayground />

          {/* 7. Enterprise Security & Architecture Grid */}
          <EnterpriseFeatures />

          {/* 8. Footer */}
          <Footer onSwitchToConsole={() => setActiveView('dashboard')} />
        </main>
      ) : (
        <main>
          {/* Interactive Live Fleet Console / Dashboard */}
          <FleetDashboard onBackToLanding={() => setActiveView('landing')} />
        </main>
      )}

    </div>
  );
}
