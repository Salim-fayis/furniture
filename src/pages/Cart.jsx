import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Cart = () => {
  const { language, t } = useLanguage();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const shippingCost = 50; // Fixed shipping cost in SAR
  const total = getCartTotal();
  const grandTotal = total + (cartItems.length > 0 ? shippingCost : 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold">{t('shoppingCart')}</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-16 h-16 text-amber-600" />
            </div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">{t('emptyCart')}</h2>
            <p className="text-xl text-amber-700 mb-8">
              {language === 'en'
                ? 'Start adding some beautiful furniture to your cart!'
                : 'ابدأ بإضافة بعض الأثاث الجميل إلى سلتك!'}
            </p>
            <Link to="/products">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8"
              >
                {t('continueShopping')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('shoppingCart')}</h1>
          <p className="text-xl text-amber-100">
            {cartItems.length} {language === 'en' ? 'items in your cart' : 'عنصر في سلتك'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="border-2 border-amber-200 hover:border-amber-400 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={language === 'en' ? item.nameEn : item.nameAr}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-amber-900 mb-2">
                        {language === 'en' ? item.nameEn : item.nameAr}
                      </h3>
                      <p className="text-amber-700 text-sm mb-4 line-clamp-2">
                        {language === 'en' ? item.descriptionEn : item.descriptionAr}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-amber-900">
                          {item.price.toLocaleString()} {t('sar')}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-amber-100 rounded-lg p-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0 hover:bg-amber-200 text-amber-900"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-12 text-center font-bold text-amber-900">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0 hover:bg-amber-200 text-amber-900"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-amber-300 sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-amber-900 mb-6">
                  {language === 'en' ? 'Order Summary' : 'ملخص الطلب'}
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-amber-800">
                    <span>{t('subtotal')}</span>
                    <span className="font-semibold">{total.toLocaleString()} {t('sar')}</span>
                  </div>
                  <div className="flex justify-between text-amber-800">
                    <span>{t('shipping')}</span>
                    <span className="font-semibold">{shippingCost} {t('sar')}</span>
                  </div>
                  <div className="border-t-2 border-amber-300 pt-4">
                    <div className="flex justify-between text-amber-900">
                      <span className="text-xl font-bold">{t('total')}</span>
                      <span className="text-2xl font-bold">{grandTotal.toLocaleString()} {t('sar')}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 py-6 text-lg font-bold"
                    onClick={() => alert(language === 'en' ? 'Checkout coming soon with payment integration!' : 'الدفع قريباً مع التكامل مع بوابة الدفع!')}
                  >
                    {t('proceedToCheckout')}
                  </Button>
                  <Link to="/products" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-amber-700 text-amber-900 hover:bg-amber-100"
                    >
                      {t('continueShopping')}
                    </Button>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t-2 border-amber-200 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-amber-700">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-700">✓</span>
                    </div>
                    <span>{language === 'en' ? 'Secure checkout' : 'دفع آمن'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-amber-700">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-700">✓</span>
                    </div>
                    <span>{language === 'en' ? 'Free returns within 30 days' : 'إرجاع مجاني خلال 30 يومًا'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-amber-700">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-700">✓</span>
                    </div>
                    <span>{language === 'en' ? '2-year warranty' : 'ضمان لمدة عامين'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;