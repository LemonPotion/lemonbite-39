import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Code, Database, Server, Terminal, Laptop, Layers, FileCode, Link as LinkIcon, ChartBar, Sparkles, GitFork, Github } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Switch } from '@/components/ui/switch';

const About = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [blurLevel, setBlurLevel] = useState(10); // Initial blur level
  
  // Track scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Fade in effect by reducing blur
  useEffect(() => {
    // Start with high blur and reduce it over time
    const blurAnimation = setTimeout(() => {
      setBlurLevel(0);
    }, 100); // Small delay before starting animation
    
    return () => clearTimeout(blurAnimation);
  }, []);
  
  const techStacks = {
    backend: [
      {
        name: "ASP.NET Core",
        description: "Современный кроссплатформенный веб-фреймворк",
        icon: <Server className="text-accent" size={40} />
      }, {
        name: "Entity Framework Core",
        description: "Современная ORM для .NET",
        icon: <Database className="text-accent" size={40} />
      }, {
        name: ".NET 8",
        description: "Новейшая платформа .NET",
        icon: <Code className="text-accent" size={40} />
      }, {
        name: "PostgreSQL",
        description: "Продвинутая база данных с открытым исходным кодом",
        icon: <Database className="text-accent" size={40} />
      }, {
        name: "MediatR",
        description: "Реализация паттерна CQRS",
        icon: <Layers className="text-accent" size={40} />
      }, {
        name: "AutoMapper",
        description: "Решение для маппинга объектов",
        icon: <FileCode className="text-accent" size={40} />
      }
    ],
    frontend: [
      {
        name: "React 18",
        description: "Современная UI библиотека",
        icon: <Laptop className="text-accent" size={40} />
      }, {
        name: "TypeScript",
        description: "Типизированный JavaScript",
        icon: <Terminal className="text-accent" size={40} />
      }, {
        name: "Tailwind CSS",
        description: "CSS фреймворк основанный на утилитах",
        icon: <FileCode className="text-accent" size={40} />
      }, {
        name: "React Query",
        description: "Библиотека для получения данных",
        icon: <LinkIcon className="text-accent" size={40} />
      }, {
        name: "Framer Motion",
        description: "Библиотека анимаций",
        icon: <ChartBar className="text-accent" size={40} />
      }, {
        name: "shadcn/ui",
        description: "Библиотека UI компонентов",
        icon: <Layers className="text-accent" size={40} />
      }
    ]
  };
  
  const FeatureCard = ({ icon, title, details }) => (
    <div className="glass-card relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-80"></div>
      <div className="p-6 z-10 relative">
        <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{details}</p>
      </div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mb-12"></div>
    </div>
  );

  return (
    <div 
      className="min-h-screen bg-background text-foreground"
      style={{ 
        filter: `blur(${blurLevel}px)`,
        transition: "filter 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.97)"
      }}
    >
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <RouterLink to="/" className="flex items-center">
            <span className="font-bold text-xl text-foreground">
              <span className="text-primary">Lemon</span>Bite
            </span>
          </RouterLink>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <RouterLink 
              to="/" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent/10"
            >
              Главная
            </RouterLink>
            <RouterLink 
              to="/about" 
              className="px-3 py-2 rounded-md text-sm font-medium bg-accent/50"
            >
              О нас
            </RouterLink>
          </div>
          
          {/* Theme Switch */}
          <div className="flex items-center space-x-4">
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={toggleTheme}
              className="bg-background border-muted"
            >
              <div className="w-full h-full relative overflow-hidden">
                <div className={`absolute inset-0 flex justify-center items-center ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
                  🌙
                </div>
                <div className={`absolute inset-0 flex justify-center items-center ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}>
                  ☀️
                </div>
              </div>
            </Switch>
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        <motion.div 
          initial={{
            opacity: 0,
            y: 20
          }} 
          animate={{
            opacity: 1,
            y: 0
          }} 
          transition={{
            duration: 0.6, // Faster animation
            ease: "easeOut"
          }} 
          className="container mx-auto px-4"
        >
          <div className="max-w-3xl mx-auto text-center relative">
            <motion.div 
              initial={{
                scale: 0.9,
                opacity: 0
              }} 
              animate={{
                scale: 1,
                opacity: 1
              }} 
              transition={{
                delay: 0.1, // Faster delay
                duration: 0.4 // Faster animation
              }} 
              className="mb-6 inline-block"
            >
              <span className="inline-block relative">
                <Sparkles className="absolute -top-6 -right-6 text-primary w-6 h-6" />
                <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">Теперь open-source!</span>
              </span>
            </motion.div>
            
            <motion.h1 
              className="font-bold text-5xl tracking-tight mb-6 gradient-text py-[16px] md:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Добро пожаловать в удобную доставку
            </motion.h1>
            
            <motion.p 
              className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Современное высокопроизводительное веб-приложение для обеспечения наилучшего опыта как разработчиков так и пользователей.
            </motion.p>

            <motion.div 
              className="flex flex-wrap justify-center gap-4" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <RouterLink to="/" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all">
                Начать заказ
              </RouterLink>
              <a href="https://github.com/LemonPotion/lemonbite-39.git" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all">
                <Github size={18} />
                <span>Открыть на GitHub</span>
              </a>
            </motion.div>

          </div>
        </motion.div>

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div className="absolute top-[10%] left-[10%] w-20 h-20 rounded-full bg-primary/10 blur-xl" animate={{
            x: [0, 10, 0, -10, 0],
            y: [0, -10, 0, 10, 0]
          }} transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut"
          }} />
          <motion.div className="absolute bottom-[20%] right-[15%] w-32 h-32 rounded-full bg-accent/10 blur-xl" animate={{
            x: [0, -15, 0, 15, 0],
            y: [0, 15, 0, -15, 0]
          }} transition={{
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut"
          }} />
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={itemAnimation}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              margin: "-100px"
            }} 
            className="text-center mb-16"
          >
            <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 inline-block">
              Наш стек технологий
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Удобный стек
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Наше приложение использует современные инструменты разработки для обеспечения производительности, масштабируемости и поддерживаемости.
            </p>
          </motion.div>

          <div className="mb-20">
            <motion.h3 
              className="text-2xl font-semibold mb-8 text-center"
              variants={itemAnimation}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Серверные технологии
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStacks.backend.map(tech => (
                <div 
                  key={tech.name} 
                  className="glass-card border border-border bg-card/30 rounded-2xl p-6 h-full"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-primary/10 mb-4">
                      {tech.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                    <p className="text-muted-foreground">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <motion.h3 
              className="text-2xl font-semibold mb-8 text-center"
              variants={itemAnimation}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Клиентские технологии
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStacks.frontend.map(tech => (
                <div 
                  key={tech.name} 
                  className="glass-card border border-border bg-card/30 rounded-2xl p-6 h-full"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-primary/10 mb-4">
                      {tech.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                    <p className="text-muted-foreground">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-background/60">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16" 
            variants={itemAnimation}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 inline-block">
              Возможности
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ключевые особенности</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Наш подход к разработке обеспечивает масштабируемость, надежность и удобство обслуживания вашей системы.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard icon={<Code size={24} />} title="Современная архитектура" details="Чистая архитектура с паттерном CQRS, принципы Domain-Driven Design и структура готовая к микросервисам." />
            <FeatureCard icon={<Database size={24} />} title="Эффективная база данных" details="Масштабируемый дизайн базы данных с оптимизированными запросами и кэшированием." />
            <FeatureCard icon={<GitFork size={24} />} title="Готово к масштабированию" details="Архитектура, спроектированная для легкого масштабирования по мере роста вашего бизнеса." />
            <FeatureCard icon={<Terminal size={24} />} title="Типобезопасность" details="Полная типобезопасность от API до пользовательского интерфейса для предотвращения ошибок во время выполнения." />
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <svg className="absolute bottom-0 left-0 transform translate-x-80 -translate-y-24" width="640" height="784" fill="none" viewBox="0 0 640 784" aria-hidden="true">
                <defs>
                  <pattern id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047" x="118" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" className="text-primary" fill="currentColor" />
                  </pattern>
                </defs>
                <rect y="72" width="640" height="640" className="text-primary" fill="currentColor" opacity="0.1" />
                <rect x="118" width="404" height="784" fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)" opacity="0.5" />
              </svg>
            </div>
            <div className="relative z-10">
              <motion.div 
                className="mx-auto max-w-2xl text-center mb-10 md:mb-16"
                variants={containerAnimation}
                initial="hidden"
                whileInView="show" 
                viewport={{ once: true }}
              >
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold mb-6" 
                  variants={itemAnimation}
                >
                  Поддержите проект
                </motion.h2>
                <motion.p 
                  className="text-xl text-muted-foreground mb-8" 
                  variants={itemAnimation}
                >
                  Поддержите нас на GitHub или предлагайте идеи для развития продукта.
                </motion.p>
                <motion.div variants={itemAnimation}>
                  <RouterLink to="https://github.com/LemonPotion/lemonbite-39.git" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all transform hover:-translate-y-1">
                    <Github size={20} />
                    <span>Открыть на GitHub</span>
                  </RouterLink>
                </motion.div>
              </motion.div>

              <motion.div 
                className="relative mx-auto w-full max-w-5xl h-[520px] sm:h-[520px] md:h-[620px] rounded-2xl border border-border overflow-hidden shadow-2xl" 
                variants={itemAnimation}
                initial="hidden"
                whileInView="show"
                viewport={{
                  once: true,
                  margin: "-100px"
                }}
                style={{
                  backgroundImage: 'url(https://i.imgur.com/kR7VhAh.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  boxShadow: '0 12px 45px 0 rgba(0,0,0,0.18), 0 5px 20px 0 rgba(0,0,0,0.07)',
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/30 md:bg-black/20 backdrop-blur-sm">
                  <motion.div 
                    className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary/20 text-primary mb-8 shadow-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Code size={42} />
                  </motion.div>
                  <motion.h3 
                    className="text-4xl font-extrabold text-white drop-shadow-lg mb-4 tracking-tight"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    Готовы сделать первый заказ?
                  </motion.h3>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
