
import React from 'react';
import { ChefHat, Moon, Sun, ShoppingCart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { Switch } from './ui/switch';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  
  return (
    <header className="w-full py-5 px-4 sm:px-6 lg:px-8 header-gradient shadow-md relative min-h-[70px] theme-transition">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        <div className="flex items-center space-x-3">
          <div className="bg-white dark:bg-card p-2 rounded-full shadow-lg">
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
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Sun size={18} className={`text-white transition-opacity ${theme === 'light' ? 'opacity-100' : 'opacity-50'}`} />
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
            <Moon size={18} className={`text-white transition-opacity ${theme === 'dark' ? 'opacity-100' : 'opacity-50'}`} />
          </div>
          
          <button
            onClick={onCartClick}
            className="p-2 rounded-full bg-accent text-white hover:bg-accent/90 transition-colors duration-150 relative"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-accent text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
