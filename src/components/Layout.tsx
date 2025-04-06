
import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  onCartOpen: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onCartOpen }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/50 theme-transition relative">
      {/* Corner decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 -z-10 opacity-10 dark:opacity-5">
        <div className="absolute top-5 left-5 w-10 h-10 rounded-full border-4 border-primary"></div>
        <div className="absolute top-10 left-20 w-5 h-5 rounded-full bg-accent"></div>
      </div>
      
      <div className="fixed top-0 right-0 w-32 h-32 -z-10 opacity-10 dark:opacity-5">
        <div className="absolute top-10 right-10 w-12 h-12 border-4 border-primary transform rotate-45"></div>
        <div className="absolute top-20 right-20 w-6 h-6 bg-accent transform rotate-45"></div>
      </div>
      
      <div className="fixed bottom-0 left-0 w-32 h-32 -z-10 opacity-10 dark:opacity-5">
        <div className="absolute bottom-10 left-10 w-10 h-10 rounded-full border-4 border-accent"></div>
      </div>
      
      <div className="fixed bottom-0 right-0 w-32 h-32 -z-10 opacity-10 dark:opacity-5">
        <div className="absolute bottom-10 right-15 w-8 h-8 border-4 border-accent transform rotate-45"></div>
      </div>
      
      {/* Background patterns */}
      <div className="fixed inset-0 -z-20 opacity-5 dark:opacity-10 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_10%_20%,_rgba(0,0,0,0.1)_0%,_transparent_20%)]"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_80%_50%,_rgba(0,0,0,0.05)_0%,_transparent_20%)]"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_30%_70%,_rgba(0,0,0,0.05)_0%,_transparent_30%)]"></div>
      </div>
      
      <Header onCartClick={onCartOpen} />
      
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
