'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

export function RootClient({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize device detection
  useDeviceDetection();

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    // Create Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Animation loop
    let lastTime = Date.now();
    const raf = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      lenis.raf(deltaTime);
      requestAnimationFrame(raf);
    };

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
