import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { createOrder } from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { ShoppingBag, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { language, t } = useLanguage();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    notes: ''
  });

  const shippingCost = 50;
  const subtotal = getCartTotal();
  const total = subtotal + shippingCost;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error(language === 'en' ? 'Your cart is empty' : 'سلتك فارغة');
      return;
    }

    try {
      setLoading(true);
      
      // Prepare order items
      const items = cartItems.map(item => ({
        productId: item.id,
        nameEn: item.nameEn,
        nameAr: item.nameAr,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }));

      // Create order
      const order = await createOrder({
        ...formData,
        items
      });

      setOrderDetails(order);
      setOrderComplete(true);
      clearCart();
      
      toast.success(
        language === 'en'
          ? 'Order placed successfully!'
          : 'تم تقديم الطلب بنجاح!'
      );
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error(
        language === 'en'
          ? 'Error placing order. Please try again.'
          : 'خطأ في تقديم الطلب. يرجى المحاولة مرة أخرى.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold">
              {language === 'en' ? 'Checkout' : 'إتمام الطلب'}
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-16 h-16 text-amber-600" />
            </div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              {language === 'en' ? 'Your cart is empty' : 'سلتك فارغة'}
            </h2>
            <p className="text-xl text-amber-700 mb-8">
              {language === 'en'
                ? 'Add some items to your cart before checkout'
                : 'أضف بعض المنتجات إلى سلتك قبل إتمام الطلب'}
            </p>
            <Button
              onClick={() => navigate('/products')}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg"
            >
              {language === 'en' ? 'Continue Shopping' : 'متابعة التسوق'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (orderComplete && orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4">
              <CheckCircle className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">
                {language === 'en' ? 'Order Confirmed!' : 'تم تأكيد الطلب!'}
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="border-2 border-green-200">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-amber-900 mb-2">
                  {language === 'en' ? 'Thank you for your order!' : 'شكراً لطلبك!'}
                </h2>
                <p className="text-amber-700">
                  {language === 'en'
                    ? 'We have received your order and will contact you soon.'
                    : 'لقد استلمنا طلبك وسنتصل بك قريباً.'}
                </p>
              </div>

              <div className="bg-amber-50 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-lg text-amber-900 mb-4">
                  {language === 'en' ? 'Order Details' : 'تفاصيل الطلب'}
                </h3>
                <div className="space-y-2 text-amber-800">
                  <p>
                    <span className="font-semibold">
                      {language === 'en' ? 'Order ID:' : 'رقم الطلب:'}
                    </span>{' '}
                    {orderDetails.orderId}
                  </p>
                  <p>
                    <span className="font-semibold">
                      {language === 'en' ? 'Name:' : 'الاسم:'}
                    </span>{' '}
                    {orderDetails.customerName}
                  </p>
                  <p>
                    <span className="font-semibold">
                      {language === 'en' ? 'Email:' : 'البريد الإلكتروني:'}
                    </span>{' '}
                    {orderDetails.customerEmail}
                  </p>
                  <p>
                    <span className="font-semibold">
                      {language === 'en' ? 'Phone:' : 'الهاتف:'}
                    </span>{' '}
                    {orderDetails.customerPhone}
                  </p>
                  <p>
                    <span className="font-semibold">
                      {language === 'en' ? 'Total:' : 'الإجمالي:'}
                    </span>{' '}
                    {orderDetails.total.toLocaleString()} {t('sar')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => navigate('/')}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
                >
                  {language === 'en' ? 'Back to Home' : 'العودة للرئيسية'}
                </Button>
                <Button
                  onClick={() => navigate('/products')}
                  variant="outline"
                  className="flex-1 border-2 border-amber-700 text-amber-900 hover:bg-amber-100"
                >
                  {language === 'en' ? 'Continue Shopping' : 'متابعة التسوق'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">
            {language === 'en' ? 'Checkout' : 'إتمام الطلب'}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-amber-200 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-amber-900 mb-6">
                  {language === 'en' ? 'Shipping Information' : 'معلومات الشحن'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="customerName" className="block text-sm font-semibold text-amber-900 mb-2">
                      {t('name')} *
                    </label>
                    <Input
                      id="customerName"
                      name="customerName"
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={handleChange}
                      className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="customerEmail" className="block text-sm font-semibold text-amber-900 mb-2">
                        {t('email')} *
                      </label>
                      <Input
                        id="customerEmail"
                        name="customerEmail"
                        type="email"
                        required
                        value={formData.customerEmail}
                        onChange={handleChange}
                        className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="customerPhone" className="block text-sm font-semibold text-amber-900 mb-2">
                        {t('phone')} *
                      </label>
                      <Input
                        id="customerPhone"
                        name="customerPhone"
                        type="tel"
                        required
                        value={formData.customerPhone}
                        onChange={handleChange}
                        className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="shippingAddress" className="block text-sm font-semibold text-amber-900 mb-2">
                      {language === 'en' ? 'Shipping Address' : 'عنوان الشحن'} *
                    </label>
                    <Textarea
                      id="shippingAddress"
                      name="shippingAddress"
                      required
                      rows={3}
                      value={formData.shippingAddress}
                      onChange={handleChange}
                      className="border-amber-300 focus:border-amber-500 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-semibold text-amber-900 mb-2">
                      {language === 'en' ? 'Order Notes (Optional)' : 'ملاحظات الطلب (اختياري)'}
                    </label>
                    <Textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      className="border-amber-300 focus:border-amber-500 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg py-6 text-lg font-bold"
                  >
                    {loading
                      ? (language === 'en' ? 'Processing...' : 'جاري المعالجة...')
                      : (language === 'en' ? 'Place Order' : 'تأكيد الطلب')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-amber-300 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-4">
                  {language === 'en' ? 'Order Summary' : 'ملخص الطلب'}
                </h3>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b border-amber-200">
                      <img
                        src={item.image}
                        alt={language === 'en' ? item.nameEn : item.nameAr}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-amber-900">
                          {language === 'en' ? item.nameEn : item.nameAr}
                        </p>
                        <p className="text-sm text-amber-700">
                          {item.quantity} x {item.price.toLocaleString()} {t('sar')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-amber-800">
                    <span>{t('subtotal')}</span>
                    <span className="font-semibold">{subtotal.toLocaleString()} {t('sar')}</span>
                  </div>
                  <div className="flex justify-between text-amber-800">
                    <span>{t('shipping')}</span>
                    <span className="font-semibold">{shippingCost} {t('sar')}</span>
                  </div>
                  <div className="border-t-2 border-amber-300 pt-3">
                    <div className="flex justify-between">
                      <span className="text-xl font-bold text-amber-900">{t('total')}</span>
                      <span className="text-2xl font-bold text-amber-900">
                        {total.toLocaleString()} {t('sar')}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-amber-700 text-center">
                  {language === 'en'
                    ? 'Payment will be collected on delivery (Cash on Delivery)'
                    : 'سيتم تحصيل الدفع عند التسليم (الدفع عند الاستلام)'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
