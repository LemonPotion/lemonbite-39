import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { 
  Code, 
  Database, 
  Server, 
  Terminal, 
  Laptop, 
  Layers, 
  FileCode, 
  Link as LinkIcon, 
  ChartBar, 
  Sparkles, 
  GitFork, 
  Github, 
  Users,
  Mail,
  Star,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin
} from "lucide-react";
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Link as RouterLink } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  
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
    backend: [{
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
    }],
    frontend: [{
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
    }]
  };

  const FeatureCard = ({
    icon,
    title,
    details
  }) => <motion.div className="glass-card relative overflow-hidden" whileHover={{
    y: -5,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  }} transition={{
    type: "spring",
    stiffness: 300,
    damping: 20
  }}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-80"></div>
      <div className="p-6 z-10 relative">
        <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{details}</p>
      </div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mb-12"></div>
    </motion.div>;

  // Team members data
  const teamMembers = [
    {
      name: "Анна Смирнова",
      role: "Основатель & CEO",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      description: "Более 10 лет опыта в ресторанном бизнесе"
    },
    {
      name: "Михаил Ковалев",
      role: "Шеф-повар",
      avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      description: "Разработчик уникальных рецептов и подходов"
    },
    {
      name: "Елена Иванова",
      role: "CTO",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      description: "Ведущий специалист по техническим решениям"
    }
  ];

  // FAQ data
  const faqItems = [
    { 
      question: "Как работает система доставки?", 
      answer: "Наша система доставки основана на оптимизации маршрутов и тщательном контроле качества. Мы гарантируем доставку в течение 30 минут после приготовления заказа." 
    },
    { 
      question: "Какие способы оплаты вы принимаете?", 
      answer: "Мы принимаем банковские карты, онлайн-платежи, Apple Pay и Google Pay, а также наличные при получении заказа." 
    },
    { 
      question: "Какой минимальный заказ для бесплатной доставки?", 
      answer: "Минимальная сумма заказа для бесплатной доставки составляет 1000 рублей. Для заказов меньшей стоимости стоимость доставки рассчитывается индивидуально исходя из расстояния." 
    },
    { 
      question: "Можно ли оформить предварительный заказ?", 
      answer: "Да, вы можете оформить предварительный заказ на определенную дату и время через наш сайт или мобильное приложение." 
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Иван П.",
      text: "Невероятно быстрая доставка и потрясающее качество еды! Всегда заказываю только здесь.",
      rating: 5
    },
    {
      name: "Мария С.",
      text: "Очень удобное приложение и отличный выбор блюд. Приятно удивлена сервисом.",
      rating: 4
    },
    {
      name: "Алексей К.",
      text: "Большие порции, вкусная еда, быстрая доставка. Что еще нужно?",
      rating: 5
    }
  ];

  return (
    <motion.div className="min-h-screen bg-background text-foreground" initial={{
      opacity: 0,
      y: 30
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.9,
      ease: "easeOut"
    }}>
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border py-[13px]">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full px-4">
          <Navigation />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        ease: "easeOut"
      }} className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center relative">
            <motion.div initial={{
            scale: 0.9,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} transition={{
            delay: 0.2,
            duration: 0.5
          }} className="mb-6 inline-block">
              <span className="inline-block relative">
                <Sparkles className="absolute -top-6 -right-6 text-primary w-6 h-6" />
                <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">Теперь open-source!</span>
              </span>
            </motion.div>
            
            <h1 className="font-bold text-5xl tracking-tight mb-6 gradient-text py-[16px] md:text-7xl">
              Добро пожаловать в удобную доставку
            </h1>
            
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">Современное высокопроизводительное веб-приложение для обеспечения наилучшего опыта как разработчиков так и пользователей.</p>

            <motion.div className="flex flex-wrap justify-center gap-4" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.6
          }}>
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

      {/* Tech Stack Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} viewport={{
          once: true,
          margin: "-100px"
        }} className="text-center mb-16">
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
            <h3 className="text-2xl font-semibold mb-8 text-center">Серверные технологии</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStacks.backend.map(tech => <motion.div key={tech.name} className="glass-card border border-border bg-card/30 rounded-2xl p-6" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              margin: "-50px"
            }} whileHover={{
              y: -5,
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              transition: {
                duration: 0.2
              }
            }}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-primary/10 mb-4">
                      {tech.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                    <p className="text-muted-foreground">{tech.description}</p>
                  </div>
                </motion.div>)}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center">Клиентские технологии</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStacks.frontend.map(tech => <motion.div key={tech.name} className="glass-card border border-border bg-card/30 rounded-2xl p-6" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              margin: "-50px"
            }} whileHover={{
              y: -5,
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              transition: {
                duration: 0.2
              }
            }}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-primary/10 mb-4">
                      {tech.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                    <p className="text-muted-foreground">{tech.description}</p>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/60">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} viewport={{
          once: true
        }}>
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

      {/* NEW: Team Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 inline-block">
              Наша команда
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Познакомьтесь с профессионалами
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Команда экспертов, которая делает вашу доставку выдающейся каждый день.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card className="overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <div className="aspect-square overflow-hidden bg-muted/20">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                    </div>
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 overflow-hidden opacity-30 pointer-events-none">
          <motion.div 
            className="absolute top-40 left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut"
            }}
          />
        </div>
      </section>

      {/* NEW: Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/60">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 inline-block">
              Отзывы
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Что говорят наши клиенты
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Мы ценим каждое мнение и постоянно работаем над улучшением нашего сервиса.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-primary" size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-foreground italic mb-4">{testimonial.text}</p>
                <div className="font-semibold">{testimonial.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: FAQ Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 inline-block">
              Часто задаваемые вопросы
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Отвечаем на ваши вопросы
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Нашли ответы на самые популярные вопросы о нашей доставке.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Collapsible
                key={index}
                open={openFaq === `faq-${index}`}
                onOpenChange={() => setOpenFaq(openFaq === `faq-${index}` ? null : `faq-${index}`)}
                className="border border-border rounded-lg overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-card hover:bg-muted/50 transition-colors">
                  <span className="text-lg font-semibold">{item.question}</span>
                  {openFaq === `faq-${index}` ? 
                    <ChevronUp className="h-5 w-5 text-muted-foreground" /> : 
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  }
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 pt-0 bg-card animate-collapsible-down">
                  <Separator className="mb-4" />
                  <p className="text-muted-foreground">{item.answer}</p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Contact & Info Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 inline-block">
              Контакты
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Оставайтесь на связи
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Мы всегда готовы ответить на ваши вопросы и принять обратную связь.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-center text-muted-foreground">support@lemonbite.com</p>
              <p className="text-center text-muted-foreground">info@lemonbite.com</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Время работы</h3>
              <p className="text-center text-muted-foreground">Пн-Пт: 10:00 - 22:00</p>
              <p className="text-center text-muted-foreground">Сб-Вс: 11:00 - 23:00</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Адрес</h3>
              <p className="text-center text-muted-foreground">ул. Лимонная, 42</p>
              <p className="text-center text-muted-foreground">Москва, Россия</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Existing GitHub Section */}
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
                <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.7
              }} viewport={{
                once: true
              }}>
                  Поддержите проект
                </motion.h2>
                <motion.p className="text-xl text-muted-foreground mb-8" initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.7,
                delay: 0.1
              }} viewport={{
                once: true
              }}>
                  Поддержите нас на GitHub или предлагайте идеи для развития продукта.
                </motion.p>
                <motion.div initial={{
                opacity: 0,
                y: 10
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: 0.3
              }} viewport={{
                once: true
              }}>
                  <RouterLink to="https://github.com/LemonPotion/lemonbite-39.git" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all transform hover:-translate-y-1">
                    <Github size={20} />
                    <span>Открыть на GitHub</span>
                  </RouterLink>
                </motion.div>
              </div>

              <motion.div className="relative mx-auto w-full max-w-5xl h-[520px] sm:h-[520px] md:h-[620px] rounded-2xl border border-border overflow-hidden shadow-2xl" initial={{
              opacity: 0,
              y: 40,
              scale: 0.98
            }} whileInView={{
              opacity: 1,
              y: 0,
              scale: 1
            }} transition={{
              duration: 0.7,
              delay: 0.2
            }} viewport={{
              once: true,
              margin: "-100px"
            }} style={{
              backgroundImage: 'url(https://i.imgur.com/kR7VhAh.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              boxShadow: '0 12px 45px 0 rgba(0,0,0,0.18), 0 5px 20px 0 rgba(0,0,0,0.07)',
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/30 md:bg-black/20 backdrop-blur-sm">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary/20 text-primary mb-8 shadow-lg">
                    <Code size={42} />
                  </div>
                  <h3 className="text-4xl font-extrabold text-white drop-shadow-lg mb-4 tracking-tight">Готовы сделать первый заказ?</h3>
                  
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
