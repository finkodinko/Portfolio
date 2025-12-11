# Creative Studio - Interactive Portfolio

A cinematic portfolio and studio website showcasing interactive projects and capabilities. Built with cutting-edge web technologies including Next.js, React Three Fiber, GSAP, and Lenis smooth scrolling.

## Features

### Pages

- **Home** - Hero section with featured intro and CTA
- **Work** - Cinematic projects grid with 3D previews and interactive detail overlay
- **Studio** - Narrative about the studio with timeline and principles
- **Process** - Capabilities overview and step-by-step process visualization
- **Contact** - Contact form with validation and detailed contact information

### Technology Highlights

- **Real-time 3D Graphics** - React Three Fiber (R3F) for WebGL rendering
- **Advanced Animations** - GSAP with ScrollTrigger for scroll-based effects
- **Smooth Scrolling** - Lenis for enhanced scroll experience
- **State Management** - Zustand for simple, efficient state
- **Responsive Design** - Mobile-first approach with full responsiveness
- **Performance** - Device tier detection and adaptive rendering
- **Accessibility** - Keyboard navigation, ARIA labels, reduced motion support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **3D Graphics**: React Three Fiber, Three.js, @react-three/drei, @react-three/postprocessing
- **Animation**: GSAP with ScrollTrigger
- **Smooth Scrolling**: Lenis
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **Fonts**: Geist Sans & Mono (via next/font/google)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with navigation
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── work/
│   │   └── page.tsx             # Work page
│   ├── studio/
│   │   └── page.tsx             # Studio page
│   ├── process/
│   │   └── page.tsx             # Process page
│   └── contact/
│       └── page.tsx             # Contact page
├── components/
│   ├── Navigation.tsx           # Global navigation
│   ├── RootClient.tsx          # Client-side root setup (Lenis, device detection)
│   ├── work/
│   │   ├── WorkIntro.tsx       # Work page intro section
│   │   ├── ProjectGrid.tsx     # Responsive project grid
│   │   ├── ProjectCard.tsx     # Individual project card
│   │   └── ProjectDetailOverlay.tsx # Full-screen project modal
│   ├── studio/
│   │   ├── StudioIntro.tsx     # Studio intro section
│   │   ├── StudioTimeline.tsx  # Timeline component
│   │   └── StudioPrinciples.tsx # Principles grid
│   ├── process/
│   │   ├── ProcessIntro.tsx    # Process intro
│   │   ├── CapabilitiesGrid.tsx # Capabilities overview
│   │   └── ProcessStepper.tsx  # Interactive process steps
│   └── contact/
│       ├── ContactIntro.tsx    # Contact intro
│       ├── ContactForm.tsx     # Contact form with validation
│       └── ContactDetails.tsx  # Contact information
├── three/
│   ├── ProjectPreviewCanvas.tsx  # 3D project preview scenes
│   ├── ProcessVizCanvas.tsx      # Process step visualization
│   ├── StudioBackdropCanvas.tsx  # Studio page backdrop
│   └── ContactBackdropCanvas.tsx # Contact page backdrop
├── content/
│   ├── projects.ts              # Project data and types
│   ├── studioTimeline.ts        # Studio timeline data
│   ├── studioPrinciples.ts      # Studio principles data
│   └── process.ts               # Process and capabilities data
├── state/
│   └── useAppStore.ts           # Zustand store (projects, device tier, reduced motion)
└── hooks/
    └── useDeviceDetection.ts    # Device tier and reduced motion detection

```

## Adding New Projects

Edit `src/content/projects.ts`:

```typescript
{
  id: 'unique-id',
  title: 'Project Title',
  subtitle: 'Short description',
  year: 2024,
  tags: ['Tag1', 'Tag2', 'Tag3'],
  summary: 'Detailed project summary...',
  role: 'Your role in the project',
  link?: 'https://optional-link.com',
  accentColor?: '#00ff88', // Cyan, Pink, or custom hex
}
```

## Customization Guide

### Color Scheme

Primary colors are defined in `src/app/globals.css`:
- **Background**: `#000000` (black)
- **Foreground**: `#ffffff` (white)
- **Accent Cyan**: `#00ffff`
- **Accent Pink**: `#ff0088`

Project accent colors can be customized per project in the `projects` array.

### Typography

- **Headline Font**: Geist Sans (light weight)
- **Body Font**: Geist Sans
- **Monospace Font**: Geist Mono (for numbers/dates)

Adjust font sizes and weights in individual components as needed.

### Animation Behavior

All GSAP animations respect `prefers-reduced-motion` media query. Users with reduced motion enabled will see simplified animations.

Lenis smooth scrolling can be disabled by removing it from `src/components/RootClient.tsx`.

## Device Tier System

The app automatically detects device capabilities and adjusts rendering:

- **High Tier**: All effects, 60fps animations, full particle counts
- **Medium Tier**: Reduced postprocessing, ~50fps animations
- **Low Tier**: Minimal effects, static fallbacks for heavy scenes

Detection is based on:
- CPU cores (`navigator.hardwareConcurrency`)
- Device memory (`navigator.deviceMemory`)
- Estimated FPS during initialization

Access device tier in components:
```typescript
const deviceTier = useAppStore((state) => state.deviceTier);
```

## Reduced Motion Support

The app fully respects `prefers-reduced-motion`:
- Background 3D animations are minimal or static
- Large scroll-based animations become simple fades
- All transitions have minimum duration

Enable in OS settings:
- **macOS**: System Preferences → Accessibility → Display → Reduce motion
- **Windows**: Settings → Ease of Access → Display → Show animations
- **iOS**: Settings → Accessibility → Motion → Reduce Motion
- **Android**: Settings → Accessibility → Remove animations

## Keyboard Navigation

All interactive elements are keyboard accessible:
- **Tab**: Navigate between elements
- **Enter/Space**: Activate buttons and open modals
- **Escape**: Close overlays and modals
- **Arrow Keys**: Navigate form inputs

## Form Handling

The contact form includes:
- Client-side validation (name, email, project type)
- Accessible input labels and error messages
- Success state with option to send another message
- No backend integration (ready for your implementation)

To add backend integration, modify `ContactForm.tsx` to handle the form submission in the `handleSubmit` function.

## Performance Optimization

- Static page generation for all routes
- Optimized 3D geometries with low poly counts
- Lazy-loaded components
- CSS transforms for animations (GPU accelerated)
- Image optimization via Next.js Image component
- Efficient Zustand state updates

## Browser Support

Targets modern browsers with:
- ES2017+ JavaScript support
- WebGL for 3D graphics
- CSS Grid and Flexbox
- CSS Custom Properties
- CSS Transforms

Tested on:
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

- WCAG 2.1 Level AA compliant
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators visible
- Color contrast ratios meet standards
- Reduced motion support
- Form validation and error messages

## Development

### Code Style

- Functional React components with TypeScript
- Client components marked with `'use client'`
- TailwindCSS utilities for styling
- Consistent naming conventions
- ESLint configuration for code quality

### Linting

```bash
npm run lint
```

The project uses ESLint with Next.js configuration. No automatic fixes are performed; all issues must be addressed manually to ensure code quality.

## Deployment

The project is ready to deploy to any Node.js hosting platform:

- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Self-hosted server

### Environment Variables

Create `.env.local` (not version controlled):
```
# Add any required environment variables here
# (Currently the app has no backend requirements)
```

## Future Enhancements

- CMS integration for dynamic project data
- Analytics tracking
- Email notification for contact form submissions
- Project filtering by tag
- Advanced 3D scenes per project
- View transitions API for page transitions
- Dark mode toggle (currently dark-only)
- Multi-language support

## License

MIT - Feel free to use this as a template for your own studio portfolio.

## Support

For issues, questions, or feedback, please open an issue or contact us through the contact page.

---

Built with ❤️ for creative studios and digital craftspeople.
