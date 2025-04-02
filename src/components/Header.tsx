
import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-blue-50 border-b border-blue-100 relative min-h-[80px]">
      <div className="max-w-7xl mx-auto flex justify-center items-center relative">
        <div className="flex items-center space-x-3 absolute inset-x-0 flex justify-center">
          <UtensilsCrossed className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-800 relative">
            <span className="relative inline-block">
              Lemon<span className="text-blue-500 font-extrabold">Bite</span>
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 to-blue-500"></span>
            </span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
