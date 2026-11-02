import React, { useEffect } from 'react';
import BackgroundEffects from './components/BackgroundEffects';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogosMarquee from './components/LogosMarquee';
import Architecture from './components/Architecture';
import Capabilities from './components/Capabilities';
import DeveloperSection from './components/DeveloperSection';
import StatsIntegrations from './components/StatsIntegrations';
import PricingCalculator from './components/PricingCalculator';
import Differentiators from './components/Differentiators';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    // 1. Scroll reveal (.rv)
    const elements = document.querySelectorAll('.rv');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('v');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => io.observe(el));

    // 2. Card mouse hover spotlight
    const cards = document.querySelectorAll('.card');
    const handleCardMove = (e) => {
      const card = e.currentTarget;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--x', `${e.clientX - r.left}px`);
      card.style.setProperty('--y', `${e.clientY - r.top}px`);
    };

    cards.forEach((card) => {
      card.addEventListener('mousemove', handleCardMove);
    });

    return () => {
      elements.forEach((el) => io.unobserve(el));
      io.disconnect();
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleCardMove);
      });
    };
  }, []);

  return (
    <>
      <BackgroundEffects />
      <Navbar />
      <main>
        <Hero />
        <LogosMarquee />
        <Architecture />
        <Capabilities />
        <DeveloperSection />
        <StatsIntegrations />
        <PricingCalculator />
        <Differentiators />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
