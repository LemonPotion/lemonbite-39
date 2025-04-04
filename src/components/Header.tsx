
import React from 'react';
import { LemonIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-[#F2F0E3] border-b border-[#2E2E2E]/10 relative min-h-[60px]">
      <div className="max-w-7xl mx-auto flex justify-center items-center relative">
        <div className="flex items-center space-x-3 absolute inset-x-0 flex justify-center">
          <h1 className="text-2xl sm:text-3xl font-serif tracking-tight text-[#2E2E2E] relative">
            <span className="relative inline-block">
              <span className="font-light italic">Lemon</span>
              <span className="text-[#F77A54] font-medium italic">Bite</span>
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#F77A54]/30 rounded"></span>
            </span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
