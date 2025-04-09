
import React, { useEffect, useRef, useState } from 'react';
import { Clock, Plus } from 'lucide-react';
import { FoodItem, useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface RecentlyViewedBannerProps {
  items: FoodItem[];
  onItemClick?: (item: FoodItem) => void;
}

const bannerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

const RecentlyViewedBanner: React.FC<RecentlyViewedBannerProps> = ({ items, onItemClick }) => {
  const { addItem } = useCart();
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isAdding, setIsAdding] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    // Add animation when the banner appears or updates
    if (bannerRef.current) {
      bannerRef.current.classList.add('animate-fade-in');
      const timer = setTimeout(() => {
        if (bannerRef.current) {
          bannerRef.current.classList.remove('animate-fade-in');
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [items]);

  const handleAddToCart = (item: FoodItem) => {
    setIsAdding(item.id);
    addItem(item);
    
    // Show toast with animation
    toast.success(`${item.name} добавлен в корзину!`, {
      description: `${item.price.toFixed(2)} р`
    });
    
    // Reset animation state
    setTimeout(() => {
      setIsAdding(null);
    }, 300);
    
    // Call onItemClick if provided
    if (onItemClick) {
      onItemClick(item);
    }
  };

  if (items.length === 0) return null;

  return (
    <motion.div 
      ref={bannerRef}
      className="mb-10 bg-muted rounded-xl p-5 border border-muted transition-all duration-300 hover:shadow-md theme-transition"
      variants={bannerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex items-center gap-2 mb-4"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Clock className="text-accent" size={18} />
        <h3 className="text-lg font-medium text-foreground theme-transition">Недавно просмотренные</h3>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <motion.div 
            key={item.id} 
            className="bg-card rounded-lg shadow-sm p-3 flex gap-3 items-center transform transition-all duration-500 hover:shadow-md hover:-translate-y-1 theme-transition overflow-hidden"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
                }}
              />
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm truncate theme-transition">{item.name}</h4>
              <div className="flex justify-between items-center mt-1">
                <motion.p 
                  className="text-accent text-sm font-semibold theme-transition"
                  whileHover={{ scale: 1.05 }}
                >
                  ₽{item.price}
                </motion.p>
                <div className="relative">
                  <motion.button
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => handleAddToCart(item)}
                    className={`flex items-center text-xs bg-accent text-white px-2 py-1 rounded-md transition-all duration-300 ${isAdding === item.id ? 'scale-95' : ''}`}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "var(--accent)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    <Plus size={12} className="mr-1" />
                    Добавить
                  </motion.button>
                  {hoveredItem === item.id && (
                    <motion.div 
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Добавить в корзину
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentlyViewedBanner;
