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

const foodItems: FoodItem[] = [{
  id: "cc0a5991-5f23-47d9-97e8-753a3d9cc1be",
  name: 'Классический бургер',
  price: 90,
  image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  description: 'Сочная говяжая котлета с салатом, помидором, сыром и фирменным соусом на поджаренной булочке.'
}, {
  id: "9630fcc3-b496-45af-9918-e0698c1c6928",
  name: 'Пицца "Маргарита"',
  price: 120,
  image: 'https://static.1000.menu/img/content-v2/ef/27/10853/picca-margarita-v-domashnix-usloviyax_1608783820_4_max.jpg',
  description: 'Классическая пицца с томатным соусом, свежей моцареллой, базиликом и оливковым маслом.'
}, {
  id: "7d8ded21-c195-410c-8858-9ab6a1b0409d",
  name: 'Салат "Цезарь"',
  price: 130,
  image: 'https://ferma-m2.ru/images/shop/recipe_image/crop_shutterstock_1505620307.jpg',
  description: 'Свежий романо, сухарики, пармезан и соус "Цезарь".'
}, {
  id: "aa04728c-a701-48d6-8aa7-343d46095ccf",
  name: 'Паста с курицей',
  price: 80,
  image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  description: 'Пенне с курицей, сливочным соусом "Альфредо" и свежими травами.'
}, {
  id: "78c07716-d3f3-433f-8d0a-e56340ce1be5",
  name: 'Овощное жаркое',
  price: 90,
  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  description: 'Свежие овощи, обжаренные с тофу в ароматном соусе, подаются с рисом.'
}, {
  id: "dbd459c7-c11d-4480-b85f-67aeebf7d0e6",
  name: 'Шоколадный торт',
  price: 180,
  image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  description: 'Насыщенный шоколадный торт с нежным ганашем и свежими ягодами.'
}, {
  id: "4eded883-1fd9-429f-8e13-bf92c974ef5b",
  name: 'Рыбные тако',
  price: 125,
  image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  description: 'Жареная рыба с капустным салатом, авокадо и лаймовым кремом в кукуру��ных тортильях.'
}, {
  id: "53746dfa-2ed9-40a1-936d-be88f4de237a",
  name: 'Суши-ассорти',
  price: 220,
  image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  description: 'Ассорти свежих суши, включая лосось, тунца и роллы "Калифорния".'
}, {
  id: "e0ea2c5e-a082-4a85-affa-6d268b9c2d10",
  name: 'Бефстроганов',
  price: 120,
  image: 'https://images.unsplash.com/photo-1608835291093-394b0c943a75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  description: 'Нежные кусочки говядины с грибами в сливочном соусе, подаются с яичной лапшой.'
}, {
  id: "fdf0fa2a-6173-46c0-b353-c92be7110efa",
  name: 'Пад Тай с креветками',
  price: 130,
  image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  description: 'Рисовая лапша с креветками, тофу, ростками фасоли, арахисом и тамариндовым соусом.'
}, {
  id: "b2a52c6c-831d-4d4a-b703-6d09518e737c",
  name: 'Греческий гирос',
  price: 90,
  image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  description: 'Пряное мясо, свежие овощи и соус дзадзики в теплой питe.'
}, {
  id: "276dd5be-c262-4b78-b4be-191a63b2d096",
  name: 'Грибное ризотто',
  price: 125,
  image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  description: 'Кремовый рис Арборио, медленно приготовленный с грибами, белым вином и пармезаном.'
}, {
  id: "ff93e1f2-1ccb-40e8-a33f-d56d82c86314",
  name: 'Тирамису',
  price: 80,
  image: 'https://lasunka.com/s165-prew.jpg',
  description: 'Классический итальянский десерт с нежным кремом, кофе и какао.'
}, {
  id: "4ebd3882-fd00-4834-8529-2607427609f7",
  name: 'Борщ украинский',
  price: 115,
  image: 'https://i.ytimg.com/vi/4C-ewlHTq2E/maxresdefault.jpg',
  description: 'Традиционный украинский суп со свеклой, капустой, и сметаной.'
}, {
  id: "747812db-a925-4367-b797-eafe47874a11",
  name: 'Пельмени сибирские',
  price: 80,
  image: 'https://images.gastronom.ru/OJ1rNL0xLnRuf9mNmOWUPV9BWWK-ivUk6Yck05IqXxE/pr:recipe-preview-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzI4NDA1OTE2LTM4ZDMtNDYwMC1hMjYyLTc1NzFkNjc3MDdlZi5qcGc',
  description: 'Домашние пельмени с мясной начинкой, подаются со сметаной.'
}, {
  id: "3d197686-4aa0-4571-9686-f07cf595cb45",
  name: 'Стейк Рибай',
  price: 180,
  image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  description: 'Сочный стейк из мраморной говядины, приготовленный на гриле.'
}, {
  id: "48b9bc14-babc-412a-82a6-95b6ea131752",
  name: 'Том Ям',
  price: 178,
  image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  description: 'Острый тайский суп с креветками, грибами и ароматными травами.'
}, {
  id: "d9e94877-a850-43b2-9379-f9a6c55fc511",
  name: 'Хачапури по-аджарски',
  price: 130,
  image: 'https://zira.uz/wp-content/uploads/2017/10/hachapuri-1.jpg',
  description: 'Традиционная грузинская выпечка с сыром и яйцом.'
}, {
  id: "acd76e7d-46f4-4900-855e-a16c64edabfe",
  name: 'Чизкейк Нью-Йорк',
  price: 80,
  image: 'https://la-torta.ua/content/uploads/images/12-cake.jpg',
  description: 'Классический американский чизкейк с нежной сырной начинкой и ягодным соусом.'
}, {
  id: "92febdca-9da7-43f4-afe1-6aef7c4dcf55",
  name: 'Раменбоул с курицей',
  price: 156,
  image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  description: 'Питательный японский суп с лапшой, куриным филе, яйцом и овощами.'
}, {
  id: "5f73ba8a-96f9-42cb-9101-b687cb5231f4",
  name: 'Осьминог на гриле',
  price: 230,
  image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  description: 'Нежные щупальца осьминога, приготовленные на гриле с оливковым маслом и зеленью.'
}, {
  id: "62d608f6-0068-4978-a3bb-92bfc483aa3c",
  name: 'Паэлья с морепродуктами',
  price: 168,
  image: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  description: 'Традиционное испанское блюдо из риса с шафраном, креветками, мидиями и кальмарами.'
}, {
  id: "ee168189-9900-49b9-8b17-5776e0c50b36",
  name: 'Утка по-пекински',
  price: 230,
  image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  description: 'Хрустящая утка с тонкими блинами, огурцами, зеленым луком и сладким соусом хойсин.'
}];

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
  const {
    addItem
  } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

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
      const randomIndex = Math.floor(Math.random() * foodItems.length);
      setRandomItem(foodItems[randomIndex]);
      navigate('/', {
        replace: true
      });
    }
    const search = params.get('search');
    if (search) {
      setSearchQuery(search);
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
  }, [location, navigate]);

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
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-input bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" 
                />
                {searchQuery && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setSearchQuery('')} 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </motion.button>
                )}
              </div>
              
              <div className="flex gap-2">
                
                
                
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
