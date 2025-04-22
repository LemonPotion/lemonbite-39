
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Code, Database, Server, Terminal, Laptop, Layers, FileCode, Link, ChartBar } from "lucide-react";
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Link as RouterLink } from "react-router-dom";

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

  const techStacks = {
    backend: [
      { name: "ASP.NET Core", description: "Современный кроссплатформенный веб-фреймворк", icon: <Server className="text-white/80" size={40} /> },
      { name: "Entity Framework Core", description: "Современная ORM для .NET", icon: <Database className="text-white/80" size={40} /> },
      { name: ".NET 8", description: "Новейшая платформа .NET", icon: <Code className="text-white/80" size={40} /> },
      { name: "PostgreSQL", description: "Продвинутая база данных с открытым исходным кодом", icon: <Database className="text-white/80" size={40} /> },
      { name: "MediatR", description: "Реализация паттерна CQRS", icon: <Layers className="text-white/80" size={40} /> },
      { name: "AutoMapper", description: "Решение для маппинга объектов", icon: <FileCode className="text-white/80" size={40} /> }
    ],
    frontend: [
      { name: "React 18", description: "Современная UI библиотека", icon: <Laptop className="text-white/80" size={40} /> },
      { name: "TypeScript", description: "Типизированный JavaScript", icon: <Terminal className="text-white/80" size={40} /> },
      { name: "Tailwind CSS", description: "CSS фреймворк основанный на утилитах", icon: <FileCode className="text-white/80" size={40} /> },
      { name: "React Query", description: "Библиотека для получения данных", icon: <Link className="text-white/80" size={40} /> },
      { name: "Framer Motion", description: "Библиотека анимаций", icon: <ChartBar className="text-white/80" size={40} /> },
      { name: "shadcn/ui", description: "Библиотека UI компонентов", icon: <Layers className="text-white/80" size={40} /> }
    ]
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white overflow-x-hidden">
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#1A1F2C]/80 border-b border-white/10">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-4">
          <Navigation />
        </div>
      </div>

      {/* Hero Section with Arc-like gradient background */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-violet-800/20 pointer-events-none" />
        <motion.section 
          className="relative pt-24 pb-32 px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Добро пожаловать в удобную доставку
            </motion.h1>
            <motion.p 
              className="text-xl text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Современное высокопроизводительное веб-приложение
            </motion.p>
          </div>
        </motion.section>
      </div>

      {/* Backend Stack Section with Arc-like cards */}
      <motion.section 
        className="py-24 px-6 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Серверные Технологии
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStacks.backend.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.03)" }}
                className="relative group rounded-xl backdrop-blur-sm border border-white/10 p-6 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl mb-4">
                  {tech.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white/90">{tech.name}</h3>
                <p className="text-white/60">{tech.description}</p>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Frontend Stack Section */}
      <motion.section 
        className="py-24 px-6 relative bg-white/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Клиентские Технологии
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStacks.frontend.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.03)" }}
                className="relative group rounded-xl backdrop-blur-sm border border-white/10 p-6 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl mb-4">
                  {tech.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white/90">{tech.name}</h3>
                <p className="text-white/60">{tech.description}</p>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section with Arc-like design */}
      <motion.section 
        className="py-24 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Ключевые Особенности
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl backdrop-blur-xl border border-white/10 p-8 bg-gradient-to-br from-purple-500/5 to-blue-500/5"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl">
                <Code className="text-white/80" size={48} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Современная Архитектура
                </h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>Чистая архитектура с паттерном CQRS</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>Принципы Domain-Driven Design</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>Структура готовая к микросервисам</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>Типобезопасная интеграция API</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>Масштабируемый дизайн базы данных</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section with Arc-inspired design */}
      <motion.div 
        className="py-24 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-600/30 to-purple-800/30 backdrop-blur-xl" />
            <div className="relative p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Поддержите проект
              </h2>
              <p className="text-lg text-white/70 mb-8">
                Поддержите нас на GitHub или предлагайте идеи для развития продукта.
              </p>
              <RouterLink to="https://github.com" target="_blank">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold flex items-center gap-2 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                >
                  Открыть на GitHub
                  <FileCode size={20} />
                </motion.button>
              </RouterLink>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
