
import React from "react";
import Navigation from "../components/Navigation";
import { BookOpen, Users, Heart, Code, Info, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#ece9fa] to-[#d9ecf5] dark:from-background dark:via-muted dark:to-background flex flex-col relative transition-colors duration-700">
      {/* Navigation always visible */}
      <div className="sticky top-0 z-50 bg-transparent px-2 pt-4">
        <Navigation />
      </div>
      {/* Fancy glassy header */}
      <section className="w-full mt-10 md:mt-24 flex flex-col items-center">
        <div
          className="backdrop-blur-2xl bg-white/60 dark:bg-background/70 border border-white/10 shadow-2xl rounded-[3rem] px-8 py-12 max-w-3xl w-[90vw] mx-auto glass-morphism relative"
        >
          <h1 className="font-playfair text-4xl md:text-6xl font-extrabold text-center leading-tight mb-5 text-transparent bg-clip-text bg-gradient-to-br from-[#414dff] via-[#ff7eca] to-[#32d8a2] drop-shadow-lg">
            Добро пожаловать в{" "}
            <span className="relative px-2 inline-block">
              <span
                className="
                  bg-gradient-to-br from-yellow-400 via-pink-400 to-teal-400
                  text-transparent bg-clip-text
                  underline underline-offset-8 decoration-8 decoration-pink-200 decoration-wavy
                  font-black
                  drop-shadow"
              >
                удобную
              </span>
            </span>{" "}
            доставку
          </h1>
          <p className="mt-6 text-xl md:text-2xl font-semibold text-neutral-700 dark:text-muted-foreground text-center max-w-xl mx-auto">
            Проект нового поколения, разработанный с&nbsp;
            <span className="text-pink-600 font-bold"><Heart className="inline w-6 h-6 -mt-1" /> любовью</span>
            &nbsp;командой&nbsp;
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] text-transparent bg-clip-text font-extrabold">LemonPotion</span>.
          </p>
        </div>
      </section>

      {/* Main info glass cards section */}
      <section className="w-full flex flex-col items-center mt-12 gap-14 mb-20">
        {/* Open source */}
        <div className="w-[90vw] max-w-4xl flex flex-col md:flex-row gap-6 bg-white/40 dark:bg-muted/70 glass-morphism rounded-3xl shadow-xl p-7 border border-white/20 backdrop-blur-2xl">
          <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-gradient-to-br from-blue-400 via-indigo-200 to-purple-300 rounded-2xl shadow-md">
            <Code className="text-[#221F26] dark:text-[#fff]" size={40} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-2">Open Source, Forever</h2>
            <p className="text-lg text-neutral-700 dark:text-muted-foreground mb-2">
              Исходный код проекта полностью открыт. Поддержите или предложите идею&nbsp;
              <a
                href="https://github.com/LemonPotion/lemonbite"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-accent ml-1"
              >на GitHub <ArrowRight className="inline w-4 h-4" /></a>
            </p>
            <span className="inline-block mt-1 px-3 py-1 rounded-lg bg-gradient-to-br from-sky-200 to-lime-100 text-xs font-bold tracking-wide text-[#221F26] uppercase shadow-sm">
              OpenSource
            </span>
          </div>
        </div>

        {/* Mission */}
        <div className="w-[90vw] max-w-4xl flex flex-col md:flex-row gap-6 bg-white/50 dark:bg-background/60 glass-morphism rounded-3xl shadow-xl p-7 border border-white/20 backdrop-blur-2xl">
          <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-gradient-to-br from-fuchsia-300 to-yellow-200 rounded-2xl shadow-md">
            <Info className="text-[#221F26] dark:text-[#fff]" size={40} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-2">Наша миссия</h2>
            <p className="text-lg text-neutral-700 dark:text-muted-foreground">
              Создать сервис, который станет по-настоящему удобным для каждого пользователя —
              независимо от его опыта, возраста и привычек.
            </p>
          </div>
        </div>

        {/* User-centric */}
        <div className="w-[90vw] max-w-4xl flex flex-col md:flex-row gap-6 bg-white/40 dark:bg-muted/60 glass-morphism rounded-3xl shadow-xl p-7 border border-white/20 backdrop-blur-2xl">
          <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-gradient-to-br from-green-200 via-sky-100 to-teal-100 rounded-2xl shadow-md">
            <BookOpen className="text-[#221F26] dark:text-[#fff]" size={40} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-2">
              Простой и удобный интерфейс
            </h2>
            <p className="text-lg text-neutral-700 dark:text-muted-foreground">
              Мы уделяем особое внимание дизайну — чтобы даже сложные задачи выполнялись легко и приятно.
            </p>
          </div>
        </div>

        {/* Creators */}
        <div className="w-[90vw] max-w-4xl flex flex-col md:flex-row gap-6 bg-white/40 dark:bg-muted/60 glass-morphism rounded-3xl shadow-xl p-7 border border-white/20 backdrop-blur-2xl">
          <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-gradient-to-br from-pink-300 via-yellow-200 to-purple-100 rounded-2xl shadow-md">
            <Users className="text-[#221F26] dark:text-[#fff]" size={40} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-2">Кто мы?</h2>
            <p className="text-lg text-neutral-700 dark:text-muted-foreground">
              Мы — команда <span className="font-bold text-pink-700 dark:text-pink-300">LemonPotion</span>, профессионалы IT и цифрового дизайна, которые искренне верят, что технологии могут делать вашу жизнь проще и ярче.
            </p>
          </div>
        </div>

        {/* Philoshopy */}
        <div className="w-[90vw] max-w-4xl flex flex-col md:flex-row gap-6 bg-white/45 dark:bg-muted/60 glass-morphism rounded-3xl shadow-xl p-7 border border-white/20 backdrop-blur-2xl">
          <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-gradient-to-br from-purple-300 via-green-100 to-yellow-100 rounded-2xl shadow-md">
            <Heart className="text-[#c53030] dark:text-[#ff5e99]" size={40} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-2">Сделано с любовью</h2>
            <p className="text-lg text-neutral-700 dark:text-muted-foreground">
              Каждый пиксель создан для вас: мы вкладываем тепло и энергию в каждую деталь продукта.
            </p>
          </div>
        </div>
      </section>

      {/* Beautiful call-to-action/final card */}
      <section className="w-full flex flex-col items-center my-12 md:my-16">
        <div className="w-[90vw] max-w-3xl px-7 py-12 rounded-3xl shadow-2xl bg-gradient-to-br from-white/70 via-pink-100/60 to-lime-100/80 dark:from-muted dark:via-background/70 dark:to-background/85 glass-morphism border border-white/20 backdrop-blur-2xl flex flex-col items-center">
          <h3 className="font-playfair text-2xl md:text-4xl font-bold text-center mb-3 bg-gradient-to-r from-[#0047FF] to-[#DB0088] bg-clip-text text-transparent">
            Присоединяйтесь к нам и помогайте делать сервис лучше!
          </h3>
          <a
            href="https://github.com/LemonPotion/lemonbite"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 font-semibold uppercase text-neutral-900 dark:text-neutral-50 shadow-lg backdrop-blur-2xl transition"
          >
            <Code className="w-5 h-5" />
            Github
          </a>
        </div>
      </section>

      {/* Subtle glassmorphism gradient background blobs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-[#f5d7ff] to-[#dbf6e9] opacity-40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-12rem] right-0 w-[28rem] h-[28rem] bg-gradient-to-tl from-[#dbd8fc] to-[#fffceb] opacity-40 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/5 w-80 h-80 bg-gradient-to-br from-yellow-200 via-pink-100 to-[#b0ebaf] opacity-40 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default About;
