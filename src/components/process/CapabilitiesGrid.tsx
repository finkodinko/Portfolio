'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { capabilities } from '@/content/process';

gsap.registerPlugin(ScrollTrigger);

export function CapabilitiesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('[data-capability]');
    if (!cards) return;

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="w-full py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-light mb-4 text-white tracking-tight">Capabilities</h2>
        <p className="text-white/60 text-lg mb-12 max-w-2xl">
          We combine technical expertise with creative vision across every stage of your project.
        </p>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((capability) => (
            <div
              key={capability.id}
              data-capability
              className="group relative bg-white/5 border border-white/10 rounded-lg p-8 backdrop-blur-sm hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 opacity-0"
            >
              <h3 className="text-2xl font-light text-white mb-3">{capability.title}</h3>
              <p className="text-base text-white/70 mb-6 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                {capability.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {capability.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/60 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
