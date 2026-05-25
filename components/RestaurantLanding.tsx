'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TranslationType } from '@/lib/translations';

interface RestaurantLandingProps {
  translations: TranslationType;
  onMenuClick: () => void;
  isArabic: boolean;
}

export function RestaurantLanding({ translations, onMenuClick, isArabic }: RestaurantLandingProps) {
  const [showAbout, setShowAbout] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(translations.whatsAppMessage);
    window.open(`https://wa.me/212607595907?text=${message}`, '_blank');
  };

  return (
    <div className={`h-full flex flex-col bg-black text-foreground ${isArabic ? 'rtl' : 'ltr'}`}>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md overflow-y-auto">
          <div className="min-h-full flex items-start justify-center px-5 py-14">
            <div className="w-full max-w-2xl">

              <button
                onClick={() => setShowAbout(false)}
                className="fixed top-5 right-5 text-primary/60 hover:text-primary transition-colors z-10"
                aria-label={translations.closeBtn}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center mb-10">
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex-1 h-px bg-primary/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  <div className="flex-1 h-px bg-primary/30" />
                </div>
                <h2 className="text-5xl md:text-6xl title-luxury mb-2">
                  {translations.aboutTitle}
                </h2>
                <p className="text-primary/50 text-xs uppercase tracking-[0.3em] font-serif">
                  {translations.aboutSubtitle}
                </p>
                <div className="flex items-center gap-4 mt-5">
                  <div className="flex-1 h-px bg-primary/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  <div className="flex-1 h-px bg-primary/30" />
                </div>
              </div>

              <p className="text-foreground/80 leading-loose font-serif text-base">
                {translations.aboutText}
              </p>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex-1 h-px bg-primary/20" />
                <span className="text-primary/30 text-xs tracking-[0.3em] uppercase font-serif">{translations.aboutFooter}</span>
                <div className="flex-1 h-px bg-primary/20" />
              </div>

              <div className="mt-7 flex justify-center">
                <button
                  onClick={() => setShowAbout(false)}
                  className="border border-primary/40 px-8 py-3 text-primary/70 hover:border-primary hover:text-primary active:scale-95 transition-all rounded-sm text-sm uppercase tracking-widest font-serif"
                >
                  {translations.closeBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full flex-1">
        <Image src="/tajine-featured.jpg" alt="Featured Tajine Dish" fill className="object-cover md:object-contain md:object-top opacity-65" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center pb-5 px-4">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-heading text-center title-luxury leading-none mb-1">
            {translations.restaurantName}
          </h1>
          <p className="text-primary/70 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-serif">
            {translations.subtitle}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center px-5 pt-3 pb-4 shrink-0">
        <div className="flex items-center gap-3 mb-3 w-full max-w-xs">
          <div className="flex-1 h-px bg-primary/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          <div className="flex-1 h-px bg-primary/30" />
        </div>
        <div className="flex flex-col gap-2 w-full max-w-sm">

          <button onClick={onMenuClick} className="w-full bg-primary text-black px-8 py-3 font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all shadow-lg shadow-primary/20 font-serif">
            {translations.viewMenuBtn}
          </button>

          <button onClick={handleWhatsAppClick} className="w-full border-2 border-primary px-8 py-3 text-primary hover:bg-primary hover:text-black active:scale-95 transition-all rounded-sm font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 font-serif">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {translations.orderWhatsAppBtn}
          </button>

          <div className="flex gap-2">
            <a href="https://www.instagram.com/nuija_patisse" target="_blank" rel="noopener noreferrer" className="flex-1 border border-primary/70 px-3 py-3 text-primary hover:border-primary hover:bg-primary/10 active:scale-95 transition-all rounded-sm text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 group font-serif" aria-label="Instagram">
              <svg className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Instagram
            </a>
            <a href="https://www.tiktok.com/@nuijadartajine?_r=1&_t=ZS-96XcP76WaqV" target="_blank" rel="noopener noreferrer" className="flex-1 border border-primary/70 px-3 py-3 text-primary hover:border-primary hover:bg-primary/10 active:scale-95 transition-all rounded-sm text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 group font-serif" aria-label="TikTok">
              <svg className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.15 8.15 0 004.78 1.52V6.82a4.85 4.85 0 01-1.01-.13z" />
              </svg>
              TikTok
            </a>
          </div>

          <button onClick={() => setShowAbout(true)} className="w-full border border-primary/60 px-8 py-3 text-primary/90 hover:border-primary hover:text-primary hover:bg-primary/5 active:scale-95 transition-all rounded-sm text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2 group font-serif">
            <svg className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {translations.aboutBtn}
          </button>

          <a href="https://www.google.com/maps/place/Nuija+Dar+Tajine/@34.2637078,-6.6135888,17z/data=!3m1!4b1!4m6!3m5!1s0xda7597b34969989:0x4d1ca75134ce467b!8m2!3d34.2637078!4d-6.6135888!16s%2Fg%2F11p5fxyplj?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="w-full border border-primary/50 px-6 py-3 text-primary/70 hover:border-primary/80 hover:text-primary active:scale-95 transition-all rounded-sm text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2 font-serif">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {translations.addressLabel}
          </a>
        </div>
      </div>
    </div>
  );
}