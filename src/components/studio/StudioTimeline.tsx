'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { studioTimeline } from '@/content/studioTimeline';

gsap.registerPlugin(ScrollTrigger);

export function StudioTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const entries = containerRef.current?.querySelectorAll('[data-timeline-entry]');
    if (!entries) return;

    // Animate each entry
    gsap.fromTo(
      entries,
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
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

    // Animate the timeline line
    if (lineRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const totalEntries = entries.length;
            const newActive = Math.floor(progress * (totalEntries - 1));
            setActiveIndex(newActive);
          },
        },
      });

      tl.to(lineRef.current, {
        height: '100%',
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="relative w-full py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-light mb-16 text-white tracking-tight">Timeline</h2>

        <div ref={containerRef} className="relative pl-12 md:pl-24">
          {/* Animated timeline line */}
          <div className="absolute left-0 top-0 md:left-8 w-1 h-0 bg-gradient-to-b from-cyan-500 to-pink-500" ref={lineRef} />

          {/* Milestone dot */}
          <div className="absolute left-0 top-0 md:left-6 w-4 h-4 rounded-full bg-cyan-500 -translate-x-1.5 md:-translate-x-2" />

          <div className="space-y-12 md:space-y-16">
            {studioTimeline.map((entry, index) => (
              <div
                key={entry.year}
                data-timeline-entry
                className={`relative pb-4 transition-all duration-300 opacity-0 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-60'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-baseline md:gap-8">
                  <div className="flex-shrink-0">
                    <span className="text-2xl md:text-3xl font-light text-cyan-400 tabular-nums">{entry.year}</span>
                  </div>

                  <div className="mt-2 md:mt-0 flex-1">
                    <h3 className="text-xl md:text-2xl font-light text-white mb-2">{entry.title}</h3>
                    <p className="text-base text-white/60 leading-relaxed max-w-2xl">{entry.description}</p>
                  </div>
                </div>

                {/* Milestone connector dot */}
                <div
                  className={`absolute -left-4 md:-left-12 top-1 w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-cyan-400 scale-125' : 'bg-white/30'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
