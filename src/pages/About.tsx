import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Code, Database, Server, Terminal, Laptop, Layers, FileCode, Link, ChartBar } from "lucide-react";
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Link as RouterLink } from "react-router-dom";
const About = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  const [scrollY, setScrollY] = useState(0);
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
      icon: <Server className="text-[#202020]" size={40} />
    }, {
      name: "Entity Framework Core",
      description: "Современная ORM для .NET",
      icon: <Database className="text-[#202020]" size={40} />
    }, {
      name: ".NET 8",
      description: "Новейшая платформа .NET",
      icon: <Code className="text-[#202020]" size={40} />
    }, {
      name: "PostgreSQL",
      description: "Продвинутая база данных с открытым исходным кодом",
      icon: <Database className="text-[#202020]" size={40} />
    }, {
      name: "MediatR",
      description: "Реализация паттерна CQRS",
      icon: <Layers className="text-[#202020]" size={40} />
    }, {
      name: "AutoMapper",
      description: "Решение для маппинга объектов",
      icon: <FileCode className="text-[#202020]" size={40} />
    }],
    frontend: [{
      name: "React 18",
      description: "Современная UI библиотека",
      icon: <Laptop className="text-[#202020]" size={40} />
    }, {
      name: "TypeScript",
      description: "Типизированный JavaScript",
      icon: <Terminal className="text-[#202020]" size={40} />
    }, {
      name: "Tailwind CSS",
      description: "CSS фреймворк основанный на утилитах",
      icon: <FileCode className="text-[#202020]" size={40} />
    }, {
      name: "React Query",
      description: "Библиотека для получения данных",
      icon: <Link className="text-[#202020]" size={40} />
    }, {
      name: "Framer Motion",
      description: "Библиотека анимаций",
      icon: <ChartBar className="text-[#202020]" size={40} />
    }, {
      name: "shadcn/ui",
      description: "Библиотека UI компонентов",
      icon: <Layers className="text-[#202020]" size={40} />
    }]
  };
  return <div className="min-h-screen bg-[#202020] flex flex-col relative">
      <div className="sticky top-0 z-50 bg-[#202020] px-2 pt-4 border-b border-[#F98553]/20 py-[14px]">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full px-4">
          <Navigation />
        </div>
      </div>

      {/* Hero Section */}
      <motion.section className="relative w-full mt-10 md:mt-24 flex flex-col items-center text-[#CECCC5] overflow-hidden" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8,
      ease: "easeOut"
    }}>
        <div className="bg-[#202020] rounded-[3rem] px-8 py-12 max-w-4xl w-[90vw] mx-auto relative hover:border-opacity-100 transition-all duration-300">
          <motion.h1 initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2,
          duration: 0.5
        }} className="font-playfair md:text-6xl font-extrabold text-center leading-tight mb-5 text-[#F98553] text-7xl">Добро пожаловать в
удобную доставку</motion.h1>
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.4,
          duration: 0.5
        }} className="mt-6 text-xl text-[#CECCC5] text-center max-w-2xl mx-auto font-light md:text-xl">Современное высокопроизводительное веб-приложение</motion.p>
        </div>
      </motion.section>

      {/* Backend Stack Section */}
      <motion.section className="w-full flex flex-col items-center gap-8 my-16 max-w-7xl mx-auto px-4" variants={containerAnimation} initial="hidden" animate="show" viewport={{
      once: true
    }}>
        <h2 className="text-3xl font-bold text-[#F98553] mb-8">Серверные Технологии</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {techStacks.backend.map((tech, index) => <motion.div key={tech.name} variants={itemAnimation} whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 25px -5px rgba(249, 133, 83, 0.2)",
          borderColor: "#F98553"
        }} className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7 transition-all duration-300">
              <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md mb-4">
                {tech.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#F98553] mb-2">{tech.name}</h3>
              <p className="text-[#CECCC5] font-light">{tech.description}</p>
            </motion.div>)}
        </div>
      </motion.section>

      {/* Frontend Stack Section */}
      <motion.section className="w-full flex flex-col items-center gap-8 my-16 max-w-7xl mx-auto px-4" variants={containerAnimation} initial="hidden" animate="show" viewport={{
      once: true
    }}>
        <h2 className="text-3xl font-bold text-[#F98553] mb-8">Клиентские Технологии</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {techStacks.frontend.map((tech, index) => <motion.div key={tech.name} variants={itemAnimation} whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 25px -5px rgba(249, 133, 83, 0.2)",
          borderColor: "#F98553"
        }} className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7 transition-all duration-300">
              <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md mb-4">
                {tech.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#F98553] mb-2">{tech.name}</h3>
              <p className="text-[#CECCC5] font-light">{tech.description}</p>
            </motion.div>)}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section className="w-full flex flex-col items-center gap-8 my-16 max-w-7xl mx-auto px-4" variants={containerAnimation} initial="hidden" animate="show" viewport={{
      once: true
    }}>
        <h2 className="text-3xl font-bold text-[#F98553] mb-8">Ключевые Особенности</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <motion.div variants={itemAnimation} whileHover={{
          scale: 1.02,
          boxShadow: "0 10px 25px -5px rgba(249, 133, 83, 0.2)"
        }} className="col-span-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center justify-center min-w-[6rem] min-h-[6rem] bg-[#F98553] rounded-2xl shadow-md">
                <Code className="text-[#202020]" size={48} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#F98553] mb-4">Современная Архитектура</h3>
                <ul className="text-[#CECCC5] space-y-2 font-light">
                  <li>• Чистая архитектура с паттерном CQRS</li>
                  <li>• Принципы Domain-Driven Design</li>
                  <li>• Структура готовая к микросервисам</li>
                  <li>• Типобезопасная интеграция API</li>
                  <li>• Масштабируемый дизайн базы данных</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.div variants={itemAnimation} className="w-full max-w-7xl mx-auto px-4 mb-16" whileHover={{
      scale: 1.02
    }}>
        <div className="bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-8 overflow-hidden relative">
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F98553] mb-6">Поддержите проект</h2>
            <p className="text-[#CECCC5] text-lg max-w-2xl mb-8 font-light">Поддержите нас на GitHub или предлагайте идеи для развития продукта. </p>
            <RouterLink to="https://github.com" target="_blank">
              <motion.button className="px-8 py-3 bg-[#F98553] text-[#202020] font-bold rounded-full flex items-center gap-2 hover:bg-[#F98553]/90 transition-colors" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                Открыть на GitHub
                <FileCode size={20} />
              </motion.button>
            </RouterLink>
          </div>
        </div>
      </motion.div>
    </div>;
};
export default About;