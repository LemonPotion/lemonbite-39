
import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 relative min-h-[80px]">
      <div className="max-w-7xl mx-auto flex justify-center items-center relative">
        <div className="flex items-center space-x-3 absolute inset-x-0 flex justify-center">
          <UtensilsCrossed className="h-8 w-8 text-yellow-500" />
          <h1 className="text-2xl font-semibold">LemonBite</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
