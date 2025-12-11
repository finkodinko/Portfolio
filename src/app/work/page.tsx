import { WorkIntro } from '@/components/work/WorkIntro';
import { ProjectGrid } from '@/components/work/ProjectGrid';
import { ProjectDetailOverlay } from '@/components/work/ProjectDetailOverlay';

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-black">
      <WorkIntro />
      <ProjectGrid />
      <ProjectDetailOverlay />
    </main>
  );
}
