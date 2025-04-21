
import React from "react";
import { useTheme } from "../context/ThemeContext";

const team = [
  {
    name: "Анна Смирнова",
    role: "CEO & Ко-основатель",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=facearea&w=256&q=80",
    bio: "Вдохновляет команду создавать сервис будущего."
  },
  {
    name: "Максим Иванов",
    role: "CTO & Архитектор",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=facearea&w=256&q=80",
    bio: "Любит масштабировать технологии ради ваших вкусных впечатлений."
  },
  {
    name: "Екатерина Попова",
    role: "Дизайнер продукта",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=facearea&w=256&q=80",
    bio: "Добавляет уют и стиль всему, что мы делаем."
  },
];

const values = [
  { icon: "💡", title: "Инновации", desc: "Мы внедряем технологии, чтобы сделать заказ максимально удобным." },
  { icon: "🤝", title: "Честность", desc: "Открытость и честность — основа всего, что мы делаем." },
  { icon: "🚀", title: "Скорость", desc: "Ваш заказ доставляется быстрее, чем вы успеете подумать." },
];

const About = () => {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen px-2 py-12 bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3] dark:from-background dark:to-muted relative flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full mx-auto text-center mb-12 p-8 rounded-3xl glass-morphism shadow-lg border border-muted/40 relative overflow-hidden">
        <div className="absolute hidden md:block w-80 h-80 bg-[radial-gradient(circle,rgba(247,122,84,0.12)_50%,transparent_100%)] top-0 -left-20 z-0 pointer-events-none" />
        <div className="absolute hidden md:block w-80 h-80 bg-[radial-gradient(circle,rgba(232,210,170,0.15)_70%,transparent_100%)] bottom-0 -right-20 z-0 pointer-events-none" />
        <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-foreground mb-4 z-10 relative">
          О нас
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-6 z-10 relative">
          LemonBite — это команда мечтателей, объединённых страстью к технологиям и гастрономии.
          Мы верим, что доставка еды может быть <span className="font-semibold text-accent">волшебной, быстрой</span> и приносить радость каждую минуту.
        </p>
        <div className="flex justify-center gap-4 mt-2 z-10 relative">
          {values.map((value, idx) => (
            <div key={value.title} className="bg-white/60 dark:bg-card/70 backdrop-blur-sm rounded-2xl px-5 py-4 flex flex-col items-center shadow hover:shadow-md transition-shadow w-32">
              <span className="text-2xl mb-1">{value.icon}</span>
              <div className="text-base font-semibold text-foreground">{value.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{value.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-6 font-playfair text-foreground">Команда</h2>
      <div className="max-w-5xl w-full flex flex-col md:flex-row justify-center gap-6 px-4 z-10 relative">
        {team.map(member => (
          <div key={member.name} className="flex flex-col items-center bg-white/80 dark:bg-card/80 glass-morphism p-6 rounded-2xl shadow-md border border-muted/40 w-full md:w-1/3 min-w-[220px] hover:shadow-lg transition-shadow">
            <img src={member.image} alt={member.name} className="w-24 h-24 object-cover rounded-full mb-3 shadow-md border-2 border-accent/30" />
            <div className="text-lg font-medium text-foreground">{member.name}</div>
            <div className="text-sm text-accent mb-1">{member.role}</div>
            <div className="text-xs text-muted-foreground">{member.bio}</div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12 text-muted-foreground/60 text-xs">LemonBite — мы всегда с вами, чтобы сделать каждый заказ чуточку особенным.</div>
    </div>
  );
};

export default About;
