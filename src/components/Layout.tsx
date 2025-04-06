
import React, { useState } from 'react';
import Header from './Header';
import { Sparkles } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onCartOpen: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onCartOpen }) => {
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= 5) {
      setEasterEggActive(true);
      setTimeout(() => {
        setEasterEggActive(false);
        setClickCount(0);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/50 theme-transition">
      {/* Easter egg animation */}
      {easterEggActive && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="animate-float text-center">
            <Sparkles className="h-20 w-20 text-accent mb-4" />
            <p className="text-2xl font-bold text-accent">Secret Discount: LEMON25</p>
          </div>
        </div>
      )}
      
      <div onClick={handleLogoClick}>
        <Header onCartClick={onCartOpen} />
      </div>
      
      <main className="flex-grow theme-transition">
        {children}
      </main>
      
      <footer className="py-6 px-6 text-center text-sm text-muted-foreground bg-muted/50 border-t border-muted theme-transition">
        <p>© {new Date().getFullYear()} LemonBite. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
