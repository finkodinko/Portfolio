'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ProcessIntro() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.fromTo(
      [titleRef.current, contentRef.current],
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="w-full min-h-[50vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full">
        <h1 ref={titleRef} className="text-6xl md:text-7xl font-light mb-8 tracking-tight text-white opacity-0">
          Process
        </h1>

        <p ref={contentRef} className="text-xl text-white/70 leading-relaxed max-w-2xl opacity-0">
          Our methodology combines strategic thinking with technical rigor. We start with understanding your vision, design
          with precision, build with care, refine through iteration, and launch with confidence. Every step is essential.
        </p>
      </div>
    </section>
  );
}
