'use client';

import { useEffect } from 'react';
import { useAppStore, type DeviceTier } from '@/state/useAppStore';

export function useDeviceDetection() {
  const setDeviceTier = useAppStore((state) => state.setDeviceTier);
  const setPrefersReducedMotion = useAppStore((state) => state.setPrefersReducedMotion);

  useEffect(() => {
    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPrefersReducedMotion(prefersReducedMotion);

    // Detect device tier based on hardware capabilities
    const detectDeviceTier = (): void => {
      // Check CPU cores
      const cores = navigator.hardwareConcurrency || 4;

      // Check device memory if available
      const deviceMemory = (navigator as { deviceMemory?: number }).deviceMemory || 4;

      // Run test
      let tier: DeviceTier = 'medium'; // default
      let frameCount = 0;
      const testDuration = 500; // ms

      const startTime = performance.now();
      const testLoop = () => {
        frameCount++;
        if (performance.now() - startTime < testDuration) {
          requestAnimationFrame(testLoop);
        } else {
          const estimatedFps = (frameCount / testDuration) * 1000;

          if (estimatedFps >= 55 && cores >= 4 && deviceMemory >= 8) {
            tier = 'high';
          } else if (estimatedFps >= 45 && cores >= 2 && deviceMemory >= 4) {
            tier = 'medium';
          } else {
            tier = 'low';
          }

          setDeviceTier(tier);
        }
      };

      testLoop();
    };

    detectDeviceTier();

    // Listen for reduced motion preference changes
    const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [setDeviceTier, setPrefersReducedMotion]);
}
