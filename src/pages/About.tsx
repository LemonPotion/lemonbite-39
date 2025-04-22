
import React from "react";
import Navigation from "../components/Navigation";
import { BookOpen, Users, Heart, Code, Info, ArrowRight, Star, Rocket, Shield, Compass, Clock, Calendar } from "lucide-react";
import { useTheme } from '../context/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';

const About = () => {
  const { theme, toggleTheme } = useTheme();
  
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
    <div className="min-h-screen bg-[#202020] dark:bg-[#202020] flex flex-col relative transition-colors duration-700">
      {/* Navigation and Theme Switch */}
      <div className="sticky top-0 z-50 bg-[#202020] px-2 pt-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full px-4">
          <Navigation />
          <div className="flex items-center gap-2">
            <span className="text-[#CECCC5] text-sm">
              {theme === 'dark' ? '🌙' : '☀️'}
            </span>
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={toggleTheme} 
              className="bg-[#202020] border-[#F98553]"
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
          <h1 className="font-playfair text-4xl md:text-6xl font-extrabold text-center leading-tight mb-5 text-[#F98553]">
            Добро пожаловать в{" "}
            <span className="relative px-2 inline-block">
              <span className="text-[#F98553] font-black underline underline-offset-8 decoration-4 decoration-[#F98553]">
                удобную
              </span>
            </span>{" "}
            доставку
          </h1>
          <p className="mt-6 text-xl md:text-2xl font-semibold text-[#CECCC5] text-center max-w-xl mx-auto">
            Проект доставки, разработанный с&nbsp;
            <span className="text-[#F98553] font-bold">
              <Heart className="inline w-6 h-6 -mt-1" /> любовью
            </span>
          </p>
        </div>
      </motion.section>

      {/* Main Info Cards */}
      <motion.section 
        className="w-full flex flex-col items-center mt-12 gap-8 mb-20 max-w-6xl mx-auto px-4"
        variants={containerAnimation}
        initial="hidden"
        animate="show"
      >
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <motion.div variants={itemAnimation} className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7">
            <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md mb-4">
              <Code className="text-[#202020]" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#F98553] mb-2">Open Source</h2>
            <p className="text-[#CECCC5]">
              Исходный код проекта полностью открыт. Поддержите или предложите идею на GitHub.
            </p>
          </motion.div>

          <motion.div variants={itemAnimation} className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7">
            <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md mb-4">
              <Star className="text-[#202020]" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#F98553] mb-2">Качество Сервиса</h2>
            <p className="text-[#CECCC5]">
              Мы стремимся предоставить наилучший опыт доставки для каждого клиента.
            </p>
          </motion.div>

          <motion.div variants={itemAnimation} className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7">
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
          <motion.div variants={itemAnimation} className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7">
            <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md mb-4">
              <Clock className="text-[#202020]" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#F98553] mb-2">Быстрая Доставка</h2>
            <p className="text-[#CECCC5]">
              Оптимизированные маршруты и профессиональные курьеры обеспечивают быструю доставку.
            </p>
          </motion.div>

          <motion.div variants={itemAnimation} className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7">
            <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md mb-4">
              <Compass className="text-[#202020]" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#F98553] mb-2">Широкий Охват</h2>
            <p className="text-[#CECCC5]">
              Доставляем по всему городу, расширяя зону обслуживания каждый день.
            </p>
          </motion.div>

          <motion.div variants={itemAnimation} className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7">
            <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md mb-4">
              <Calendar className="text-[#202020]" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#F98553] mb-2">Гибкое Расписание</h2>
            <p className="text-[#CECCC5]">
              Доставка в удобное для вас время, включая выходные и праздничные дни.
            </p>
          </motion.div>
        </div>

        {/* Developer Info Card */}
        <motion.div 
          variants={itemAnimation}
          className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-8 mt-8"
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
      </motion.section>
    </div>
  );
};

export default About;
