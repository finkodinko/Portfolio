import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-6xl md:text-8xl font-light text-white">
          Creative Studio
        </h1>
        <p className="text-xl text-white/60">
          Digital artifacts crafted with intention
        </p>
        <Link
          href="/work"
          className="inline-block px-8 py-4 border border-white/20 rounded-full text-white hover:bg-white/10 transition-all duration-300"
        >
          View Work
        </Link>
      </div>
    </main>
  );
}
