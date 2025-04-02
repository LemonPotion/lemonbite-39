
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-muted border-b border-muted/50 relative min-h-[80px]">
      <div className="max-w-7xl mx-auto flex justify-center items-center relative">
        <div className="flex items-center space-x-3 absolute inset-x-0 flex justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground relative">
            <span className="relative inline-block">
              Lemon<span className="text-accent font-extrabold">Bite</span>
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-accent/70 to-accent"></span>
            </span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
