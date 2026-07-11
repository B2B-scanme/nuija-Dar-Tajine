export type Language = 'en' | 'fr' | 'ar';

export interface TranslationType {
  // Brand
  restaurantName: string;
  subtitle: string;
  // Info
  openLabel: string;
  openDays: string;
  hoursLabel: string;
  hours: string;
  addressLabel: string;
  address: string;
  // Landing buttons
  viewMenuBtn: string;
  orderWhatsAppBtn: string;
  aboutBtn: string;
  whatsAppMessage: string;
  // Category labels
  allCategory: string;
  coldStarterCategory: string;
  saladMenuCategory: string;
  tajineCategory: string;
  traditionalCategory: string;
  couscousCategory: string;
  couscousFridayLabel: string;
  grilleCategory: string;
  sandwichesCategory: string;
  drinksCategory: string;
  // Menu UI
  menuTitle: string;
  menuDescription: string;
  backBtn: string;
  searchPlaceholder: string;
  // Cart UI
  yourOrder: string;
  total: string;
  addToCart: string;
  orderViaWhatsApp: string;
  priceOnRequest: string;
  // About modal
  closeBtn: string;
  aboutTitle: string;
  aboutSubtitle: string;
  aboutText: string;
  aboutFooter: string;
  // Tajine subcategories
  tajineSubAll: string;
  tajineSubKefta: string;
  tajineSubBeef: string;
  tajineSubChicken: string;
  tajineSubLamb: string;
  tajineSubFish: string;
  tajineSubVegetarian: string;
  // Drinks subcategories
  drinkSubAll: string;
  drinkSubGaseous: string;
  drinkSubJuice: string;
  drinkSubWater: string;
  // Extra UI
  noItemsFound: string;
  cartItemsLabel: string;
  whatsAppOrderIntro: string;
  whatsAppOrderTotal: string;
  // Size selection
  sizeLabel: string;
  fromLabel: string;
}

export const translations: Record<Language, TranslationType> = {
  en: {
    restaurantName: 'Nuija Dar Tajine',
    subtitle: 'Authentic Moroccan Cuisine in Kénitra',
    openLabel: 'Open',
    openDays: '7 days a week',
    hoursLabel: 'Hours',
    hours: '12:30 - 23:00',
    addressLabel: 'Location',
    address: 'Bd C, Kénitra',
    viewMenuBtn: 'View Menu',
    orderWhatsAppBtn: 'Order via WhatsApp',
    aboutBtn: 'About Us',
    whatsAppMessage: 'Hello! I would like to place an order.',
    allCategory: 'All',
    coldStarterCategory: 'Cold Starters',
    saladMenuCategory: 'Salads',
    tajineCategory: 'Tajine',
    traditionalCategory: 'Traditional',
    couscousCategory: 'Couscous',
    couscousFridayLabel: 'Special for Friday',
    grilleCategory: 'Charcoal Grilled',
    sandwichesCategory: 'Sandwiches',
    drinksCategory: 'Drinks',
    menuTitle: 'Our Menu',
    menuDescription: 'Discover our authentic Moroccan dishes',
    backBtn: 'Back to Restaurant',
    searchPlaceholder: 'Search…',
    yourOrder: 'Your Order',
    total: 'Total',
    addToCart: 'Add to Cart',
    orderViaWhatsApp: 'Order via WhatsApp',
    priceOnRequest: 'Price on request',
    closeBtn: 'Close',
    aboutTitle: 'About',
    aboutSubtitle: 'Nuija Dar Tajine',
    aboutText: 'Nuija Dar Tajine is a Moroccan restaurant and patisserie open since 2022, located between the city centre of Kénitra (3 km) and Mahdia Beach (4 km). We invite you to come and enjoy Moroccan cuisine rich in flavours, with a variety of salads, tajines, couscous and wood-fired grills, while sipping a mint tea in a warm and typically Moroccan setting.',
    aboutFooter: 'Kénitra, Morocco',
    tajineSubAll: 'All Tajines',
    tajineSubKefta: 'Kefta (Ground Meat)',
    tajineSubBeef: 'Beef',
    tajineSubChicken: 'Chicken',
    tajineSubLamb: 'Lamb',
    tajineSubFish: 'Fish',
    tajineSubVegetarian: 'Vegetarian',
    noItemsFound: 'No items found.',
    cartItemsLabel: 'items',
    whatsAppOrderIntro: 'Hello! I would like to order:',
    whatsAppOrderTotal: 'Total',
    drinkSubAll: 'All Drinks',
    drinkSubGaseous: 'Gaseous',
    drinkSubJuice: 'Juice',
    drinkSubWater: 'Water',
    sizeLabel: 'Size',
    fromLabel: 'From',
  },
  fr: {
    restaurantName: 'Nuija Dar Tajine',
    subtitle: 'Cuisine marocaine authentique à Kénitra',
    openLabel: 'Ouvert',
    openDays: '7j/7',
    hoursLabel: 'Horaires',
    hours: '12h30 - 23h00',
    addressLabel: 'Localisation',
    address: 'Bd C, Kénitra',
    viewMenuBtn: 'Voir le Menu',
    orderWhatsAppBtn: 'Commander sur WhatsApp',
    aboutBtn: 'Qui sommes-nous ?',
    whatsAppMessage: 'Bonjour ! Je voudrais passer une commande.',
    allCategory: 'Tout',
    coldStarterCategory: 'Entrées Froides',
    saladMenuCategory: 'Salades',
    tajineCategory: 'Tajine',
    traditionalCategory: 'Traditionnel',
    couscousCategory: 'Couscous',
    couscousFridayLabel: 'Spécial Vendredi',
    grilleCategory: 'Grillé au Charbon',
    sandwichesCategory: 'Sandwiches',
    drinksCategory: 'Boissons',
    menuTitle: 'Notre Menu',
    menuDescription: 'Découvrez nos plats marocains authentiques',
    backBtn: 'Retour au Restaurant',
    searchPlaceholder: 'Rechercher…',
    yourOrder: 'Votre Commande',
    total: 'Total',
    addToCart: 'Ajouter au Panier',
    orderViaWhatsApp: 'Commander sur WhatsApp',
    priceOnRequest: 'Prix sur demande',
    closeBtn: 'Fermer',
    aboutTitle: 'À propos',
    aboutSubtitle: 'Nuija Dar Tajine',
    aboutText: "Nuija Dar Tajine est un restau/Patisserie Marocain ouvert depuis 2022, situé entre Le centre ville de Kénitra (3Km) et Mahdia Plage (4km). Nous vous invitons à venir déguster une cuisine Marocaine, riche en saveurs, avec des variétés de salades, Tajines, Couscous et Grillades au feu de bois, tout en sirotant un thé à la menthe dans un cadre typique et une ambiance conviviale.",
    aboutFooter: 'Kénitra, Maroc',
    tajineSubAll: 'Tous les Tajines',
    tajineSubKefta: 'Kefta (Viande Hachée)',
    tajineSubBeef: 'Boeuf',
    tajineSubChicken: 'Poulet',
    tajineSubLamb: 'Agneau',
    tajineSubFish: 'Poisson',
    tajineSubVegetarian: 'Végétarien',
    noItemsFound: 'Aucun article trouvé.',
    cartItemsLabel: 'articles',
    whatsAppOrderIntro: 'Bonjour ! Je voudrais commander :',
    whatsAppOrderTotal: 'Total',
    drinkSubAll: 'Toutes les Boissons',
    drinkSubGaseous: 'Gazeuses',
    drinkSubJuice: 'Jus',
    drinkSubWater: 'Eau',
    sizeLabel: 'Taille',
    fromLabel: 'À partir de',
  },
  ar: {
    restaurantName: 'نويجة دار تاجين',
    subtitle: 'المطبخ المغربي الأصيل بقنيطرة',
    openLabel: 'مفتوح',
    openDays: '7 أيام بالأسبوع',
    hoursLabel: 'الساعات',
    hours: '12:30 - 23:00',
    addressLabel: 'الموقع',
    address: 'البلفيدير، قنيطرة',
    viewMenuBtn: 'عرض القائمة',
    orderWhatsAppBtn: 'اطلب عبر واتس آب',
    aboutBtn: 'من نحن؟',
    whatsAppMessage: 'مرحباً! أود تقديم طلب.',
    allCategory: 'الكل',
    coldStarterCategory: 'مقبلات باردة',
    saladMenuCategory: 'السلطات',
    tajineCategory: 'طاجين',
    traditionalCategory: 'تقليدي',
    couscousCategory: 'كسكس',
    couscousFridayLabel: 'خاص ليوم الجمعة',
    grilleCategory: 'مشوي على الفحم',
    sandwichesCategory: 'سندويشات',
    drinksCategory: 'المشروبات',
    menuTitle: 'قائمتنا',
    menuDescription: 'اكتشف أطباقنا المغربية الأصيلة',
    backBtn: 'العودة إلى المطعم',
    searchPlaceholder: 'بحث…',
    yourOrder: 'طلبك',
    total: 'المجموع',
    addToCart: 'أضف إلى السلة',
    orderViaWhatsApp: 'اطلب عبر واتس آب',
    priceOnRequest: 'السعر عند الطلب',
    closeBtn: 'إغلاق',
    aboutTitle: 'عن المطعم',
    aboutSubtitle: 'نويجة دار تاجين',
    aboutText: 'نويجة دار تاجين مطعم وحلواني مغربي مفتوح منذ 2022، يقع بين وسط مدينة قنيطرة (3 كم) وشاطئ مهدية (4 كم). ندعوكم للتفضل بتذوق المطبخ المغربي الغني بنكهاته، مع تشكيلة من السلطات والطواجن والكسكس والمشويات على الفحم، مع كأس أتاي في إطار أصيل وأجواء مرحبة.',
    aboutFooter: 'قنيطرة، المغرب',
    tajineSubAll: 'كل الطواجن',
    tajineSubKefta: 'كفتة (لحم مفروم)',
    tajineSubBeef: 'لحم البقر',
    tajineSubChicken: 'دجاج',
    tajineSubLamb: 'لحم الغنم',
    tajineSubFish: 'سمك',
    tajineSubVegetarian: 'نباتي',
    noItemsFound: 'لا توجد عناصر.',
    cartItemsLabel: 'عناصر',
    whatsAppOrderIntro: 'مرحباً! أود الطلب:',
    whatsAppOrderTotal: 'المجموع',
    drinkSubAll: 'كل المشروبات',
    drinkSubGaseous: 'غازية',
    drinkSubJuice: 'عصائر',
    drinkSubWater: 'ماء',
    sizeLabel: 'الحجم',
    fromLabel: 'ابتداءً من',
  },
};

export const getTranslations = (language: Language): TranslationType => {
  return translations[language] || translations.en;
};