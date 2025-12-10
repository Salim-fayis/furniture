import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { getProducts, getCategories } from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [sortBy, setSortBy] = useState('newest');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts({
          category: selectedCategory,
          search: searchTerm,
          sortBy: sortBy
        });
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error(language === 'en' ? 'Error loading products' : 'خطأ في تحميل المنتجات');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [selectedCategory, searchTerm, sortBy, language]);

  const filteredAndSortedProducts = products;

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(
      language === 'en' 
        ? `${product.nameEn} added to cart!`
        : `تمت إضافة ${product.nameAr} إلى السلة!`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('allProducts')}</h1>
          <p className="text-xl text-amber-100">
            {language === 'en'
              ? 'Browse our complete collection of luxury furniture'
              : 'تصفح مجموعتنا الكاملة من الأثاث الفاخر'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md border-2 border-amber-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
              <Input
                type="text"
                placeholder={t('searchProducts')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-amber-300 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border-amber-300 focus:border-amber-500 focus:ring-amber-500">
                <SelectValue placeholder={t('filterByCategory')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allCategories')}</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {language === 'en' ? category.nameEn : category.nameAr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-amber-300 focus:border-amber-500 focus:ring-amber-500">
                <SelectValue placeholder={t('sortBy')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t('newest')}</SelectItem>
                <SelectItem value="priceLowest">{t('priceLowest')}</SelectItem>
                <SelectItem value="priceHighest">{t('priceHighest')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters Display */}
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedCategory !== 'all' && (
              <span className="px-3 py-1 bg-amber-200 text-amber-900 rounded-full text-sm font-medium">
                {categories.find(c => c.id === selectedCategory)?.[language === 'en' ? 'nameEn' : 'nameAr']}
              </span>
            )}
            {searchTerm && (
              <span className="px-3 py-1 bg-amber-200 text-amber-900 rounded-full text-sm font-medium">
                {language === 'en' ? 'Search' : 'بحث'}: "{searchTerm}"
              </span>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-2 border-amber-200 hover:border-amber-500 transition-all duration-300 hover:shadow-2xl">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={language === 'en' ? product.nameEn : product.nameAr}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {language === 'en' ? 'Featured' : 'مميز'}
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
                    {language === 'en' ? product.nameEn : product.nameAr}
                  </h3>
                  <p className="text-amber-700 text-sm mb-4 line-clamp-2">
                    {language === 'en' ? product.descriptionEn : product.descriptionAr}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-amber-900">
                      {product.price.toLocaleString()} {t('sar')}
                    </span>
                  </div>
                  <div className="flex gap-2">
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
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-16 h-16 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-2">
              {language === 'en' ? 'No products found' : 'لم يتم العثور على منتجات'}
            </h3>
            <p className="text-amber-700 mb-6">
              {language === 'en'
                ? 'Try adjusting your search or filter criteria'
                : 'حاول تعديل معايير البحث أو التصفية'}
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              variant="outline"
              className="border-amber-700 text-amber-900 hover:bg-amber-100"
            >
              {language === 'en' ? 'Clear Filters' : 'مسح الفلاتر'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;