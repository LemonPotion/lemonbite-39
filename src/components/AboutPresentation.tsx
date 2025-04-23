
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogClose
} from "../components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../components/ui/carousel";
import { Code, Database, Laptop, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const slides = [
  {
    title: "Открытый исходный код",
    description: "Это приложение полностью открыто и может быть улучшено вами! Присоединяйтесь к сообществу.",
    icon: <Sparkles size={40} className="text-primary" />,
    bg: "linear-gradient(135deg, #ece9ff 0%, #f3fff4 100%)"
  },
  {
    title: "Современные технологии",
    description: "Используем React, .NET 8, анимации, TypeScript, свежий стек и только лучшие решения.",
    icon: <Laptop size={40} className="text-primary" />,
    bg: "linear-gradient(111.4deg, #EE7171 1%, #F6D794 58%)"
  },
  {
    title: "Реактивность и плавность",
    description: "Эффекты навигации и мгновенный отклик на действия пользователя.",
    icon: <Code size={40} className="text-primary" />,
    bg: "linear-gradient(109.6deg, #DFEAF7 11.2%, #F4F8FC 91.1%)"
  },
  {
    title: "Сильная база данных",
    description: "Надежный backend на PostgreSQL и ASP.NET Core для ваших данных.",
    icon: <Database size={40} className="text-primary" />,
    bg: "linear-gradient(90deg, #89f7fe 0%, #66a6ff 100%)"
  },
  {
    title: "Стильно и современно",
    description: "Минималистичный дизайн, вдохновленный современными веб-сервисами.",
    icon: <Sparkles size={40} className="text-primary" />,
    bg: "linear-gradient(90deg, #ffdde1 0%, #ee9ca7 100%)"
  }
];

interface AboutPresentationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AboutPresentation({ open, onOpenChange }: AboutPresentationProps) {
  const [slide, setSlide] = useState(0);

  const handleNext = () => {
    if (slide < slides.length - 1) setSlide(slide + 1);
  };
  const handlePrev = () => {
    if (slide > 0) setSlide(slide - 1);
  };

  // "Arc browser" like transitions - soft glassy, rounded, a bit poppy, lots of space
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay />
      <DialogContent className="bg-transparent border-0 shadow-2xl max-w-2xl rounded-3xl p-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full h-full"
          style={{ minHeight: "430px", minWidth: "350px" }}
        >
          <div className="absolute top-4 right-4 z-10">
            <DialogClose asChild>
              <button className="rounded-full p-2 bg-white/90 hover:bg-primary/20 text-gray-600 shadow transition">
                <span className="sr-only">Закрыть</span>
                <svg width="20" height="20" viewBox="0 0 20 20"><line x1="6" y1="6" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="14" y1="6" x2="6" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </DialogClose>
          </div>
          <div className="flex flex-col items-center justify-between h-full pt-10 pb-2 relative">
            <motion.div
              key={slide}
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div
                className="rounded-3xl p-10 flex flex-col max-w-lg mx-auto items-center text-center shadow-xl transition-all duration-400"
                style={{
                  background: slides[slide].bg,
                  boxShadow: "0 8px 36px rgba(0,0,0,0.09), 0 1.5px 12px rgba(80,51,165,0.04)"
                }}
              >
                <div className="mb-6 animate-fade-in">
                  <div className="rounded-full flex items-center justify-center w-20 h-20 bg-white/95 shadow-lg mx-auto mb-1">
                    {slides[slide].icon}
                  </div>
                </div>
                <h2 className="text-3xl font-extrabold mb-3 text-gray-800 arc-font transition-all animate-fade-in">
                  {slides[slide].title}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300/80 font-medium animate-fade-in" style={{ lineHeight: "1.7" }}>
                  {slides[slide].description}
                </p>
                <div className="mt-8 flex gap-4 justify-center items-center">
                  <button
                    className={`rounded-full p-3 transition bg-white/70 hover:bg-primary/10 border border-gray-200 shadow ${slide === 0 ? "opacity-60 pointer-events-none" : ""}`}
                    aria-label="Предыдущий слайд"
                    disabled={slide === 0}
                    onClick={handlePrev}
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <div className="text-center font-semibold text-gray-600 select-none">{slide + 1} / {slides.length}</div>
                  <button
                    className={`rounded-full p-3 transition bg-white/70 hover:bg-primary/10 border border-gray-200 shadow ${slide === slides.length - 1 ? "opacity-60 pointer-events-none" : ""}`}
                    aria-label="Следующий слайд"
                    disabled={slide === slides.length - 1}
                    onClick={handleNext}
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
            <div className="flex justify-center mt-6 gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${idx === slide ? "bg-primary/80" : "bg-gray-300/60"}`}
                  onClick={() => setSlide(idx)}
                  style={{ boxShadow: idx === slide ? "0 0 0 4px #9b87f520" : undefined }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
