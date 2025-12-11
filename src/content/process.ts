export interface Capability {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
  details: string[];
}

export const capabilities: Capability[] = [
  {
    id: 'concept',
    title: 'Concept & Story',
    description: 'We begin with narrative. Every project starts as an idea about what story we want to tell and how motion and interactivity can strengthen that narrative.',
    tags: ['Ideation', 'Strategy', 'Story', 'Art Direction'],
  },
  {
    id: 'realtime-3d',
    title: 'Realtime 3D & WebGL',
    description: 'Building experiences in WebGL and Three.js that feel like cinema but run in browsers. We optimize complex 3D scenes for performance without sacrificing visual quality.',
    tags: ['Three.js', 'WebGL', 'R3F', 'GLSL'],
  },
  {
    id: 'simulation-vfx',
    title: 'Simulation & VFX',
    description: 'Particle systems, physics simulations, and visual effects that create emergent, organic motion. From generative visuals to data-driven animations.',
    tags: ['Particles', 'Physics', 'Generative', 'Shaders'],
  },
  {
    id: 'delivery',
    title: 'Production & Delivery',
    description: 'Taking concepts from prototype to polished final product. We handle optimization, cross-platform testing, and deployment across web, VR, and installation contexts.',
    tags: ['Performance', 'Integration', 'Deployment', 'QA'],
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    number: 1,
    title: 'Discover',
    description: 'Understanding the vision and constraints',
    details: [
      'Creative brief and storytelling sessions',
      'Explore technical requirements and platform constraints',
      'Define visual direction and motion language',
    ],
  },
  {
    id: 'design',
    number: 2,
    title: 'Design',
    description: 'Sketching concepts and establishing language',
    details: [
      'Create visual mood boards and aesthetic references',
      'Prototype core interactions and motion',
      'Design system for animations and transitions',
    ],
  },
  {
    id: 'build',
    number: 3,
    title: 'Build',
    description: 'Implementation and technical development',
    details: [
      'Develop 3D scenes and real-time environments',
      'Build interactive systems and controls',
      'Implement performance optimizations',
    ],
  },
  {
    id: 'refine',
    number: 4,
    title: 'Refine',
    description: 'Polish and iteration based on feedback',
    details: [
      'Test across devices and browsers',
      'Iterate on motion and feel',
      'Optimize performance and accessibility',
    ],
  },
  {
    id: 'launch',
    number: 5,
    title: 'Launch',
    description: 'Deployment and ongoing support',
    details: [
      'Final quality assurance and testing',
      'Deploy to production environment',
      'Monitor performance and provide support',
    ],
  },
];
