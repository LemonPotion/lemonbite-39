
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";

interface NavigationItem {
  name: string;
  path: string;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Главная',
    path: '/'
  },
  {
    name: 'О сервисе',
    path: '/about'
  },
  {
    name: 'Меню',
    path: '#',
    children: [
      { name: 'Популярное', path: '/menu/popular' },
      { name: 'Новинки', path: '/menu/new' },
      { name: 'Скидки', path: '/menu/discounts' }
    ]
  },
  {
    name: 'Доставка',
    path: '#',
    children: [
      { name: 'Зоны доставки', path: '/delivery/zones' },
      { name: 'Стоимость', path: '/delivery/cost' }
    ]
  }
];

const Navigation = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center">
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.name}>
              {item.children ? (
                <>
                  <NavigationMenuTrigger className="text-base font-medium">
                    {item.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-2 p-4">
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={child.path}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                location.pathname === child.path ? "bg-accent/50" : ""
                              )}
                            >
                              <div className="text-sm font-medium leading-none">{child.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
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
              )}
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
                  to={item.children ? '#' : item.path}
                  className={cn(
                    "block px-4 py-2 text-base font-medium rounded-md",
                    location.pathname === item.path ? "bg-accent text-accent-foreground" : "hover:bg-accent/10"
                  )}
                  onClick={() => !item.children && setIsOpen(false)}
                >
                  {item.name}
                </Link>
                
                {item.children && (
                  <div className="ml-4 pl-2 border-l border-border space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.path}
                        className={cn(
                          "block px-4 py-2 text-sm rounded-md",
                          location.pathname === child.path ? "bg-accent text-accent-foreground" : "hover:bg-accent/10"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navigation;
