import React from 'react';
import { Award, Users, Globe, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  const { language, t } = useLanguage();

  const stats = [
    { icon: Users, value: '2000+', label: language === 'en' ? 'Happy Clients' : 'عميل سعيد' },
    { icon: Award, value: '25+', label: language === 'en' ? 'Years Experience' : 'سنة خبرة' },
    { icon: Globe, value: '50+', label: language === 'en' ? 'Cities' : 'مدينة' },
    { icon: Heart, value: '500+', label: language === 'en' ? 'Products' : 'منتج' }
  ];

  const values = [
    {
      title: language === 'en' ? 'Quality Craftsmanship' : 'حرفية عالية الجودة',
      description: language === 'en'
        ? 'Every piece is meticulously crafted by skilled artisans using premium materials and traditional techniques passed down through generations.'
        : 'كل قطعة مصنوعة بعناية من قبل حرفيين مهرة باستخدام مواد فاخرة وتقنيات تقليدية موروثة عبر الأجيال.',
      icon: Award
    },
    {
      title: language === 'en' ? 'Cultural Heritage' : 'التراث الثقافي',
      description: language === 'en'
        ? 'We honor Arabian design traditions while incorporating modern aesthetics, creating timeless pieces that celebrate our rich cultural heritage.'
        : 'نحن نكرم تقاليد التصميم العربي مع دمج الجماليات الحديثة، لإنشاء قطع خالدة تحتفي بتراثنا الثقافي الغني.',
      icon: Globe
    },
    {
      title: language === 'en' ? 'Customer Satisfaction' : 'رضا العملاء',
      description: language === 'en'
        ? 'Your satisfaction is our priority. We provide exceptional service from consultation to delivery, ensuring your complete happiness with every purchase.'
        : 'رضاكم هو أولويتنا. نقدم خدمة استثنائية من الاستشارة إلى التسليم، لضمان سعادتكم الكاملة مع كل عملية شراء.',
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('aboutTitle')}</h1>
            <p className="text-xl text-amber-100 leading-relaxed">
              {t('aboutDescription')}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-4xl font-bold text-amber-900 mb-2">{stat.value}</p>
                  <p className="text-amber-700 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-amber-900">{t('ourStory')}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full"></div>
              <p className="text-lg text-amber-800 leading-relaxed">
                {language === 'en'
                  ? 'Founded in 2000, Arabian Furniture began with a simple vision: to bring authentic, luxury furniture that honors our rich cultural heritage to homes across Saudi Arabia. What started as a small workshop has grown into one of the region\'s most trusted furniture destinations.'
                  : 'تأسست الأثاث العربي في عام 2000، برؤية بسيطة: تقديم أثاث فاخر وأصيل يكرّم تراثنا الثقافي الغني إلى المنازل في جميع أنحاء المملكة العربية السعودية. ما بدأ كورشة عمل صغيرة نما ليصبح واحدًا من أكثر وجهات الأثاث الموثوقة في المنطقة.'}
              </p>
              <p className="text-lg text-amber-800 leading-relaxed">
                {language === 'en'
                  ? 'Each piece in our collection tells a story of dedication, artistry, and passion. We work with master craftsmen who have perfected their skills over decades, ensuring that every item meets our exacting standards of quality and beauty.'
                  : 'كل قطعة في مجموعتنا تحكي قصة من التفاني والفن والشغف. نعمل مع حرفيين ماهرين أتقنوا مهاراتهم على مدى عقود، لضمان أن كل عنصر يلبي معاييرنا الصارمة للجودة والجمال.'}
              </p>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
                  alt="Our Story"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">{t('ourVision')}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-2 border-amber-200 hover:border-amber-500 transition-all duration-300 hover:shadow-xl group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-amber-900 mb-4">{value.title}</h3>
                    <p className="text-amber-700 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              {language === 'en' ? 'Our Craftsmanship' : 'حرفيتنا'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400&q=80',
              'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
              'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&q=80',
              'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=80'
            ].map((img, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl">
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;