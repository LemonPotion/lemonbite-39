
import React, { useState } from 'react';
import Header from './Header';
import { Sparkles } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      {/* Easter egg animation */}
      {easterEggActive && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="animate-float text-center">
            <Sparkles className="h-20 w-20 text-blue-500 mb-4" />
            <p className="text-2xl font-bold gradient-text">Secret Discount: LEMON25</p>
          </div>
        </div>
      )}
      
      <div onClick={handleLogoClick}>
        <Header />
      </div>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="py-6 px-6 text-center text-sm text-gray-500 bg-blue-50 border-t border-blue-100">
        <p>© {new Date().getFullYear()} LemonBite. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
