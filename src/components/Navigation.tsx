
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { 
  Command, 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem,
  CommandSeparator,
  CommandHistoryItem 
} from "@/components/ui/command";
import { useSearchHistory } from '../hooks/useSearchHistory';
import { Search, History, Clock, Sparkles, ChefHat } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";
import { saveFavoritesToCookies } from "../utils/cookieUtils";

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

// Food categories for search
const foodCategories = [
  'Фаст-фуд',
  'Пицца',
  'Салаты',
  'Паста',
  'Азиатская',
  'Десерты',
  'Морепродукты',
  'Супы',
  'Мясные блюда',
  'Основные блюда'
];

// Food preferences
const foodPreferences = [
  'Вегетарианское',
  'Мясное',
  'Острое',
  'Сладкое',
  'Национальные кухни'
];

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const { history, addToHistory, removeFromHistory, clearHistory } = useSearchHistory();
  const [searchQuery, setSearchQuery] = useState('');
  
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

  // Handle food category selection
  const handleCategorySelect = (category: string) => {
    addToHistory(category);
    navigate('/?category=' + encodeURIComponent(category));
    setIsCommandOpen(false);
  };
  
  // Handle random food suggestion
  const handleRandomFood = () => {
    addToHistory('Случайное блюдо');
    navigate('/?random=true');
    setIsCommandOpen(false);
  };
  
  // Handle search input
  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
  };
  
  // Handle search execution
  const handleSearch = () => {
    if (searchQuery.trim()) {
      addToHistory(searchQuery);
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setIsCommandOpen(false);
    }
  };
  
  // Handle history item selection
  const handleHistorySelect = (term: string) => {
    navigate(`/?search=${encodeURIComponent(term)}`);
    setIsCommandOpen(false);
  };

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
          
          {/* Theme toggle - More stylish version */}
          <NavigationMenuItem>
            <Toggle 
              pressed={theme === 'dark'} 
              onPressedChange={toggleTheme}
              className={cn(
                navigationMenuTriggerStyle(),
                "text-base font-medium bg-transparent hover:bg-transparent data-[state=on]:bg-transparent"
              )}
              variant="outline"
            >
              <div className="w-10 h-5 rounded-full bg-muted relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 flex"
                  initial={false}
                  animate={{
                    x: theme === 'dark' ? 20 : 0
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="w-1/2 h-full bg-background rounded-full flex items-center justify-center shadow-md">
                    <motion.div
                      animate={{
                        scale: theme === 'dark' ? 1 : 0
                      }}
                    >
                      {theme === 'dark' ? '🌙' : ''}
                    </motion.div>
                  </div>
                  <div className="w-1/2 h-full bg-background rounded-full flex items-center justify-center shadow-md">
                    <motion.div
                      animate={{
                        scale: theme === 'light' ? 1 : 0
                      }}
                    >
                      {theme === 'light' ? '☀️' : ''}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </Toggle>
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
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-base font-medium">Тема</span>
              <div className="flex items-center space-x-2">
                {/* Mobile theme toggle */}
                <Toggle 
                  pressed={theme === 'dark'} 
                  onPressedChange={toggleTheme}
                  className="bg-transparent hover:bg-transparent data-[state=on]:bg-transparent p-1"
                  variant="outline"
                >
                  <div className="w-10 h-5 rounded-full bg-muted relative overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 flex"
                      initial={false}
                      animate={{
                        x: theme === 'dark' ? 20 : 0
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className="w-1/2 h-full bg-background rounded-full flex items-center justify-center shadow-md">
                        <motion.div
                          animate={{
                            scale: theme === 'dark' ? 1 : 0
                          }}
                        >
                          {theme === 'dark' ? '🌙' : ''}
                        </motion.div>
                      </div>
                      <div className="w-1/2 h-full bg-background rounded-full flex items-center justify-center shadow-md">
                        <motion.div
                          animate={{
                            scale: theme === 'light' ? 1 : 0
                          }}
                        >
                          {theme === 'light' ? '☀️' : ''}
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </Toggle>
              </div>
            </div>
          </nav>
        </motion.div>
      )}

      {/* Enhanced Command Menu (Search) */}
      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <Command onKeyDown={(e) => {
          // Submit on Enter key
          if (e.key === 'Enter' && !e.defaultPrevented) {
            handleSearch();
          }
        }}>
          <CommandInput 
            placeholder="Поиск по меню, категориям..." 
            value={searchQuery}
            onValueChange={handleSearchInput}
          />
          <CommandList>
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
            
            {/* Show search history if exists */}
            {history.length > 0 && (
              <>
                <CommandGroup heading="История поиска">
                  {history.map((item) => (
                    <CommandHistoryItem 
                      key={item} 
                      onSelect={() => handleHistorySelect(item)}
                      onClear={() => removeFromHistory(item)}
                    >
                      {item}
                    </CommandHistoryItem>
                  ))}
                  {history.length > 1 && (
                    <CommandItem 
                      onSelect={clearHistory}
                      className="justify-end text-sm text-muted-foreground hover:text-foreground"
                    >
                      Очистить историю
                    </CommandItem>
                  )}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}
            
            <CommandGroup heading="Меню">
              <CommandItem onSelect={() => {
                navigate('/');
                setIsCommandOpen(false);
              }}>
                <span>Главная</span>
              </CommandItem>
              <CommandItem onSelect={() => {
                navigate('/about');
                setIsCommandOpen(false);
              }}>
                <span>О сервисе</span>
              </CommandItem>
            </CommandGroup>
            
            <CommandGroup heading="Категории">
              {foodCategories.map((category) => (
                <CommandItem 
                  key={category}
                  onSelect={() => handleCategorySelect(category)}
                >
                  <ChefHat className="mr-2 h-4 w-4" />
                  <span>{category}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            
            <CommandGroup heading="Дополнительно">
              <CommandItem onSelect={handleRandomFood}>
                <Sparkles className="mr-2 h-4 w-4" />
                <span>Я не знаю что заказать</span>
              </CommandItem>
              <CommandItem onSelect={() => {
                navigate('/?recently=true');
                setIsCommandOpen(false);
              }}>
                <Clock className="mr-2 h-4 w-4" />
                <span>Недавно просмотренные</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};

export default Navigation;
