import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Header
    home: 'Home',
    products: 'Products',
    about: 'About Us',
    contact: 'Contact',
    cart: 'Cart',
    // Hero
    heroTitle: 'Luxury Furniture',
    heroSubtitle: 'Transform Your Space with Timeless Elegance',
    heroDescription: 'Discover exquisite furniture pieces crafted with precision and passion. From traditional Arabic designs to contemporary masterpieces.',
    shopNow: 'Shop Now',
    exploreCollection: 'Explore Collection',
    // Categories
    categoriesTitle: 'Shop by Category',
    livingRoom: 'Living Room',
    bedroom: 'Bedroom',
    dining: 'Dining',
    office: 'Office',
    outdoor: 'Outdoor',
    // Products
    featuredProducts: 'Featured Products',
    allProducts: 'All Products',
    addToCart: 'Add to Cart',
    viewDetails: 'View Details',
    sar: 'SAR',
    // Cart
    shoppingCart: 'Shopping Cart',
    emptyCart: 'Your cart is empty',
    continueShopping: 'Continue Shopping',
    quantity: 'Quantity',
    price: 'Price',
    total: 'Total',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    proceedToCheckout: 'Proceed to Checkout',
    remove: 'Remove',
    // About
    aboutTitle: 'About Our Heritage',
    aboutDescription: 'For over two decades, we have been crafting exceptional furniture that blends traditional Arabic artistry with modern sophistication.',
    ourStory: 'Our Story',
    ourVision: 'Our Vision',
    quality: 'Quality',
    qualityDesc: 'Premium materials and craftsmanship',
    delivery: 'Delivery',
    deliveryDesc: 'Fast and secure delivery across KSA',
    warranty: 'Warranty',
    warrantyDesc: 'Comprehensive warranty on all products',
    // Contact
    contactTitle: 'Get in Touch',
    contactDescription: 'Have questions? We\'d love to hear from you.',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    sendMessage: 'Send Message',
    // Footer
    footerDescription: 'Your destination for luxury furniture in Saudi Arabia',
    quickLinks: 'Quick Links',
    customerService: 'Customer Service',
    followUs: 'Follow Us',
    allRightsReserved: 'All rights reserved',
    // Testimonials
    testimonials: 'What Our Clients Say',
    // Search & Filter
    searchProducts: 'Search products...',
    filterByCategory: 'Filter by Category',
    allCategories: 'All Categories',
    sortBy: 'Sort By',
    priceLowest: 'Price: Low to High',
    priceHighest: 'Price: High to Low',
    newest: 'Newest',
  },
  ar: {
    // Header
    home: 'الرئيسية',
    products: 'المنتجات',
    about: 'من نحن',
    contact: 'اتصل بنا',
    cart: 'السلة',
    // Hero
    heroTitle: 'أثاث فاخر',
    heroSubtitle: 'حول مساحتك بأناقة خالدة',
    heroDescription: 'اكتشف قطع الأثاث الرائعة المصنوعة بدقة وشغف. من التصاميم العربية التقليدية إلى التحف المعاصرة.',
    shopNow: 'تسوق الآن',
    exploreCollection: 'استكشف المجموعة',
    // Categories
    categoriesTitle: 'تسوق حسب الفئة',
    livingRoom: 'غرفة المعيشة',
    bedroom: 'غرفة النوم',
    dining: 'غرفة الطعام',
    office: 'المكتب',
    outdoor: 'الحديقة',
    // Products
    featuredProducts: 'المنتجات المميزة',
    allProducts: 'جميع المنتجات',
    addToCart: 'أضف إلى السلة',
    viewDetails: 'عرض التفاصيل',
    sar: 'ريال',
    // Cart
    shoppingCart: 'سلة التسوق',
    emptyCart: 'سلة التسوق فارغة',
    continueShopping: 'متابعة التسوق',
    quantity: 'الكمية',
    price: 'السعر',
    total: 'الإجمالي',
    subtotal: 'المجموع الفرعي',
    shipping: 'الشحن',
    proceedToCheckout: 'إتمام الطلب',
    remove: 'إزالة',
    // About
    aboutTitle: 'تراثنا',
    aboutDescription: 'لأكثر من عقدين من الزمن، نقوم بصناعة أثاث استثنائي يمزج بين الفن العربي التقليدي والرقي الحديث.',
    ourStory: 'قصتنا',
    ourVision: 'رؤيتنا',
    quality: 'الجودة',
    qualityDesc: 'مواد فاخرة وحرفية عالية',
    delivery: 'التوصيل',
    deliveryDesc: 'توصيل سريع وآمن في جميع أنحاء المملكة',
    warranty: 'الضمان',
    warrantyDesc: 'ضمان شامل على جميع المنتجات',
    // Contact
    contactTitle: 'تواصل معنا',
    contactDescription: 'هل لديك أسئلة؟ نحن نحب أن نسمع منك.',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    message: 'الرسالة',
    sendMessage: 'إرسال الرسالة',
    // Footer
    footerDescription: 'وجهتك للأثاث الفاخر في المملكة العربية السعودية',
    quickLinks: 'روابط سريعة',
    customerService: 'خدمة العملاء',
    followUs: 'تابعنا',
    allRightsReserved: 'جميع الحقوق محفوظة',
    // Testimonials
    testimonials: 'آراء عملائنا',
    // Search & Filter
    searchProducts: 'البحث عن المنتجات...',
    filterByCategory: 'تصفية حسب الفئة',
    allCategories: 'جميع الفئات',
    sortBy: 'ترتيب حسب',
    priceLowest: 'السعر: من الأقل إلى الأعلى',
    priceHighest: 'السعر: من الأعلى إلى الأقل',
    newest: 'الأحدث',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar'); // Default to Arabic
  const [direction, setDirection] = useState('rtl');

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    setDirection(newLang === 'ar' ? 'rtl' : 'ltr');
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};