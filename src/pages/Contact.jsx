import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { submitContactMessage } from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

const Contact = () => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContactMessage(formData);
      toast.success(
        language === 'en'
          ? 'Message sent successfully! We will contact you soon.'
          : 'تم إرسال الرسالة بنجاح! سنتصل بك قريبًا.'
      );
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error(
        language === 'en'
          ? 'Error sending message. Please try again.'
          : 'خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.'
      );
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: language === 'en' ? 'Visit Us' : 'زرنا',
      content: 'King Fahd Road, Riyadh 12345, Saudi Arabia',
      link: 'https://maps.google.com'
    },
    {
      icon: Phone,
      title: language === 'en' ? 'Call Us' : 'اتصل بنا',
      content: '+966 50 123 4567',
      link: 'tel:+966501234567'
    },
    {
      icon: Mail,
      title: language === 'en' ? 'Email Us' : 'راسلنا',
      content: 'info@arabianfurniture.sa',
      link: 'mailto:info@arabianfurniture.sa'
    },
    {
      icon: Clock,
      title: language === 'en' ? 'Working Hours' : 'ساعات العمل',
      content: language === 'en' ? 'Sat - Thu: 9AM - 9PM' : 'السبت - الخميس: 9 صباحًا - 9 مساءً',
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('contactTitle')}</h1>
            <p className="text-xl text-amber-100 leading-relaxed">
              {t('contactDescription')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const content = (
                <Card className="border-2 border-amber-200 hover:border-amber-500 transition-all duration-300 hover:shadow-xl group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-amber-900 mb-2">{info.title}</h3>
                        <p className="text-amber-700">{info.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );

              return info.link ? (
                <a key={index} href={info.link} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                <div key={index}>{content}</div>
              );
            })}

            {/* Map Preview */}
            <Card className="border-2 border-amber-200 overflow-hidden">
              <div className="h-64 bg-amber-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.2543!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sen!2ssa!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Location Map"
                ></iframe>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-amber-200 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-amber-900 mb-6">
                  {language === 'en' ? 'Send Us a Message' : 'أرسل لنا رسالة'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-amber-900 mb-2">
                        {t('name')} *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                        placeholder={language === 'en' ? 'Your name' : 'اسمك'}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-amber-900 mb-2">
                        {t('email')} *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                        placeholder={language === 'en' ? 'your@email.com' : 'بريدك@الإلكتروني.com'}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-amber-900 mb-2">
                      {t('phone')}
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="+966 50 123 4567"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-amber-900 mb-2">
                      {t('message')} *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="border-amber-300 focus:border-amber-500 focus:ring-amber-500 resize-none"
                      placeholder={language === 'en' ? 'Tell us about your furniture needs...' : 'أخبرنا عن احتياجاتك للأثاث...'}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 py-6 text-lg font-bold"
                  >
                    {t('sendMessage')}
                  </Button>
                </form>

                {/* Additional Info */}
                <div className="mt-8 pt-8 border-t-2 border-amber-200">
                  <p className="text-sm text-amber-700 text-center">
                    {language === 'en'
                      ? 'We typically respond within 24 hours during business days.'
                      : 'عادة ما نرد في غضون 24 ساعة خلال أيام العمل.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-800 to-amber-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'en'
              ? 'Visit Our Showroom'
              : 'قم بزيارة صالة العرض'}
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            {language === 'en'
              ? 'Experience our furniture collection in person and get expert advice from our team.'
              : 'اختبر مجموعة الأثاث لدينا شخصيًا واحصل على مشورة من فريقنا المتخصص.'}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;