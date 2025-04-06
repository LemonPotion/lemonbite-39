
import React from 'react';
import Header from './Header';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
  onCartOpen: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onCartOpen }) => {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30 theme-transition relative">
      {/* Animated Shapes for Visual Interest */}
      <div className="fixed top-0 left-0 w-40 h-40 -z-10 opacity-10 dark:opacity-5">
        <div className="absolute top-5 left-5 w-12 h-12 rounded-full border-4 border-primary animate-float"></div>
        <div className="absolute top-20 left-24 w-6 h-6 rounded-full bg-accent animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="fixed top-0 right-0 w-40 h-40 -z-10 opacity-10 dark:opacity-5">
        <div className="absolute top-10 right-10 w-14 h-14 border-4 border-primary transform rotate-45 animate-float" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute top-24 right-24 w-8 h-8 bg-accent transform rotate-45 animate-float" style={{ animationDelay: '1.2s' }}></div>
      </div>
      
      <div className="fixed bottom-0 left-0 w-40 h-40 -z-10 opacity-10 dark:opacity-5">
        <div className="absolute bottom-10 left-10 w-12 h-12 rounded-full border-4 border-accent animate-float" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute bottom-24 left-24 w-6 h-6 bg-primary rounded-full animate-float" style={{ animationDelay: '0.9s' }}></div>
      </div>
      
      <div className="fixed bottom-0 right-0 w-40 h-40 -z-10 opacity-10 dark:opacity-5">
        <div className="absolute bottom-10 right-15 w-10 h-10 border-4 border-accent transform rotate-45 animate-float" style={{ animationDelay: '0.6s' }}></div>
        <div className="absolute bottom-24 right-24 w-5 h-5 bg-primary rounded-full animate-float" style={{ animationDelay: '1.1s' }}></div>
      </div>
      
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 -z-20 opacity-5 dark:opacity-10 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_10%_20%,_rgba(0,0,0,0.1)_0%,_transparent_20%)]"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_80%_50%,_rgba(0,0,0,0.05)_0%,_transparent_20%)]"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_30%_70%,_rgba(0,0,0,0.05)_0%,_transparent_30%)]"></div>
        <div className="absolute w-full h-full bg-[linear-gradient(45deg,_transparent_95%,_var(--accent-color)_100%)]" style={{'--accent-color': theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'} as React.CSSProperties}></div>
        <div className="absolute w-full h-full bg-[linear-gradient(135deg,_transparent_95%,_var(--accent-color)_100%)]" style={{'--accent-color': theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'} as React.CSSProperties}></div>
      </div>
      
      <Header onCartClick={onCartOpen} />
      
      <main className="flex-grow theme-transition">
        {children}
      </main>
      
      <footer className="py-6 px-6 text-center text-sm text-muted-foreground bg-muted/30 border-t border-muted theme-transition backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} LemonBite. All rights reserved.</p>
          <div className="mt-3 sm:mt-0 flex items-center space-x-4 text-xs text-muted-foreground/70">
            <span>Контакты</span>
            <span>О нас</span>
            <span>Доставка</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
