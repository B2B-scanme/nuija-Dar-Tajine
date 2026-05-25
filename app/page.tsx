'use client';

import { useState, useEffect } from 'react';
import { RestaurantLanding } from '@/components/RestaurantLanding';
import { MenuSection } from '@/components/MenuSection';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Language, getTranslations } from '@/lib/translations';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [showMenu, setShowMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    const html = document.documentElement;
    html.setAttribute('lang', language);
    html.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [language]);

  useEffect(() => {
    document.body.style.overflow = showMenu ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [showMenu]);

  if (!mounted) return null;

  const translations = getTranslations(language);
  const isArabic = language === 'ar';

  const handleMenuClick = () => {
    setShowMenu(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackClick = () => {
    setShowMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className={`bg-black flex flex-col ${!showMenu ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      {/* ← NAVBAR: logo top-left + language switcher top-right */}
      <Navbar currentLanguage={language} onLanguageChange={setLanguage} />

      <div className="flex-1 overflow-hidden">
        {!showMenu ? (
          <RestaurantLanding
            translations={translations}
            onMenuClick={handleMenuClick}
            isArabic={isArabic}
          />
        ) : (
          <MenuSection
            translations={translations}
            visible={showMenu}
            onBackClick={handleBackClick}
            isArabic={isArabic}
          />
        )}
      </div>

      {/* ← FOOTER: logo centered */}
      <Footer />
    </main>
  );
}
