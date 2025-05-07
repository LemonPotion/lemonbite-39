
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Code, Database, Server, Terminal, Laptop, Layers, FileCode, Link as LinkIcon, ChartBar, Sparkles, GitFork, Github } from "lucide-react";
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Link as RouterLink } from "react-router-dom";

const About = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced animation variants
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };
  
  const itemAnimation = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const techStacks = {
    backend: [
      {
        name: "ASP.NET Core",
        description: "Современный кроссплатформенный веб-фреймворк",
        icon: <Server className="text-accent" size={40} />
      },
      {
        name: "Entity Framework Core",
        description: "Современная ORM для .NET",
        icon: <Database className="text-accent" size={40} />
      },
      {
        name: ".NET 8",
        description: "Новейшая платформа .NET",
        icon: <Code className="text-accent" size={40} />
      },
      {
        name: "PostgreSQL",
        description: "Продвинутая база данных с открытым исходным кодом",
        icon: <Database className="text-accent" size={40} />
      },
      {
        name: "MediatR",
        description: "Реализация паттерна CQRS",
        icon: <Layers className="text-accent" size={40} />
      },
      {
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
      },
      {
        name: "TypeScript",
        description: "Типизированный JavaScript",
        icon: <Terminal className="text-accent" size={40} />
      },
      {
        name: "Tailwind CSS",
        description: "CSS фреймворк основанный на утилитах",
        icon: <FileCode className="text-accent" size={40} />
      },
      {
        name: "React Query",
        description: "Библиотека для получения данных",
        icon: <LinkIcon className="text-accent" size={40} />
      },
      {
        name: "Framer Motion",
        description: "Библиотека анимаций",
        icon: <ChartBar className="text-accent" size={40} />
      },
      {
        name: "shadcn/ui",
        description: "Библиотека UI компонентов",
        icon: <Layers className="text-accent" size={40} />
      }
    ]
  };
  
  const FeatureCard = ({ icon, title, details }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <motion.div 
        className="glass-card relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{
          y: -8,
          boxShadow: "0 25px 30px -12px rgba(0, 0, 0, 0.15), 0 15px 15px -7px rgba(0, 0, 0, 0.06)"
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-80"></div>
        <div className="p-6 z-10 relative">
          <motion.div 
            className="mb-4 flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary"
            animate={isHovered ? { 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
              transition: { duration: 0.5 }
            } : {}}
          >
            {icon}
          </motion.div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground">{details}</p>
          
          <motion.div 
            className="mt-4 h-1 bg-primary/10 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={isHovered ? { width: "100%" } : { width: "30%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="h-full bg-primary/40 rounded-full"></div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mb-12"></div>
        <motion.div 
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-accent/5"
          animate={isHovered ? { 
            scale: 3,
            opacity: 0.3,
            transition: { duration: 0.8 }
          } : { 
            scale: 1,
            opacity: 0,
            transition: { duration: 0.4 }
          }}
        />
      </motion.div>
    );
  };

  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground" 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border py-[13px]">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full px-4">
          <Navigation />
        </div>
      </div>

      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-4"
        >
          <div className="max-w-3xl mx-auto text-center relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <span className="inline-block relative">
                <Sparkles className="absolute -top-6 -right-6 text-primary w-6 h-6" />
                <motion.span 
                  className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  animate={{ 
                    boxShadow: ["0 0 0 0 rgba(var(--primary), 0.2)", "0 0 0 5px rgba(var(--primary), 0)", "0 0 0 0 rgba(var(--primary), 0)"] 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2.5 
                  }}
                >
                  Теперь open-source!
                </motion.span>
              </span>
            </motion.div>
            
            <motion.h1 
              className="font-bold text-5xl tracking-tight mb-6 gradient-text py-[16px] md:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Добро пожаловать в удобную доставку
            </motion.h1>
            
            <motion.p 
              className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Современное высокопроизводительное веб-приложение для обеспечения наилучшего опыта как разработчиков так и пользователей.
            </motion.p>

            <motion.div 
              className="flex flex-wrap justify-center gap-4" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <RouterLink to="/" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all">
                  Начать заказ
                </RouterLink>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <a 
                  href="https://github.com/LemonPotion/lemonbite-39.git" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all"
                >
                  <Github size={18} />
                  <span>Открыть на GitHub</span>
                </a>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div 
            className="absolute top-[10%] left-[10%] w-20 h-20 rounded-full bg-primary/10 blur-xl" 
            animate={{
              x: [0, 10, 0, -10, 0],
              y: [0, -10, 0, 10, 0]
            }} 
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            }} 
          />
          <motion.div 
            className="absolute bottom-[20%] right-[15%] w-32 h-32 rounded-full bg-accent/10 blur-xl" 
            animate={{
              x: [0, -15, 0, 15, 0],
              y: [0, 15, 0, -15, 0]
            }} 
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut"
            }} 
          />
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span 
              className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Наш стек технологий
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Удобный стек</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Наше приложение использует современные инструменты разработки для обеспечения производительности, масштабируемости и поддерживаемости.
            </p>
          </motion.div>

          <div className="mb-20">
            <motion.h3 
              className="text-2xl font-semibold mb-8 text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
            >
              Серверные технологии
            </motion.h3>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerAnimation}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              {techStacks.backend.map((tech, index) => (
                <motion.div 
                  key={tech.name} 
                  className="glass-card border border-border bg-card/30 rounded-2xl p-6 relative overflow-hidden"
                  variants={itemAnimation}
                  onMouseEnter={() => setHoveredCard(`backend-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.08)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className="absolute top-0 left-0 h-1 bg-primary/40" 
                    initial={{ width: "30%" }}
                    animate={{ width: hoveredCard === `backend-${index}` ? "100%" : "30%" }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="flex flex-col items-center text-center">
                    <motion.div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center bg-primary/10 mb-4"
                      whileHover={{ rotate: 5 }}
                      animate={hoveredCard === `backend-${index}` ? {
                        scale: [1, 1.1, 1],
                        transition: { duration: 0.5 }
                      } : {}}
                    >
                      {tech.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                    <p className="text-muted-foreground">{tech.description}</p>
                  </div>
                  
                  <motion.div 
                    className="absolute bottom-0 right-0 w-20 h-20 rounded-full bg-accent/5 -mb-10 -mr-10"
                    animate={hoveredCard === `backend-${index}` ? { 
                      scale: 1.5, opacity: 0.6,
                      transition: { duration: 0.8 }
                    } : { scale: 1, opacity: 0.2 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <motion.h3 
              className="text-2xl font-semibold mb-8 text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
            >
              Клиентские технологии
            </motion.h3>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerAnimation}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              {techStacks.frontend.map((tech, index) => (
                <motion.div 
                  key={tech.name} 
                  className="glass-card border border-border bg-card/30 rounded-2xl p-6 relative overflow-hidden"
                  variants={itemAnimation}
                  onMouseEnter={() => setHoveredCard(`frontend-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.08)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className="absolute top-0 left-0 h-1 bg-accent/40" 
                    initial={{ width: "30%" }}
                    animate={{ width: hoveredCard === `frontend-${index}` ? "100%" : "30%" }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="flex flex-col items-center text-center">
                    <motion.div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center bg-primary/10 mb-4"
                      whileHover={{ rotate: 5 }}
                      animate={hoveredCard === `frontend-${index}` ? {
                        scale: [1, 1.1, 1],
                        transition: { duration: 0.5 }
                      } : {}}
                    >
                      {tech.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                    <p className="text-muted-foreground">{tech.description}</p>
                  </div>
                  
                  <motion.div 
                    className="absolute bottom-0 right-0 w-20 h-20 rounded-full bg-primary/5 -mb-10 -mr-10"
                    animate={hoveredCard === `frontend-${index}` ? { 
                      scale: 1.5, opacity: 0.6,
                      transition: { duration: 0.8 }
                    } : { scale: 1, opacity: 0.2 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-background/60">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Возможности
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ключевые особенности</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Наш подход к разработке обеспечивает масштабируемость, надежность и удобство обслуживания вашей системы.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerAnimation}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <FeatureCard 
              icon={<Code size={24} />} 
              title="Современная архитектура" 
              details="Чистая архитектура с паттерном CQRS, принципы Domain-Driven Design и структура готовая к микросервисам." 
            />
            <FeatureCard 
              icon={<Database size={24} />} 
              title="Эффективная база данных" 
              details="Масштабируемый дизайн базы данных с оптимизированными запросами и кэшированием." 
            />
            <FeatureCard 
              icon={<GitFork size={24} />} 
              title="Готово к масштабированию" 
              details="Архитектура, спроектированная для легкого масштабирования по мере роста вашего бизнеса." 
            />
            <FeatureCard 
              icon={<Terminal size={24} />} 
              title="Типобезопасность" 
              details="Полная типобезопасность от API до пользовательского интерфейса для предотвращения ошибок во время выполнения." 
            />
          </motion.div>
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
              <div className="mx-auto max-w-2xl text-center mb-10 md:mb-16">
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold mb-6" 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  Поддержите проект
                </motion.h2>
                <motion.p 
                  className="text-xl text-muted-foreground mb-8" 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Поддержите нас на GitHub или предлагайте идеи для развития продукта.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RouterLink 
                    to="https://github.com/LemonPotion/lemonbite-39.git" 
                    target="_blank" 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all transform hover:-translate-y-1"
                  >
                    <Github size={20} />
                    <span>Открыть на GitHub</span>
                  </RouterLink>
                </motion.div>
              </div>

              <motion.div 
                className="relative mx-auto w-full max-w-5xl h-[520px] sm:h-[520px] md:h-[620px] rounded-2xl border border-border overflow-hidden shadow-2xl" 
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.02, transition: { duration: 0.5 } }}
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
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/30 md:bg-black/20 backdrop-blur-sm transform transition-all duration-500">
                  <motion.div 
                    className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary/20 text-primary mb-8 shadow-lg"
                    whileHover={{ 
                      rotate: [0, 5, -5, 0],
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <Code size={42} />
                  </motion.div>
                  <motion.h3 
                    className="text-4xl font-extrabold text-white drop-shadow-lg mb-4 tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    Готовы сделать первый заказ?
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RouterLink 
                      to="/" 
                      className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
                    >
                      Начать заказ
                    </RouterLink>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
