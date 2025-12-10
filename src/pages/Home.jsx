import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { getProducts, getCategories } from '../services/api';
import { testimonials } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner';

const Home = () => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesData, productsData] = await Promise.all([
          getCategories(),
          getProducts({ featured: true })
        ]);
        setCategories(categoriesData);
        setFeaturedProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error(language === 'en' ? 'Error loading data' : 'خطأ في تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [language]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(
      language === 'en' 
        ? `${product.nameEn} added to cart!`
        : `تمت إضافة ${product.nameAr} إلى السلة!`
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30 30 0z' fill='%23000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <Award className="w-4 h-4" />
                <span>{language === 'en' ? 'Premium Quality Since 2000' : 'جودة فاخرة منذ 2000'}</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 bg-clip-text text-transparent">
                  {t('heroTitle')}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-amber-900 font-medium">
                {t('heroSubtitle')}
              </p>
              
              <p className="text-lg text-amber-800 leading-relaxed max-w-xl">
                {t('heroDescription')}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-6 text-lg"
                  >
                    {t('shopNow')}
                    <ArrowRight className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-amber-700 text-amber-900 hover:bg-amber-100 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 px-8 py-6 text-lg"
                  >
                    {t('exploreCollection')}
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-900">2000+</p>
                  <p className="text-sm text-amber-700">{language === 'en' ? 'Happy Clients' : 'عميل سعيد'}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-900">500+</p>
                  <p className="text-sm text-amber-700">{language === 'en' ? 'Products' : 'منتج'}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-900">25+</p>
                  <p className="text-sm text-amber-700">{language === 'en' ? 'Years' : 'سنة'}</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-300">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80"
                  alt="Luxury Furniture"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent"></div>
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-2xl p-6 max-w-xs animate-in fade-in slide-in-from-bottom duration-700 delay-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-amber-900">5.0</p>
                    <p className="text-sm text-amber-700">{language === 'en' ? '2000+ Reviews' : '2000+ تقييم'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-y border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-amber-50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-amber-900 mb-2">{t('quality')}</h3>
                <p className="text-amber-700">{t('qualityDesc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-amber-50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-amber-900 mb-2">{t('delivery')}</h3>
                <p className="text-amber-700">{t('deliveryDesc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-amber-50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-amber-900 mb-2">{t('warranty')}</h3>
                <p className="text-amber-700">{t('warrantyDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              {t('categoriesTitle')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group"
              >
                <Card className="overflow-hidden border-2 border-amber-200 hover:border-amber-500 transition-all duration-300 hover:shadow-xl transform hover:scale-105">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={language === 'en' ? category.nameEn : category.nameAr}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg text-center">
                      {language === 'en' ? category.nameEn : category.nameAr}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              {t('featuredProducts')}
            </h2>
            <p className="text-xl text-amber-700 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Discover our handpicked collection of exquisite furniture pieces'
                : 'اكتشف مجموعتنا المختارة من قطع الأثاث الرائعة'}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-2 border-amber-200 hover:border-amber-500 transition-all duration-300 hover:shadow-2xl">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={language === 'en' ? product.nameEn : product.nameAr}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {language === 'en' ? 'Featured' : 'مميز'}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
                    {language === 'en' ? product.nameEn : product.nameAr}
                  </h3>
                  <p className="text-amber-700 text-sm mb-4 line-clamp-2">
                    {language === 'en' ? product.descriptionEn : product.descriptionAr}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-900">
                      {product.price.toLocaleString()} {t('sar')}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      {t('addToCart')}
                    </Button>
                    <Link to={`/products/${product.id}`} className="flex-1">
                      <Button variant="outline" className="w-full border-amber-700 text-amber-900 hover:bg-amber-100">
                        {t('viewDetails')}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8"
              >
                {t('allProducts')}
                <ArrowRight className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              {t('testimonials')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-2 border-amber-200 hover:border-amber-500 transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-amber-800 mb-6 leading-relaxed">
                    "{language === 'en' ? testimonial.textEn : testimonial.textAr}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {(language === 'en' ? testimonial.nameEn : testimonial.nameAr).charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-amber-900">
                        {language === 'en' ? testimonial.nameEn : testimonial.nameAr}
                      </p>
                      <p className="text-sm text-amber-700">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-800 via-amber-900 to-amber-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30 30 0z' fill='%23fff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'en' 
              ? 'Ready to Transform Your Space?'
              : 'هل أنت مستعد لتحويل مساحتك؟'}
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Visit our showroom or browse our complete collection online. Our experts are here to help you create the perfect space.'
              : 'قم بزيارة صالة العرض الخاصة بنا أو تصفح مجموعتنا الكاملة عبر الإنترنت. خبراؤنا هنا لمساعدتك في إنشاء المساحة المثالية.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/products">
              <Button 
                size="lg"
                className="bg-white text-amber-900 hover:bg-amber-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8"
              >
                {t('shopNow')}
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-amber-900 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8"
              >
                {t('contact')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
