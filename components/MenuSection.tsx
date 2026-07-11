'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { TranslationType } from '@/lib/translations';

interface MenuItemSize {
  label: string;
  price: string;
}

interface MenuItem {
  name: string;
  price?: string;
  description?: string;
  image: string;
  subcategory?: string;
  sizes?: MenuItemSize[];
}

interface CartItem extends MenuItem {
  quantity: number;
}

type Category = 'all' | 'coldStarter' | 'saladMenu' | 'tajine' | 'traditional' | 'couscous' | 'grille' | 'sandwiches' | 'drinks';

const SUBCATEGORY_KEYS: Partial<Record<Category, string[]>> = {
  tajine: ['all', 'kefta', 'beef', 'chicken', 'fish'],
  drinks: ['all', 'gaseous', 'juice', 'water'],
};

interface MenuSectionProps {
  translations: TranslationType;
  visible: boolean;
  onBackClick: () => void;
  isArabic: boolean;
}

export function MenuSection({ translations, visible, onBackClick, isArabic }: MenuSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedItemCategory, setSelectedItemCategory] = useState('');
  const [itemQty, setItemQty] = useState(1);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const getSubLabel = (key: string, category?: string): string => {
    if (key === 'all') {
      return category === 'drinks' ? translations.drinkSubAll : translations.tajineSubAll;
    }
    const map: Record<string, string> = {
      kefta:      translations.tajineSubKefta,
      beef:       translations.tajineSubBeef,
      chicken:    translations.tajineSubChicken,
      lamb:       translations.tajineSubLamb,
      fish:       translations.tajineSubFish,
      vegetarian: translations.tajineSubVegetarian,
      gaseous:    translations.drinkSubGaseous,
      juice:      translations.drinkSubJuice,
      water:      translations.drinkSubWater,
    };
    return map[key] ?? key;
  };

  const getNumericPrice = (price?: string) => {
    if (!price) return 0;
    const normalized = price.replace(',', '.');
    const match = normalized.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  const menuItems: Record<string, MenuItem[]> = {
    coldStarter: [
      { name: 'Taktouka', price: '15,00 MAD', image: '/Taktouka.jpeg' },
      { name: 'Zaalouk', price: '15,00 MAD', image: '/Zaalouk.jpeg' },
      { name: 'Trios Nuija', price: '39,00 MAD', description: 'Salade Marocaine - Za3louk & Taktouka', image: '/Trios-Nuija.jpeg' },
    ],
    saladMenu: [
      { name: 'Salade Marocaine', price: '20,00 MAD', image: '/Salade-Marocaine.jpeg' },
      { name: 'Salade Nuija', price: '35,00 MAD', image: '/Salade-Nuija.jpeg' },
      { name: 'Trios Nuija', price: '39,00 MAD', description: 'Salade Marocaine - Za3louk & Taktouka', image: '/Trios-Nuija.jpeg' },
    ],
    tajine: [
      { name: 'Tajine Kefta au Oeufs', price: '49,00 MAD', description: 'Tajine Kefta aux oeufs et sauce Tomate', image: '/tajine-kefta-au-oeuf.jpeg', subcategory: 'kefta' },
      { name: 'Tajine Viande Hachée Kherdoula', price: '45,00 MAD', description: 'Tajine Viande Hachée Kherdoula', image: '/Tajine-Viande-Hachée-Kherdoula.jpeg', subcategory: 'kefta' },
      { name: 'Tajine de Veau aux Daghmira avec Frites', price: '49,00 MAD', description: 'Tajine de veau à la sauce daghmira avec frites', image: '/Tajine-de-Veau-aux-Daghmira-avec-Frites.jpeg', subcategory: 'beef' },
      { name: 'Tajine Boeuf au Pruneaux', price: '59,00 MAD', description: 'Tajine de boeuf aux pruneaux caramélisés', image: '/Tajine-Boeuf-au-Pruneaux.jpeg', subcategory: 'beef' },
      { name: 'Tajine Poulet au Daghmira avec Frites', price: '40,00 MAD', description: 'Tajine poulet au daghmira avec frites', image: '/Tajine-Poulet.jpeg', subcategory: 'chicken' },
      { name: 'Tajine Foie de Poulet Mcharmel', price: '35,00 MAD', description: 'Tajine foie de poulet mcharmel', image: '/tajine-featured.jpg', subcategory: 'chicken' },
      { name: 'Tajine Boulettes de Sardines', price: '44,00 MAD', description: 'Tajine boulettes de sardines', image: '/tajine-featured.jpg', subcategory: 'fish' },
    ],
    couscous: [
      { name: 'Couscous au Poulet', price: '55,00 MAD', description: 'Couscous traditionnel au poulet avec légumes', image: '/couscous.jpeg' },
      { name: 'Couscous au Boeuf', price: '65,00 MAD', description: 'Couscous traditionnel au boeuf avec légumes', image: '/couscous.jpeg' },
      { name: 'Couscous Royal', price: '75,00 MAD', description: 'Couscous royal mixte (poulet, boeuf, merguez)', image: '/couscous.jpeg' },
    ],
    traditional: [
      { name: 'Seffa Madfouna aux Poulets', price: '62,10 MAD', image: '/Seffa-Madfouna-aux-Poulets.jpeg' },
      { name: 'Seffa au Raisins Secs', price: '44,10 MAD', description: "Seffa aux cheveux d'ange", image: '/Seffa-au-raisins-Secs.jpeg' },
      { name: 'Rfissa au Poulet', price: '62,10 MAD', description: 'Rfissa, Madhoussa ou Trid au Poulet', image: '/Rfissa-au-Poulet.jpeg' },
      { name: 'Haricots', price: '25,00 MAD', description: 'Bol Haricots', image: '/Haricots.jpeg' },
      { name: 'Plat Lentilles', price: '25,00 MAD', description: 'Bol Lentilles', image: '/tajine-featured.jpg' },
      { name: 'Saykouk', price: '19,00 MAD', image: '/tajine-featured.jpg' },
      { name: 'Pain Beldi', price: '5,00 MAD', description: 'Pain Beldi', image: '/tajine-featured.jpg' },
      { name: 'Ration Frites', price: '12,00 MAD', image: '/tajine-featured.jpg' },
      { name: 'Lhem Rass Mbakher 1kg', price: '349,00 MAD', description: 'Lhem Rass de Veau Mbakher 1kg', image: '/tajine-featured.jpg' },
      { name: '500gr Lhem Rass Mbakher', price: '189,00 MAD', description: '500gr Lhem Rass de veau Mbakher', image: '/tajine-featured.jpg' },
    ],
    grille: [
      { name: 'Chad Trik', price: '249,00 MAD', description: 'Machwi kefta (avant cuisant) 400gr - Salade Marocaine - 2 Cornets frites - 2 Boissons gazeuse 25CL - 2 Mini Pains Beldi', image: '/chad-trique.png' },
      { name: 'Mchkel', image: '/mchekl.png' },
    ],
    sandwiches: [
      { name: 'Sandwich Kebda + Coca 25cl', price: '89,00 MAD', description: 'Sandwich Kebda + Coca 25cl', image: '/tajine-featured.jpg' },
      { name: 'Sandwich Lhem Rass + Coca 25cl', price: '69,00 MAD', description: 'Sandwich Lhem Rass + Coca 25cl', image: '/tajine-featured.jpg' },
      { name: 'Sandwich Kefta & Boisson Gazeuse 25cl', price: '69,00 MAD', description: 'Sandwich Viande hachée (Veau), Tomates, oignons', image: '/tajine-featured.jpg' },
      { name: 'Sandwich Brochette de Poulet & Boisson Gazeuse 25cl', price: '59,00 MAD', description: 'Sandwich Brochette de poulet & Boisson Gazeuse 25cl', image: '/tajine-featured.jpg' },
    ],
    drinks: [
      { name: "Lben A L'ancienne 33cl", price: '8,00 MAD', description: 'Lben beldi', image: '/lben.png', subcategory: 'juice' },
      { name: 'Jus Panaché 33cl', price: '35,00 MAD', image: '/Jus-Panaché-33cl.jpeg', subcategory: 'juice' },
      { name: 'Jus de Banane aux Oranges 33cl', price: '30,00 MAD', image: '/Banane-aux-Oranges.jpeg', subcategory: 'juice' },
      { name: 'Jus de Pomme aux Oranges 33cl', price: '30,00 MAD', image: '/Pomme-aux-Oranges.png', subcategory: 'juice' },
      { name: "Jus D'orange 33cl", price: '28,00 MAD', image: '/Jus-Dorange-33cl.jpeg', subcategory: 'juice' },
      { name: 'Jus de Banane au Lait 33cl', price: '28,00 MAD', image: '/Banane-au-Lait.jpeg', subcategory: 'juice' },
      { name: 'Jus De Pomme au Lait 33cl', price: '28,00 MAD', image: '/Pomme-au-Lait.jpeg', subcategory: 'juice' },
      { name: 'Boisson Énergétique 25cl', price: '23,00 MAD', description: 'Boisson Énergétique 25cl', image: '/energy-drink.png', subcategory: 'gaseous' },
      {
        name: 'Oulmes',
        description: 'Eau minérale gazeuse',
        image: '/Oulmes.png',
        subcategory: 'gaseous',
        sizes: [
          { label: '33cl', price: '10,00 MAD' },
          { label: '50cl', price: '12,00 MAD' },
          { label: '1L', price: '19,00 MAD' },
        ],
      },
      { name: 'Schweppes Mojito 25cl', price: '15,00 MAD', description: 'Schweppes Mojito Canette 25cl', image: '/mojito.png', subcategory: 'gaseous' },
      { name: 'Sidi Ali 1,5L', price: '15,00 MAD', image: '/sidi-ali.jpeg', subcategory: 'water' },
      { name: 'Hawaï Tropical 25cl', price: '13,00 MAD', description: 'Canette 25cl', image: '/hawai.png', subcategory: 'gaseous' },
      { name: 'Sodas 25cl', price: '12,00 MAD', description: 'Canette 25cl au choix : Coca-Cola, Fanta Orange, Fanta Citron, Sprite, Pepsi ou Pom’s', image: '/Canette.jpeg', subcategory: 'gaseous' },
    ],
  };

  const allCategories: Category[] = ['coldStarter', 'saladMenu', 'tajine', 'traditional', 'couscous', 'grille', 'sandwiches', 'drinks'];

  const availableSubcategories = useMemo(() => {
    if (selectedCategory === 'all') return [];
    const keys = SUBCATEGORY_KEYS[selectedCategory];
    if (!keys) return [];
    const items = menuItems[selectedCategory] || [];
    return keys.filter(k => k === 'all' || items.some(item => item.subcategory === k));
  }, [selectedCategory]);

  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const filterByCategory = (category: string) => {
      let items = menuItems[category];
      if (category === selectedCategory && selectedSubcategory !== 'all') {
        items = items.filter(item => item.subcategory === selectedSubcategory);
      }
      if (query === '') return items;
      return items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        (item.price ?? '').toLowerCase().includes(query)
      );
    };
    if (selectedCategory === 'all') {
      return Object.fromEntries(allCategories.map(cat => [cat, filterByCategory(cat)]));
    }
    return { [selectedCategory]: filterByCategory(selectedCategory) };
  }, [searchQuery, selectedCategory, selectedSubcategory]);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + getNumericPrice(i.price) * i.quantity, 0);

  const openItem = (item: MenuItem, category = '') => {
    setSelectedItemCategory(category);
    setSelectedItem(item);
    setItemQty(1);
    setSelectedSizeIndex(0);
  };

  const closeItem = () => {
    setSelectedItem(null);
    setSelectedItemCategory('');
  };

  const addToCart = () => {
    if (!selectedItem) return;
    const size = selectedItem.sizes?.[selectedSizeIndex];
    const cartName = size ? `${selectedItem.name} - ${size.label}` : selectedItem.name;
    const cartPrice = size ? size.price : selectedItem.price;
    setCart(prev => {
      const existing = prev.find(i => i.name === cartName);
      if (existing) {
        return prev.map(i => i.name === cartName ? { ...i, quantity: i.quantity + itemQty } : i);
      }
      return [...prev, { ...selectedItem, name: cartName, price: cartPrice, quantity: itemQty }];
    });
    closeItem();
  };

  const removeFromCart = (name: string) => {
    setCart(prev => prev.filter(i => i.name !== name));
  };

  const updateCartQty = (name: string, delta: number) => {
    setCart(prev =>
      prev
        .map(i => i.name === name ? { ...i, quantity: i.quantity + delta } : i)
        .filter(i => i.quantity > 0)
    );
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const lines = cart.map(i => `${i.quantity}x ${i.name} - ${i.price ?? translations.priceOnRequest}`).join('\n');
    const message = encodeURIComponent(`${translations.whatsAppOrderIntro}\n\n${lines}\n\n${translations.whatsAppOrderTotal}: ${cartTotal.toFixed(2)} MAD`);
    window.open(`https://wa.me/212607595907?text=${message}`, '_blank');
  };

  const subcategoryScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = subcategoryScrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  if (!visible) return null;

  const categoryBtn = (cat: Category, label: string) => (
    <button
      key={cat}
      onClick={() => { setSelectedCategory(cat); setSelectedSubcategory('all'); }}
      className={`px-4 py-2 rounded-sm font-semibold text-sm uppercase tracking-wider transition-all whitespace-nowrap ${
        selectedCategory === cat
          ? 'bg-primary text-black border-2 border-primary'
          : 'border-2 border-primary text-primary hover:bg-primary hover:text-black'
      }`}
    >
      {label}
    </button>
  );

  const renderSection = (key: string, label: string) => {
    const items = (filteredItems as Record<string, MenuItem[]>)[key];
    if (!items || items.length === 0) return null;
    const subKeys = SUBCATEGORY_KEYS[key as Category];
    const sectionSubcats = subKeys
      ? subKeys.filter(k => k === 'all' || menuItems[key].some(item => item.subcategory === k))
      : [];
    return (
      <div className="mb-12" key={key}>
        <h2 className="text-4xl title-section mb-1 border-b border-primary/40 pb-3">{label}</h2>
        {key === 'couscous' && (
          <p className="text-primary/70 text-xs uppercase tracking-[0.25em] font-serif mb-4">
            ✦ {translations.couscousFridayLabel} ✦
          </p>
        )}

        {sectionSubcats.length > 1 && (
          <div className="animate-subcategory-slide-down mb-6 -mx-4 px-4">
            <div ref={subcategoryScrollRef} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {sectionSubcats.map(subKey => (
                <button
                  key={subKey}
                  onClick={() => { setSelectedCategory(key as Category); setSelectedSubcategory(subKey); }}
                  className={`px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === key && selectedSubcategory === subKey
                      ? 'bg-primary text-black border border-primary shadow-md shadow-primary/30'
                      : 'border border-primary/60 text-primary/80 hover:border-primary hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  {getSubLabel(subKey, key)}
                </button>
              ))}
            </div>
            <div className="mt-2 mb-2 h-px bg-primary/20" />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => openItem(item, key)}
              className="group relative rounded-sm overflow-hidden border border-primary/20 hover:border-primary transition-all text-left active:scale-95"
            >
              <div className="relative w-full h-36">
                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-sm font-semibold text-foreground leading-tight">{item.name}</p>
                <p className="text-primary text-base price-tag">
                  {item.price
                    ?? (item.sizes ? `${translations.fromLabel} ${item.sizes[0].price}` : translations.priceOnRequest)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-black text-foreground pb-32 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="max-w-2xl mx-auto pt-24 pb-12 px-4">

        {/* Back button */}
        <button
          onClick={onBackClick}
          className="mb-8 text-primary hover:text-primary/70 transition-colors flex items-center gap-2 uppercase text-sm font-semibold"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isArabic ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} />
          </svg>
          {translations.backBtn}
        </button>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-heading text-center title-luxury mb-2">
          {translations.menuTitle}
        </h1>
        <p className="text-center text-foreground/70 mb-8">{translations.menuDescription}</p>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder={translations.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border-2 border-primary/40 focus:border-primary text-foreground placeholder-foreground/40 px-4 py-3 rounded-sm focus:outline-none transition-colors"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {categoryBtn('all', translations.allCategory)}
          {categoryBtn('coldStarter', translations.coldStarterCategory)}
          {categoryBtn('saladMenu', translations.saladMenuCategory)}
          {categoryBtn('tajine', translations.tajineCategory)}
          {categoryBtn('traditional', translations.traditionalCategory)}
          {categoryBtn('couscous', translations.couscousCategory)}
          {categoryBtn('grille', translations.grilleCategory)}
          {categoryBtn('sandwiches', translations.sandwichesCategory)}
          {categoryBtn('drinks', translations.drinksCategory)}
        </div>

        {/* Sections */}
        <div key={`${selectedCategory}-${selectedSubcategory}`} className="animate-menu-fade-in">
        {renderSection('coldStarter', translations.coldStarterCategory)}
        {renderSection('saladMenu', translations.saladMenuCategory)}
        {renderSection('tajine', translations.tajineCategory)}
        {renderSection('traditional', translations.traditionalCategory)}
        {renderSection('couscous', translations.couscousCategory)}
        {renderSection('grille', translations.grilleCategory)}
        {renderSection('sandwiches', translations.sandwichesCategory)}
        {renderSection('drinks', translations.drinksCategory)}

        {/* No results */}
        {Object.values(filteredItems).every(items => !items || items.length === 0) && (
          <div className="text-center py-12">
            <p className="text-foreground/70 text-lg">{translations.noItemsFound}</p>
          </div>
        )}
        </div>{/* end animate-menu-fade-in */}

        {/* Back button bottom */}
        <div className="flex justify-center mt-12">
          <button
            onClick={onBackClick}
            className="border-2 border-primary px-8 py-4 text-primary hover:bg-primary hover:text-black transition-all rounded-sm font-semibold text-lg uppercase tracking-wider"
          >
            {translations.backBtn}
          </button>
        </div>
      </div>

      {/* ── Item detail modal ── */}
      {selectedItem && (() => {
        const isSalad  = selectedItemCategory === 'saladMenu';
        const isTrad   = selectedItemCategory === 'traditional';
        const isDrinks = selectedItemCategory === 'drinks';
        const activePrice = selectedItem.sizes?.[selectedSizeIndex]?.price ?? selectedItem.price;

        /* ── per-category theme tokens ── */
        const theme = isSalad ? {
          backdrop:    'radial-gradient(ellipse at 50% 0%, rgba(30,74,25,0.55) 0%, rgba(5,18,5,0.95) 100%)',
          cardBg:      'linear-gradient(180deg, #f4f0e6 0%, #edeade 100%)',
          cardShadow:  '0 -32px 80px -8px rgba(0,0,0,0.5), 0 -1px 0 rgba(255,255,255,0.8)',
          ambient:     'radial-gradient(ellipse at 50% 20%, rgba(80,160,60,0.18) 0%, transparent 65%)',
          imgFilter:   'brightness(0.88) saturate(1.25) contrast(1.05)',
          imgGrad:     'linear-gradient(180deg,rgba(0,0,0,0.25) 0%,transparent 35%,transparent 50%,rgba(244,240,230,0.82) 80%,rgba(244,240,230,1) 100%)',
          closeBg:     'rgba(255,255,255,0.65)', closeBorder: '1px solid rgba(255,255,255,0.9)',
          closeIcon:   '#1a3d1a',
          badgeBg:     'linear-gradient(135deg,#276120 0%,#3d8c2e 45%,#1a4a15 100%)',
          badgeColor:  '#f0ede4',
          badgeShadow: '0 4px 20px rgba(39,97,32,0.55),inset 0 1px 0 rgba(255,255,255,0.25)',
          titleColor:  '#1a3d1a',
          descColor:   'rgba(30,70,25,0.6)',
          divLine:     'linear-gradient(to right,transparent,rgba(39,97,32,0.3),transparent)',
          qtyBg:       'rgba(39,97,32,0.08)',  qtyBorder: '1.5px solid rgba(39,97,32,0.22)',
          qtyMinus:    'rgba(30,70,25,0.45)',  qtyNum: '#1a3d1a',  qtyPlus: 'rgba(39,97,32,0.8)',
          ctaBg:       'linear-gradient(135deg,#276120 0%,#3d8c2e 45%,#1a4a15 100%)',
          ctaColor:    '#f0ede4',
          ctaShadow:   '0 6px 28px rgba(39,97,32,0.45),inset 0 1px 0 rgba(255,255,255,0.22)',
        } : isDrinks ? {
          backdrop:    'radial-gradient(ellipse at 50% 0%, rgba(15,70,180,0.62) 0%, rgba(2,5,18,0.97) 100%)',
          cardBg:      'linear-gradient(180deg, #060b1c 0%, #0a1228 100%)',
          cardShadow:  '0 -32px 80px -8px rgba(0,0,0,0.96), 0 -1px 0 rgba(77,216,255,0.14)',
          ambient:     'radial-gradient(ellipse at 50% 20%, rgba(20,110,230,0.22) 0%, transparent 65%)',
          imgFilter:   'brightness(0.78) saturate(1.2) contrast(1.06)',
          imgGrad:     'linear-gradient(180deg,rgba(0,0,0,0.42) 0%,transparent 35%,transparent 45%,rgba(6,11,28,0.88) 80%,rgba(6,11,28,1) 100%)',
          closeBg:     'rgba(77,216,255,0.12)', closeBorder: '1px solid rgba(77,216,255,0.3)',
          closeIcon:   'rgba(180,235,255,0.9)',
          badgeBg:     'linear-gradient(135deg,#0d4aa0 0%,#1868cc 45%,#09367a 100%)',
          badgeColor:  '#b8e8ff',
          badgeShadow: '0 4px 20px rgba(15,90,200,0.6),inset 0 1px 0 rgba(150,220,255,0.28)',
          titleColor:  '#aee0ff',
          descColor:   'rgba(120,190,255,0.48)',
          divLine:     'linear-gradient(to right,transparent,rgba(77,216,255,0.3),transparent)',
          qtyBg:       'rgba(77,216,255,0.07)', qtyBorder: '1.5px solid rgba(77,216,255,0.2)',
          qtyMinus:    'rgba(140,215,255,0.42)', qtyNum: '#aee0ff', qtyPlus: 'rgba(77,216,255,0.9)',
          ctaBg:       'linear-gradient(135deg,#0d4aa0 0%,#1a78d4 50%,#09367a 100%)',
          ctaColor:    '#c0eaff',
          ctaShadow:   '0 6px 28px rgba(15,90,200,0.52),inset 0 1px 0 rgba(150,220,255,0.22)',
        } : isTrad ? {
          backdrop:    'radial-gradient(ellipse at 50% 0%, rgba(130,45,8,0.65) 0%, rgba(14,4,2,0.97) 100%)',
          cardBg:      'linear-gradient(180deg, #160906 0%, #1c0c08 100%)',
          cardShadow:  '0 -32px 80px -8px rgba(0,0,0,0.95), 0 -1px 0 rgba(196,98,45,0.22)',
          ambient:     'radial-gradient(ellipse at 50% 20%, rgba(196,98,45,0.2) 0%, transparent 65%)',
          imgFilter:   'brightness(0.78) saturate(1.1) sepia(0.12) contrast(1.08)',
          imgGrad:     'linear-gradient(180deg,rgba(0,0,0,0.45) 0%,transparent 35%,transparent 45%,rgba(22,9,6,0.88) 80%,rgba(22,9,6,1) 100%)',
          closeBg:     'rgba(196,98,45,0.18)', closeBorder: '1px solid rgba(196,98,45,0.4)',
          closeIcon:   'rgba(245,195,130,0.9)',
          badgeBg:     'linear-gradient(135deg,#9e2e0e 0%,#c04a22 45%,#7a1c06 100%)',
          badgeColor:  '#f5ddb4',
          badgeShadow: '0 4px 20px rgba(160,55,18,0.65),inset 0 1px 0 rgba(255,195,130,0.3)',
          titleColor:  '#f0d4a0',
          descColor:   'rgba(240,200,148,0.48)',
          divLine:     'linear-gradient(to right,transparent,rgba(196,98,45,0.42),transparent)',
          qtyBg:       'rgba(196,98,45,0.09)', qtyBorder: '1.5px solid rgba(196,98,45,0.24)',
          qtyMinus:    'rgba(240,190,130,0.4)', qtyNum: '#f0d4a0', qtyPlus: 'rgba(196,98,45,0.85)',
          ctaBg:       'linear-gradient(135deg,#9e2e0e 0%,#c04a22 50%,#7a1c06 100%)',
          ctaColor:    '#f5ddb4',
          ctaShadow:   '0 6px 28px rgba(160,55,18,0.52),inset 0 1px 0 rgba(255,195,130,0.25)',
        } : {
          backdrop:    'radial-gradient(ellipse at 50% 0%, rgba(20,14,0,0.7) 0%, rgba(0,0,0,0.96) 100%)',
          cardBg:      'linear-gradient(180deg, #0d0d0d 0%, #111111 100%)',
          cardShadow:  '0 -32px 80px -8px rgba(0,0,0,0.9), 0 -1px 0 rgba(255,255,255,0.06)',
          ambient:     'radial-gradient(ellipse at 50% 20%, rgba(212,175,55,0.12) 0%, transparent 65%)',
          imgFilter:   'brightness(0.82) saturate(1.15) contrast(1.05)',
          imgGrad:     'linear-gradient(180deg,rgba(0,0,0,0.45) 0%,transparent 35%,transparent 45%,rgba(13,13,13,0.85) 80%,rgba(13,13,13,1) 100%)',
          closeBg:     'rgba(255,255,255,0.08)', closeBorder: '1px solid rgba(255,255,255,0.12)',
          closeIcon:   'rgba(255,255,255,0.8)',
          badgeBg:     'linear-gradient(135deg,#c8a820 0%,#f0d060 45%,#b8960c 100%)',
          badgeColor:  '#000',
          badgeShadow: '0 4px 20px rgba(212,175,55,0.55),inset 0 1px 0 rgba(255,255,255,0.35)',
          titleColor:  '#f0d060',
          descColor:   'rgba(255,255,255,0.4)',
          divLine:     'linear-gradient(to right,transparent,rgba(212,175,55,0.35),transparent)',
          qtyBg:       'rgba(255,255,255,0.05)', qtyBorder: '1px solid rgba(255,255,255,0.1)',
          qtyMinus:    'rgba(255,255,255,0.5)', qtyNum: '#ffffff', qtyPlus: 'rgba(212,175,55,0.85)',
          ctaBg:       'linear-gradient(135deg,#c8a820 0%,#f0d060 45%,#b8960c 100%)',
          ctaColor:    '#000',
          ctaShadow:   '0 6px 28px rgba(212,175,55,0.45),inset 0 1px 0 rgba(255,255,255,0.3)',
        };

        /* Moroccan zellige tile SVG pattern */
        const zellige = isTrad
          ? `url("data:image/svg+xml,${encodeURIComponent('<svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="rgba(196,98,45,0.11)" stroke-width="0.75"><path d="M22 1L43 22L22 43L1 22Z"/><path d="M22 10L34 22L22 34L10 22Z"/><line x1="22" y1="1" x2="22" y2="43"/><line x1="1" y1="22" x2="43" y2="22"/></g></svg>')}")`
          : undefined;

        return (
          <div className="fixed inset-0 z-50 flex items-end justify-center">

            {/* Backdrop */}
            <div
              className="absolute inset-0 backdrop-blur-2xl"
              style={{ background: theme.backdrop }}
              onClick={closeItem}
            />

            {/* Card */}
            <div
              className="relative w-full max-w-lg overflow-hidden"
              style={{ borderRadius: '2rem 2rem 0 0', background: theme.cardBg, boxShadow: theme.cardShadow }}
            >
              {/* Zellige overlay — traditional only */}
              {isTrad && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ backgroundImage: zellige, backgroundSize: '44px 44px', zIndex: 0 }}
                />
              )}

              {/* ── Hero image ── */}
              <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 z-0" style={{ background: theme.ambient }} />
                <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-cover z-[1]"
                  style={{ filter: theme.imgFilter }} />
                <div className="absolute inset-0 z-[2]" style={{ background: theme.imgGrad }} />
                <div className="absolute inset-0 z-[2]" style={{ background: 'radial-gradient(ellipse at 50% 50%,transparent 55%,rgba(0,0,0,0.35) 100%)' }} />

                {/* Logo */}
                <div className="absolute top-4 left-5 z-[3] flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
                    style={{ background: theme.closeBg, backdropFilter: 'blur(14px)', border: theme.closeBorder }}
                  >
                    <Image src="/logo.png" alt="Nuija Dar Tajine" width={44} height={44} className="object-contain w-full h-full" />
                  </div>
                  <span
                    className="text-xs font-heading leading-tight hidden sm:block"
                    style={{ color: theme.closeIcon, opacity: 0.85, letterSpacing: '0.04em' }}
                  >
                    Nuija Dar Tajine
                  </span>
                </div>

                {/* Close */}
                <button onClick={closeItem}
                  className="absolute top-5 right-5 z-[3] w-9 h-9 flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
                  style={{ background: theme.closeBg, backdropFilter: 'blur(14px)', border: theme.closeBorder }}
                >
                  <svg className="w-3.5 h-3.5" style={{ color: theme.closeIcon }}
                    fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Price badge */}
                <div className="absolute bottom-5 left-5 z-[3]">
                  <span className="price-tag text-base px-4 py-2 rounded-full"
                    style={{ background: theme.badgeBg, color: theme.badgeColor, boxShadow: theme.badgeShadow }}>
                    {activePrice ?? translations.priceOnRequest}
                  </span>
                </div>
              </div>

              {/* ── Content ── */}
              <div className="relative z-[1] px-6 pt-5 pb-8">

                {/* Name */}
                <h3 className="font-heading leading-tight tracking-tight"
                  style={{ fontSize: '2rem', color: theme.titleColor }}>
                  {selectedItem.name}
                </h3>

                {/* Description */}
                {selectedItem.description && (
                  <p className="text-sm leading-relaxed mt-2 font-serif" style={{ color: theme.descColor }}>
                    {selectedItem.description}
                  </p>
                )}

                {/* Divider */}
                <div className="flex items-center gap-4 my-5">
                  <div className="flex-1 h-px" style={{ background: theme.divLine }} />
                  {isSalad ? (
                    /* Leaf */
                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(39,97,32,0.65)' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 8C8 10 5.9 16.17 3.82 19.61 3.5 20.2 4.26 21 4.9 20.65 7 19.5 9 17.5 9 14c0-1 1-2 2-2s2 1 2 2c0 3.5 2 5.5 4.1 6.65.64.35 1.4-.45 1.08-1.04C16.1 16.17 14 10 17 8z" />
                    </svg>
                  ) : isTrad ? (
                    /* Moroccan 8-pointed star */
                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(196,98,45,0.78)', filter: 'drop-shadow(0 0 4px rgba(196,98,45,0.6))' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l2.5 5.5L20 5l-2.5 5.5L23 12l-5.5 1.5L20 19l-5.5-2.5L12 22l-2.5-5.5L4 19l2.5-5.5L1 12l5.5-1.5L4 5l5.5 2.5z" />
                    </svg>
                  ) : (
                    /* Gold dot */
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: '#d4af37', boxShadow: '0 0 8px rgba(212,175,55,0.9)' }} />
                  )}
                  <div className="flex-1 h-px" style={{ background: theme.divLine }} />
                </div>

                {/* Size selector */}
                {selectedItem.sizes && (
                  <div className="flex items-center gap-2 mb-5 flex-wrap">
                    <span className="text-xs uppercase tracking-wider font-semibold mr-1" style={{ color: theme.descColor }}>
                      {translations.sizeLabel}
                    </span>
                    {selectedItem.sizes.map((size, idx) => (
                      <button
                        key={size.label}
                        onClick={() => setSelectedSizeIndex(idx)}
                        className="px-4 py-2 rounded-full text-sm font-semibold transition-all active:scale-95"
                        style={
                          idx === selectedSizeIndex
                            ? { background: theme.ctaBg, color: theme.ctaColor, boxShadow: theme.ctaShadow }
                            : { background: theme.qtyBg, border: theme.qtyBorder, color: theme.qtyNum }
                        }
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Quantity + CTA */}
                <div className="flex items-center gap-3">

                  {/* Pill qty */}
                  <div className="flex items-center shrink-0 rounded-full overflow-hidden"
                    style={{ background: theme.qtyBg, border: theme.qtyBorder, backdropFilter: 'blur(8px)' }}>
                    <button onClick={() => setItemQty(q => Math.max(1, q - 1))}
                      className="w-11 h-11 flex items-center justify-center transition-colors text-xl font-light select-none"
                      style={{ color: theme.qtyMinus }}>−</button>
                    <span className="w-9 text-center text-base select-none price-tag"
                      style={{ color: theme.qtyNum }}>{itemQty}</span>
                    <button onClick={() => setItemQty(q => q + 1)}
                      className="w-11 h-11 flex items-center justify-center transition-colors text-xl font-light select-none"
                      style={{ color: theme.qtyPlus }}>+</button>
                  </div>

                  {/* CTA */}
                  <button onClick={addToCart}
                    className="flex-1 py-3.5 rounded-full font-bold text-sm uppercase tracking-[0.14em] active:scale-95 transition-transform relative overflow-hidden"
                    style={{ background: theme.ctaBg, color: theme.ctaColor, boxShadow: theme.ctaShadow }}>
                    <span className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ background: 'linear-gradient(120deg,transparent 30%,rgba(255,255,255,0.15) 50%,transparent 70%)' }} />
                    <span className="relative z-[1] flex items-center justify-center gap-2">
                      <span>{translations.addToCart}</span>
                      {activePrice && (
                        <>
                          <span className="opacity-50">·</span>
                          <span className="price-tag">{(getNumericPrice(activePrice) * itemQty).toFixed(2)} MAD</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Floating cart button ── */}
      {cartCount > 0 && !showCart && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40 px-4">
          <button
            onClick={() => setShowCart(true)}
            className="bg-primary text-black px-6 py-4 rounded-sm font-bold uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-primary/30 hover:bg-primary/90 active:scale-95 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{cartCount} {translations.cartItemsLabel}</span>
            <span className="opacity-50">·</span>
            <span className="price-tag">{cartTotal.toFixed(2)} MAD</span>
          </button>
        </div>
      )}

      {/* ── Cart bottom sheet ── */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowCart(false)} />
          <div className="relative w-full max-w-lg bg-zinc-900 rounded-t-2xl shadow-2xl max-h-[80vh] flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-primary/20">
              <h3 className="text-3xl title-card">{translations.yourOrder}</h3>
              <button
                onClick={() => setShowCart(false)}
                className="w-8 h-8 flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.map(item => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-sm overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate text-sm">{item.name}</p>
                    <p className="text-sm text-primary price-tag">
                      {item.price ? `${(getNumericPrice(item.price) * item.quantity).toFixed(2)} MAD` : translations.priceOnRequest}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateCartQty(item.name, -1)}
                      className="w-8 h-8 border border-primary/60 rounded-sm text-primary flex items-center justify-center hover:bg-primary hover:text-black transition-all text-lg leading-none"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm price-tag" style={{ color: 'var(--foreground)' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateCartQty(item.name, 1)}
                      className="w-8 h-8 border border-primary/60 rounded-sm text-primary flex items-center justify-center hover:bg-primary hover:text-black transition-all text-lg leading-none"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="w-8 h-8 flex items-center justify-center text-foreground/30 hover:text-red-500 transition-colors ml-1"
                      aria-label="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 pb-8 pt-4 border-t border-primary/20">
              <div className="flex justify-between items-center mb-5">
                <span className="text-foreground/70 uppercase text-sm tracking-wider">{translations.total}</span>
                <span className="text-2xl text-primary price-tag">{cartTotal.toFixed(2)} MAD</span>
              </div>
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-primary text-black py-4 font-bold text-base uppercase tracking-widest rounded-sm hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.025 0-2.02-.315-2.884-.9-.738-.478-1.338-1.162-1.738-2.008-.399-.846-.608-1.75-.608-2.67 0-2.11 1.718-3.827 3.83-3.827 1.022 0 1.982.314 2.829.889.74.479 1.34 1.163 1.74 2.01.399.846.609 1.75.609 2.671 0 2.11-1.718 3.827-3.83 3.827m3.83-10.406c-1.37 0-2.65.525-3.612 1.48-1.96 1.961-1.96 5.15 0 7.111 1.962 1.96 5.15 1.96 7.111 0 1.96-1.961 1.96-5.15 0-7.111-.962-.955-2.242-1.48-3.612-1.48" />
                </svg>
                {translations.orderViaWhatsApp}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
