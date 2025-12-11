import { StudioBackdropCanvas } from '@/three/StudioBackdropCanvas';
import { StudioIntro } from '@/components/studio/StudioIntro';
import { StudioTimeline } from '@/components/studio/StudioTimeline';
import { StudioPrinciples } from '@/components/studio/StudioPrinciples';

export default function StudioPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <StudioBackdropCanvas />
      
      <div className="relative z-10">
        <StudioIntro />
        <StudioTimeline />
        <StudioPrinciples />
      </div>
    </main>
  );
}
