
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Search, Command as CommandIcon } from 'lucide-react';
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
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  
  // Keyboard shortcut for command menu
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandOpen((open) => !open);
      }
    };
    
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

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
          
          {/* Quick search button */}
          <NavigationMenuItem>
            <button
              onClick={() => setIsCommandOpen(true)}
              className={cn(
                navigationMenuTriggerStyle(),
                "text-base font-medium gap-2"
              )}
            >
              <Search className="h-4 w-4" />
              <span>Поиск</span>
              <kbd className="ml-1 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </NavigationMenuItem>
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
            <div className="space-y-2">
              <button 
                className="w-full flex items-center justify-between px-4 py-2 text-base font-medium rounded-md hover:bg-accent/10"
                onClick={() => {
                  setIsCommandOpen(true);
                  setIsOpen(false);
                }}
              >
                <span>Быстрый поиск</span>
                <Search className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </motion.div>
      )}

      {/* Command Menu (Search) */}
      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <Command>
          <CommandInput placeholder="Поиск по меню..." />
          <CommandList>
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
            <CommandGroup heading="Меню">
              <CommandItem onSelect={() => {
                window.location.href = '/';
                setIsCommandOpen(false);
              }}>
                <span>Главная</span>
              </CommandItem>
              <CommandItem onSelect={() => {
                window.location.href = '/about';
                setIsCommandOpen(false);
              }}>
                <span>О сервисе</span>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Категории">
              <CommandItem>
                <span>Фаст-фуд</span>
              </CommandItem>
              <CommandItem>
                <span>Пицца</span>
              </CommandItem>
              <CommandItem>
                <span>Десерты</span>
              </CommandItem>
              <CommandItem>
                <span>Азиатская кухня</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};

export default Navigation;
