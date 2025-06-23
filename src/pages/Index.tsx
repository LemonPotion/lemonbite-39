import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import FoodCard from '../components/FoodCard';
import QuickOrder from '../components/QuickOrder';
import CheckoutModal from '../components/CheckoutModal';
import SuccessModal from '../components/SuccessModal';
import { useCart, FoodItem } from '../context/CartContext';
import { Search, X, SlidersHorizontal, Heart, RefreshCw, Sparkles, ArrowUp, Clock } from 'lucide-react';
import FavoritesDrawer from '../components/FavoritesDrawer';
import RecentlyViewedBanner from '../components/RecentlyViewedBanner';
import RecommendationCard from '../components/RecommendationCard';
import { saveFavoritesToCookies, getFavoritesFromCookies, saveRecentlyViewedToCookies, getRecentlyViewedFromCookies } from '../utils/cookieUtils';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from "../components/LoadingSpinner";
import { useMenuItems } from '../hooks/useMenuItems';
import { toast } from 'sonner';

const Index = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<FoodItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [randomItem, setRandomItem] = useState<FoodItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 800]);
  const [isRandomItemAnimating, setIsRandomItemAnimating] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showQuickOrders, setShowQuickOrders] = useState(false);
  const [loadingRecommendations, setLoadingRecommendations] = React.useState(false);
  
  const { data: foodItems = [], isLoading, error } = useMenuItems();
  const { addItem } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Функция для очистки избранного от несуществующих блюд
  const cleanupFavorites = (allItems: FoodItem[], currentFavorites: string[]) => {
    const existingItemIds = new Set(allItems.map(item => item.id));
    const validFavorites = currentFavorites.filter(id => existingItemIds.has(id));
    
    if (validFavorites.length !== currentFavorites.length) {
      setFavorites(validFavorites);
      saveFavoritesToCookies(validFavorites);
      const removedCount = currentFavorites.length - validFavorites.length;
      toast.info(`Удалено ${removedCount} недоступных блюд из избранного`);
    }
  };

  // Функция для очистки быстрых заказов от несуществующих блюд
  const cleanupQuickOrders = (allItems: FoodItem[]) => {
    const saved = localStorage.getItem('quickOrders');
    if (saved) {
      const savedOrders = JSON.parse(saved);
      const existingItemIds = new Set(allItems.map(item => item.id));
      let hasChanges = false;
      
      const cleanedOrders = savedOrders.map((order: any) => {
        const validItems = order.items.filter((item: FoodItem) => existingItemIds.has(item.id));
        if (validItems.length !== order.items.length) {
          hasChanges = true;
        }
        return {
          ...order,
          items: validItems
        };
      }).filter((order: any) => order.items.length > 0); // Удаляем пустые заказы
      
      if (hasChanges) {
        localStorage.setItem('quickOrders', JSON.stringify(cleanedOrders));
        const removedOrders = savedOrders.length - cleanedOrders.length;
        if (removedOrders > 0) {
          toast.info(`Обновлены быстрые заказы: удалены недоступные блюда`);
        }
      }
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setActiveCategory(category);
      navigate('/', {
        replace: true
      });
    }
    const random = params.get('random');
    if (random === 'true') {
      if (foodItems.length > 0) {
        const randomIndex = Math.floor(Math.random() * foodItems.length);
        setRandomItem(foodItems[randomIndex]);
        toast.success('Случайное блюдо выбрано!');
      }
      navigate('/', {
        replace: true
      });
    }
    const search = params.get('search');
    if (search) {
      // Check if search is for random dish
      if (search.toLowerCase().includes('случайное блюдо')) {
        if (foodItems.length > 0) {
          const randomIndex = Math.floor(Math.random() * foodItems.length);
          setRandomItem(foodItems[randomIndex]);
          toast.success('Случайное блюдо выбрано!');
        }
      } else {
        setSearchQuery(search);
      }
      navigate('/', {
        replace: true
      });
    }
    const minPrice = params.get('minPrice');
    const maxPrice = params.get('maxPrice');
    if (minPrice && maxPrice) {
      setPriceRange([Number(minPrice), Number(maxPrice)]);
      navigate('/', {
        replace: true
      });
    }
    const recently = params.get('recently');
    if (recently === 'true') {
      const recentlyViewedElement = document.getElementById('recently-viewed');
      if (recentlyViewedElement) {
        recentlyViewedElement.scrollIntoView({
          behavior: 'smooth'
        });
        recentlyViewedElement.classList.add('ring-2', 'ring-accent', 'rounded-lg');
        setTimeout(() => {
          recentlyViewedElement.classList.remove('ring-2', 'ring-accent', 'rounded-lg');
        }, 2000);
      }
      navigate('/', {
        replace: true
      });
    }
  }, [location, navigate, foodItems]);

  useEffect(() => {
    const savedFavorites = getFavoritesFromCookies();
    if (savedFavorites.length > 0) {
      setFavorites(savedFavorites);
    }
  }, []);

  useEffect(() => {
    const savedRecentlyViewed = getRecentlyViewedFromCookies();
    if (savedRecentlyViewed.length > 0) {
      setRecentlyViewed(savedRecentlyViewed);
    }
  }, []);

  // Очищаем избранное и быстрые заказы когда загружаются данные
  useEffect(() => {
    if (foodItems.length > 0) {
      cleanupFavorites(foodItems, favorites);
      cleanupQuickOrders(foodItems);
    }
  }, [foodItems]);

  const handleOrderComplete = (phoneNumber: string, address: string) => {
    console.log('Order placed with:', {
      phoneNumber,
      address
    });
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId];
      saveFavoritesToCookies(newFavorites);
      return newFavorites;
    });
  };

  const addToRecentlyViewed = (item: FoodItem) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(i => i.id !== item.id);
      const newItems = [item, ...filtered].slice(0, 4);
      saveRecentlyViewedToCookies(newItems);
      return newItems;
    });
  };

  const handleFilterClick = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
      setActiveCategory(null);
    }
  };

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
      setActiveFilter(null);
    }
  };

  const resetFilters = () => {
    setActiveFilter(null);
    setActiveCategory(null);
    setSearchQuery('');
    setSortOption(null);
    setPriceRange([0, 800]);
  };

  const handleSortOptionChange = (option: string) => {
    setSortOption(option);
  };

  const categories = [...new Set(foodItems.map(item => {
    if (item.name.toLowerCase().includes('бургер')) return 'Фаст-фуд';
    if (item.name.toLowerCase().includes('пицца')) return 'Пицца';
    if (item.name.toLowerCase().includes('салат')) return 'Салаты';
    if (item.name.toLowerCase().includes('паста')) return 'Паста';
    if (item.name.toLowerCase().includes('суши')) return 'Азиатская';
    if (item.name.toLowerCase().includes('торт') || item.name.toLowerCase().includes('шоколад') || item.name.toLowerCase().includes('тирамису') || item.name.toLowerCase().includes('чизкейк')) return 'Десерты';
    if (item.name.toLowerCase().includes('рыб') || item.name.toLowerCase().includes('морепродукт') || item.name.toLowerCase().includes('осьминог')) return 'Морепродукты';
    if (item.name.toLowerCase().includes('суп') || item.name.toLowerCase().includes('борщ') || item.name.toLowerCase().includes('том ям') || item.name.toLowerCase().includes('рамен')) return 'Супы';
    if (item.name.toLowerCase().includes('стейк') || item.name.toLowerCase().includes('утка')) return 'Мясные блюда';
    return 'Основные блюда';
  }))];

  let filteredItems = foodItems.filter(item => {
    const matchesSearch = searchQuery ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    if (!matchesSearch) return false;
    if (activeFilter === 'favorites') {
      return favorites.includes(item.id);
    }
    if (activeCategory) {
      const itemCategory = item.name.toLowerCase().includes('бургер') ? 'Фаст-фуд' : item.name.toLowerCase().includes('пицца') ? 'Пицца' : item.name.toLowerCase().includes('салат') ? 'Салаты' : item.name.toLowerCase().includes('паста') ? 'Паста' : item.name.toLowerCase().includes('суши') ? 'Азиатская' : item.name.toLowerCase().includes('торт') || item.name.toLowerCase().includes('шоколад') || item.name.toLowerCase().includes('тирамису') || item.name.toLowerCase().includes('чизкейк') ? 'Десерты' : item.name.toLowerCase().includes('рыб') || item.name.toLowerCase().includes('морепродукт') || item.name.toLowerCase().includes('осьминог') ? 'Морепродукты' : item.name.toLowerCase().includes('суп') || item.name.toLowerCase().includes('борщ') || item.name.toLowerCase().includes('том ям') || item.name.toLowerCase().includes('рамен') ? 'Супы' : item.name.toLowerCase().includes('стейк') || item.name.toLowerCase().includes('утка') ? 'Мясные блюда' : 'Основные блюда';
      return itemCategory === activeCategory;
    }
    return true;
  });

  if (sortOption) {
    if (sortOption === 'price-low-high') {
      filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-a-z') {
      filteredItems = [...filteredItems].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-z-a') {
      filteredItems = [...filteredItems].sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  const favoritedItems = foodItems.filter(item => favorites.includes(item.id));

  const dismissRandomItem = () => {
    setIsRandomItemAnimating(true);
    setTimeout(() => {
      setRandomItem(null);
      setIsRandomItemAnimating(false);
    }, 300);
  };

  const generateRandomItem = () => {
    if (foodItems.length === 0) return;
    
    setIsRandomItemAnimating(true);
    const currentItem = randomItem;
    
    const element = document.querySelector('.recommendation-card');
    if (element) {
      element.classList.add('scale-95', 'opacity-0');
    }
    
    setTimeout(() => {
      let newItem;
      do {
        const randomIndex = Math.floor(Math.random() * foodItems.length);
        newItem = foodItems[randomIndex];
      } while (currentItem && newItem.id === currentItem.id);
      
      setRandomItem(newItem);
      setIsRandomItemAnimating(false);
      toast.success('Новое случайное блюдо выбрано!');
    }, 300);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToHistory = (query: string) => {
    // Add search term to history
  };

  useEffect(() => {
    if (recentlyViewed.length === 0) {
      return;
    }
  }, [foodItems, recentlyViewed.length]);

  if (isLoading) {
    return (
      <Layout onCartOpen={() => setIsCheckoutOpen(true)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 theme-transition">
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout onCartOpen={() => setIsCheckoutOpen(true)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 theme-transition">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-lg text-red-600 mb-4">Ошибка загрузки меню</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/80 transition-colors"
              >
                Обновить страницу
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout onCartOpen={() => setIsCheckoutOpen(true)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 theme-transition">
        <div className="mb-12">
          <motion.div 
            className="flex flex-col items-center text-center space-y-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-foreground theme-transition">
              Наше <span className="text-accent">Меню</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-lg text-center theme-transition">
              Откройте для себя наши тщательно приготовленные блюда из самых свежих ингредиентов
            </p>
          </motion.div>
          
          {randomItem && (
            <RecommendationCard 
              item={randomItem} 
              onDismiss={() => setRandomItem(null)} 
              onRefresh={generateRandomItem} 
            />
          )}

          {recentlyViewed.length > 0 && (
            <motion.div 
              id="recently-viewed" 
              className="mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <RecentlyViewedBanner items={recentlyViewed} onItemClick={addToRecentlyViewed} />
            </motion.div>
          )}
          
          <motion.div 
            className="flex flex-col space-y-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowQuickOrders(!showQuickOrders)} 
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${showQuickOrders ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
              >
                <Clock className="h-4 w-4" />
                <span>Быстрые заказы</span>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleFilterClick('favorites')} 
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${activeFilter === 'favorites' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
              >
                <Heart className={`h-4 w-4 ${favorites.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                <span>Избранное{favorites.length > 0 ? ` (${favorites.length})` : ''}</span>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowFilters(!showFilters)} 
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${showFilters ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Фильтры</span>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={generateRandomItem} 
                className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
              >
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span>Рекомендация</span>
              </motion.button>
            </div>

            <AnimatePresence>
              {showQuickOrders && (
                <motion.div 
                  className="w-full"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <QuickOrder />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                  placeholder="Поиск блюд..." 
                  className="w-full pl-10 pr-10 py-2 rounded-full border border-input bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" 
                />
                {searchQuery && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setSearchQuery('')} 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground flex items-center justify-center"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                )}
              </div>
            </div>
            
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  className="mt-4 p-4 bg-muted/40 rounded-lg border border-muted"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap gap-4 justify-between">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Категории</div>
                      <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                          <motion.button 
                            key={category} 
                            onClick={() => handleCategoryClick(category)} 
                            className={`px-3 py-1 text-xs rounded-full transition-colors ${activeCategory === category ? 'bg-accent text-accent-foreground' : 'bg-muted hover:bg-muted/80'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {category}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Сортировка</div>
                      <select 
                        value={sortOption || ''} 
                        onChange={e => handleSortOptionChange(e.target.value || null)} 
                        className="p-2 text-xs rounded border border-input bg-background"
                      >
                        <option value="">По умолчанию</option>
                        <option value="price-low-high">Цена: от низкой к высокой</option>
                        <option value="price-high-low">Цена: от высокой к низкой</option>
                        <option value="name-a-z">Название: А-Я</option>
                        <option value="name-z-a">Название: Я-А</option>
                      </select>
                    </div>
                  </div>
                  
                  {(activeFilter || activeCategory || searchQuery || sortOption) && (
                    <motion.div 
                      className="mt-4 flex justify-end"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <button 
                        onClick={resetFilters} 
                        className="text-xs px-3 py-1 text-muted-foreground hover:text-accent transition-colors"
                      >
                        Сбросить все фильтры
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4 }}
            >
              <FoodCard 
                item={item} 
                isFavorite={favorites.includes(item.id)} 
                onFavoriteToggle={() => toggleFavorite(item.id)} 
                onClick={() => addToRecentlyViewed(item)} 
              />
            </motion.div>
          ))}
          
          {filteredItems.length === 0 && (
            <motion.div 
              className="col-span-full py-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="text-lg text-muted-foreground">Блюда не найдены</p>
              <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить фильтры или поисковый запрос</p>
              <motion.button 
                onClick={resetFilters} 
                className="mt-4 px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm hover:bg-accent/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Сбросить фильтры
              </motion.button>
            </motion.div>
          )}
        </motion.div>
        
        <AnimatePresence>
          {showScrollTop && (
            <motion.button 
              onClick={handleScrollToTop} 
              className="fixed bottom-6 right-6 p-3 bg-accent/80 text-white rounded-full shadow-md hover:bg-accent transition-colors z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} onComplete={handleOrderComplete} />
      
      <SuccessModal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
      
      <FavoritesDrawer isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} items={favoritedItems} onFavoriteToggle={toggleFavorite} />
    </Layout>
  );
};

export default Index;
