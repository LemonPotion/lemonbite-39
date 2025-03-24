
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
      const timer = setTimeout(() => setIsAnimating(false), 200); // Reduced from 300ms
      return () => clearTimeout(timer);
    }
    setPrevTotalItems(totalItems);
  }, [totalItems, prevTotalItems]);

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-8 right-8 z-30 p-4 rounded-full bg-yellow-500 text-white 
      hover:bg-yellow-600 ${isAnimating ? 'scale-105' : 'scale-100'} transform-gpu duration-150`}
      aria-label="Shopping Cart"
    >
      <ShoppingCart className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-white text-yellow-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default FloatingCart;
