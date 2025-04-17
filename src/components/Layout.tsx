
import React, { useEffect, useRef } from 'react';
import Header from './Header';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
  onCartOpen: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onCartOpen }) => {
  const { theme } = useTheme();
  const bgRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Enhanced parallax background movement - only on desktop
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // More pronounced parallax effect
      bgRef.current.style.transform = `translate(${x * -15}px, ${y * -15}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/30 theme-transition relative overflow-hidden">
      {/* Enhanced Animated Background Elements - reduced on mobile */}
      <div 
        className={`fixed top-0 left-0 w-full h-full -z-10 ${isMobile ? 'opacity-10 dark:opacity-5' : 'opacity-20 dark:opacity-10'}`} 
        ref={bgRef}
      >
        {/* Reduced number of shapes on mobile */}
        <div className="absolute top-5 left-5 w-20 h-20 rounded-full border-4 border-primary animate-float"></div>
        <div className={`absolute top-20 left-24 w-10 h-10 rounded-full bg-accent/50 animate-float ${isMobile ? 'hidden' : ''}`} style={{ animationDelay: '0.5s' }}></div>
        <div className={`absolute top-40 left-10 w-16 h-16 rounded-full bg-muted/70 animate-float ${isMobile ? 'hidden' : ''}`} style={{ animationDelay: '1.7s' }}></div>
        
        {/* Top right shapes */}
        <div className="absolute top-10 right-10 w-16 h-16 border-4 border-primary transform rotate-45 animate-float" style={{ animationDelay: '0.7s' }}></div>
        <div className={`absolute top-24 right-24 w-12 h-12 bg-accent/60 transform rotate-45 animate-float ${isMobile ? 'hidden' : ''}`} style={{ animationDelay: '1.2s' }}></div>
        <div className={`absolute top-48 right-16 w-14 h-14 rounded-full border-2 border-muted/70 animate-float ${isMobile ? 'hidden' : ''}`} style={{ animationDelay: '0.9s' }}></div>
        
        {/* Bottom shapes - most hidden on mobile */}
        <div className={`absolute bottom-10 left-10 w-14 h-14 rounded-full border-4 border-accent animate-float ${isMobile ? 'hidden' : ''}`} style={{ animationDelay: '0.3s' }}></div>
        <div className={`absolute bottom-24 left-24 w-8 h-8 bg-primary/70 rounded-full animate-float ${isMobile ? 'hidden' : ''}`} style={{ animationDelay: '0.9s' }}></div>
        <div className={`absolute bottom-56 left-16 w-16 h-16 rounded-full border-2 border-accent/60 animate-float ${isMobile ? 'hidden' : ''}`} style={{ animationDelay: '1.5s' }}></div>
        <div className={`absolute bottom-10 right-15 w-12 h-12 border-4 border-accent transform rotate-45 animate-float ${isMobile ? 'hidden' : ''}`} style={{ animationDelay: '0.6s' }}></div>
        
        {/* Center shapes - reduced on mobile */}
        <div className={`absolute top-1/3 left-1/4 w-20 h-20 rounded-full border border-primary/30 animate-float ${isMobile ? 'hidden' : ''}`} style={{ animationDelay: '1.3s' }}></div>
        <div className={`absolute top-2/3 right-1/3 w-16 h-16 rounded-full border border-accent/30 animate-float ${isMobile ? 'hidden' : ''}`} style={{ animationDelay: '0.4s' }}></div>
      </div>
      
      {/* Enhanced Dynamic Background Pattern - simplified for mobile */}
      <div className="fixed inset-0 -z-20 opacity-10 dark:opacity-15 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_10%_20%,_rgba(0,0,0,0.12)_0%,_transparent_20%)]"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_80%_50%,_rgba(0,0,0,0.08)_0%,_transparent_20%)]"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_30%_70%,_rgba(0,0,0,0.08)_0%,_transparent_30%)]"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_60%_30%,_rgba(0,0,0,0.06)_0%,_transparent_25%)]"></div>
        <div className="absolute w-full h-full bg-[linear-gradient(45deg,_transparent_95%,_var(--accent-color)_100%)]" style={{'--accent-color': theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'} as React.CSSProperties}></div>
        <div className="absolute w-full h-full bg-[linear-gradient(135deg,_transparent_95%,_var(--accent-color)_100%)]" style={{'--accent-color': theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'} as React.CSSProperties}></div>
        
        {/* Additional grid pattern for more texture */}
        <div className="absolute inset-0 opacity-30 dark:opacity-40 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)]" 
          style={{
            backgroundSize: '30px 30px', 
            '--grid-color': theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)'
          } as React.CSSProperties}>
        </div>
      </div>
      
      <Header onCartClick={onCartOpen} />
      
      <main className={`flex-grow theme-transition ${isMobile ? 'py-4' : ''}`}>
        {children}
      </main>
      
      <footer className={`py-4 sm:py-6 px-4 sm:px-6 text-center text-sm text-muted-foreground bg-muted/30 border-t border-muted theme-transition backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto">
          <p className="group">
            © {new Date().getFullYear()} 
            <span className="inline-block transition-transform duration-500 group-hover:scale-110 mx-1 text-accent">
              LemonBite
            </span>
            . All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
