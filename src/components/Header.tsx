
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 bg-muted border-b border-muted/50 relative min-h-[60px]">
      <div className="max-w-7xl mx-auto flex justify-center items-center relative">
        <div className="flex items-center space-x-3 absolute inset-x-0 flex justify-center">
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground/80 relative">
            <span className="relative inline-block">
              Lemon<span className="text-accent font-bold">Bite</span>
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-accent/40 to-accent/60"></span>
            </span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
