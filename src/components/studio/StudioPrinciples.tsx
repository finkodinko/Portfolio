'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { studioPrinciples } from '@/content/studioPrinciples';

gsap.registerPlugin(ScrollTrigger);

export function StudioPrinciples() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('[data-principle]');
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
    <section className="relative w-full py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-light mb-16 text-white tracking-tight">Our Principles</h2>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {studioPrinciples.map((principle) => (
            <div
              key={principle.title}
              data-principle
              className="group relative bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 opacity-0"
            >
              <h3 className="text-lg font-light text-white mb-3 leading-tight">{principle.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                {principle.description}
              </p>

              {/* Subtle accent line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
