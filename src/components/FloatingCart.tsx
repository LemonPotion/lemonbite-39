
import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FloatingCartProps {
  onClick: () => void;
}

const FloatingCart: React.FC<FloatingCartProps> = ({ onClick }) => {
  const { totalItems } = useCart();
  const [prevTotalItems, setPrevTotalItems] = useState(totalItems);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (totalItems > prevTotalItems) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300); // Reduced from 500ms
      return () => clearTimeout(timer);
    }
    setPrevTotalItems(totalItems);
  }, [totalItems, prevTotalItems]);

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-8 right-8 z-30 p-4 rounded-full bg-yellow-500 text-white 
      hover:bg-yellow-600 transition-colors ${isAnimating ? 'scale-110' : 'scale-100'} duration-200`}
      aria-label="Shopping Cart"
    >
      <ShoppingCart className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-white text-yellow-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-yellow-500">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default FloatingCart;
