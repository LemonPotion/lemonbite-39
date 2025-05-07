
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, X, ShoppingCart } from 'lucide-react';
import { FoodItem, useCart } from '../context/CartContext';

interface RecommendationCardProps {
  item: FoodItem | null;
  onDismiss: () => void;
  onRefresh: () => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ item, onDismiss, onRefresh }) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="relative mb-8 overflow-hidden rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent/30 to-primary/10 backdrop-blur-[2px]" />
        
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <motion.h3 
              className="text-lg font-medium flex items-center gap-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Рекомендация для вас
            </motion.h3>
            <div className="flex items-center gap-2">
              <motion.button 
                onClick={onRefresh}
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
                onClick={onDismiss}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </motion.button>
            </div>
          </div>
          
          <div className="flex gap-6 flex-col sm:flex-row">
            <motion.div 
              className="relative overflow-hidden rounded-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.img 
                src={item.image}
                alt={item.name}
                className="w-full sm:w-32 h-32 object-cover rounded-xl shadow-md"
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            <div className="flex-1">
              <motion.h4 
                className="text-xl font-medium mb-2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                {item.name}
              </motion.h4>
              
              <motion.p 
                className="text-muted-foreground mb-4"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                {item.description}
              </motion.p>
              
              <div className="flex items-center justify-between">
                <motion.span 
                  className="text-2xl font-semibold text-accent"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  {item.price} р
                </motion.span>
                
                <motion.button 
                  onClick={() => addItem(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
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
};

export default RecommendationCard;
