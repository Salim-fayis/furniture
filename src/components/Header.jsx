import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { getCartCount } = useCart();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/products', label: t('products') },
    { path: '/about', label: t('about') },
    { path: '/contact', label: t('contact') }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 shadow-sm backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 shadow-md">
              <span className="text-2xl font-bold text-white">AF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent">
                {language === 'en' ? 'Arabian Furniture' : 'الأثاث العربي'}
              </h1>
              <p className="text-xs text-amber-700">
                {language === 'en' ? 'Luxury Living' : 'حياة فاخرة'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  isActive(link.path)
                    ? 'text-amber-900'
                    : 'text-amber-800 hover:text-amber-900'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-600 to-amber-800 transform origin-left transition-transform duration-300 ${
                    isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <Button
              onClick={toggleLanguage}
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center gap-2 text-amber-900 hover:text-amber-700 hover:bg-amber-100 transition-all duration-300"
            >
              <Globe className="w-4 h-4" />
              <span className="font-semibold">{language === 'en' ? 'AR' : 'EN'}</span>
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="relative text-amber-900 hover:text-amber-700 hover:bg-amber-100 transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {getCartCount()}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              variant="ghost"
              size="sm"
              className="md:hidden text-amber-900 hover:bg-amber-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-amber-200 animate-in slide-in-from-top-5 duration-300">
            <nav className="flex flex-col gap-3">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-amber-200 text-amber-900 font-semibold'
                      : 'text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                variant="outline"
                className="flex items-center justify-center gap-2 border-amber-300 text-amber-900 hover:bg-amber-100"
              >
                <Globe className="w-4 h-4" />
                {language === 'en' ? 'العربية' : 'English'}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;