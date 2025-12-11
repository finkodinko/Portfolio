# Creative Studio - Work Page

A cinematic projects index with animated detail overlay built with Next.js 14, React Three Fiber, and GSAP.

## Features

- **Responsive Project Grid**: 3-column desktop, 2-column tablet, 1-column mobile layout
- **3D Project Previews**: Each project features a unique 3D visualization with Three.js
- **Animated Details Overlay**: Full-screen modal with smooth transitions
- **GSAP Animations**: ScrollTrigger-based reveals and staggered animations
- **Keyboard Navigation**: Full keyboard support with Tab, Enter, and ESC keys
- **Accessible**: WCAG-compliant interactive elements

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **3D Graphics**: React Three Fiber, Three.js, @react-three/drei
- **Animation**: GSAP with ScrollTrigger
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **Language**: TypeScript

## Project Structure

```
src/
├── app/
│   ├── work/
│   │   └── page.tsx          # Work page route
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/
│   └── work/
│       ├── WorkIntro.tsx           # Intro section with animated text
│       ├── ProjectGrid.tsx         # Responsive project grid
│       ├── ProjectCard.tsx         # Individual project cards
│       └── ProjectDetailOverlay.tsx # Full-screen project details
├── three/
│   └── ProjectPreviewCanvas.tsx # 3D canvas component
├── state/
│   └── useAppStore.ts        # Zustand store
└── content/
    └── projects.ts           # Project data and TypeScript types
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/work](http://localhost:3000/work) to view the work page.

## Building for Production

```bash
npm run build
npm start
```

## Project Data

Projects are defined in `src/content/projects.ts` with the following schema:

```typescript
interface Project {
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
```

## License

MIT
