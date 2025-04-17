
import React, { useEffect } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { saveOrder, generateOrderId } from '../utils/orderHistoryUtils';
import { toast } from 'sonner';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails?: {
    phoneNumber: string;
    address: string;
  };
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, orderDetails }) => {
  const { items, clearCart, getTotalPrice } = useCart();
  
  useEffect(() => {
    if (isOpen && items.length > 0 && orderDetails) {
      // Save order to local storage
      const newOrder = {
        id: generateOrderId(),
        items: items.map(item => ({ item, quantity: item.quantity })),
        date: new Date().toISOString(),
        address: orderDetails.address,
        phoneNumber: orderDetails.phoneNumber,
        total: getTotalPrice()
      };
      
      saveOrder(newOrder);
      
      // Show success toast
      toast.success("Order saved to history", {
        description: "You can view and reorder from your order history."
      });
      
      // Clear cart after order is saved
      clearCart();
    }
  }, [isOpen, items, orderDetails, clearCart, getTotalPrice]);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Заказ оформлен!
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 py-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }}
            className="bg-green-500 text-white p-3 rounded-full"
          >
            <Check size={32} />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-center space-y-3"
          >
            <p className="text-foreground">Спасибо за заказ!</p>
            <p className="text-muted-foreground text-sm">
              Мы свяжемся с вами в ближайшее время для подтверждения заказа.
            </p>
          </motion.div>
        </div>
        
        <DialogFooter className="sm:justify-center">
          <Button 
            onClick={onClose} 
            className="w-full sm:w-auto"
          >
            Закрыть
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
