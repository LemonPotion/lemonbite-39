
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import FoodCard from '../components/FoodCard';
import FloatingCart from '../components/FloatingCart';
import CheckoutModal from '../components/CheckoutModal';
import SuccessModal from '../components/SuccessModal';
import QuickOrder from '../components/QuickOrder';
import { useCart, FoodItem } from '../context/CartContext';
import { Search, Heart, Clock, Filter } from 'lucide-react';
import FavoritesDrawer from '../components/FavoritesDrawer';
import RecentlyViewedBanner from '../components/RecentlyViewedBanner';
import { saveFavoritesToCookies, getFavoritesFromCookies } from '../utils/cookieUtils';

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
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
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
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
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
  const { totalItems } = useCart();

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

  // Extract all unique categories from food items
  const categories = [...new Set(foodItems.map(item => {
    if (item.name.toLowerCase().includes('бургер')) return 'Фаст-фуд';
    if (item.name.toLowerCase().includes('пицца')) return 'Пицца';
    if (item.name.toLowerCase().includes('салат')) return 'Салаты';
    if (item.name.toLowerCase().includes('паста')) return 'Паста';
    if (item.name.toLowerCase().includes('суши')) return 'Азиатская';
    if (item.name.toLowerCase().includes('торт') || item.name.toLowerCase().includes('шоколад')) return 'Десерты';
    if (item.name.toLowerCase().includes('рыб')) return 'Морепродукты';
    return 'Основные блюда';
  }))];

  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (activeFilter === 'favorites') {
      return favorites.includes(item.id);
    }

    if (activeCategory) {
      const itemCategory = item.name.toLowerCase().includes('бургер') ? 'Фаст-фуд' :
        item.name.toLowerCase().includes('пицца') ? 'Пицца' :
        item.name.toLowerCase().includes('салат') ? 'Салаты' :
        item.name.toLowerCase().includes('паста') ? 'Паста' :
        item.name.toLowerCase().includes('суши') ? 'Азиатская' :
        item.name.toLowerCase().includes('торт') || item.name.toLowerCase().includes('шоколад') ? 'Десерты' :
        item.name.toLowerCase().includes('рыб') ? 'Морепродукты' :
        'Основные блюда';
      
      return itemCategory === activeCategory;
    }
    
    return true;
  });

  const favoritedItems = foodItems.filter(item => favorites.includes(item.id));

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-foreground">
              Our <span className="text-accent">Menu</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-lg text-center">
              Discover our carefully crafted dishes made with the freshest ingredients
            </p>
          </div>
          
          {/* Quick Order Component */}
          <div className="mb-6">
            <QuickOrder />
          </div>
          
          <div className="relative mb-8 flex justify-center">
            <div className="flex items-center w-full max-w-md">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
                <input
                  type="text"
                  placeholder="Search for dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-muted rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-8">
            <button 
              onClick={() => handleFilterClick('favorites')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-colors ${
                activeFilter === 'favorites' 
                  ? 'bg-accent border-accent/50 text-white' 
                  : 'bg-white border-muted text-foreground hover:bg-muted/50'
              }`}
            >
              <Heart size={16} className={activeFilter === 'favorites' ? 'text-white' : 'text-foreground/50'} />
              Favorites
            </button>
          </div>

          {/* Categories horizontal scroll */}
          <div className="mb-8 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 pb-2 min-w-max">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? 'bg-accent text-white'
                      : 'bg-white text-foreground border border-muted hover:bg-muted/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {recentlyViewed.length > 0 && (
            <RecentlyViewedBanner items={recentlyViewed} />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} onClick={() => addToRecentlyViewed(item)}>
                <FoodCard 
                  item={item} 
                  isFavorite={favorites.includes(item.id)}
                  onFavoriteToggle={() => toggleFavorite(item.id)}
                />
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <h3 className="text-xl font-medium text-foreground">No items found</h3>
                <p className="text-foreground/60 mt-2">Try adjusting your search</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {totalItems > 0 && (
        <FloatingCart onClick={() => setIsCheckoutOpen(true)} />
      )}

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
