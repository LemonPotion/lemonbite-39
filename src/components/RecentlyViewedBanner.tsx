
import React from 'react';
import { Clock } from 'lucide-react';
import { FoodItem, useCart } from '../context/CartContext';

interface RecentlyViewedBannerProps {
  items: FoodItem[];
}

const RecentlyViewedBanner: React.FC<RecentlyViewedBannerProps> = ({ items }) => {
  const { addItem } = useCart();

  if (items.length === 0) return null;

  return (
    <div className="mb-10 bg-muted rounded-xl p-5 border border-muted">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-accent" size={18} />
        <h3 className="text-lg font-medium text-foreground">Recently Viewed</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm p-3 flex gap-3 items-center">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-12 h-12 rounded-md object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm truncate">{item.name}</h4>
              <div className="flex justify-between items-center mt-1">
                <p className="text-accent text-sm font-semibold">₽{item.price}</p>
                <button
                  onClick={() => addItem(item)}
                  className="text-xs text-accent hover:text-accent-foreground font-medium"
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
