
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Code, Database, Server, Terminal, Laptop, Layers, FileCode, Link as LinkIcon, ChartBar, Sparkles, GitFork, Github, ExternalLink, Star, Award, ThumbsUp } from "lucide-react";
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as RouterLink } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/ui/collapsible";

const About = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [visibleSection, setVisibleSection] = useState('backend');
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerAnimation = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemAnimation = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0
    }
  };

  const techStacks = {
    backend: [
      {
        name: "ASP.NET Core",
        description: "Современный кроссплатформенный веб-фреймворк",
        icon: <Server className="text-accent" size={40} />,
        details: "ASP.NET Core позволяет создавать высокопроизводительные, кроссплатформенные веб-приложения с поддержкой контейнеризации и облачных развертываний.",
        link: "https://dotnet.microsoft.com/apps/aspnet"
      }, 
      {
        name: "Entity Framework Core",
        description: "Современная ORM для .NET",
        icon: <Database className="text-accent" size={40} />,
        details: "Entity Framework Core - это легковесная, расширяемая и кроссплатформенная версия популярной технологии доступа к данным Entity Framework.",
        link: "https://docs.microsoft.com/ef/core/"
      },
      {
        name: ".NET 8",
        description: "Новейшая платформа .NET",
        icon: <Code className="text-accent" size={40} />,
        details: ".NET 8 предлагает улучшенную производительность, новые API и лучшую поддержку облачных сценариев по сравнению с предыдущими версиями.",
        link: "https://dotnet.microsoft.com/download/dotnet/8.0"
      },
      {
        name: "PostgreSQL",
        description: "Продвинутая база данных с открытым исходным кодом",
        icon: <Database className="text-accent" size={40} />,
        details: "PostgreSQL - мощная объектно-реляционная СУБД с открытым исходным кодом, известная своей надежностью и поддержкой сложных типов данных.",
        link: "https://www.postgresql.org/"
      },
      {
        name: "MediatR",
        description: "Реализация паттерна CQRS",
        icon: <Layers className="text-accent" size={40} />,
        details: "MediatR - это легкая библиотека для реализации паттерна медиатор в .NET, обеспечивающая слабосвязанную коммуникацию между компонентами.",
        link: "https://github.com/jbogard/MediatR"
      },
      {
        name: "AutoMapper",
        description: "Решение для маппинга объектов",
        icon: <FileCode className="text-accent" size={40} />,
        details: "AutoMapper - это библиотека для объектно-объектного преобразования, которая избавляет от необходимости писать однообразный код для преобразования одних типов объектов в другие.",
        link: "https://automapper.org/"
      }
    ],
    frontend: [
      {
        name: "React 18",
        description: "Современная UI библиотека",
        icon: <Laptop className="text-accent" size={40} />,
        details: "React 18 включает такие функции как Concurrent Rendering, автоматическое батчинг и улучшенные хуки для создания отзывчивых пользовательских интерфейсов.",
        link: "https://reactjs.org/"
      },
      {
        name: "TypeScript",
        description: "Типизированный JavaScript",
        icon: <Terminal className="text-accent" size={40} />,
        details: "TypeScript добавляет статическую типизацию в JavaScript, помогая выявлять ошибки на этапе компиляции и улучшая качество кода.",
        link: "https://www.typescriptlang.org/"
      },
      {
        name: "Tailwind CSS",
        description: "CSS фреймворк основанный на утилитах",
        icon: <FileCode className="text-accent" size={40} />,
        details: "Tailwind CSS - это низкоуровневый CSS-фреймворк, который позволяет быстро создавать кастомизированные дизайны без написания CSS с нуля.",
        link: "https://tailwindcss.com/"
      },
      {
        name: "React Query",
        description: "Библиотека для получения данных",
        icon: <LinkIcon className="text-accent" size={40} />,
        details: "React Query упрощает получение, кэширование, синхронизацию и обновление серверного состояния в React-приложениях.",
        link: "https://tanstack.com/query/latest"
      },
      {
        name: "Framer Motion",
        description: "Библиотека анимаций",
        icon: <ChartBar className="text-accent" size={40} />,
        details: "Framer Motion - это библиотека анимаций для React, которая позволяет создавать сложные анимации с чистым, декларативным синтаксисом.",
        link: "https://www.framer.com/motion/"
      },
      {
        name: "shadcn/ui",
        description: "Библиотека UI компонентов",
        icon: <Layers className="text-accent" size={40} />,
        details: "shadcn/ui предоставляет набор доступных, настраиваемых компонентов React, которые вы можете копировать и вставлять в свои приложения.",
        link: "https://ui.shadcn.com/"
      }
    ]
  };

  const features = [
    {
      id: 'architecture',
      icon: <Code size={24} />,
      title: "Современная архитектура",
      details: "Чистая архитектура с паттерном CQRS, принципы Domain-Driven Design и структура готовая к микросервисам."
    },
    {
      id: 'database',
      icon: <Database size={24} />,
      title: "Эффективная база данных",
      details: "Масштабируемый дизайн базы данных с оптимизированными запросами и кэшированием."
    },
    {
      id: 'scaling',
      icon: <GitFork size={24} />,
      title: "Готово к масштабированию",
      details: "Архитектура, спроектированная для легкого масштабирования по мере роста вашего бизнеса."
    },
    {
      id: 'types',
      icon: <Terminal size={24} />,
      title: "Типобезопасность",
      details: "Полная типобезопасность от API до пользовательского интерфейса для предотвращения ошибок во время выполнения."
    }
  ];

  const FeatureCard = ({ icon, title, details, id }) => (
    <motion.div 
      className={`glass-card relative overflow-hidden ${activeFeature === id ? 'ring-2 ring-primary' : ''}`}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      onHoverStart={() => setActiveFeature(id)}
      onHoverEnd={() => setActiveFeature(null)}
      onClick={() => setActiveFeature(activeFeature === id ? null : id)}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-80"></div>
      <div className="p-6 z-10 relative">
        <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{details}</p>
        
        <AnimatePresence>
          {activeFeature === id && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t"
            >
              <p className="text-sm text-muted-foreground">Нажмите, чтобы узнать больше об этой функции</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mb-12"></div>
    </motion.div>
  );

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
            >
              <motion.span 
                className="inline-block relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="absolute -top-6 -right-6 text-primary w-6 h-6" />
                <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Теперь open-source!
                </span>
              </motion.span>
            </motion.div>
            
            <motion.h1 
              className="font-bold text-5xl tracking-tight mb-6 gradient-text py-[16px] md:text-7xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Добро пожаловать в удобную доставку
            </motion.h1>
            
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
              Современное высокопроизводительное веб-приложение для обеспечения наилучшего опыта как разработчиков так и пользователей.
            </p>

            <motion.div 
              className="flex flex-wrap justify-center gap-4" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.6 }}
            >
              <RouterLink 
                to="/" 
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
              >
                <motion.span 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  Начать заказ
                </motion.span>
              </RouterLink>
              
              <motion.a 
                href="https://github.com/LemonPotion/lemonbite-39.git" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={18} />
                <span>Открыть на GitHub</span>
              </motion.a>
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
              whileTap={{ scale: 0.95 }}
            >
              Наш стек технологий
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Удобный стек</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Наше приложение использует современные инструменты разработки для обеспечения производительности, масштабируемости и поддерживаемости.
            </p>
          </motion.div>

          <Tabs 
            defaultValue="backend" 
            className="w-full mb-12"
            onValueChange={setVisibleSection}
          >
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="backend" className="text-base px-6">Серверные технологии</TabsTrigger>
                <TabsTrigger value="frontend" className="text-base px-6">Клиентские технологии</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="backend" className="mt-0">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerAnimation}
                initial="hidden"
                animate={visibleSection === 'backend' ? "show" : "hidden"}
              >
                {techStacks.backend.map((tech, index) => (
                  <motion.div 
                    key={tech.name} 
                    className={`glass-card border border-border bg-card/30 rounded-2xl p-6 cursor-pointer transition-all ${expandedCard === `backend-${index}` ? 'ring-2 ring-primary' : ''}`}
                    variants={itemAnimation}
                    onClick={() => setExpandedCard(expandedCard === `backend-${index}` ? null : `backend-${index}`)}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-primary/10 mb-4">
                        {tech.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                      <p className="text-muted-foreground mb-4">{tech.description}</p>
                      
                      <AnimatePresence>
                        {expandedCard === `backend-${index}` && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-border w-full"
                          >
                            <p className="text-sm mb-3">{tech.details}</p>
                            <motion.a 
                              href={tech.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                              whileHover={{ x: 2 }}
                            >
                              Узнать больше <ExternalLink size={14} />
                            </motion.a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="frontend" className="mt-0">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerAnimation}
                initial="hidden"
                animate={visibleSection === 'frontend' ? "show" : "hidden"}
              >
                {techStacks.frontend.map((tech, index) => (
                  <motion.div 
                    key={tech.name} 
                    className={`glass-card border border-border bg-card/30 rounded-2xl p-6 cursor-pointer transition-all ${expandedCard === `frontend-${index}` ? 'ring-2 ring-primary' : ''}`}
                    variants={itemAnimation}
                    onClick={() => setExpandedCard(expandedCard === `frontend-${index}` ? null : `frontend-${index}`)}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-primary/10 mb-4">
                        {tech.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                      <p className="text-muted-foreground mb-4">{tech.description}</p>
                      
                      <AnimatePresence>
                        {expandedCard === `frontend-${index}` && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-border w-full"
                          >
                            <p className="text-sm mb-3">{tech.details}</p>
                            <motion.a 
                              href={tech.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                              whileHover={{ x: 2 }}
                            >
                              Узнать больше <ExternalLink size={14} />
                            </motion.a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
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
              whileTap={{ scale: 0.95 }}
            >
              Возможности
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ключевые особенности</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Наш подход к разработке обеспечивает масштабируемость, надежность и удобство обслуживания вашей системы.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map(feature => (
              <FeatureCard 
                key={feature.id}
                id={feature.id}
                icon={feature.icon}
                title={feature.title}
                details={feature.details}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12" 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
            viewport={{ once: true }}
          >
            <motion.span 
              className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Часто задаваемые вопросы
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ответы на вопросы</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">
                  Как начать использовать приложение?
                </AccordionTrigger>
                <AccordionContent>
                  Просто зарегистрируйтесь в приложении или зайдите как гость. Выберите нужные блюда и оформите заказ. Наша система сделает весь процесс максимально комфортным для вас.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium">
                  Можно ли интегрировать систему с существующим бизнесом?
                </AccordionTrigger>
                <AccordionContent>
                  Да, наша система разработана с учетом возможности интеграции с существующими бизнес-процессами. Мы предлагаем API и документацию для облегчения интеграции.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium">
                  Как работает система доставки?
                </AccordionTrigger>
                <AccordionContent>
                  Наша система использует оптимальные алгоритмы маршрутизации для обеспечения быстрой доставки заказов. Вы можете отслеживать статус вашего заказа в реальном времени через приложение.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium">
                  Есть ли у вас открытый API?
                </AccordionTrigger>
                <AccordionContent>
                  Да, мы предоставляем документированный API для разработчиков. Вы можете найти документацию на нашем GitHub репозитории и использовать API для создания собственных интеграций.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
                >
                  <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="w-full"
                  >
                    <div className="flex justify-center mb-4">
                      <CollapsibleTrigger asChild>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all transform"
                        >
                          <Github size={20} />
                          <span>Способы поддержки</span>
                        </motion.button>
                      </CollapsibleTrigger>
                    </div>
                    
                    <CollapsibleContent className="overflow-hidden">
                      <motion.div 
                        className="p-6 bg-card/50 border border-border rounded-xl mb-6 max-w-2xl mx-auto"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <motion.a 
                            href="https://github.com/LemonPotion/lemonbite-39.git" 
                            target="_blank" 
                            className="flex flex-col items-center p-4 rounded-lg bg-background hover:bg-muted transition-colors"
                            whileHover={{ y: -5 }}
                          >
                            <Star className="h-8 w-8 text-primary mb-2" />
                            <h3 className="font-medium mb-1">Поставьте звезду</h3>
                            <p className="text-xs text-muted-foreground text-center">Поддержите нас на GitHub</p>
                          </motion.a>
                          
                          <motion.a 
                            href="https://github.com/LemonPotion/lemonbite-39.git" 
                            target="_blank" 
                            className="flex flex-col items-center p-4 rounded-lg bg-background hover:bg-muted transition-colors"
                            whileHover={{ y: -5 }}
                          >
                            <GitFork className="h-8 w-8 text-primary mb-2" />
                            <h3 className="font-medium mb-1">Сделайте форк</h3>
                            <p className="text-xs text-muted-foreground text-center">Создайте свою версию</p>
                          </motion.a>
                          
                          <motion.a 
                            href="https://github.com/LemonPotion/lemonbite-39.git" 
                            target="_blank" 
                            className="flex flex-col items-center p-4 rounded-lg bg-background hover:bg-muted transition-colors"
                            whileHover={{ y: -5 }}
                          >
                            <ThumbsUp className="h-8 w-8 text-primary mb-2" />
                            <h3 className="font-medium mb-1">Обратная связь</h3>
                            <p className="text-xs text-muted-foreground text-center">Предложите улучшения</p>
                          </motion.a>
                        </div>
                      </motion.div>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <motion.a 
                    href="https://github.com/LemonPotion/lemonbite-39.git" 
                    target="_blank" 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-all transform mt-4"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={20} />
                    <span>Открыть на GitHub</span>
                  </motion.a>
                </motion.div>
              </div>

              <motion.div 
                className="relative mx-auto w-full max-w-5xl h-[520px] sm:h-[520px] md:h-[620px] rounded-2xl border border-border overflow-hidden shadow-2xl" 
                initial={{ opacity: 0, y: 40, scale: 0.98 }} 
                whileInView={{ opacity: 1, y: 0, scale: 1 }} 
                transition={{ duration: 0.7, delay: 0.2 }} 
                viewport={{ once: true, margin: "-100px" }} 
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
                whileHover={{
                  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
                  transition: { duration: 0.5 }
                }}
              >
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/30 md:bg-black/20 backdrop-blur-sm">
                  <motion.div 
                    className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary/20 text-primary mb-8 shadow-lg"
                    animate={{ 
                      rotateZ: [0, 5, 0, -5, 0],
                      scale: [1, 1.05, 1, 1.05, 1] 
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  >
                    <Code size={42} />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-4xl font-extrabold text-white drop-shadow-lg mb-4 tracking-tight"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Готовы сделать первый заказ?
                  </motion.h3>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <RouterLink
                      to="/"
                      className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-opacity-90 transition-all inline-flex items-center gap-2 mt-4"
                      onClick={(e) => {
                        e.currentTarget.classList.add('animate-ping');
                        setTimeout(() => {
                          window.location.href = '/';
                        }, 300);
                      }}
                    >
                      <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Перейти к заказу
                      </motion.span>
                      <ExternalLink size={16} />
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
