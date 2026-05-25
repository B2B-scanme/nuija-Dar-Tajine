import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-black border-t border-primary/10 py-3 px-5 flex items-center justify-center gap-3">
      <div className="relative w-8 h-8 shrink-0">
        <Image
          src="/logo.png"
          alt="Nuija Dar Tajine logo"
          fill
          className="object-contain opacity-70"
        />
      </div>
      <p className="text-primary/30 text-xs uppercase tracking-[0.2em] font-serif">
        © {new Date().getFullYear()} Nuija Dar Tajine
      </p>
    </footer>
  );
}
