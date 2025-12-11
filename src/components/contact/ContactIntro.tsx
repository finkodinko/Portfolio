'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ContactIntro() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      [headlineRef.current, contentRef.current],
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headlineRef.current,
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
    <section className="relative w-full min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full">
        <h1
          ref={headlineRef}
          className="text-6xl md:text-7xl lg:text-8xl font-light mb-8 tracking-tight text-white opacity-0"
        >
          {`Let's build something impossible.`}
        </h1>

        <div ref={contentRef} className="space-y-4 text-lg text-white/70 max-w-2xl opacity-0">
          <p>
            {`Have an idea that requires precision, motion, and a touch of the extraordinary? We're always excited to talk about new projects.`}
          </p>
          <p>
            {`Whether it's a website, installation, real-time experience, or something entirely new—let's explore what's possible together.`}
          </p>
        </div>
      </div>
    </section>
  );
}
