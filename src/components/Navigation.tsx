
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

// Optimized animations with simpler variants
const menuVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

const menuItemVariants = {
  hidden: { 
    opacity: 0, 
    y: -10
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      mass: 0.5
    }
  }
};

// Optimized mobile menu variants
const mobileMenuVariants = {
  hidden: { 
    opacity: 0, 
    height: 0,
    clipPath: "inset(0 0 100% 0)"
  },
  visible: { 
    opacity: 1, 
    height: 'auto',
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.25,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    height: 0,
    clipPath: "inset(0 0 100% 0)",
    transition: {
      duration: 0.2,
      ease: "easeIn"
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
      
      // Check if search is for random dish
      if (searchQuery.toLowerCase().includes('случайное блюдо')) {
        navigate('/?random=true');
      } else {
        navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      }
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
    // Check if history term is for random dish
    if (term.toLowerCase().includes('случайное блюдо')) {
      navigate('/?random=true');
    } else {
      navigate(`/?search=${encodeURIComponent(term)}`);
    }
    setIsCommandOpen(false);
  };

  return (
    <div className="flex items-center justify-center flex-grow">
      <NavigationMenu className="hidden md:flex">
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
        >
          <NavigationMenuList className="flex justify-center">
            {navigationItems.map((item) => (
              <motion.div 
                key={item.name} 
                variants={menuItemVariants}
              >
                <NavigationMenuItem>
                  <Link
                    to={item.path}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-base font-medium relative overflow-hidden group transition-all duration-200",
                      location.pathname === item.path ? "bg-accent/50" : ""
                    )}
                  >
                    <span className="z-10 relative">{item.name}</span>
                    <span className="absolute inset-0 bg-accent/10 rounded-md -z-10 scale-0 group-hover:scale-100 transition-transform duration-200 origin-center" />
                  </Link>
                </NavigationMenuItem>
              </motion.div>
            ))}
            
            {/* Quick search button with optimized animation */}
            <motion.div variants={menuItemVariants}>
              <NavigationMenuItem>
                <button
                  onClick={() => setIsCommandOpen(true)}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-base font-medium gap-2 relative overflow-hidden group transition-all duration-200"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    <span>Поиск</span>
                    <kbd className="ml-1 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </div>
                  <span className="absolute inset-0 bg-accent/10 rounded-md -z-10 scale-0 group-hover:scale-100 transition-transform duration-200 origin-center" />
                </button>
              </NavigationMenuItem>
            </motion.div>
          </NavigationMenuList>
        </motion.div>
      </NavigationMenu>

      {/* Mobile menu button with optimized animation */}
      <button 
        className="md:hidden p-2 rounded-md focus:outline-none transition-transform duration-150 active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
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
        </motion.div>
      </button>

      {/* Mobile menu panel with optimized animation */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div 
            className="absolute top-16 left-0 right-0 z-50 bg-background border-b border-border shadow-lg md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.nav 
              className="px-4 py-4 space-y-3"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
            >
              {navigationItems.map((item) => (
                <motion.div 
                  key={item.name} 
                  variants={menuItemVariants}
                >
                  <Link 
                    to={item.path}
                    className={cn(
                      "block px-4 py-2 text-base font-medium rounded-md transition-colors duration-150",
                      location.pathname === item.path ? "bg-accent text-accent-foreground" : "hover:bg-accent/10"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={menuItemVariants}>
                <button 
                  className="w-full flex items-center justify-between px-4 py-2 text-base font-medium rounded-md hover:bg-accent/10 transition-colors duration-150"
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

      {/* Enhanced Command Menu with optimized animations */}
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
            
            {/* Show search suggestions with simplified animation */}
            <AnimatePresence>
              {searchSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <CommandGroup heading="Предлагаем поискать">
                    {searchSuggestions.map((suggestion, index) => (
                      <CommandItem
                        key={`suggestion-${index}`}
                        onSelect={() => handleSuggestionSelect(suggestion)}
                      >
                        <Tag className="mr-2 h-4 w-4" />
                        <span>{suggestion}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Show search history with simplified animation */}
            <AnimatePresence>
              {history.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
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
                </motion.div>
              )}
            </AnimatePresence>
            
            <CommandGroup heading="Меню">
              <CommandItem onSelect={() => {
                navigate('/');
                setIsCommandOpen(false);
              }}>
                <span>Главная</span>
              </CommandItem>
            </CommandGroup>
            
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
                  {foodCategories.map((category) => (
                    <CommandItem 
                      key={category}
                      onSelect={() => handleCategorySelect(category)}
                      className="pl-9"
                    >
                      <span>{category}</span>
                    </CommandItem>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
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
