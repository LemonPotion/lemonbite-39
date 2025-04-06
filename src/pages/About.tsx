
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { CheckoutModal } from '../components/CheckoutModal';
import { SuccessModal } from '../components/SuccessModal';
import { motion } from 'framer-motion';
import { ChefHat, Clock, MapPin, Award, Users, Heart } from 'lucide-react';

const AboutUs = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a slight delay before showing content for a nice entrance effect
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
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    },
    hover: {
      scale: 1.03,
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
            className="inline-block bg-accent/10 dark:bg-accent/20 p-3 rounded-full mb-5"
            initial={{ rotate: -5 }}
            animate={{ rotate: 5 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            <ChefHat size={32} className="text-accent" />
          </motion.div>
          <h1 className="text-4xl font-serif font-bold mb-4 text-foreground theme-transition">
            О нас <span className="text-accent">LemonBite</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-foreground/80 theme-transition">
            Мы создаем вкусные блюда с любовью и заботой, используя только самые свежие ингредиенты для наших клиентов.
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
              Наша <span className="text-accent">история</span>
            </h2>
            <p className="mb-4 text-foreground/80 theme-transition">
              Компания LemonBite была основана в 2015 году группой друзей, объединенных общей страстью к кулинарии и желанием создать уникальный ресторан, который бы сочетал традиционные рецепты с современными техниками приготовления.
            </p>
            <p className="mb-4 text-foreground/80 theme-transition">
              Начав с небольшого кафе, мы быстро завоевали признание благодаря нашим уникальным блюдам и внимательному обслуживанию. Сегодня LemonBite — это сеть ресторанов, которая продолжает расти и развиваться.
            </p>
            <p className="text-foreground/80 theme-transition">
              Наша миссия остается неизменной: создавать незабываемые кулинарные впечатления и дарить радость нашим гостям.
            </p>
          </motion.div>

          <motion.div 
            className="relative overflow-hidden rounded-2xl shadow-lg h-[400px]"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Restaurant interior" 
              className="w-full h-full object-cover transition-transform duration-4000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-xl font-medium">Наш первый ресторан</h3>
              <p className="text-white/90 text-sm">Открыт в 2015 году</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.h2 
          className="text-3xl font-serif font-medium text-center mb-10 text-foreground theme-transition"
          variants={itemVariants}
        >
          Почему выбирают <span className="text-accent">нас</span>
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          variants={itemVariants}
        >
          <motion.div 
            className="bg-card dark:bg-card/90 border border-muted rounded-xl p-6 theme-transition"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-full w-fit mb-4">
              <Award className="text-accent" size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2 text-foreground theme-transition">Качество</h3>
            <p className="text-foreground/70 theme-transition">Мы используем только свежие и качественные ингредиенты для приготовления наших блюд.</p>
          </motion.div>

          <motion.div 
            className="bg-card dark:bg-card/90 border border-muted rounded-xl p-6 theme-transition"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-full w-fit mb-4">
              <Clock className="text-accent" size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2 text-foreground theme-transition">Быстрая доставка</h3>
            <p className="text-foreground/70 theme-transition">Мы гарантируем доставку в течение 30 минут, или следующий заказ будет бесплатным.</p>
          </motion.div>

          <motion.div 
            className="bg-card dark:bg-card/90 border border-muted rounded-xl p-6 theme-transition"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-full w-fit mb-4">
              <Heart className="text-accent" size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2 text-foreground theme-transition">С любовью</h3>
            <p className="text-foreground/70 theme-transition">Каждое блюдо готовится с заботой и вниманием, как для самых близких.</p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="rounded-2xl overflow-hidden bg-card dark:bg-card/90 border border-muted p-8 shadow-sm theme-transition"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-serif font-medium mb-6 text-foreground theme-transition">
                Приходите <span className="text-accent">к нам</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-accent mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-foreground theme-transition">Адрес</h4>
                    <p className="text-foreground/70 theme-transition">ул. Пушкина 10, Москва</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="text-accent mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-foreground theme-transition">Часы работы</h4>
                    <p className="text-foreground/70 theme-transition">Пн-Пт: 10:00 - 22:00</p>
                    <p className="text-foreground/70 theme-transition">Сб-Вс: 11:00 - 23:00</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="text-accent mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-foreground theme-transition">Резервация</h4>
                    <p className="text-foreground/70 theme-transition">+7 (900) 123-45-67</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl h-[300px]">
              <img 
                src="https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Map location" 
                className="w-full h-full object-cover rounded-xl transition-transform duration-1000 hover:scale-110"
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
