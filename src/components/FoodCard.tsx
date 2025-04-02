
import React, { useState } from 'react';
import { Plus, Heart } from 'lucide-react';
import { useCart, FoodItem } from '../context/CartContext';

interface FoodCardProps {
  item: FoodItem;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, isFavorite = false, onFavoriteToggle }) => {
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
      className="food-card-shadow bg-white rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-5px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin"></div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
        {isFavorite !== undefined && onFavoriteToggle && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle();
            }}
            className={`absolute top-2 right-2 z-20 p-1.5 rounded-full ${
              isFavorite ? 'bg-red-50 text-red-500' : 'bg-white/70 text-gray-400 hover:text-gray-600'
            }`}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
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
          <span className="text-sm font-semibold bg-blue-500 text-white px-2 py-1 rounded-full shadow-sm">
            {item.price.toFixed(2)} р
          </span>
        </div>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
        
        <button 
          onClick={handleAddToCart}
          className={`w-full py-2 flex items-center justify-center rounded-lg text-sm font-medium tracking-wide transition-all
            ${isAdding ? 'bg-blue-500 text-white cart-item-add' : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg shadow-md'}`}
        >
          <Plus size={16} className="mr-1" />
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
