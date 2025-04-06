
import React from 'react';
import { ChefHat } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-5 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1A1F2C] to-[#2E2E2E] shadow-md relative min-h-[70px]">
      <div className="max-w-7xl mx-auto flex justify-center items-center relative">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-full shadow-lg">
            <div className="relative">
              <ChefHat size={28} className="text-[#F77A54]" />
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-serif tracking-tight text-white relative">
            <span className="relative inline-block">
              <span className="font-light italic">Lemon</span>
              <span className="text-[#F77A54] font-medium italic">Bite</span>
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#F77A54] rounded"></span>
            </span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
