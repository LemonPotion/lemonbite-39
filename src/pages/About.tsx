
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CheckoutModal from '../components/CheckoutModal';
import SuccessModal from '../components/SuccessModal';
import { motion } from 'framer-motion';
import { 
  ChefHat, 
  Clock, 
  MapPin, 
  Truck, 
  Smartphone, 
  Utensils,
  ShoppingBag
} from 'lucide-react';

const AboutUs = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleOrderComplete = (phoneNumber: string, address: string) => {
    console.log('Order placed with:', { phoneNumber, address });
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <Layout onCartOpen={() => setIsCheckoutOpen(true)}>
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 theme-transition"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.div 
            className="inline-block bg-accent/10 dark:bg-accent/20 p-4 rounded-full mb-5"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              times: [0, 0.25, 0.75, 1]
            }}
          >
            <ShoppingBag size={36} className="text-accent" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground theme-transition">
            О сервисе <span className="text-accent">LemonBite</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-foreground/80 theme-transition">
            Мы создали LemonBite, чтобы доставлять вам самые вкусные блюда прямо к двери, быстро и с заботой.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20"
          variants={itemVariants}
        >
          <motion.div
            className="flex flex-col justify-center"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-serif font-medium mb-6 text-foreground theme-transition">
              Наша <span className="text-accent">миссия</span>
            </h2>
            <p className="mb-4 text-foreground/80 theme-transition">
              LemonBite — это современный сервис доставки еды, основанный в 2022 году с целью сделать процесс заказа еды максимально простым и приятным для каждого клиента.
            </p>
            <p className="mb-4 text-foreground/80 theme-transition">
              Мы тщательно отбираем рестораны и кафе, сотрудничаем только с проверенными заведениями и контролируем качество доставки на каждом этапе.
            </p>
            <p className="text-foreground/80 theme-transition">
              Наша цель — не просто доставить еду, а создать целостный опыт удовольствия от заказа до последнего кусочка.
            </p>
          </motion.div>

          <motion.div 
            className="relative overflow-hidden rounded-2xl shadow-lg h-[400px]"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1626280381853-c2bd1cc96cdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Доставка еды" 
              className="w-full h-full object-cover transition-transform duration-4000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-xl font-medium">Быстрая доставка</h3>
              <p className="text-white/90 text-sm">Тысячи довольных клиентов ежедневно</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.h2 
          className="text-3xl font-serif font-medium text-center mb-10 text-foreground theme-transition"
          variants={itemVariants}
        >
          Почему <span className="text-accent">LemonBite</span>
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          variants={itemVariants}
        >
          <motion.div 
            className="bg-card dark:bg-card/90 border border-muted rounded-xl p-6 theme-transition"
            variants={featureVariants}
            whileHover="hover"
          >
            <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-full w-fit mb-4">
              <Clock className="text-accent" size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2 text-foreground theme-transition">Быстрая доставка</h3>
            <p className="text-foreground/70 theme-transition">Доставляем заказы в среднем за 30 минут по всему городу, даже в час пик.</p>
          </motion.div>

          <motion.div 
            className="bg-card dark:bg-card/90 border border-muted rounded-xl p-6 theme-transition"
            variants={featureVariants}
            whileHover="hover"
          >
            <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-full w-fit mb-4">
              <Utensils className="text-accent" size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2 text-foreground theme-transition">Широкий выбор</h3>
            <p className="text-foreground/70 theme-transition">Сотни ресторанов и тысячи блюд на любой вкус в нашем приложении.</p>
          </motion.div>

          <motion.div 
            className="bg-card dark:bg-card/90 border border-muted rounded-xl p-6 theme-transition"
            variants={featureVariants}
            whileHover="hover"
          >
            <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-full w-fit mb-4">
              <Smartphone className="text-accent" size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2 text-foreground theme-transition">Удобное приложение</h3>
            <p className="text-foreground/70 theme-transition">Интуитивный интерфейс позволяет заказать еду всего в несколько кликов.</p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="rounded-2xl overflow-hidden bg-card dark:bg-card/90 border border-muted p-8 shadow-sm theme-transition"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-serif font-medium mb-6 text-foreground theme-transition">
                Как это <span className="text-accent">работает</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-accent/10 dark:bg-accent/20 p-2 rounded-full flex items-center justify-center mt-1">
                    <span className="text-accent font-medium">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground theme-transition">Выберите блюда</h4>
                    <p className="text-foreground/70 theme-transition">Просмотрите меню и добавьте понравившиеся блюда в корзину</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-accent/10 dark:bg-accent/20 p-2 rounded-full flex items-center justify-center mt-1">
                    <span className="text-accent font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground theme-transition">Оформите заказ</h4>
                    <p className="text-foreground/70 theme-transition">Укажите адрес доставки и выберите способ оплаты</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-accent/10 dark:bg-accent/20 p-2 rounded-full flex items-center justify-center mt-1">
                    <span className="text-accent font-medium">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground theme-transition">Получите доставку</h4>
                    <p className="text-foreground/70 theme-transition">Отслеживайте статус заказа и встречайте курьера</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl h-[300px]">
              <motion.img 
                src="https://images.unsplash.com/photo-1626082927389-6cd097cee6a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Доставка еды" 
                className="w-full h-full object-cover rounded-xl"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        onComplete={handleOrderComplete}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </Layout>
  );
};

export default AboutUs;
