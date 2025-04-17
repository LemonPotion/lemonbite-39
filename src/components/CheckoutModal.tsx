
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (phoneNumber: string, address: string) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  const total = getTotalPrice();
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    let valid = true;
    if (!phoneNumber.trim()) {
      setPhoneError('Пожалуйста, введите номер телефона');
      valid = false;
    } else if (!/^\+?[0-9]{10,15}$/.test(phoneNumber.replace(/\s/g, ''))) {
      setPhoneError('Пожалуйста, введите корректный номер телефона');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (!address.trim()) {
      setAddressError('Пожалуйста, введите адрес доставки');
      valid = false;
    } else {
      setAddressError('');
    }

    if (valid) {
      onComplete(phoneNumber, address);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? 'p-4 max-h-[90vh] overflow-auto' : 'sm:max-w-[600px]'}`}>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Корзина</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Ваша корзина пуста</p>
            </div>
          ) : (
            <>
              <div className={`space-y-4 ${items.length > 3 ? 'max-h-[40vh] overflow-y-auto pr-2' : ''}`}>
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-medium">Итого:</span>
                <span className="text-xl font-bold">₽{total}</span>
              </div>

              {items.length > 0 && (
                <div className="pt-3">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full flex items-center justify-center text-destructive border-destructive hover:bg-destructive/10"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Очистить корзину
                  </Button>
                </div>
              )}

              {items.length > 0 && (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-4 mt-6 pt-4 border-t"
                >
                  <div className="space-y-2">
                    <Label htmlFor="phone">Номер телефона</Label>
                    <Input
                      id="phone"
                      placeholder="+7 (XXX) XXX-XX-XX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {phoneError && <p className="text-sm text-destructive">{phoneError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Адрес доставки</Label>
                    <Input
                      id="address"
                      placeholder="Улица, дом, квартира"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {addressError && <p className="text-sm text-destructive">{addressError}</p>}
                  </div>

                  <Button type="submit" className="w-full">
                    Оформить заказ
                  </Button>
                </motion.form>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
