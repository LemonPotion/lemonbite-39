
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CheckoutModal from '../components/CheckoutModal';
import SuccessModal from '../components/SuccessModal';
import { motion } from 'framer-motion';
import { ArrowRight, ChefHat, Clock, Smartphone, Utensils } from 'lucide-react';

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
            <div className="inline-block bg-accent/10 dark:bg-accent/20 p-4 rounded-full mb-5">
              <ChefHat size={48} className="text-accent" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-foreground">
              О сервисе <span className="text-accent">LemonBite</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-foreground/80 font-medium">
              Мы создали LemonBite, чтобы доставлять вам самые вкусные блюда прямо к двери
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16" variants={itemVariants}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Наша <span className="text-accent">миссия</span>
              </h2>
              <p className="text-xl mb-6 text-foreground/80">
                LemonBite — это современный сервис доставки еды, основанный в 2022 году с целью сделать процесс заказа еды максимально простым и приятным для каждого клиента.
              </p>
              <p className="text-xl text-foreground/80">
                Мы тщательно отбираем рестораны и кафе, сотрудничаем только с проверенными заведениями и контролируем качество доставки на каждом этапе.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Наши <span className="text-accent">принципы</span>
              </h2>
              <ul className="space-y-4 text-xl">
                <li className="flex items-start gap-4">
                  <ArrowRight className="text-accent mt-1 flex-shrink-0" />
                  <span className="text-foreground/80">Быстрая доставка в течение 30 минут</span>
                </li>
                <li className="flex items-start gap-4">
                  <ArrowRight className="text-accent mt-1 flex-shrink-0" />
                  <span className="text-foreground/80">Свежие продукты высшего качества</span>
                </li>
                <li className="flex items-start gap-4">
                  <ArrowRight className="text-accent mt-1 flex-shrink-0" />
                  <span className="text-foreground/80">Широкий выбор блюд на любой вкус</span>
                </li>
                <li className="flex items-start gap-4">
                  <ArrowRight className="text-accent mt-1 flex-shrink-0" />
                  <span className="text-foreground/80">Отличный сервис и забота о клиентах</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16" variants={itemVariants}>
            <div className="bg-card dark:bg-card/90 border border-muted rounded-xl p-8 hover:border-accent transition-colors">
              <div className="bg-accent/10 dark:bg-accent/20 p-4 rounded-full w-fit mb-6">
                <Clock className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Быстрая доставка</h3>
              <p className="text-lg text-foreground/70">Доставляем заказы в среднем за 30 минут по всему городу</p>
            </div>

            <div className="bg-card dark:bg-card/90 border border-muted rounded-xl p-8 hover:border-accent transition-colors">
              <div className="bg-accent/10 dark:bg-accent/20 p-4 rounded-full w-fit mb-6">
                <Utensils className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Широкий выбор</h3>
              <p className="text-lg text-foreground/70">Сотни ресторанов и тысячи блюд на любой вкус</p>
            </div>

            <div className="bg-card dark:bg-card/90 border border-muted rounded-xl p-8 hover:border-accent transition-colors">
              <div className="bg-accent/10 dark:bg-accent/20 p-4 rounded-full w-fit mb-6">
                <Smartphone className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Удобное приложение</h3>
              <p className="text-lg text-foreground/70">Заказ еды всего в несколько кликов</p>
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
