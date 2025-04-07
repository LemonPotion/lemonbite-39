
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CheckoutModal from '../components/CheckoutModal';
import SuccessModal from '../components/SuccessModal';
import { motion } from 'framer-motion';
import { ChefHat, Clock, MapPin, Smartphone, Utensils } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="container mx-auto px-4 py-12"
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
              <ChefHat size={36} className="text-accent" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground">
              О сервисе <span className="text-accent">LemonBite</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-foreground/80">
              Мы создали LemonBite, чтобы доставлять вам самые вкусные блюда прямо к двери
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <motion.div
              className="flex flex-col justify-center"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-serif font-medium mb-6 text-foreground">
                Наша <span className="text-accent">миссия</span>
              </h2>
              <p className="mb-4 text-foreground/80">
                LemonBite — это современный сервис доставки еды, основанный в 2022 году с целью сделать процесс заказа еды максимально простым и приятным для каждого клиента.
              </p>
              <p className="text-foreground/80">
                Мы тщательно отбираем рестораны и кафе, сотрудничаем только с проверенными заведениями и контролируем качество доставки на каждом этапе.
              </p>
            </motion.div>

            <motion.div 
              className="relative overflow-hidden rounded-2xl shadow-lg h-[300px]"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gray-200 animate-pulse"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              <img 
                src="https://images.unsplash.com/photo-1576867757603-05b134ebc379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Доставка еды" 
                className="w-full h-full object-cover transition-transform duration-4000 hover:scale-105"
                loading="lazy"
                onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
                style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-medium">Быстрая доставка</h3>
                <p className="text-white/90 text-sm">Тысячи довольных клиентов ежедневно</p>
              </div>
            </motion.div>
          </div>

          <motion.h2 
            className="text-3xl font-serif font-medium text-center mb-8 text-foreground"
            variants={itemVariants}
          >
            Почему <span className="text-accent">LemonBite</span>
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
            variants={itemVariants}
          >
            <motion.div 
              className="bg-card dark:bg-card/90 border border-muted rounded-xl p-6"
              variants={featureVariants}
              whileHover="hover"
            >
              <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-full w-fit mb-4">
                <Clock className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2 text-foreground">Быстрая доставка</h3>
              <p className="text-foreground/70">Доставляем заказы в среднем за 30 минут по всему городу</p>
            </motion.div>

            <motion.div 
              className="bg-card dark:bg-card/90 border border-muted rounded-xl p-6"
              variants={featureVariants}
              whileHover="hover"
            >
              <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-full w-fit mb-4">
                <Utensils className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2 text-foreground">Широкий выбор</h3>
              <p className="text-foreground/70">Сотни ресторанов и тысячи блюд на любой вкус</p>
            </motion.div>

            <motion.div 
              className="bg-card dark:bg-card/90 border border-muted rounded-xl p-6"
              variants={featureVariants}
              whileHover="hover"
            >
              <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-full w-fit mb-4">
                <Smartphone className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2 text-foreground">Удобное приложение</h3>
              <p className="text-foreground/70">Заказ еды всего в несколько кликов</p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative overflow-hidden rounded-xl mb-12"
            variants={itemVariants}
          >
            <motion.div
              className="absolute inset-0 bg-gray-200 animate-pulse"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            <img 
              src="https://images.unsplash.com/photo-1513639304702-9116e1c50a13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Команда доставки" 
              className="w-full h-64 md:h-80 object-cover rounded-xl"
              loading="lazy"
              onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
              style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl font-medium">Мы доставляем счастье</h3>
              <p className="text-white/90">Каждый день, каждый заказ, каждому клиенту</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

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
