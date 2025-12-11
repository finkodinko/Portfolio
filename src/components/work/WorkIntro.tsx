'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function WorkIntro() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const elements = [titleRef.current, line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean);

    gsap.fromTo(
      elements,
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
    <section className="w-full min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-white">
        <h1
          ref={titleRef}
          className="text-7xl md:text-8xl font-light mb-8 tracking-tight opacity-0"
        >
          Work
        </h1>
        <div className="space-y-4 text-lg md:text-xl font-light leading-relaxed text-white/80">
          <p ref={line1Ref} className="opacity-0">
            Each project is a digital artifact—crafted with intention, motion, and a touch of the extraordinary.
          </p>
          <p ref={line2Ref} className="opacity-0">
            We merge technical precision with creative vision, building experiences that resonate beyond the screen.
          </p>
          <p ref={line3Ref} className="opacity-0">
            From immersive installations to real-time tools, our work lives at the intersection of art and technology.
          </p>
        </div>
      </div>
    </section>
  );
}
