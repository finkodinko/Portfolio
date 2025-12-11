'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function StudioIntro() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const elements = [headlineRef.current, line1Ref.current, line2Ref.current, line3Ref.current].filter(
      Boolean
    );

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
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
    <section className="relative w-full min-h-[70vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full">
        <h1 ref={headlineRef} className="text-6xl md:text-7xl lg:text-8xl font-light mb-8 tracking-tight text-white opacity-0">
          We are a studio for interactive stories.
        </h1>

        <div className="space-y-6 text-lg md:text-xl font-light leading-relaxed text-white/70">
          <p ref={line1Ref} className="opacity-0">
            {`Since 2019, we've been crafting digital experiences that blur the line between cinema and interactivity. We build real-time worlds, motion systems, and installations where technology becomes invisible and emotion becomes tangible.`}
          </p>

          <p ref={line2Ref} className="opacity-0">
            {`Our work lives at the intersection of craft and experimentation—where precise engineering meets creative vision. We believe in motion as language, performance as design, and that the best experiences feel both inevitable and surprising.`}
          </p>

          <p ref={line3Ref} className="opacity-0">
            {`Every project is a conversation about what's possible when you combine cutting-edge technology with storytelling that matters.`}
          </p>
        </div>
      </div>
    </section>
  );
}
