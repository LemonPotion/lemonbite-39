
import React, { useState, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, X, ShoppingCart } from 'lucide-react';
import { FoodItem, useCart } from '../context/CartContext';

interface RecommendationCardProps {
  item: FoodItem | null;
  onDismiss: () => void;
  onRefresh: () => void;
}

// Using React.memo to prevent unnecessary re-renders
const RecommendationCard: React.FC<RecommendationCardProps> = memo(({ item, onDismiss, onRefresh }) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  // Use useCallback for event handlers to prevent unnecessary re-renders
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  
  // Add click handlers with useCallback
  const handleRefreshClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onRefresh();
  }, [onRefresh]);
  
  const handleDismissClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDismiss();
  }, [onDismiss]);
  
  const handleAddToCartClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (item) addItem(item);
  }, [item, addItem]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="relative mb-8 overflow-hidden rounded-2xl shadow-lg animate-gpu"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        layout
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent/30 to-primary/10 backdrop-blur-[2px]" />
        
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <motion.h3 
              className="text-lg font-medium flex items-center gap-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Рекомендация для вас
            </motion.h3>
            <div className="flex items-center gap-2">
              <motion.button 
                onClick={handleRefreshClick}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="p-2 hover:bg-accent/10 rounded-full transition-colors"
                title="Обновить рекомендацию"
              >
                <RefreshCw size={18} className="text-muted-foreground hover:text-foreground" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDismissClick}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </motion.button>
            </div>
          </div>
          
          <div className="flex gap-6 flex-col sm:flex-row">
            <div 
              className="relative overflow-hidden rounded-xl"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src={item.image}
                alt={item.name}
                className="w-full sm:w-32 h-32 object-cover rounded-xl shadow-md transition-transform duration-300 animate-gpu"
                style={{ 
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)' 
                }}
                loading="lazy"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10 transition-opacity duration-300"
                style={{ opacity: isHovered ? 1 : 0 }}
              />
            </div>
            
            <div className="flex-1">
              <motion.h4 
                className="text-xl font-medium mb-2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                {item.name}
              </motion.h4>
              
              <motion.p 
                className="text-muted-foreground mb-4"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {item.description}
              </motion.p>
              
              <div className="flex items-center justify-between">
                <motion.span 
                  className="text-2xl font-semibold text-accent"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                >
                  {item.price} р
                </motion.span>
                
                <motion.button 
                  onClick={handleAddToCartClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium hover:bg-accent/90 transition-colors"
                >
                  <ShoppingCart size={16} />
                  <span>В корзину</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

RecommendationCard.displayName = 'RecommendationCard';

export default RecommendationCard;
