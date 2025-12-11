'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProcessVizCanvas } from '@/three/ProcessVizCanvas';
import { processSteps } from '@/content/process';

gsap.registerPlugin(ScrollTrigger);

export function ProcessStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const steps = containerRef.current?.querySelectorAll('[data-step]');
    if (!steps) return;

    gsap.fromTo(
      steps,
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="w-full py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-light mb-4 text-white tracking-tight">Our Process</h2>
        <p className="text-white/60 text-lg mb-12 max-w-2xl">
          From discovery to launch, we follow a refined methodology that balances exploration with precision.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Steps list */}
          <div ref={containerRef} className="lg:col-span-1 space-y-4">
            {processSteps.map((step) => (
              <button
                key={step.id}
                data-step
                onClick={() => setActiveStep(step.number - 1)}
                className={`w-full text-left p-6 rounded-lg border transition-all duration-300 opacity-0 ${
                  activeStep === step.number - 1
                    ? 'bg-white/10 border-cyan-500 shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/8'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl font-light text-cyan-400">{step.number}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-light text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-white/60">{step.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Active step details + visualization */}
          <div className="lg:col-span-2 space-y-8">
            {/* Canvas */}
            <div className="relative bg-white/5 border border-white/10 rounded-lg overflow-hidden h-96 md:h-[500px]">
              <ProcessVizCanvas activeStep={activeStep} />
            </div>

            {/* Step details */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-8">
              <h3 className="text-2xl font-light text-white mb-4">
                {processSteps[activeStep].title}
              </h3>

              <ul className="space-y-3">
                {processSteps[activeStep].details.map((detail, index) => (
                  <li key={index} className="flex gap-3 text-white/70">
                    <span className="text-cyan-400 flex-shrink-0">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
