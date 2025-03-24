
import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 relative min-h-[80px]">
      <div className="max-w-7xl mx-auto flex justify-center items-center relative">
        <div className="flex items-center space-x-3 absolute inset-x-0 flex justify-center">
          <UtensilsCrossed className="h-8 w-8 text-yellow-500" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 relative">
            <span className="relative inline-block">
              Lemon<span className="text-yellow-500 font-extrabold">Bite</span>
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-500"></span>
            </span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
