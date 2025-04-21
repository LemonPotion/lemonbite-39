
import React from "react";
import Navigation from "../components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-[#f6f7fa] via-[#e7e9ff] to-[#dbf6e9] dark:from-background dark:via-muted dark:to-background transition-colors duration-700">
      {/* Navigation bar at the top */}
      <div className="absolute top-0 left-0 w-full z-30">
        <Navigation />
      </div>
      {/* Main Card */}
      <div
        className="
          relative z-10 mt-32 md:mt-40 px-8 py-10 md:px-16 md:py-14 
          rounded-3xl glass-morphism bg-white/40 dark:bg-background/50 
          shadow-2xl border border-white/20 backdrop-blur-2xl 
          flex flex-col items-center max-w-2xl w-full
        "
        style={{
          boxShadow: "0 8px 40px 0 rgba(80, 90, 150, 0.13), 0 2px 8px 0 rgba(40, 70, 110, 0.12)"
        }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold font-playfair text-center mb-7 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-br from-accent via-primary to-foreground">
          Добро пожаловать в{" "}
          <span className="relative text-black dark:text-white px-2 inline-block">
            <span
              className="
                bg-gradient-to-br from-yellow-300 via-pink-300 to-sky-300 
                text-transparent bg-clip-text
                underline underline-offset-4 decoration-[6px] decoration-pink-200 decoration-wavy
                font-black
              "
            >
              удобную
            </span>
          </span>{" "}
          доставку
        </h1>
        <ul className="mt-6 space-y-4 text-lg md:text-2xl font-semibold text-foreground text-center">
          <li>
            <span className="px-3 py-1 rounded-xl bg-white/60 dark:bg-muted/60 shadow-sm inline-block font-bold text-accent drop-shadow-md">Проект с открытым исходным кодом</span>
          </li>
          <li>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white/60 dark:bg-muted/60 shadow-sm">
              Сделано с&nbsp;<span className="text-pink-500 text-2xl">♥</span>&nbsp;от LemonPotion
            </span>
          </li>
          <li>
            <span className="px-3 py-1 rounded-xl bg-white/60 dark:bg-muted/60 shadow-sm inline-block">
              Проект создан для максимального удобства пользователя
            </span>
          </li>
        </ul>
      </div>
      {/* Decorative background blobs for glassy effect */}
      <div className="pointer-events-none absolute inset-0 w-full h-full z-0">
        <div className="absolute -top-16 left-1/4 w-72 h-72 bg-gradient-to-br from-pink-200 via-yellow-100 to-cyan-100 opacity-60 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-sky-200 via-purple-100 to-pink-100 opacity-70 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-52 h-52 bg-gradient-to-br from-yellow-200 via-pink-100 to-accent opacity-60 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default About;
