
import React, { useState } from 'react';
import { Plus, Heart, ChefHat, Star, Clock } from 'lucide-react';
import { useCart, FoodItem } from '../context/CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface FoodCardProps {
  item: FoodItem;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

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
}

const FoodCard: React.FC<FoodCardProps> = ({ item, isFavorite = false, onFavoriteToggle }) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [tags] = useState(generateFoodTags(item.name));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  // New feature - Random popularity rating
  const [rating] = useState({
    stars: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
    votes: Math.floor(Math.random() * 100) + 50, // 50-149 votes
    cookTime: Math.floor(Math.random() * 20) + 10, // 10-29 minutes
    isNew: Math.random() > 0.8, // 20% chance of being new
    isPopular: Math.random() > 0.7 // 30% chance of being popular
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dialog from opening when clicking add button
    setIsAdding(true);
    addItem(item);
    setShowSparkles(true);
    
    // Show toast with animation
    toast.success(`${item.name} добавлен в корзину!`, {
      description: `${item.price.toFixed(2)} р`
    });
    
    // Reset animations after they complete
    setTimeout(() => {
      setIsAdding(false);
      setTimeout(() => {
        setShowSparkles(false);
      }, 300);
    }, 300);
  };

  return (
    <>
      <div 
        className="food-card-shadow bg-white rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-5px] cursor-pointer relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsDialogOpen(true)}
      >
        {/* New feature - Sparkle effect when adding to cart */}
        {showSparkles && (
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="animate-ping absolute h-16 w-16 rounded-full bg-accent opacity-75"></div>
              <div className="relative rounded-full h-5 w-5 bg-accent"></div>
            </div>
          </div>
        )}
        
        {/* New feature - Badge for popular or new items */}
        {(rating.isNew || rating.isPopular) && (
          <div className={`absolute top-2 left-2 z-20 px-2 py-1 rounded-full text-xs font-medium animate-pulse-light shadow-sm ${
            rating.isNew ? 'bg-blue-500 text-white' : 'bg-yellow-400 text-gray-800'
          }`}>
            {rating.isNew ? 'Новинка' : 'Популярное'}
          </div>
        )}
        
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
              } transition-transform active:scale-110`}
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} className={isFavorite ? "favorite-pulse" : ""} />
            </button>
          )}
          <img 
            src={item.image} 
            alt={item.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'} ${isImageLoaded ? 'image-fade-in' : 'opacity-0'}`}
            onLoad={() => setIsImageLoaded(true)}
            onError={(e) => {
              console.log("Image error for:", item.name);
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
              setIsImageLoaded(true);
            }}
          />
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <span className="text-sm font-semibold bg-accent text-white px-2 py-1 rounded-full shadow-sm">
              {item.price.toFixed(2)} р
            </span>
          </div>
          
          {/* New feature - Rating stars */}
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={i < rating.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({rating.votes})</span>
            <div className="flex items-center ml-auto text-xs text-gray-500">
              <Clock size={12} className="mr-1" />
              <span>{rating.cookTime} мин</span>
            </div>
          </div>
          
          <div className="mb-2 flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span key={index} className="food-tag">{tag}</span>
            ))}
          </div>
          
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
          
          <button 
            onClick={handleAddToCart}
            className={`w-full py-2 flex items-center justify-center rounded-lg text-sm font-medium tracking-wide 
              transition-all duration-200 cart-button-add bg-accent text-white shadow-sm ${isAdding ? 'scale-95' : ''}`}
            aria-label="Add to cart"
          >
            <Plus size={16} className="mr-1" />
            Добавить в корзину
          </button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white border-accent/10">
          <div className="relative h-64 sm:h-72">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
              }}
            />
            
            {/* New feature - Chef badge on selected items */}
            <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center shadow-sm">
              <ChefHat size={16} className="text-accent mr-1" />
              <span className="text-xs font-medium">От шеф-повара</span>
            </div>
          </div>
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{item.name}</span>
                <span className="text-sm font-semibold bg-accent text-white px-2 py-1 rounded-full">
                  {item.price.toFixed(2)} р
                </span>
              </DialogTitle>
            </DialogHeader>
            
            {/* New feature - Rating stars in dialog */}
            <div className="flex items-center my-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < rating.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">({rating.votes} оценок)</span>
            </div>
            
            <div className="my-4">
              <p className="text-foreground/80">{item.description}</p>
            </div>
            <div className="flex flex-wrap gap-1 mb-6">
              {tags.map((tag, index) => (
                <span key={index} className="food-tag">{tag}</span>
              ))}
            </div>
            <button 
              onClick={(e) => {
                handleAddToCart(e);
                setIsDialogOpen(false);
              }}
              className="w-full py-3 flex items-center justify-center rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent/90 transition-all duration-200 cart-button-add shadow-sm"
            >
              <Plus size={16} className="mr-1" />
              Добавить в корзину
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FoodCard;
