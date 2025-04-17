
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Clock, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from './Navigation';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { items } = useCart();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const springTransition = { 
    type: "spring", 
    stiffness: 500, 
    damping: 25,
    mass: 0.35
  };
  
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-40 w-full backdrop-blur-lg bg-background/80 border-b border-border shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex h-16 items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {/* Logo - Simplified to just text */}
          <Link to="/" className="flex items-center">
            <motion.span 
              className="font-bold text-xl text-foreground"
              whileHover={{ scale: 1.02 }}
              transition={springTransition}
            >
              LemonBite
            </motion.span>
          </Link>
          
          {/* Navigation - Show full nav on desktop, dropdown on mobile */}
          {isMobile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Navigation menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem asChild>
                  <Link to="/">Меню</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/history">История заказов</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="justify-between">
                  <span>Тема</span>
                  <Switch 
                    checked={theme === 'dark'} 
                    onCheckedChange={toggleTheme} 
                    className="bg-background border-muted"
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Navigation />
          )}
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Switch - Desktop only */}
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
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    ☀️
                  </motion.div>
                </div>
              </Switch>
            </div>
            
            {/* History button - Desktop only */}
            <div className="hidden md:block">
              <Link to="/history">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full btn-pop"
                >
                  <Clock className="h-5 w-5" />
                  <span className="sr-only">История заказов</span>
                </Button>
              </Link>
            </div>

            {/* Mobile combined button for smaller screens */}
            <div className="md:hidden">
              <Link to="/history">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full btn-pop"
                >
                  <Clock className="h-5 w-5" />
                  <span className="sr-only">История заказов</span>
                </Button>
              </Link>
            </div>
            
            {/* Cart */}
            <motion.div whileTap={{ scale: 0.95 }} transition={springTransition}>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full relative btn-pop" 
                onClick={onCartClick}
              >
                <ShoppingBag className="h-5 w-5" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Badge className={`absolute -top-1 -right-1 py-0 px-1.5 h-5 min-w-[1.25rem] flex items-center justify-center ${cartItemCount > 0 ? 'badge-bounce' : ''}`}>
                    {cartItemCount}
                  </Badge>
                </motion.div>
                <span className="sr-only">Открыть корзину</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
