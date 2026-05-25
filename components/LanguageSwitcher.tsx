'use client';

import { Language } from '@/lib/translations';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onChange: (language: Language) => void;
}

export function LanguageSwitcher({ currentLanguage, onChange }: LanguageSwitcherProps) {
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'AR' },
  ];

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          className={`px-3 py-1 rounded-sm text-sm font-semibold transition-all border-2 ${
            currentLanguage === lang.code
              ? 'border-primary text-primary bg-primary/10'
              : 'border-primary/30 text-primary/60 hover:border-primary/60 hover:text-primary/80'
          }`}
          aria-label={`Switch to ${lang.label}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
