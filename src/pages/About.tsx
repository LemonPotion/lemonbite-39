
import React from "react";
import Navigation from "../components/Navigation";
import { BookOpen, Users, Heart, Code, Info, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-[#202020] dark:bg-[#202020] flex flex-col relative transition-colors duration-700">
      {/* Navigation always visible */}
      <div className="sticky top-0 z-50 bg-[#202020] px-2 pt-4">
        <Navigation />
      </div>
      {/* Main content */}
      <section className="w-full mt-10 md:mt-24 flex flex-col items-center text-[#CECCC5]">
        <div
          className="bg-[#202020] border border-[#F98553] rounded-[3rem] px-8 py-12 max-w-3xl w-[90vw] mx-auto relative shadow-lg"
        >
          <h1 className="font-playfair text-4xl md:text-6xl font-extrabold text-center leading-tight mb-5 text-[#F98553]">
            Добро пожаловать в{" "}
            <span className="relative px-2 inline-block">
              <span
                className="
                  text-[#F98553]
                  font-black
                  underline underline-offset-8 decoration-4 decoration-[#F98553]
                  "
              >
                удобную
              </span>
            </span>{" "}
            доставку
          </h1>
          <p className="mt-6 text-xl md:text-2xl font-semibold text-[#CECCC5] text-center max-w-xl mx-auto">
            Проект нового поколения, разработанный с&nbsp;
            <span className="text-[#F98553] font-bold"><Heart className="inline w-6 h-6 -mt-1" /> любовью</span>
            &nbsp;командой&nbsp;
            <span className="text-[#F98553] font-extrabold">LemonPotion</span>.
          </p>
        </div>
      </section>

      {/* Info cards section */}
      <section className="w-full flex flex-col items-center mt-12 gap-16 mb-20 max-w-4xl mx-auto text-[#CECCC5]">
        {/* Open source */}
        <div className="w-[90vw] bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7 flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md">
            <Code className="text-[#202020]" size={40} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#F98553] mb-2">Open Source, Forever</h2>
            <p className="text-lg">
              Исходный код проекта полностью открыт. Поддержите или предложите идею&nbsp;
              <a
                href="https://github.com/LemonPotion/lemonbite"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F98553] underline underline-offset-2 hover:text-[#CECCC5] ml-1"
              >на GitHub <ArrowRight className="inline w-4 h-4" /></a>
            </p>
          </div>
        </div>

        {/* Made with love */}
        <div className="w-[90vw] bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7 flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md">
            <Heart className="text-[#202020]" size={40} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#F98553] mb-2">Сделано с любовью</h2>
            <p className="text-lg">
              Каждый пиксель создан для вас: мы вкладываем тепло и энергию в каждую деталь продукта.
            </p>
          </div>
        </div>

        {/* User friendly */}
        <div className="w-[90vw] bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7 flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md">
            <Info className="text-[#202020]" size={40} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#F98553] mb-2">Удобство пользователя</h2>
            <p className="text-lg">
              Проект создан максимально удобным для всех категорий пользователей, с интуитивно понятным интерфейсом.
            </p>
          </div>
        </div>

        {/* Made by LemonPotion */}
        <div className="w-[90vw] bg-[#202020] border border-[#F98553] rounded-3xl shadow-lg p-7 flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center justify-center min-w-[4.5rem] min-h-[4.5rem] bg-[#F98553] rounded-2xl shadow-md">
            <Users className="text-[#202020]" size={40} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#F98553] mb-2">Мы — LemonPotion</h2>
            <p className="text-lg">
              Команда профессионалов IT и дизайна, которая ставит своей задачей сделать ваш опыт удобным, приятным и ярким.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

