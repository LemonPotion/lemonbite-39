
import React from 'react';
import { X, Heart } from 'lucide-react';
import { FoodItem } from '../context/CartContext';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: FoodItem[];
  onFavoriteToggle: (id: string) => void;
}

const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items,
  onFavoriteToggle
}) => {
  const { addItem } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg z-50 overflow-y-auto transition-transform duration-300 transform-gpu">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Your Favorites</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-10">
              <Heart className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-4 text-gray-500">You haven't added any favorites yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="card-calm p-4 flex gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onFavoriteToggle(item.id);
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Heart size={18} fill="currentColor" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-semibold text-blue-600">₽{item.price}</p>
                      <Button
                        onClick={() => addItem(item)}
                        variant="outline"
                        className="text-xs px-3 py-1 h-8 border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritesDrawer;
