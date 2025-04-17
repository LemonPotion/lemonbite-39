
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

type NavigationProps = {
  orientation?: 'horizontal' | 'vertical';
};

const Navigation: React.FC<NavigationProps> = ({ orientation = 'horizontal' }) => {
  const isVertical = orientation === 'vertical';
  
  return (
    <nav className={cn(
      isVertical ? "flex flex-col space-y-4" : "hidden md:flex items-center space-x-6"
    )}>
      <Link 
        to="/" 
        className={cn(
          "text-foreground/80 hover:text-foreground text-sm font-medium transition-colors",
          isVertical && "text-base py-2"
        )}
      >
        Главная
      </Link>
      <Link 
        to="/menu" 
        className={cn(
          "text-foreground/80 hover:text-foreground text-sm font-medium transition-colors",
          isVertical && "text-base py-2"
        )}
      >
        Меню
      </Link>
      <Link 
        to="/about" 
        className={cn(
          "text-foreground/80 hover:text-foreground text-sm font-medium transition-colors",
          isVertical && "text-base py-2"
        )}
      >
        О нас
      </Link>
      <Link 
        to="/contact" 
        className={cn(
          "text-foreground/80 hover:text-foreground text-sm font-medium transition-colors",
          isVertical && "text-base py-2"
        )}
      >
        Контакты
      </Link>
    </nav>
  );
};

export default Navigation;
