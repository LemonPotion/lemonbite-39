
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogClose
} from "../components/ui/dialog";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

// Choose 5 images for slides
const slideImages = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80", // slide 1
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80", // slide 2
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80", // slide 3
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80", // slide 4
  "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&q=80", // slide 5
];

const slides = [
  {
    title: "Открытый исходный код",
    description: "Это приложение полностью открыто и может быть улучшено вами! Присоединяйтесь к сообществу.",
    img: slideImages[0]
  },
  {
    title: "Современные технологии",
    description: "Используем React, .NET 8, анимации, TypeScript, свежий стек и только лучшие решения.",
    img: slideImages[1]
  },
  {
    title: "Реактивность и плавность",
    description: "Эффекты навигации и мгновенный отклик на действия пользователя.",
    img: slideImages[2]
  },
  {
    title: "Сильная база данных",
    description: "Надежный backend на PostgreSQL и ASP.NET Core для ваших данных.",
    img: slideImages[3]
  },
  {
    title: "Стильно и современно",
    description: "Минималистичный дизайн, вдохновленный современными веб-сервисами.",
    img: slideImages[4]
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay />
      <DialogContent
        className="
          bg-white/85 dark:bg-[#23202eF5] border-0 shadow-[0_8px_64px_rgba(40,16,80,0.10),0_2px_8px_rgba(43,39,84,0.08)] 
          max-w-[900px] md:max-w-[1050px] w-[98vw] rounded-[2.5rem] p-0 overflow-visible
        "
        style={{ minHeight: "680px", minWidth: "370px" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full h-full"
        >
          {/* Accent Stripe at Top */}
          <div className="absolute left-0 top-0 w-full h-3 bg-primary/60 rounded-t-[2.5rem] pointer-events-none z-10"></div>
          {/* Close */}
          <div className="absolute top-7 right-7 z-20">
            <DialogClose asChild>
              <button className="rounded-full p-2 bg-white/90 dark:bg-background/80 hover:bg-accent/10 text-gray-700 dark:text-gray-200 shadow-lg transition border-2 border-gray-200 dark:border-gray-800 focus:outline-none">
                <span className="sr-only">Закрыть</span>
                <svg width="26" height="26" viewBox="0 0 20 20"><line x1="6" y1="6" x2="14" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><line x1="14" y1="6" x2="6" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </button>
            </DialogClose>
          </div>

          <div className="flex flex-col md:flex-row items-stretch justify-between h-full p-0 pt-12 md:pt-0 pb-0 md:gap-2 gap-6">
            {/* Slide image */}
            <motion.div
              key={slide + "_img"}
              initial={{ opacity: 0, scale: 1.08, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.47 }}
              className="w-full md:w-1/2 flex justify-center items-center px-0 md:px-14"
              style={{ minHeight: "430px" }}
            >
              <div className="rounded-[2rem] overflow-hidden w-full aspect-[16/11] shadow-2xl border-[3.5px] border-primary/20 bg-background/60">
                <img
                  src={slides[slide].img}
                  alt={slides[slide].title}
                  className="object-cover w-full h-full min-h-[300px] max-h-[430px] bg-white/85 dark:bg-background image-fade-in"
                  draggable={false}
                  loading="lazy"
                  style={{ borderRadius: "2rem", objectFit: "cover" }}
                />
              </div>
            </motion.div>

            {/* Slide Content */}
            <motion.div
              key={slide + "_content"}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48 }}
              className="w-full md:w-1/2 flex flex-col justify-center items-center px-5 md:px-0"
            >
              <div
                className="
                  glass border-[2.5px] border-primary/10 p-7 md:p-12 flex flex-col max-w-lg w-full items-center text-center rounded-[2.2rem] shadow-2xl 
                  bg-white/96 dark:bg-[#22202B]/90 backdrop-blur-2xl
                "
                style={{
                  backdropFilter: "blur(36px)",
                }}
              >
                <h2 className="text-[2.5rem] sm:text-[3.7rem] font-extrabold leading-tight mb-8 text-primary arc-font tracking-tight drop-shadow-2xl"
                  style={{ letterSpacing: "0.016em", fontWeight: 900, lineHeight: "1.1" }}>
                  {slides[slide].title}
                </h2>
                <p className="text-2xl text-gray-700 dark:text-gray-300 font-bold mb-9 leading-normal"
                  style={{ lineHeight: "1.65" }}>
                  {slides[slide].description}
                </p>
                <div className="mt-2 flex gap-6 justify-center items-center">
                  <button
                    className={`rounded-full p-4 transition bg-background/90 hover:bg-accent/40 border-2 border-gray-200 dark:border-gray-800 shadow-md text-2xl ${
                      slide === 0 ? "opacity-50 pointer-events-none" : ""
                    }`}
                    aria-label="Предыдущий слайд"
                    disabled={slide === 0}
                    onClick={handlePrev}
                  >
                    <ArrowLeft size={29} />
                  </button>
                  <div className="text-center text-xl font-extrabold text-gray-700 dark:text-gray-200 select-none tracking-tight shadow-sm px-3 py-1 bg-primary/10 rounded-xl">
                    {slide + 1} <span className="font-semibold text-lg opacity-70">/ {slides.length}</span>
                  </div>
                  <button
                    className={`rounded-full p-4 transition bg-background/90 hover:bg-accent/40 border-2 border-gray-200 dark:border-gray-800 shadow-md text-2xl ${
                      slide === slides.length - 1 ? "opacity-50 pointer-events-none" : ""
                    }`}
                    aria-label="Следующий слайд"
                    disabled={slide === slides.length - 1}
                    onClick={handleNext}
                  >
                    <ArrowRight size={29} />
                  </button>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center mt-10 gap-4">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Перейти к слайду ${idx + 1}`}
                    className={`h-5 w-5 rounded-full ring-2 ring-primary/15 ring-offset-2 transition-all border-2 shadow-sm ${
                      idx === slide
                        ? "bg-primary outline outline-2 outline-primary/20 ring-primary/50 scale-110"
                        : "bg-gray-200/70 dark:bg-gray-800/80"
                    }`}
                    onClick={() => setSlide(idx)}
                    style={{
                      transition: "background 0.3s, transform 0.2s",
                      boxShadow: idx === slide ? "0 0 0 5px #9b87f520" : undefined
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
