
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from './Navigation';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { items } = useCart();
  const { theme, toggleTheme } = useTheme();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-background/80 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Simplified to just text */}
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-foreground">LemonBite</span>
          </Link>
          
          {/* Navigation */}
          <Navigation />
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Switch */}
            <div className="hidden md:flex items-center gap-2">
              <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={toggleTheme} 
                className="bg-background border-muted"
              >
                <div className="w-full h-full relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 flex justify-center items-center"
                    initial={false}
                    animate={{
                      opacity: theme === 'dark' ? 1 : 0,
                      scale: theme === 'dark' ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    🌙
                  </motion.div>
                  <motion.div 
                    className="absolute inset-0 flex justify-center items-center"
                    initial={false}
                    animate={{
                      opacity: theme === 'light' ? 1 : 0,
                      scale: theme === 'light' ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    ☀️
                  </motion.div>
                </div>
              </Switch>
            </div>
            
            {/* Cart */}
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full relative" 
              onClick={onCartClick}
            >
              <ShoppingBag className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 py-0 px-1.5 h-5 min-w-[1.25rem] flex items-center justify-center">
                {cartItemCount}
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
