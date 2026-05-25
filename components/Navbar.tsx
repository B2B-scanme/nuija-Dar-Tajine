'use client';

import Image from 'next/image';
import { Language } from '@/lib/translations';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Navbar({ currentLanguage, onLanguageChange }: NavbarProps) {
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'AR' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 bg-gradient-to-b from-black/80 to-transparent">
      {/* ← LOGO: top-left of navbar */}
      <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
        <Image
          src="/logo.png"
          alt="Nuija Dar Tajine logo"
          fill
          className="object-contain drop-shadow-lg"
          priority
        />
      </div>

      {/* Language switcher: top-right */}
      <div className="flex gap-1.5">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`px-3 py-1 rounded-sm text-xs font-bold tracking-wider transition-all border-2 ${
              currentLanguage === lang.code
                ? 'border-primary text-primary bg-primary/10'
                : 'border-primary/30 text-primary/50 hover:border-primary/60 hover:text-primary/80'
            }`}
          >
            {lang.code.toUpperCase()}
          </button>
        ))}
      </div>
    </nav>
  );
}
