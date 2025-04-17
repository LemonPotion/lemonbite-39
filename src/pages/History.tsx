
import React, { useState } from 'react';
import Layout from '../components/Layout';
import OrderCalendar from '../components/OrderCalendar';
import CheckoutModal from '../components/CheckoutModal';
import SuccessModal from '../components/SuccessModal';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const History = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ phoneNumber: '', address: '' });

  const handleOrderComplete = (phoneNumber: string, address: string) => {
    setOrderDetails({ phoneNumber, address });
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
  };

  return (
    <Layout onCartOpen={() => setIsCheckoutOpen(true)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
            <div>
              <Link to="/">
                <Button variant="ghost" className="mb-2 -ml-3 text-muted-foreground">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Назад к меню
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">История заказов</h1>
              <p className="text-muted-foreground mt-1">
                Просматривайте и повторяйте свои предыдущие заказы
              </p>
            </div>
            <Link to="/">
              <Button>
                <Plus className="mr-1 h-4 w-4" />
                Заказать еще
              </Button>
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <OrderCalendar />
          </motion.div>
        </div>
      </div>
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onComplete={handleOrderComplete}
      />
      
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        orderDetails={orderDetails}
      />
    </Layout>
  );
};

export default History;
