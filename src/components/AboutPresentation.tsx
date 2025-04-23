
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

  // Use glassmorphism and bold typography, images, no gradient backgrounds, just palette.
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay />
      <DialogContent
        className="bg-transparent border-0 shadow-2xl max-w-4xl w-[98vw] sm:w-[670px] rounded-3xl p-0"
        style={{ minHeight: "560px", minWidth: "340px" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full h-full"
        >
          {/* Close */}
          <div className="absolute top-5 right-5 z-10">
            <DialogClose asChild>
              <button className="rounded-full p-2 bg-white/80 dark:bg-background/80 hover:bg-primary/20 text-gray-700 dark:text-gray-200 shadow transition focus:outline-none border border-gray-200 dark:border-gray-700">
                <span className="sr-only">Закрыть</span>
                <svg width="22" height="22" viewBox="0 0 20 20"><line x1="6" y1="6" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="14" y1="6" x2="6" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </DialogClose>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between h-full p-0 pt-14 md:pt-0 pb-0 md:gap-2 gap-6">
            {/* Slide image */}
            <motion.div
              key={slide + "_img"}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.47 }}
              className="w-full md:w-1/2 flex justify-center items-center px-0 md:px-8"
              style={{ minHeight: "350px" }}
            >
              <div className="rounded-3xl overflow-hidden w-full aspect-[16/12] shadow-xl glass border-2 border-white/50 dark:border-gray-800">
                <img
                  src={slides[slide].img}
                  alt={slides[slide].title}
                  className="object-cover w-full h-full min-h-[250px] max-h-[380px] bg-white/80 dark:bg-background"
                  draggable={false}
                  loading="lazy"
                  style={{ borderRadius: "1.4rem", objectFit: "cover" }}
                />
              </div>
            </motion.div>

            {/* Slide Content */}
            <motion.div
              key={slide + "_content"}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.48 }}
              className="w-full md:w-1/2 flex flex-col justify-center items-center px-5 md:px-0"
            >
              <div
                className="glass border-2 border-white/20 dark:border-gray-800 p-8 md:p-10 flex flex-col max-w-lg w-full items-center text-center rounded-3xl shadow-2xl"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(24px)"
                }}
              >
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-primary arc-font tracking-tight leading-tight drop-shadow-sm"
                  style={{ letterSpacing: "0.02em" }}>
                  {slides[slide].title}
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-200 font-semibold mb-7 leading-relaxed"
                  style={{ lineHeight: "1.7" }}>
                  {slides[slide].description}
                </p>
                <div className="mt-2 flex gap-4 justify-center items-center">
                  <button
                    className={`rounded-full p-3 transition bg-background/80 hover:bg-accent/40 border border-gray-200 dark:border-gray-800 shadow ${
                      slide === 0 ? "opacity-60 pointer-events-none" : ""
                    }`}
                    aria-label="Предыдущий слайд"
                    disabled={slide === 0}
                    onClick={handlePrev}
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <div className="text-center text-lg font-bold text-gray-700 dark:text-gray-200 select-none tracking-tight">{slide + 1} / {slides.length}</div>
                  <button
                    className={`rounded-full p-3 transition bg-background/80 hover:bg-accent/40 border border-gray-200 dark:border-gray-800 shadow ${
                      slide === slides.length - 1 ? "opacity-60 pointer-events-none" : ""
                    }`}
                    aria-label="Следующий слайд"
                    disabled={slide === slides.length - 1}
                    onClick={handleNext}
                  >
                    <ArrowRight size={24} />
                  </button>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center mt-8 gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Перейти к слайду ${idx + 1}`}
                    className={`h-3 w-3 rounded-full transition ${
                      idx === slide
                        ? "bg-primary/80 outline outline-2 outline-primary/20"
                        : "bg-gray-300/70 dark:bg-gray-600/60"
                    }`}
                    onClick={() => setSlide(idx)}
                    style={{
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
