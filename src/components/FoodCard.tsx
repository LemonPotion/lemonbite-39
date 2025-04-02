
import React, { useState } from 'react';
import { Plus, Heart, Star } from 'lucide-react';
import { useCart, FoodItem } from '../context/CartContext';

interface FoodCardProps {
  item: FoodItem;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

// Function to generate a random rating between 4.0 and 5.0
const generateRating = () => {
  return (4 + Math.random()).toFixed(1);
};

// Function to determine food tags based on item name
const generateFoodTags = (name: string): string[] => {
  const lowerName = name.toLowerCase();
  const tags: string[] = [];
  
  if (lowerName.includes('бургер')) tags.push('Фаст-фуд');
  if (lowerName.includes('пицца')) tags.push('Итальянская');
  if (lowerName.includes('салат')) tags.push('Здоровая');
  if (lowerName.includes('паста')) tags.push('Итальянская');
  if (lowerName.includes('суши')) tags.push('Японская');
  if (lowerName.includes('торт') || lowerName.includes('шоколад')) tags.push('Десерт');
  if (lowerName.includes('овощ')) tags.push('Вегетарианская');
  if (lowerName.includes('суп')) tags.push('Первое блюдо');
  if (lowerName.includes('рыб')) tags.push('Морепродукты');
  if (lowerName.includes('куриц')) tags.push('Куриное');
  if (lowerName.includes('греч')) tags.push('Греческая');
  if (lowerName.includes('тай')) tags.push('Тайская');
  
  // Add default tag if none matched
  if (tags.length === 0) tags.push('Основное блюдо');
  
  return tags;
};

const FoodCard: React.FC<FoodCardProps> = ({ item, isFavorite = false, onFavoriteToggle }) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [rating] = useState(generateRating());
  const [tags] = useState(generateFoodTags(item.name));

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
            <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
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
          <span className="text-sm font-semibold bg-accent text-white px-2 py-1 rounded-full shadow-sm">
            {item.price.toFixed(2)} р
          </span>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className="rating-star" 
                fill={i < Math.floor(parseFloat(rating)) ? "currentColor" : "none"} 
              />
            ))}
          </div>
          <span className="text-xs text-foreground/80">{rating}</span>
        </div>
        
        <div className="mb-2 flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span key={index} className="food-tag">{tag}</span>
          ))}
        </div>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
        
        <button 
          onClick={handleAddToCart}
          className={`w-full py-2 flex items-center justify-center rounded-lg text-sm font-medium tracking-wide transition-all
            ${isAdding ? 'bg-accent text-white cart-item-add' : 'bg-accent text-white hover:bg-accent/90 hover:shadow-lg shadow-md'}`}
        >
          <Plus size={16} className="mr-1" />
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
