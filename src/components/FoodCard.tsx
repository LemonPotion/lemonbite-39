
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCart, FoodItem } from '../context/CartContext';

interface FoodCardProps {
  item: FoodItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(item);
    
    // Reset animation after it completes
    setTimeout(() => {
      setIsAdding(false);
    }, 300);
  };

  return (
    <div 
      className="food-card-shadow bg-white rounded-xl overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin"></div>
          </div>
        )}
        <img 
          src={item.image} 
          alt={item.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'} ${isImageLoaded ? 'image-fade-in' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-900">{item.name}</h3>
          <span className="text-sm font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
            {item.price.toFixed(2)} р
          </span>
        </div>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
        
        <button 
          onClick={handleAddToCart}
          className={`w-full py-2 flex items-center justify-center rounded-lg text-sm font-medium transition-all
            ${isAdding ? 'bg-yellow-500 text-white cart-item-add' : 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-md'}`}
        >
          <Plus size={16} className="mr-1" />
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
