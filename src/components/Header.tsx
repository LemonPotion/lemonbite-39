
import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '../context/ThemeContext';
import Navigation from './Navigation';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-background/80 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8 overflow-hidden">
              <div className="absolute w-full h-full flex items-center justify-center">
                <div className="text-2xl font-bold text-accent">L</div>
              </div>
              <svg className="w-full h-full absolute top-0 left-0" viewBox="0 0 40 40">
                <circle 
                  cx="20" 
                  cy="20" 
                  r="16" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className="text-accent/30"
                />
                <circle 
                  cx="20" 
                  cy="20" 
                  r="16" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3"
                  strokeDasharray="100"
                  strokeDashoffset="75"
                  className="text-accent"
                />
              </svg>
            </div>
            <span className="font-bold text-xl text-foreground">LemonBite</span>
          </Link>
          
          {/* Navigation */}
          <Navigation />
          
          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="rounded-full"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full relative" 
              onClick={onCartClick}
            >
              <ShoppingBag className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 py-0 px-1.5 h-5 min-w-[1.25rem] flex items-center justify-center">
                3
              </Badge>
              <span className="sr-only">Open cart</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
