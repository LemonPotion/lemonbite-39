
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import FoodCard from '../components/FoodCard';
import CheckoutModal from '../components/CheckoutModal';
import SuccessModal from '../components/SuccessModal';
import { useCart, FoodItem } from '../context/CartContext';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import FavoritesDrawer from '../components/FavoritesDrawer';
import RecentlyViewedBanner from '../components/RecentlyViewedBanner';
import { saveFavoritesToCookies, getFavoritesFromCookies } from '../utils/cookieUtils';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';

const foodItems: FoodItem[] = [
  {
    id: "0195b361-2042-7a65-bc93-0c5cac31e46a",
    name: 'Классический бургер',
    price: 280,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Сочный говяжий котлет с салатом, помидором, сыром и фирменным соусом на поджаренной булочке.'
  },
  {
    id: "0195b362-6206-7f9d-b477-726821cdfe70",
    name: 'Пицца "Маргарита"',
    price: 350,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Классическая пицца с томатным соусом, свежей моцареллой, базиликом и оливковым маслом.'
  },
  {
    id: "0195b362-e16c-7dc6-8622-29031a915e59",
    name: 'Салат "Цезарь"',
    price: 220,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Свежий романо, сухарики, пармезан и соус "Цезарь".'
  },
  {
    id: "0195b363-2b67-7e55-9471-6b9a1b6bdfba",
    name: 'Паста с курицей',
    price: 320,
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Пенне с курицей, сливочным соусом "Альфредо" и свежими травами.'
  },
  {
    id: "0195b363-796a-7366-a2f1-bca4518c3390",
    name: 'Овощное жаркое',
    price: 280,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Свежие овощи, обжаренные с тофу в ароматном соусе, подаются с рисом.'
  },
  {
    id: "0195b363-d60c-799c-a440-c048b08d25e7",
    name: 'Шоколадный торт',
    price: 180,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Насыщенный шоколадный торт с нежным ганашем и свежими ягодами.'
  },
  {
    id: "0195b364-0a6d-7c46-bee2-0fe79d171a8c",
    name: 'Рыбные тако',
    price: 290,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Жареная рыба с капустным салатом, авокадо и лаймовым кремом в кукурузных тортильях.'
  },
  {
    id: "0195b364-569c-7aad-862f-9ecb5a806334",
    name: 'Суши-ассорти',
    price: 450,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Ассорти свежих суши, включая лосось, тунца и роллы "Калифорния".'
  },
  {
    id: "0195b364-9b4d-7852-8c63-064f39aa7323",
    name: 'Бефстроганов',
    price: 380,
    image: 'https://images.unsplash.com/photo-1608835291093-394b0c943a75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Нежные кусочки говядины с грибами в сливочном соусе, подаются с яичной лапшой.'
  },
  {
    id: "0195b364-cc5f-7238-b93c-6a778ed837f3",
    name: 'Пад Тай с креветками',
    price: 340,
    image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Рисовая лапша с креветками, тофу, ростками фасоли, арахисом и тамариндовым соусом.'
  },
  {
    id: "0195b364-ff06-7ef1-a854-e407f2ee800e",
    name: 'Греческий гирос',
    price: 260,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Пряное мясо, свежие овощи и соус дзадзики в теплой питe.'
  },
  {
    id: "0195b365-4c34-7ecf-aebb-327fb9767f87",
    name: 'Грибное ризотто',
    price: 300,
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Кремовый рис Арборио, медленно приготовленный с грибами, белым вином и пармезаном.'
  },
  {
    id: "0195b365-7f2a-8c9d-4e5f-6g7h8i9j0k1l",
    name: 'Тирамису',
    price: 230,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Классический итальянский десерт с нежным кремом, кофе и какао.'
  },
  {
    id: "0195b365-8d9e-0f1g-2h3i-4j5k6l7m8n9o",
    name: 'Борщ украинский',
    price: 240,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Традиционный украинский суп со свеклой, капустой, и сметаной.'
  },
  {
    id: "0195b365-9p0q-1r2s-3t4u-5v6w7x8y9z0a",
    name: 'Пельмени сибирские',
    price: 290,
    image: 'https://images.unsplash.com/photo-1589187151053-5ec8818e661b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Домашние пельмени с мясной начинкой, подаются со сметаной.'
  },
  {
    id: "0195b366-0b1c-2d3e-4f5g-6h7i8j9k0l1m",
    name: 'Стейк Рибай',
    price: 720,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Сочный стейк из мраморной говядины, приготовленный на гриле.'
  },
  {
    id: "0195b366-2n3o-4p5q-6r7s-8t9u0v1w2x3y",
    name: 'Том Ям',
    price: 310,
    image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Острый тайский суп с креветками, грибами и ароматными травами.'
  },
  {
    id: "0195b366-4z5a-6b7c-8d9e-0f1g2h3i4j5k",
    name: 'Хачапури по-аджарски',
    price: 270,
    image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Традиционная грузинская выпечка с сыром и яйцом.'
  },
  {
    id: "0195b366-6l7m-8n9o-0p1q-2r3s4t5u6v7w",
    name: 'Чизкейк Нью-Йорк',
    price: 250,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Классический американский чизкейк с нежной сырной начинкой и ягодным соусом.'
  },
  {
    id: "0195b366-8x9y-0z1a-2b3c-4d5e6f7g8h9i",
    name: 'Раменбоул с курицей',
    price: 340,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Питательный японский суп с лапшой, куриным филе, яйцом и овощами.'
  },
  {
    id: "0195b367-0j1k-2l3m-4n5o-6p7q8r9s0t1u",
    name: 'Фалафель в питe',
    price: 220,
    image: 'https://images.unsplash.com/photo-1619860860774-1e2e14a78d99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Хрустящие шарики из нута с хумусом, свежими овощами и соусом в мягкой питe.'
  },
  {
    id: "0195b367-2v3w-4x5y-6z7a-8b9c0d1e2f3g",
    name: 'Осьминог на гриле',
    price: 650,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Нежные щупальца осьминога, приготовленные на гриле с оливковым маслом и зеленью.'
  },
  {
    id: "0195b367-4h5i-6j7k-8l9m-0n1o2p3q4r5s",
    name: 'Паэлья с морепродуктами',
    price: 520,
    image: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Традиционное испанское блюдо из риса с шафраном, креветками, мидиями и кальмарами.'
  },
  {
    id: "0195b367-6t7u-8v9w-0x1y-2z3a4b5c6d7e",
    name: 'Утка по-пекински',
    price: 690,
    image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Хрустящая утка с тонкими блин��иками, огурц��м, зеленым луком и сладким соусом хойсин.'
  }
];

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
  // Adding the missing priceRange state
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 800]);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    const category = params.get('category');
    if (category) {
      setActiveCategory(category);
      navigate('/', { replace: true });
    }
    
    const random = params.get('random');
    if (random === 'true') {
      const randomIndex = Math.floor(Math.random() * foodItems.length);
      setRandomItem(foodItems[randomIndex]);
      navigate('/', { replace: true });
    }
    
    const search = params.get('search');
    if (search) {
      setSearchQuery(search);
      navigate('/', { replace: true });
    }
    
    const minPrice = params.get('minPrice');
    const maxPrice = params.get('maxPrice');
    if (minPrice && maxPrice) {
      setPriceRange([Number(minPrice), Number(maxPrice)]);
      navigate('/', { replace: true });
    }
    
    const recently = params.get('recently');
    if (recently === 'true') {
      const recentlyViewedElement = document.getElementById('recently-viewed');
      if (recentlyViewedElement) {
        recentlyViewedElement.scrollIntoView({ behavior: 'smooth' });
        recentlyViewedElement.classList.add('ring-2', 'ring-accent', 'rounded-lg');
        setTimeout(() => {
          recentlyViewedElement.classList.remove('ring-2', 'ring-accent', 'rounded-lg');
        }, 2000);
      }
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    const savedFavorites = getFavoritesFromCookies();
    if (savedFavorites.length > 0) {
      setFavorites(savedFavorites);
    }
  }, []);

  const handleOrderComplete = (phoneNumber: string, address: string) => {
    console.log('Order placed with:', { phoneNumber, address });
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId];
      
      saveFavoritesToCookies(newFavorites);
      return newFavorites;
    });
  };

  const addToRecentlyViewed = (item: FoodItem) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(i => i.id !== item.id);
      return [item, ...filtered].slice(0, 4);
    });
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(prev => prev === filter ? null : filter);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(prev => prev === category ? null : category);
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
    if (item.name.toLowerCase().includes('торт') || item.name.toLowerCase().includes('шоколад') || 
        item.name.toLowerCase().includes('тирамису') || item.name.toLowerCase().includes('чизкейк')) return 'Десерты';
    if (item.name.toLowerCase().includes('рыб') || item.name.toLowerCase().includes('морепродукт') ||
        item.name.toLowerCase().includes('осьминог')) return 'Морепродукты';
    if (item.name.toLowerCase().includes('суп') || item.name.toLowerCase().includes('борщ') || 
        item.name.toLowerCase().includes('том ям') || item.name.toLowerCase().includes('рамен')) return 'Супы';
    if (item.name.toLowerCase().includes('стейк') || item.name.toLowerCase().includes('утка')) return 'Мясные блюда';
    return 'Основные блюда';
  }))];

  let filteredItems = foodItems.filter(item => {
    const matchesSearch = searchQuery ? 
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.description.toLowerCase().includes(searchQuery.toLowerCase())) :
      true;
    
    if (!matchesSearch) return false;
    
    if (activeFilter === 'favorites') {
      return favorites.includes(item.id);
    }

    if (activeCategory) {
      const itemCategory = 
        item.name.toLowerCase().includes('бургер') ? 'Фаст-фуд' :
        item.name.toLowerCase().includes('пицца') ? 'Пицца' :
        item.name.toLowerCase().includes('салат') ? 'Салаты' :
        item.name.toLowerCase().includes('паста') ? 'Паста' :
        item.name.toLowerCase().includes('суши') ? 'Азиатская' :
        (item.name.toLowerCase().includes('торт') || item.name.toLowerCase().includes('шоколад') || 
         item.name.toLowerCase().includes('тирамису') || item.name.toLowerCase().includes('чизкейк')) ? 'Десерты' :
        (item.name.toLowerCase().includes('рыб') || item.name.toLowerCase().includes('морепродукт') || 
         item.name.toLowerCase().includes('осьминог')) ? 'Морепродукты' :
        (item.name.toLowerCase().includes('суп') || item.name.toLowerCase().includes('борщ') || 
         item.name.toLowerCase().includes('том ям') || item.name.toLowerCase().includes('рамен')) ? 'Супы' :
        (item.name.toLowerCase().includes('стейк') || item.name.toLowerCase().includes('утка')) ? 'Мясные блюда' :
        'Основные блюда';
      
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
    setRandomItem(null);
  };

  useEffect(() => {
    if (recentlyViewed.length === 0 && foodItems.length > 0) {
      const randomIndexes = Array.from({ length: Math.min(4, foodItems.length) }, () => 
        Math.floor(Math.random() * foodItems.length)
      );
      const uniqueIndexes = [...new Set(randomIndexes)];
      const randomItems = uniqueIndexes.map(index => foodItems[index]);
      setRecentlyViewed(randomItems);
    }
  }, [foodItems, recentlyViewed.length]);

  return (
    <Layout onCartOpen={() => setIsCheckoutOpen(true)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 theme-transition">
        <div className="mb-12">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-foreground theme-transition">
              Our <span className="text-accent">Menu</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-lg text-center theme-transition">
              Discover our carefully crafted dishes made with the freshest ingredients
            </p>
          </div>
          
          {randomItem && (
            <div className="mb-8 p-6 bg-accent/10 rounded-xl relative">
              <button 
                onClick={dismissRandomItem}
                className="absolute top-3 right-3 p-1 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
                aria-label="Close recommendation"
              >
                <X size={18} />
              </button>
              <h2 className="text-xl font-bold mb-4 text-center">Рекомендуем попробовать:</h2>
              <div className="max-w-md mx-auto">
                <FoodCard 
                  item={randomItem}
                  isFavorite={favorites.includes(randomItem.id)}
                  onFavoriteToggle={() => toggleFavorite(randomItem.id)}
                />
              </div>
            </div>
          )}
          
          <div className="relative mb-8 flex justify-center">
            <div className="flex items-center w-full max-w-md">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 theme-transition" size={18} />
                <input
                  type="text"
                  placeholder="Search for dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-card border border-muted rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-accent theme-transition"
                />
              </div>
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <button className="ml-2 p-3 bg-card border border-muted rounded-lg text-foreground hover:bg-muted/50 transition-colors theme-transition">
                    <SlidersHorizontal size={18} />
                  </button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Фильтры и сортировка</SheetTitle>
                    <SheetDescription>
                      Настройте параметры поиска блюд
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Сортировка</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { id: 'price-low-high', label: 'По возрастанию цены' },
                          { id: 'price-high-low', label: 'По убыванию цены' },
                          { id: 'name-a-z', label: 'По алфавиту (А-Я)' },
                          { id: 'name-z-a', label: 'По алфавиту (Я-А)' }
                        ].map(option => (
                          <Button
                            key={option.id}
                            variant={sortOption === option.id ? "default" : "outline"}
                            className="justify-start"
                            onClick={() => handleSortOptionChange(option.id)}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Категории</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map(category => (
                          <Button
                            key={category}
                            variant={activeCategory === category ? "default" : "outline"}
                            className="justify-start"
                            onClick={() => handleCategoryClick(category)}
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button 
                      variant="ghost" 
                      className="w-full" 
                      onClick={resetFilters}
                    >
                      Сбросить все фильтры
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <FoodCard
                key={item.id}
                item={item}
                isFavorite={favorites.includes(item.id)}
                onFavoriteToggle={() => toggleFavorite(item.id)}
                onClick={() => addToRecentlyViewed(item)}
              />
            ))}
          </div>
          
          {recentlyViewed.length > 0 && (
            <div id="recently-viewed" className="mt-16">
              <RecentlyViewedBanner 
                items={recentlyViewed} 
                onItemClick={addToRecentlyViewed}
              />
            </div>
          )}
        </div>
      </div>
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onComplete={handleOrderComplete}
      />
      
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
      
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        items={favoritedItems}
        onFavoriteToggle={toggleFavorite}
      />
    </Layout>
  );
};

export default Index;
