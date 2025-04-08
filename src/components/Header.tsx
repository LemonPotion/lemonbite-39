
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '../context/ThemeContext';
import Navigation from './Navigation';
import { Switch } from '@/components/ui/switch';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-background/80 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Text only */}
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-foreground">emonBite</span>
          </Link>
          
          {/* Navigation */}
          <Navigation />
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Light</span>
              <Switch 
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                aria-label="Toggle theme"
              />
              <span className="text-sm text-muted-foreground">Dark</span>
            </div>
            
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
