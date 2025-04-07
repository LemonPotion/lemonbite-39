
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";

interface NavigationItem {
  name: string;
  path: string;
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Главная',
    path: '/'
  },
  {
    name: 'О сервисе',
    path: '/about'
  }
];

const Navigation = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center flex-grow">
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="flex justify-center">
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "text-base font-medium",
                  location.pathname === item.path ? "bg-accent/50" : ""
                )}
              >
                {item.name}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile menu */}
      <button 
        className="md:hidden p-2 rounded-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-foreground" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
          />
        </svg>
      </button>

      {/* Mobile menu panel */}
      {isOpen && (
        <motion.div 
          className="absolute top-16 left-0 right-0 z-50 bg-background border-b border-border shadow-lg md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="px-4 py-4 space-y-3">
            {navigationItems.map((item) => (
              <div key={item.name} className="space-y-2">
                <Link 
                  to={item.path}
                  className={cn(
                    "block px-4 py-2 text-base font-medium rounded-md",
                    location.pathname === item.path ? "bg-accent text-accent-foreground" : "hover:bg-accent/10"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navigation;
