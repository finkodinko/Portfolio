import { ContactBackdropCanvas } from '@/three/ContactBackdropCanvas';
import { ContactIntro } from '@/components/contact/ContactIntro';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactDetails } from '@/components/contact/ContactDetails';

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <ContactBackdropCanvas />

      <div className="relative z-10">
        <ContactIntro />

        <section className="w-full px-6 py-20 border-t border-white/10">
          <ContactForm />
        </section>

        <ContactDetails />
      </div>
    </main>
  );
}
