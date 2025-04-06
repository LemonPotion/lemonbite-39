
import React, { useEffect, useRef } from 'react';
import Header from './Header';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
  onCartOpen: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onCartOpen }) => {
  const { theme } = useTheme();
  const bgRef = useRef<HTMLDivElement>(null);
  
  // Effect for parallax background movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // Subtle parallax effect
      bgRef.current.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30 theme-transition relative overflow-hidden">
      {/* Enhanced Animated Shapes for Visual Interest */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-10 dark:opacity-5" ref={bgRef}>
        {/* Top left */}
        <div className="absolute top-5 left-5 w-16 h-16 rounded-full border-4 border-primary animate-float"></div>
        <div className="absolute top-20 left-24 w-8 h-8 rounded-full bg-accent/50 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-40 left-10 w-12 h-12 rounded-full bg-muted/50 animate-float" style={{ animationDelay: '1.7s' }}></div>
        
        {/* Top right */}
        <div className="absolute top-10 right-10 w-14 h-14 border-4 border-primary transform rotate-45 animate-float" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute top-24 right-24 w-8 h-8 bg-accent/50 transform rotate-45 animate-float" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute top-48 right-16 w-10 h-10 rounded-full border-2 border-muted/70 animate-float" style={{ animationDelay: '0.9s' }}></div>
        
        {/* Bottom left */}
        <div className="absolute bottom-10 left-10 w-12 h-12 rounded-full border-4 border-accent animate-float" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute bottom-24 left-24 w-6 h-6 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '0.9s' }}></div>
        <div className="absolute bottom-56 left-16 w-14 h-14 rounded-full border-2 border-accent/40 animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Bottom right */}
        <div className="absolute bottom-10 right-15 w-10 h-10 border-4 border-accent transform rotate-45 animate-float" style={{ animationDelay: '0.6s' }}></div>
        <div className="absolute bottom-24 right-24 w-5 h-5 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '1.1s' }}></div>
        <div className="absolute bottom-48 right-10 w-12 h-12 transform rotate-12 border-2 border-muted animate-float" style={{ animationDelay: '0.8s' }}></div>
        
        {/* Center floating elements */}
        <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full border border-primary/20 animate-float" style={{ animationDelay: '1.3s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-14 h-14 rounded-full border border-accent/20 animate-float" style={{ animationDelay: '0.4s' }}></div>
      </div>
      
      {/* Enhanced Dynamic Background Pattern */}
      <div className="fixed inset-0 -z-20 opacity-5 dark:opacity-10 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_10%_20%,_rgba(0,0,0,0.1)_0%,_transparent_20%)]"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_80%_50%,_rgba(0,0,0,0.05)_0%,_transparent_20%)]"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_30%_70%,_rgba(0,0,0,0.05)_0%,_transparent_30%)]"></div>
        <div className="absolute w-full h-full bg-[linear-gradient(45deg,_transparent_95%,_var(--accent-color)_100%)]" style={{'--accent-color': theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'} as React.CSSProperties}></div>
        <div className="absolute w-full h-full bg-[linear-gradient(135deg,_transparent_95%,_var(--accent-color)_100%)]" style={{'--accent-color': theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'} as React.CSSProperties}></div>
        
        {/* Additional grid pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-30 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)]" 
          style={{
            backgroundSize: '40px 40px', 
            '--grid-color': theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
          } as React.CSSProperties}>
        </div>
      </div>
      
      <Header onCartClick={onCartOpen} />
      
      <main className="flex-grow theme-transition">
        {children}
      </main>
      
      <footer className="py-6 px-6 text-center text-sm text-muted-foreground bg-muted/30 border-t border-muted theme-transition backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="group">
            © {new Date().getFullYear()} 
            <span className="inline-block transition-transform duration-300 group-hover:scale-105 mx-1 text-accent">
              LemonBite
            </span>
            . All rights reserved.
          </p>
          <div className="mt-3 sm:mt-0 flex items-center space-x-6 text-xs text-muted-foreground/70">
            <Link to="/about" className="hover:text-accent transition-all duration-300 hover:scale-105">О нас</Link>
            <span className="hover:text-accent transition-all duration-300 hover:scale-105 cursor-pointer">Контакты</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
