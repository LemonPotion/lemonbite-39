
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { BookOpen, Users, Heart, Code, Info, ArrowRight, Star, Rocket, Shield, Compass, Clock, Calendar, Trophy, Coffee, ChefHat, Package } from "lucide-react";
import { useTheme } from '../context/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const About = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#202020] flex flex-col relative">
      {/* Navigation and Theme Switch */}
      <div className="sticky top-0 z-50 bg-[#202020] px-2 pt-4 border-b border-[#F98553]/20">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full px-4">
          <Navigation />
          <div className="flex items-center gap-2">
            <span className="text-[#CECCC5] text-sm">
              {theme === 'dark' ? '🌙' : '☀️'}
            </span>
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-[#F98553] data-[state=unchecked]:bg-[#3D3D3D]"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="w-full mt-10 md:mt-24 flex flex-col items-center text-[#CECCC5]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-[#202020] border border-[#F98553] rounded-[3rem] px-8 py-12 max-w-3xl w-[90vw] mx-auto relative shadow-lg">
          <motion.h1 
            className="font-playfair text-4xl md:text-6xl font-extrabold text-center leading-tight mb-5 text-[#F98553]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Добро пожаловать в{" "}
            <span className="relative px-2 inline-block">
              <span className="text-[#F98553] font-black underline underline-offset-8 decoration-4 decoration-[#F98553]">
                удобную
              </span>
            </span>{" "}
            доставку
          </motion.h1>
          <motion.p 
            className="mt-6 text-xl md:text-2xl font-semibold text-[#CECCC5] text-center max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Проект доставки, разработанный с&nbsp;
            <span className="text-[#F98553] font-bold">
              <Heart className="inline w-6 h-6 -mt-1" /> любовью
            </span>
          </motion.p>
        </div>
      </motion.section>

      {/* Animated Journey Line */}
      <div className="max-w-6xl mx-auto w-full relative mt-16 mb-8 px-4">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-[2px] bg-[#F98553]/30 top-10 w-[80%]"></div>
        <motion.div 
          className="w-full flex justify-between relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-12 h-12 rounded-full bg-[#202020] border-2 border-[#F98553] flex items-center justify-center text-[#F98553]">
              <Package size={24} />
            </div>
            <p className="text-[#CECCC5] mt-2 text-center text-sm">Заказ</p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-12 h-12 rounded-full bg-[#202020] border-2 border-[#F98553] flex items-center justify-center text-[#F98553]">
              <ChefHat size={24} />
            </div>
            <p className="text-[#CECCC5] mt-2 text-center text-sm">Приготовление</p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-12 h-12 rounded-full bg-[#202020] border-2 border-[#F98553] flex items-center justify-center text-[#F98553]">
              <Clock size={24} />
            </div>
            <p className="text-[#CECCC5] mt-2 text-center text-sm">Доставка</p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-12 h-12 rounded-full bg-[#202020] border-2 border-[#F98553] flex items-center justify-center text-[#F98553]">
              <Coffee size={24} />
            </div>
            <p className="text-[#CECCC5] mt-2 text-center text-sm">Наслаждение</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Info Cards */}
      <motion.section 
        className="w-full flex flex-col items-center gap-8 mb-12 max-w-6xl mx-auto px-4"
        variants={containerAnimation}
        initial="hidden"
        animate="show"
      >
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <motion.div 
            variants={itemAnimation} 
            className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7 transition-transform duration-300 hover:transform hover:scale-105"
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(249, 133, 83, 0.2), 0 8px 10px -6px rgba(249, 133, 83, 0.1)",
              borderColor: "#F98553"
            }}
          >
            <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md mb-4">
              <Code className="text-[#202020]" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#F98553] mb-2">Open Source</h2>
            <p className="text-[#CECCC5]">
              Исходный код проекта полностью открыт. Поддержите или предложите идею на GitHub.
            </p>
          </motion.div>

          <motion.div 
            variants={itemAnimation} 
            className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7 transition-transform duration-300 hover:transform hover:scale-105"
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(249, 133, 83, 0.2), 0 8px 10px -6px rgba(249, 133, 83, 0.1)",
              borderColor: "#F98553"
            }}
          >
            <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md mb-4">
              <Star className="text-[#202020]" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#F98553] mb-2">Качество Сервиса</h2>
            <p className="text-[#CECCC5]">
              Мы стремимся предоставить наилучший опыт доставки для каждого клиента.
            </p>
          </motion.div>

          <motion.div 
            variants={itemAnimation} 
            className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7 transition-transform duration-300 hover:transform hover:scale-105"
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(249, 133, 83, 0.2), 0 8px 10px -6px rgba(249, 133, 83, 0.1)",
              borderColor: "#F98553"
            }}
          >
            <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md mb-4">
              <Shield className="text-[#202020]" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#F98553] mb-2">Безопасность</h2>
            <p className="text-[#CECCC5]">
              Безопасность ваших данных и транзакций - наш главный приоритет.
            </p>
          </motion.div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <motion.div 
            variants={itemAnimation} 
            className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7 transition-transform duration-300 hover:transform hover:scale-105"
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(249, 133, 83, 0.2), 0 8px 10px -6px rgba(249, 133, 83, 0.1)",
              borderColor: "#F98553"
            }}
          >
            <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md mb-4">
              <Clock className="text-[#202020]" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#F98553] mb-2">Быстрая Доставка</h2>
            <p className="text-[#CECCC5]">
              Оптимизированные маршруты и профессиональные курьеры обеспечивают быструю доставку.
            </p>
          </motion.div>

          <motion.div 
            variants={itemAnimation} 
            className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7 transition-transform duration-300 hover:transform hover:scale-105"
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(249, 133, 83, 0.2), 0 8px 10px -6px rgba(249, 133, 83, 0.1)",
              borderColor: "#F98553"
            }}
          >
            <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md mb-4">
              <Compass className="text-[#202020]" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#F98553] mb-2">Широкий Охват</h2>
            <p className="text-[#CECCC5]">
              Доставляем по всему городу, расширяя зону обслуживания каждый день.
            </p>
          </motion.div>

          <motion.div 
            variants={itemAnimation} 
            className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7 transition-transform duration-300 hover:transform hover:scale-105"
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(249, 133, 83, 0.2), 0 8px 10px -6px rgba(249, 133, 83, 0.1)",
              borderColor: "#F98553"
            }}
          >
            <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md mb-4">
              <Calendar className="text-[#202020]" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#F98553] mb-2">Гибкое Расписание</h2>
            <p className="text-[#CECCC5]">
              Доставка в удобное для вас время, включая выходные и праздничные дни.
            </p>
          </motion.div>
        </div>

        {/* Third Row - New Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <motion.div 
            variants={itemAnimation} 
            className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7 transition-transform duration-300 hover:transform hover:scale-105"
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(249, 133, 83, 0.2), 0 8px 10px -6px rgba(249, 133, 83, 0.1)",
              borderColor: "#F98553"
            }}
          >
            <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md mb-4">
              <Trophy className="text-[#202020]" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#F98553] mb-2">Высокое Качество</h2>
            <p className="text-[#CECCC5]">
              Только лучшие ингредиенты и рестораны для вашего блюда. Качество, которое вы можете почувствовать.
            </p>
          </motion.div>

          <motion.div 
            variants={itemAnimation} 
            className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7 md:col-span-2 lg:col-span-2"
            whileHover={{ 
              boxShadow: "0 10px 25px -5px rgba(249, 133, 83, 0.2), 0 8px 10px -6px rgba(249, 133, 83, 0.1)",
              borderColor: "#F98553"
            }}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md">
                <Info className="text-[#202020]" size={40} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#F98553] mb-2">Наша История</h2>
                <p className="text-[#CECCC5] mb-3">
                  Наша компания начала свой путь в 2022 году, когда группа энтузиастов решила изменить подход к доставке еды. Мы стремились создать сервис, который объединит лучшие рестораны города и предоставит клиентам быструю и надежную доставку.
                </p>
                <p className="text-[#CECCC5]">
                  Сегодня мы обслуживаем тысячи клиентов каждый день, постоянно совершенствуя наш сервис и расширяя ассортимент. Наша миссия - сделать вкусную еду доступной каждому, в любое время и в любом месте.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-width Statistics Section */}
        <motion.div 
          variants={itemAnimation}
          className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-8 mt-8"
        >
          <h2 className="text-3xl font-bold text-[#F98553] mb-6 text-center">Наши Показатели</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <motion.div 
                className="text-4xl font-bold text-[#F98553] mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                500+
              </motion.div>
              <p className="text-[#CECCC5]">Ресторанов-партнеров</p>
            </div>
            
            <div className="p-4">
              <motion.div 
                className="text-4xl font-bold text-[#F98553] mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                50к+
              </motion.div>
              <p className="text-[#CECCC5]">Активных пользователей</p>
            </div>
            
            <div className="p-4">
              <motion.div 
                className="text-4xl font-bold text-[#F98553] mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                10к+
              </motion.div>
              <p className="text-[#CECCC5]">Доставок ежедневно</p>
            </div>
            
            <div className="p-4">
              <motion.div 
                className="text-4xl font-bold text-[#F98553] mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                98%
              </motion.div>
              <p className="text-[#CECCC5]">Довольных клиентов</p>
            </div>
          </div>
        </motion.div>

        {/* Developer Info Card */}
        <motion.div 
          variants={itemAnimation}
          className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-8 mt-4"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center justify-center min-w-[6rem] min-h-[6rem] bg-[#F98553] rounded-2xl shadow-md">
              <Users className="text-[#202020]" size={48} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#F98553] mb-4">Разработано LemonPotion</h2>
              <p className="text-[#CECCC5] text-lg leading-relaxed">
                Мы - команда энтузиастов, стремящихся сделать процесс доставки максимально удобным и эффективным. 
                Наша цель - создать сервис, который превзойдет ваши ожидания и станет неотъемлемой частью вашей повседневной жизни.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div 
          variants={itemAnimation}
          className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-8 mt-4 overflow-hidden relative"
        >
          <div className="absolute right-0 top-0 h-full w-1/3 bg-[#F98553]/5 transform skew-x-12" />
          <div className="absolute right-10 top-0 h-full w-1/5 bg-[#F98553]/3 transform skew-x-12" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F98553] mb-6">Готовы сделать заказ?</h2>
            <p className="text-[#CECCC5] text-lg max-w-2xl mb-8">
              Попробуйте наш сервис прямо сейчас и убедитесь в качестве сами. 
              Мы гарантируем быструю доставку и отличный сервис.
            </p>
            
            <Link to="/">
              <motion.button 
                className="px-8 py-3 bg-[#F98553] text-[#202020] font-bold rounded-full flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Перейти к заказу
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.section>
      
      {/* Footer Section */}
      <footer className="w-full py-12 bg-[#202020] border-t border-[#F98553]/20 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-[#CECCC5] text-sm">© 2023-2025 LemonBite. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
