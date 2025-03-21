
import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FloatingCartProps {
  onClick: () => void;
}

const FloatingCart: React.FC<FloatingCartProps> = ({ onClick }) => {
  const { totalItems } = useCart();
  const [scrollY, setScrollY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevTotalItems, setPrevTotalItems] = useState(totalItems);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (totalItems > prevTotalItems) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
    setPrevTotalItems(totalItems);
  }, [totalItems, prevTotalItems]);

  const buttonPositionStyle = {
    transform: `translateY(${Math.min(scrollY, 20)}px)`,
    transition: 'transform 0.3s ease'
  };

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-8 right-8 z-30 p-4 rounded-full bg-yellow-500 text-white shadow-float
        hover:bg-yellow-400 transition-all duration-300 ${isAnimating ? 'animate-cart-bounce' : ''}`}
      style={buttonPositionStyle}
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
