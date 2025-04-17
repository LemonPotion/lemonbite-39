
import React from 'react';
import { Order } from '../utils/orderHistoryUtils';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface DayCellProps {
  day: number;
  orders: Order[];
  isCurrentMonth: boolean;
  onDayClick: (day: number) => void;
  isSelected: boolean;
}

const DayCell: React.FC<DayCellProps> = ({ 
  day, 
  orders, 
  isCurrentMonth,
  onDayClick,
  isSelected
}) => {
  const { addItem } = useCart();
  const isMobile = useIsMobile();
  
  const hasOrders = orders.length > 0;
  
  // Get up to 3 unique items to show as previews
  const previewItems = hasOrders 
    ? [...new Map(orders.flatMap(order => 
        order.items.map(item => [item.item.id, item.item])
      )).values()].slice(0, isMobile ? 1 : 3)
    : [];
  
  return (
    <motion.div
      whileHover={{ scale: isCurrentMonth ? 1.02 : 1 }}
      whileTap={{ scale: isCurrentMonth ? 0.98 : 1 }}
      onClick={() => isCurrentMonth && onDayClick(day)}
      className={`
        relative cursor-pointer border rounded-md overflow-hidden
        ${isCurrentMonth ? 'bg-card' : 'bg-muted/30'}
        ${isSelected ? 'ring-2 ring-accent' : ''}
        ${isCurrentMonth ? 'hover:bg-accent/10' : 'cursor-default opacity-50'}
        min-h-[80px] sm:min-h-[100px] transition-all
      `}
    >
      <div className="absolute top-1 left-2 text-sm font-medium">
        {day}
      </div>
      
      {hasOrders && (
        <div className="absolute top-1 right-2 text-xs bg-accent text-accent-foreground rounded-full px-1.5 py-0.5">
          {orders.length}
        </div>
      )}
      
      {hasOrders && (
        <div className="flex flex-wrap justify-center items-center pt-6 gap-1 px-1">
          {previewItems.map((item) => (
            <div 
              key={item.id} 
              className="w-6 h-6 sm:w-10 sm:h-10 rounded-md overflow-hidden"
              title={item.name}
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
      
      {!hasOrders && isCurrentMonth && (
        <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
          Нет заказов
        </div>
      )}
    </motion.div>
  );
};

export default DayCell;
