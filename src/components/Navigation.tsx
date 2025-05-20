
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useSearchHistory } from '../hooks/useSearchHistory';
import { Search, History, Clock, Sparkles, ChefHat, Utensils, Tag, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { saveFavoritesToCookies } from "../utils/cookieUtils";
import { toast } from "sonner";

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
    name: 'О нас',
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

// Popular ingredients for search suggestions
const popularIngredients = [
  'курица', 'говядина', 'свинина', 'рыба', 'грибы', 
  'сыр', 'томаты', 'огурцы', 'картофель', 'рис',
  'морепродукты', 'авокадо', 'шоколад', 'ягоды', 'орехи'
];

// New more stylish animations
const menuVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren"
    }
  }
};

const menuItemVariants = {
  hidden: { 
    opacity: 0, 
    y: -20,
    rotate: -5,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: {
      duration: 0.2
    }
  }
};

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const { history, addToHistory, removeFromHistory, clearHistory } = useSearchHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  
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

  // Generate search suggestions based on input
  useEffect(() => {
    if (searchQuery.length > 1) {
      // Generate ingredient-based suggestions
      const ingredientSuggestions = popularIngredients
        .filter(ingredient => ingredient.includes(searchQuery.toLowerCase()))
        .map(ingredient => `Блюда с ${ingredient}`);
      
      // Generate category-based suggestions
      const categorySuggestions = foodCategories
        .filter(category => category.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(category => `${category} кухня`);
      
      // Combine suggestions and limit to 5
      setSearchSuggestions([...ingredientSuggestions, ...categorySuggestions].slice(0, 5));
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

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
  
  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    addToHistory(suggestion);
    navigate(`/?search=${encodeURIComponent(suggestion)}`);
    setIsCommandOpen(false);
    toast.success(`Поиск по запросу: ${suggestion}`);
  };
  
  // Handle history item selection
  const handleHistorySelect = (term: string) => {
    navigate(`/?search=${encodeURIComponent(term)}`);
    setIsCommandOpen(false);
  };

  return (
    <div className="flex items-center justify-center flex-grow">
      <NavigationMenu className="hidden md:flex">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
        >
          <NavigationMenuList className="flex justify-center">
            {navigationItems.map((item, index) => (
              <motion.div 
                key={item.name} 
                variants={menuItemVariants}
                custom={index}
              >
                <NavigationMenuItem>
                  <Link
                    to={item.path}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-base font-medium relative overflow-hidden group",
                      location.pathname === item.path ? "bg-accent/50" : ""
                    )}
                  >
                    <motion.span 
                      className="z-10 relative"
                      whileHover={{ 
                        scale: 1.05, 
                        transition: { duration: 0.2 } 
                      }}
                    >{item.name}</motion.span>
                    <motion.span 
                      className="absolute inset-0 bg-accent/10 rounded-md -z-10"
                      initial={{ width: 0, opacity: 0 }}
                      whileHover={{ 
                        width: '100%', 
                        opacity: 1,
                        transition: { duration: 0.3 } 
                      }}
                    />
                  </Link>
                </NavigationMenuItem>
              </motion.div>
            ))}
            
            {/* Quick search button with animation */}
            <motion.div variants={menuItemVariants}>
              <NavigationMenuItem>
                <motion.button
                  onClick={() => setIsCommandOpen(true)}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-base font-medium gap-2 relative overflow-hidden group"
                  )}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25 
                    } 
                  }}
                  whileTap={{ 
                    scale: 0.97,
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20 
                    } 
                  }}
                >
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{
                      x: [0, -2, 3, -2, 0],
                      transition: { duration: 0.4 }
                    }}
                  >
                    <Search className="h-4 w-4" />
                    <span>Поиск</span>
                    <kbd className="ml-1 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </motion.div>
                  <motion.span 
                    className="absolute inset-0 bg-accent/10 rounded-md -z-10"
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileHover={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { duration: 0.3 } 
                    }}
                  />
                </motion.button>
              </NavigationMenuItem>
            </motion.div>
          </NavigationMenuList>
        </motion.div>
      </NavigationMenu>

      {/* Mobile menu button with animation */}
      <motion.button 
        className="md:hidden p-2 rounded-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "anticipate" }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-foreground" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <motion.path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              initial={false}
              animate={{ 
                pathLength: 1, 
                opacity: 1,
                transition: { duration: 0.3 }
              }}
            />
          </svg>
        </motion.div>
      </motion.button>

      {/* Mobile menu panel with animation */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div 
            className="absolute top-16 left-0 right-0 z-50 bg-background border-b border-border shadow-lg md:hidden"
            initial={{ 
              opacity: 0, 
              height: 0,
              clipPath: "inset(0 0 100% 0)"
            }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              clipPath: "inset(0 0 0% 0)"
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              clipPath: "inset(0 0 100% 0)"
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3
            }}
          >
            <motion.nav 
              className="px-4 py-4 space-y-3"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navigationItems.map((item, index) => (
                <motion.div 
                  key={item.name} 
                  className="space-y-2"
                  variants={menuItemVariants}
                  custom={index}
                >
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
                </motion.div>
              ))}
              <motion.div 
                className="space-y-2"
                variants={menuItemVariants}
              >
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
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Command Menu (Search) with animations */}
      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <Command onKeyDown={(e) => {
          // Submit on Enter key
          if (e.key === 'Enter' && !e.defaultPrevented) {
            handleSearch();
          }
        }}>
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <CommandInput 
              placeholder="Поиск по меню, категориям..." 
              value={searchQuery}
              onValueChange={handleSearchInput}
            />
          </motion.div>
          <CommandList>
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
            
            {/* Show search suggestions with animation */}
            <AnimatePresence>
              {searchSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <CommandGroup heading="Предлагаем поискать">
                    {searchSuggestions.map((suggestion, index) => (
                      <motion.div
                        key={`suggestion-${index}`}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <CommandItem
                          onSelect={() => handleSuggestionSelect(suggestion)}
                        >
                          <Tag className="mr-2 h-4 w-4" />
                          <span>{suggestion}</span>
                        </CommandItem>
                      </motion.div>
                    ))}
                  </CommandGroup>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Show search history with animation */}
            <AnimatePresence>
              {history.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <CommandGroup heading="История поиска">
                    {history.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <CommandHistoryItem 
                          onSelect={() => handleHistorySelect(item)}
                          onClear={() => removeFromHistory(item)}
                        >
                          {item}
                        </CommandHistoryItem>
                      </motion.div>
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
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <CommandGroup heading="Меню">
                <CommandItem onSelect={() => {
                  navigate('/');
                  setIsCommandOpen(false);
                }}>
                  <span>Главная</span>
                </CommandItem>
              </CommandGroup>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Collapsible className="w-full">
                <CollapsibleTrigger className="flex w-full items-center py-2 px-3 text-sm font-medium">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ChefHat className="h-4 w-4" />
                    <span>Категории</span>
                    <ChevronDown className="h-4 w-4 ml-auto transition-transform duration-200 ui-open:rotate-180" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                  <div className="pt-1 pb-2">
                    {foodCategories.map((category, index) => (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <CommandItem 
                          onSelect={() => handleCategorySelect(category)}
                          className="pl-9"
                        >
                          <span>{category}</span>
                        </CommandItem>
                      </motion.div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
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
            </motion.div>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};

export default Navigation;
