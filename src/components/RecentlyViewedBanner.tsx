
import React from 'react';
import { Clock } from 'lucide-react';
import { FoodItem, useCart } from '../context/CartContext';

interface RecentlyViewedBannerProps {
  items: FoodItem[];
}

const RecentlyViewedBanner: React.FC<RecentlyViewedBannerProps> = ({ items }) => {
  const { addToCart } = useCart();

  if (items.length === 0) return null;

  return (
    <div className="mb-10 bg-blue-50 rounded-xl p-5 border border-blue-100">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-blue-500" size={18} />
        <h3 className="text-lg font-medium text-gray-800">Recently Viewed</h3>
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
              <h4 className="font-medium text-gray-800 text-sm truncate">{item.name}</h4>
              <div className="flex justify-between items-center mt-1">
                <p className="text-blue-600 text-sm font-semibold">₽{item.price}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="text-xs text-blue-500 hover:text-blue-700 font-medium"
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
