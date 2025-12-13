import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 text-amber-50">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-amber-900">AF</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {language === 'en' ? 'Arabian Furniture' : 'الأثاث العربي'}
                </h3>
              </div>
            </div>
            <p className="text-amber-100 text-sm leading-relaxed">
              {t('footerDescription')}
            </p>
            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 bg-amber-800 hover:bg-amber-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-amber-800 hover:bg-amber-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-amber-800 hover:bg-amber-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b border-amber-700 pb-2">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/furniture/" className="text-amber-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 inline-block">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-amber-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 inline-block">
                  {t('products')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-amber-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 inline-block">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-amber-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 inline-block">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b border-amber-700 pb-2">
              {t('categoriesTitle')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=living-room" className="text-amber-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 inline-block">
                  {t('livingRoom')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=bedroom" className="text-amber-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 inline-block">
                  {t('bedroom')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=dining" className="text-amber-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 inline-block">
                  {t('dining')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=office" className="text-amber-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 inline-block">
                  {t('office')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=outdoor" className="text-amber-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 inline-block">
                  {t('outdoor')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b border-amber-700 pb-2">
              {t('contact')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-amber-100 text-sm">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" />
                <span>King Fahd Road, Riyadh, Saudi Arabia</span>
              </li>
              <li className="flex items-center gap-3 text-amber-100 text-sm">
                <Phone className="w-5 h-5 flex-shrink-0 text-amber-400" />
                <span dir="ltr">+966 50 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-amber-100 text-sm">
                <Mail className="w-5 h-5 flex-shrink-0 text-amber-400" />
                <span>info@arabianfurniture.sa</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-amber-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-amber-200 text-sm text-center md:text-left">
              © {currentYear} {language === 'en' ? 'Arabian Furniture' : 'الأثاث العربي'}. {t('allRightsReserved')}.
            </p>
            <div className="flex gap-6 text-amber-200 text-sm">
              <Link to="/privacy" className="hover:text-white transition-colors duration-300">
                {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors duration-300">
                {language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;