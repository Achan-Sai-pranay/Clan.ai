import React, { useEffect, useRef } from 'react';

export default function BackgroundEffects() {
  const pgRef = useRef(null);

  useEffect(() => {
    // 1. Mouse move spotlight
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 2. Scroll progress indicator
    const handleScroll = () => {
      const h = document.documentElement;
      const progress = (window.scrollY / (h.scrollHeight - window.innerHeight || 1)) * 100;
      if (pgRef.current) {
        pgRef.current.style.width = `${progress}%`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div id="spot"></div>
      <div id="pg" ref={pgRef}></div>
    </>
  );
}

