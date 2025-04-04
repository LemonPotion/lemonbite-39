
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-[#F2F0E3] border-b border-[#2E2E2E]/10 relative min-h-[60px]">
      <div className="max-w-7xl mx-auto flex justify-center items-center relative">
        <div className="flex items-center space-x-3 absolute inset-x-0 flex justify-center">
          <h1 className="text-xl sm:text-2xl font-normal tracking-tight text-[#2E2E2E]/70 relative">
            <span className="relative inline-block">
              Lemon<span className="text-[#F77A54] font-medium">Bite</span>
            </span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
