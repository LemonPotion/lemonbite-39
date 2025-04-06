
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
      const timer = setTimeout(() => setIsAnimating(false), 150);
      return () => clearTimeout(timer);
    }
    setPrevTotalItems(totalItems);
  }, [totalItems, prevTotalItems]);

  // This component is now a backup and not needed in most cases
  // since the cart is now in the header
  return null;
};

export default FloatingCart;
