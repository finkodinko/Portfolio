import { ProcessIntro } from '@/components/process/ProcessIntro';
import { CapabilitiesGrid } from '@/components/process/CapabilitiesGrid';
import { ProcessStepper } from '@/components/process/ProcessStepper';

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-black">
      <ProcessIntro />
      <CapabilitiesGrid />
      <ProcessStepper />
    </main>
  );
}
