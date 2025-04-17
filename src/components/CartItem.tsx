
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-3 py-2 border-b last:border-b-0"
    >
      <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm mb-1 truncate">{item.name}</h4>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">₽{item.price}</p>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Minus size={12} />
            </Button>
            
            <span className="w-5 text-center text-sm">{item.quantity}</span>
            
            <Button 
              variant="outline" 
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus size={12} />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
