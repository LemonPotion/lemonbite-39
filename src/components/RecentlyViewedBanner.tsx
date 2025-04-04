
import React, { useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';
import { FoodItem, useCart } from '../context/CartContext';
import { Skeleton } from './ui/skeleton';

interface RecentlyViewedBannerProps {
  items: FoodItem[];
}

const RecentlyViewedBanner: React.FC<RecentlyViewedBannerProps> = ({ items }) => {
  const { addItem } = useCart();
  const bannerRef = useRef<HTMLDivElement>(null);

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

  if (items.length === 0) return null;

  return (
    <div 
      ref={bannerRef}
      className="mb-10 bg-muted rounded-xl p-5 border border-muted transition-all duration-300 hover:shadow-md"
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-accent animate-pulse" size={18} />
        <h3 className="text-lg font-medium text-foreground">Recently Viewed</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="bg-white rounded-lg shadow-sm p-3 flex gap-3 items-center transform transition-all duration-500 hover:shadow-md hover:-translate-y-1"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: `slideInFromBottom 0.5s ease-out ${index * 100}ms both`
            }}
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-12 h-12 rounded-md object-cover flex-shrink-0 transition-transform duration-300 hover:scale-110"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm truncate">{item.name}</h4>
              <div className="flex justify-between items-center mt-1">
                <p className="text-accent text-sm font-semibold">₽{item.price}</p>
                <button
                  onClick={() => addItem(item)}
                  className="text-xs text-accent hover:text-accent-foreground font-medium transition-colors duration-300 hover:scale-105 transform"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedBanner;
