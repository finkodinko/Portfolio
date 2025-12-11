'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ContactDetails() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll('[data-contact-item]'),
        {
          opacity: 0,
          y: 20,
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
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="relative w-full py-20 px-6 border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-light text-white mb-12">Get in touch</h2>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Email */}
          <div data-contact-item className="opacity-0">
            <h3 className="text-white/60 text-sm font-light uppercase tracking-wider mb-3">Email</h3>
            <a
              href="mailto:hello@studio.com"
              className="text-xl text-white hover:text-cyan-400 transition-colors duration-300"
            >
              hello@studio.com
            </a>
          </div>

          {/* Location */}
          <div data-contact-item className="opacity-0">
            <h3 className="text-white/60 text-sm font-light uppercase tracking-wider mb-3">Location</h3>
            <p className="text-white">
              Los Angeles, CA
              <br />
              <span className="text-white/60 text-sm">Pacific Time (UTC-8)</span>
            </p>
          </div>

          {/* Social */}
          <div data-contact-item className="opacity-0">
            <h3 className="text-white/60 text-sm font-light uppercase tracking-wider mb-3">Follow</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-white/60 hover:text-cyan-400 transition-colors duration-300 text-sm"
              >
                Behance
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-cyan-400 transition-colors duration-300 text-sm"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-cyan-400 transition-colors duration-300 text-sm"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Footer message */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <p className="text-white/50 text-sm max-w-2xl">
            {`We're based in Los Angeles but work with studios and creators globally. Typical response time is 24-48 hours. For urgent inquiries, please mention it in your message.`}
          </p>
        </div>
      </div>
    </section>
  );
}
