
import React, { useState } from 'react';
import Layout from '../components/Layout';
import FoodCard from '../components/FoodCard';
import FloatingCart from '../components/FloatingCart';
import CheckoutModal from '../components/CheckoutModal';
import SuccessModal from '../components/SuccessModal';
import WelcomeMessage from '../components/WelcomeMessage';
import { useCart, FoodItem } from '../context/CartContext';
import { Search, Filter } from 'lucide-react';

// Sample food data with added items
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
    image: 'https://images.unsplash.com/photo-1608835291093-394b0c943a75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Нежные кусочки говядины с грибами в сливочном соусе, подаются с яичной лапшой.'
  },
  {
    id: "0195b364-cc5f-7238-b93c-6a778ed837f3",
    name: 'Пад Тай с креветками',
    price: 340,
    image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Рисовая лапша с креветками, тофу, ростками фасоли, арахисом и тамариндовым соусом.'
  },
  {
    id: "0195b364-ff06-7ef1-a854-e407f2ee800e",
    name: 'Греческий гирос',
    price: 260,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Пряное мясо, свежие овощи и соус дзадзики в теплой питe.'
  },
  {
    id: "0195b365-4c34-7ecf-aebb-327fb9767f87",
    name: 'Грибное ризотто',
    price: 300,
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Кремовый рис Арборио, медленно приготовленный с грибами, белым вином и пармезаном.'
  }
];

const Index = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();

  const handleOrderComplete = (phoneNumber: string, address: string) => {
    console.log('Order placed with:', { phoneNumber, address });
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
  };

  const filteredItems = foodItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showWelcome ? (
          <div className="py-12">
            <WelcomeMessage onContinue={() => setShowWelcome(false)} />
          </div>
        ) : (
          <>
            <div className="mb-12">
              <div className="flex flex-col items-center text-center space-y-6 mb-10 animate-fade-in">
                <h1 className="text-4xl sm:text-5xl font-bold text-[#221F26] tracking-tight leading-none">
                  Our <span className="text-yellow-500">Menu</span>
                </h1>
                <p className="text-lg text-[#555555] max-w-lg">
                  Discover our carefully crafted dishes made with the freshest ingredients
                </p>
              </div>
              
              <div className="relative mb-8 flex justify-center animate-fade-in" style={{animationDelay: "0.1s"}}>
                <div className="flex items-center gap-4 w-full max-w-2xl">
                  <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8A898C]" size={18} />
                    <input
                      type="text"
                      placeholder="Search for dishes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-[#F6F6F7]/80 backdrop-blur-sm border border-white/20 rounded-xl text-[#403E43] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all shadow-soft"
                    />
                  </div>
                  <button className="p-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-[#403E43] hover:bg-[#F6F6F7] transition-colors shadow-soft">
                    <Filter size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
                {filteredItems.map((item, index) => (
                  <div key={item.id} style={{animationDelay: `${0.1 * (index % 4)}s`}} className="animate-scale-in">
                    <FoodCard item={item} />
                  </div>
                ))}
                {filteredItems.length === 0 && (
                  <div className="col-span-full py-16 text-center">
                    <h3 className="text-xl font-medium text-[#403E43]">No items found</h3>
                    <p className="text-[#8A898C] mt-2">Try adjusting your search</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
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
    </Layout>
  );
};

export default Index;
