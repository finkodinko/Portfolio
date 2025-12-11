'use client';

import { useEffect, useRef } from 'react';
import { useAppStore } from '@/state/useAppStore';
import { projects } from '@/content/projects';
import { ProjectPreviewCanvas } from '@/three/ProjectPreviewCanvas';
import { gsap } from 'gsap';

export function ProjectDetailOverlay() {
  const activeProjectId = useAppStore((state) => state.activeProjectId);
  const setActiveProject = useAppStore((state) => state.setActiveProject);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const project = projects.find((p) => p.id === activeProjectId);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeProjectId) {
        setActiveProject(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeProjectId, setActiveProject]);

  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return;

    if (activeProjectId) {
      document.body.style.overflow = 'hidden';
      
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [activeProjectId]);

  if (!activeProjectId || !project) return null;

  const handleClose = () => {
    if (contentRef.current && overlayRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => setActiveProject(null),
      });
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
      onClick={handleBackdropClick}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-6xl bg-black border border-white/20 rounded-lg overflow-hidden shadow-2xl"
        style={{
          boxShadow: `0 0 60px ${project.accentColor || '#00ffff'}40`,
        }}
      >
        <button
          onClick={handleClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-full"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-8 md:p-12">
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-4xl md:text-5xl font-light text-white">{project.title}</h2>
                <span className="text-sm text-white/40 font-mono">{project.year}</span>
              </div>
              <p className="text-xl text-white/60 mb-4">{project.subtitle}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full border border-white/30 text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm uppercase tracking-wider text-white/40 mb-2">Summary</h3>
                <p className="text-lg leading-relaxed text-white/80">{project.summary}</p>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-wider text-white/40 mb-2">Role</h3>
                <p className="text-lg text-white/80">{project.role}</p>
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white transition-all duration-300"
                  style={{
                    boxShadow: `0 0 20px ${project.accentColor || '#00ffff'}20`,
                  }}
                >
                  View Project
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2 h-64 md:h-auto flex items-center justify-center p-8 md:p-12 bg-black/50">
            <div className="w-full h-full max-w-md">
              <ProjectPreviewCanvas project={project} scale={1.5} className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
