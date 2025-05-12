
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from './Navigation';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

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
          
          {/* Navigation - Hide on mobile */}
          <div className="hidden md:block">
            <Navigation />
          </div>
          
          {/* Mobile Navigation */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">Menu</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">{theme === 'dark' ? 'Dark' : 'Light'}</span>
                        <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto py-4">
                    <nav className="flex flex-col space-y-1 px-2">
                      <Link to="/" className="px-3 py-2 rounded-md hover:bg-muted transition-colors">
                        Home
                      </Link>
                      <Link to="/about" className="px-3 py-2 rounded-md hover:bg-muted transition-colors">
                        About
                      </Link>
                      <Link to="/quick-orders" className="px-3 py-2 rounded-md hover:bg-muted transition-colors">
                        Quick Orders
                      </Link>
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Switch - Hide on mobile */}
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
                <span className="sr-only">Open cart</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
