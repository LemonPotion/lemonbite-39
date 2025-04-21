
import React from "react";
import { Users, Star, Heart, Info } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// Team structure for illustration
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
  {
    icon: <Star className="text-yellow-400 w-7 h-7 drop-shadow-glow" />,
    title: "Инновации",
    desc: "Мы внедряем технологии, чтобы сделать заказ максимально удобным."
  },
  {
    icon: <Heart className="text-pink-400 w-7 h-7 drop-shadow-glow" />,
    title: "Честность",
    desc: "Открытость и честность — основа всего, что мы делаем."
  },
  {
    icon: <Users className="text-sky-400 w-7 h-7 drop-shadow-glow" />,
    title: "Скорость",
    desc: "Ваш заказ доставляется быстрее, чем вы успеете подумать."
  },
];

const About = () => {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen flex flex-col justify-center pt-12 pb-20 bg-gradient-to-br from-[#fdfcfb] via-[#faf6f2] to-[#e2d1c3] dark:from-background dark:via-muted dark:to-background transition-colors duration-700">
      <div className="max-w-4xl mx-auto px-4 w-full flex flex-col gap-7 sm:gap-10 z-10">
        <div
          className="relative px-8 py-12 md:px-24 rounded-[2.5rem] overflow-hidden glass-morphism shadow-2xl border border-white/10 transition-all animate-fade-in"
          style={{
            background: theme === 'dark'
              ? "radial-gradient(circle at 60% 30%,rgba(100,108,255,0.12) 0%,transparent 110%)"
              : "radial-gradient(ellipse 65% 50% at 65% 20%,rgba(255,255,255,0.25) 0%,transparent 90%)"
          }}
        >
          {/* Glowing shape top left */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-[#efd5ff] via-[#f9e9ae]/60 to-transparent rounded-full blur-2xl opacity-60 pointer-events-none"></div>
          {/* Glowing shape bottom right */}
          <div className="absolute -bottom-16 -right-10 w-52 h-52 bg-gradient-to-br from-[#ace0f9] via-[#fffbe9]/70 to-transparent rounded-full blur-2xl opacity-60 pointer-events-none"></div>
          {/* Headline */}
          <div className="flex justify-center mb-2">
            <Info className="w-10 h-10 text-foreground/70 drop-shadow-xl" />
          </div>
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-br from-accent to-foreground tracking-tight text-center leading-tight animate-fade-in">
            О <span className="text-primary">LemonBite</span>
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-center text-muted-foreground font-medium max-w-2xl mx-auto animate-fade-in">
            <span className="font-bold text-accent text-gradient">Мы создаём еду будущего — быстро, удобно и с улыбкой!</span>
            <br />
            LemonBite — команда единомышленников, кто превращает каждый ваш заказ в радость и комфорт.
          </p>
          {/* Values cards */}
          <div className="flex flex-wrap gap-6 justify-center items-center mt-10 animate-fade-in">
            {values.map((value, idx) => (
              <div
                key={value.title}
                className={`rounded-3xl px-6 py-7 bg-white/35 dark:bg-card/60 glass-morphism 
                shadow-lg hover:shadow-2xl border border-muted/30 group
                backdrop-blur-lg min-w-[190px] flex flex-col items-center transition-all duration-200 hover:scale-105`}
              >
                <div className="mb-2">{value.icon}</div>
                <div className="text-lg font-bold text-foreground drop-shadow">{value.title}</div>
                <div className="text-sm mt-1 text-muted-foreground text-center">{value.desc}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Team section */}
        <section className="py-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center font-playfair text-foreground mb-10 tracking-tight drop-shadow-md animate-fade-in">
            Команда мечтателей <span className="text-primary">LemonBite</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center bg-white/40 dark:bg-card/70 glass-morphism rounded-[1.5rem] p-6 shadow-xl border border-muted/30 min-w-[210px] max-w-xs hover:scale-105 transition-transform animate-enter"
              >
                <img
                  className="w-24 h-24 object-cover rounded-full border-4 border-accent/30 mb-3 shadow-lg"
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                />
                <div className="text-xl font-semibold text-foreground/90 mb-1">{member.name}</div>
                <div className="text-base font-medium text-primary mb-2">{member.role}</div>
                <p className="text-xs text-muted-foreground text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* Decorative blurred shapes */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-0 -translate-y-24 opacity-50">
        <div className="absolute -top-12 -left-20 w-48 h-48 bg-gradient-to-br from-yellow-200/70 via-pink-100/40 to-accent/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 right-20 w-72 h-72 bg-gradient-to-br from-accent/40 via-sky-100/60 to-white/20 rounded-full blur-2xl"></div>
      </div>
      <footer className="mt-16 text-center text-muted-foreground/60 text-xs z-[1]">
        LemonBite — делаем каждый заказ чуточку особенным 🌟
      </footer>
    </div>
  );
};

export default About;
