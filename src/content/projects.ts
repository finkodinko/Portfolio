export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  tags: string[];
  summary: string;
  role: string;
  link?: string;
  accentColor?: string;
}

export const projects: Project[] = [
  {
    id: 'kinetic-identity',
    title: 'Kinetic Identity',
    subtitle: 'Modular brand system',
    year: 2024,
    tags: ['Branding', '3D Design', 'Motion'],
    summary: 'Animated identity system with modular 3D components that adapt across digital touchpoints. Built for a forward-thinking tech studio, the system merges generative design with cinematic motion principles.',
    role: 'Creative Direction, 3D Design',
    accentColor: '#00ff88',
  },
  {
    id: 'vr-architecture',
    title: 'Spatial Synthesis',
    subtitle: 'Immersive VR experience',
    year: 2024,
    tags: ['VR', 'Architecture', 'Interactive'],
    summary: 'Immersive VR environment blending architecture and motion design. Users navigate through impossible geometries and atmospheric soundscapes, creating a meditative journey through constructed space.',
    role: 'Experience Design, Environment Art',
    accentColor: '#00d4ff',
  },
  {
    id: 'realtime-viz',
    title: 'Phantom Engine',
    subtitle: 'Production visualization tool',
    year: 2023,
    tags: ['Real-time', 'Tool Development', '3D'],
    summary: 'Real-time 3D visualization tool for cinematic production teams. Enables directors and cinematographers to preview complex sequences with lighting, camera movement, and spatial blocking in an interactive environment.',
    role: 'Technical Direction, UI/UX Design',
    accentColor: '#ff00ff',
  },
  {
    id: 'interactive-brand',
    title: 'Nexus Interactive',
    subtitle: 'Brand experience platform',
    year: 2024,
    tags: ['Web', 'Interactive', 'Brand'],
    summary: 'Interactive brand system for a forward-thinking tech studio. Features responsive 3D elements, fluid transitions, and a sophisticated design language that adapts to user interaction and context.',
    role: 'Creative Direction, Frontend Development',
    accentColor: '#ffaa00',
  },
  {
    id: 'motion-system',
    title: 'Cascade',
    subtitle: 'Motion graphics framework',
    year: 2023,
    tags: ['Motion', 'Design System', 'Toolkit'],
    summary: 'Comprehensive motion graphics system designed for scalability and creative expression. Includes a library of animated components, transitions, and effects that maintain brand consistency across platforms.',
    role: 'Motion Design, System Architecture',
    accentColor: '#00ffff',
  },
  {
    id: 'ai-installation',
    title: 'Neural Canvas',
    subtitle: 'AI-driven art installation',
    year: 2024,
    tags: ['AI', 'Installation', 'Generative'],
    summary: 'Large-scale installation combining machine learning and physical computing. Generative visuals respond to environmental data and audience presence, creating ever-evolving abstract compositions.',
    role: 'Creative Technologist, Visual Development',
    accentColor: '#ff0088',
  },
  {
    id: 'spatial-audio',
    title: 'Resonance',
    subtitle: 'Spatial audio experience',
    year: 2023,
    tags: ['Audio', 'Interactive', 'WebXR'],
    summary: 'WebXR experience exploring spatial audio and visual synchronization. Users navigate sound fields where abstract visual forms respond to frequency, amplitude, and spatial positioning in real-time.',
    role: 'Experience Design, Audio Development',
    accentColor: '#0088ff',
  },
  {
    id: 'data-sculpture',
    title: 'Flux Monument',
    subtitle: 'Data visualization sculpture',
    year: 2024,
    tags: ['Data Viz', '3D', 'Interactive'],
    summary: 'Dynamic data sculpture that transforms complex datasets into intuitive 3D forms. Real-time updates flow through the structure, making abstract information tangible and visually compelling.',
    role: 'Data Visualization, 3D Design',
    accentColor: '#88ff00',
  },
];
