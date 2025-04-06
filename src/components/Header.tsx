
import React, { useState, useEffect } from 'react';
import { ChefHat, Moon, Sun, ShoppingCart, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { Switch } from './ui/switch';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Listen for scroll to add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`sticky top-0 z-40 w-full py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-md transition-all duration-300 theme-transition ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        <div className="flex items-center space-x-3 group">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-accent/10 dark:bg-accent/20 p-2 rounded-full shadow-sm transition-transform duration-300 group-hover:rotate-12">
              <div className="relative">
                <ChefHat size={26} className="text-accent transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-serif tracking-tight text-foreground relative transition-all duration-300 group-hover:translate-x-1">
              <span className="relative inline-block">
                <span className="font-light italic">Lemon</span>
                <span className="text-accent font-medium italic">Bite</span>
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent rounded opacity-60 transition-all duration-300 group-hover:h-[3px] group-hover:opacity-100"></span>
              </span>
            </h1>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground/80 hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full">
            Меню
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full">
            О нас
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Sun size={16} className={`text-foreground/70 transition-opacity ${theme === 'light' ? 'opacity-100' : 'opacity-50'}`} />
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-accent"
            />
            <Moon size={16} className={`text-foreground/70 transition-opacity ${theme === 'dark' ? 'opacity-100' : 'opacity-50'}`} />
          </div>
          
          <button
            onClick={onCartClick}
            className="p-2 rounded-full bg-accent text-white hover:bg-accent/90 transition-all duration-300 relative shadow-sm hover:shadow-md hover:-translate-y-0.5"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm border border-white/10 dark:border-black/10 animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-foreground/80 hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} className="animate-fade-in" /> : <Menu size={20} className="animate-fade-in" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg animate-fade-in py-4">
          <nav className="flex flex-col space-y-4 px-6">
            <Link to="/" className="text-foreground/80 hover:text-accent transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
              Меню
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-accent transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
              О нас
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
