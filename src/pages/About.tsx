
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

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const techStacks = {
    backend: [
      { name: "ASP.NET Core", description: "Modern, cross-platform web framework", icon: <Server className="text-[#202020]" size={40} /> },
      { name: "Entity Framework Core", description: "Modern ORM for .NET", icon: <Database className="text-[#202020]" size={40} /> },
      { name: ".NET 8", description: "Latest .NET platform", icon: <Code className="text-[#202020]" size={40} /> },
      { name: "PostgreSQL", description: "Advanced open-source database", icon: <Database className="text-[#202020]" size={40} /> },
      { name: "MediatR", description: "CQRS pattern implementation", icon: <Layers className="text-[#202020]" size={40} /> },
      { name: "AutoMapper", description: "Object-object mapping solution", icon: <FileCode className="text-[#202020]" size={40} /> }
    ],
    frontend: [
      { name: "React 18", description: "Modern UI library", icon: <Laptop className="text-[#202020]" size={40} /> },
      { name: "TypeScript", description: "Typed JavaScript", icon: <Terminal className="text-[#202020]" size={40} /> },
      { name: "Tailwind CSS", description: "Utility-first CSS framework", icon: <FileCode className="text-[#202020]" size={40} /> },
      { name: "React Query", description: "Data-fetching library", icon: <Link className="text-[#202020]" size={40} /> },
      { name: "Framer Motion", description: "Animation library", icon: <ChartBar className="text-[#202020]" size={40} /> },
      { name: "shadcn/ui", description: "UI component library", icon: <Layers className="text-[#202020]" size={40} /> }
    ]
  };

  return (
    <div className="min-h-screen bg-[#202020] flex flex-col relative">
      <div className="sticky top-0 z-50 bg-[#202020] px-2 pt-4 border-b border-[#F98553]/20">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full px-4">
          <Navigation />
        </div>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="relative w-full mt-10 md:mt-24 flex flex-col items-center text-[#CECCC5] overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-[#202020] border border-[#F98553] rounded-[3rem] px-8 py-12 max-w-4xl w-[90vw] mx-auto relative">
          <motion.h1 
            className="font-playfair text-4xl md:text-6xl font-extrabold text-center leading-tight mb-5 text-[#F98553]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Open Source Full-Stack Template
          </motion.h1>
          <motion.p 
            className="mt-6 text-xl md:text-2xl text-[#CECCC5] text-center max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            A modern, high-performance web application template built with .NET 8 and React
          </motion.p>
        </div>
      </motion.section>

      {/* Backend Stack Section */}
      <motion.section 
        className="w-full flex flex-col items-center gap-8 my-16 max-w-7xl mx-auto px-4"
        variants={containerAnimation}
        initial="hidden"
        animate="show"
      >
        <h2 className="text-3xl font-bold text-[#F98553] mb-8">Backend Technologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {techStacks.backend.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={itemAnimation}
              className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7 transition-transform duration-300 hover:scale-105"
              whileHover={{
                boxShadow: "0 10px 25px -5px rgba(249, 133, 83, 0.2)",
                borderColor: "#F98553"
              }}
            >
              <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md mb-4">
                {tech.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#F98553] mb-2">{tech.name}</h3>
              <p className="text-[#CECCC5]">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Frontend Stack Section */}
      <motion.section 
        className="w-full flex flex-col items-center gap-8 my-16 max-w-7xl mx-auto px-4"
        variants={containerAnimation}
        initial="hidden"
        animate="show"
      >
        <h2 className="text-3xl font-bold text-[#F98553] mb-8">Frontend Technologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {techStacks.frontend.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={itemAnimation}
              className="w-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7 transition-transform duration-300 hover:scale-105"
              whileHover={{
                boxShadow: "0 10px 25px -5px rgba(249, 133, 83, 0.2)",
                borderColor: "#F98553"
              }}
            >
              <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md mb-4">
                {tech.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#F98553] mb-2">{tech.name}</h3>
              <p className="text-[#CECCC5]">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="w-full flex flex-col items-center gap-8 my-16 max-w-7xl mx-auto px-4"
        variants={containerAnimation}
        initial="hidden"
        animate="show"
      >
        <h2 className="text-3xl font-bold text-[#F98553] mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <motion.div
            variants={itemAnimation}
            className="col-span-full bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center justify-center min-w-[6rem] min-h-[6rem] bg-[#F98553] rounded-2xl shadow-md">
                <Code className="text-[#202020]" size={48} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#F98553] mb-4">Modern Architecture</h3>
                <ul className="text-[#CECCC5] space-y-2">
                  <li>• Clean Architecture with CQRS pattern</li>
                  <li>• Domain-Driven Design principles</li>
                  <li>• Microservices-ready structure</li>
                  <li>• Type-safe API integration</li>
                  <li>• Scalable database design</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.div
        variants={itemAnimation}
        className="w-full max-w-7xl mx-auto px-4 mb-16"
      >
        <div className="bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-8 overflow-hidden relative">
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F98553] mb-6">Start Building Today</h2>
            <p className="text-[#CECCC5] text-lg max-w-2xl mb-8">
              Explore our open-source template and create modern, scalable web applications with industry best practices.
            </p>
            <RouterLink to="https://github.com" target="_blank">
              <motion.button
                className="px-8 py-3 bg-[#F98553] text-[#202020] font-bold rounded-full flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View on GitHub
                <FileCode size={20} />
              </motion.button>
            </RouterLink>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
