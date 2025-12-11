'use client';

import { useRef, useState } from 'react';
import { ProjectPreviewCanvas } from '@/three/ProjectPreviewCanvas';
import type { Project } from '@/content/projects';
import { useAppStore } from '@/state/useAppStore';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const setActiveProject = useAppStore((state) => state.setActiveProject);

  const handleClick = () => {
    setActiveProject(project.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveProject(project.id);
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      className="group relative bg-black border border-white/10 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-500"
      style={{
        transform: isHovered ? 'perspective(1000px) rotateX(2deg) rotateY(-2deg)' : 'none',
        boxShadow: isHovered ? `0 0 30px ${project.accentColor || '#00ffff'}40` : 'none',
      }}
    >
      <div className="flex flex-col md:flex-row gap-4 p-6">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-2xl font-light text-white mb-1">{project.title}</h3>
              <p className="text-sm text-white/60">{project.subtitle}</p>
            </div>
            <span className="text-xs text-white/40 font-mono">{project.year}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full border border-white/20 text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full md:w-32 h-32 flex-shrink-0">
          <ProjectPreviewCanvas project={project} scale={0.8} className="w-full h-full" />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300"
        style={{
          background: isHovered
            ? `linear-gradient(90deg, transparent, ${project.accentColor || '#00ffff'}, transparent)`
            : 'transparent',
        }}
      />
    </div>
  );
}
