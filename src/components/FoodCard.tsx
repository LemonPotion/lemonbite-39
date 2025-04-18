
import React, { useState } from 'react';
import { Plus, Heart, ChefHat, Clock, Utensils } from 'lucide-react';
import { useCart, FoodItem } from '../context/CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Badge } from './ui/badge';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from './animations/Confetti';

interface FoodCardProps {
  item: FoodItem;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onClick?: () => void;
}

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
  
  if (tags.length === 0) tags.push('Основное блюдо');
  
  return tags;
}

const generateFoodInfo = (name: string): { calories: number; prepTime: number; spicyLevel: number } => {
  const nameSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  
  return {
    calories: 200 + (nameSum % 600),
    prepTime: 10 + (nameSum % 20),
    spicyLevel: nameSum % 4
  };
}

const FoodCard: React.FC<FoodCardProps> = ({ item, isFavorite = false, onFavoriteToggle, onClick }) => {
  const { theme } = useTheme();
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [tags] = useState(generateFoodTags(item.name));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [foodInfo] = useState(generateFoodInfo(item.name));
  const [cookTime] = useState({
    cookTime: Math.floor(Math.random() * 20) + 10,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPosition, setConfettiPosition] = useState({ x: 0, y: 0 });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfettiPosition({ x: e.clientX, y: e.clientY });
    setShowConfetti(true);
    addItem(item);
    setTimeout(() => setShowConfetti(false), 1000);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
    setIsDialogOpen(true);
  };

  return (
    <>
      <motion.div 
        className="food-card-hover rounded-xl overflow-hidden bg-card border border-border shadow-sm relative"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCardClick}
      >
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
          {isFavorite !== undefined && onFavoriteToggle && (
            <motion.button 
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle();
              }}
              className={`absolute top-2 right-2 z-20 p-1.5 rounded-full backdrop-blur-sm ${
                isFavorite ? 'bg-red-50 dark:bg-red-900/30 text-red-500' : 'bg-white/70 dark:bg-white/10 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white'
              } transition-transform`}
              whileTap={{ scale: 1.2 }}
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} className={isFavorite ? "favorite-pulse" : ""} />
            </motion.button>
          )}
          <motion.img 
            src={item.image} 
            alt={item.name}
            className={`w-full h-full object-cover food-image-hover ${isImageLoaded ? 'image-fade-in' : 'opacity-0'}`}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
            onLoad={() => setIsImageLoaded(true)}
            onError={(e) => {
              console.log("Ошибка загрузки изображения:", item.name);
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
              setIsImageLoaded(true);
            }}
          />
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-foreground line-clamp-2">{item.name}</h3>
            <motion.span 
              className="text-sm font-semibold bg-accent text-white px-2 py-1 rounded-full shadow-sm flex-shrink-0 ml-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {item.price.toFixed(2)} р
            </motion.span>
          </div>
          
          <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Utensils size={12} className="mr-1" />
              <span>{foodInfo.calories} ккал</span>
            </div>
            <div className="flex items-center">
              <Clock size={12} className="mr-1" />
              <span>{cookTime.cookTime} мин</span>
            </div>
          </div>
          
          <div className="mb-2 flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <motion.span 
                key={index} 
                className="food-tag"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">{item.description}</p>
          
          <motion.button 
            onClick={handleAddToCart}
            className="w-full py-2 flex items-center justify-center rounded-lg text-sm font-medium tracking-wide 
              btn-pop bg-accent text-white shadow-sm mt-auto hover:bg-accent/90"
            aria-label="Добавить в корзину"
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Plus size={16} className="mr-1" />
            Добавить в корзину
          </motion.button>
        </div>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-card text-card-foreground border-accent/10">
          <motion.div 
            className="relative h-64 sm:h-72"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
              }}
            />
            
            <motion.div 
              className="absolute bottom-3 left-3 bg-card/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center shadow-sm"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <ChefHat size={16} className="text-accent mr-1" />
              <span className="text-xs font-medium">От шеф-повара</span>
            </motion.div>
          </motion.div>
          
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span className="truncate text-foreground">{item.name}</span>
                <motion.span 
                  className="text-sm font-semibold bg-accent text-white px-2 py-1 rounded-full flex-shrink-0 ml-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item.price.toFixed(2)} р
                </motion.span>
              </DialogTitle>
            </DialogHeader>
            
            <motion.div 
              className="my-4 flex flex-wrap gap-3 stagger-reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="outline" className="bg-card/60 text-foreground">
                <Utensils size={14} className="mr-1" /> {foodInfo.calories} калорий
              </Badge>
              <Badge variant="outline" className="bg-card/60 text-foreground">
                <Clock size={14} className="mr-1" /> {cookTime.cookTime} мин. приготовления
              </Badge>
            </motion.div>
            
            <motion.div 
              className="my-4"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-sm font-medium mb-2 text-foreground">Описание</h4>
              <p className="text-foreground/80">{item.description}</p>
            </motion.div>
            
            <div className="flex flex-wrap gap-1 mb-6">
              {tags.map((tag, index) => (
                <motion.span 
                  key={index} 
                  className="inline-block bg-muted/80 px-2 py-1 rounded-full text-xs font-medium text-foreground/70"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            
            <motion.button 
              onClick={(e) => {
                handleAddToCart(e);
                setIsDialogOpen(false);
              }}
              className="w-full py-3 flex items-center justify-center rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent/90 transition-colors btn-pop shadow-sm"
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 20 }}
            >
              <Plus size={16} className="mr-1" />
              Добавить в корзину
            </motion.button>
          </div>
        </DialogContent>
      </Dialog>

      {showConfetti && (
        <Confetti x={confettiPosition.x} y={confettiPosition.y} />
      )}
    </>
  );
};

export default FoodCard;
