'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [headlineRef.current, subtitleRef.current, ctaRef.current];

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
      }
    );

    // Animate featured section
    if (featuredRef.current) {
      gsap.fromTo(
        featuredRef.current,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full text-center space-y-8">
          <h1
            ref={headlineRef}
            className="text-6xl md:text-8xl lg:text-9xl font-light text-white leading-tight tracking-tight opacity-0"
          >
            Creative<br/>Studio
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto font-light opacity-0"
          >
            We craft cinematic digital experiences where real-time 3D, motion design, and interactive storytelling converge.
          </p>

          <Link
            ref={ctaRef}
            href="/work"
            className="inline-block px-10 py-4 border border-white/20 rounded-full text-white hover:border-cyan-500 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 font-light opacity-0"
          >
            Explore Our Work
          </Link>
        </div>
      </section>

      {/* Featured Intro Section */}
      <section ref={featuredRef} className="relative px-6 py-20 border-t border-white/10 opacity-0">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm uppercase tracking-widest text-white/40 mb-3">Expertise</h3>
              <p className="text-white/70 leading-relaxed">
                Real-time 3D, WebGL, React Three Fiber, GSAP animations, and performance optimization.
              </p>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-widest text-white/40 mb-3">Approach</h3>
              <p className="text-white/70 leading-relaxed">
                We balance technical precision with creative vision, building experiences that feel both intentional and surprising.
              </p>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-widest text-white/40 mb-3">Impact</h3>
              <p className="text-white/70 leading-relaxed">
                {`From immersive websites to interactive installations, every project pushes the boundaries of what's possible.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            {`Ready to build something impossible?`}
          </h2>
          <p className="text-white/60 mb-8 text-lg">
            {`Let's talk about your next project. Whether it's a website, installation, or something entirely new.`}
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-white/10 border border-white/30 rounded-full text-white hover:bg-white/20 hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300 font-light"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
