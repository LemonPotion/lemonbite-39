
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
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Search, HelpCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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

// Food recommendation options
const moodBasedRecommendations = [
  { mood: 'Хочу что-то сытное', foods: ['Бургер', 'Пицца', 'Стейк', 'Паста'] },
  { mood: 'Хочу что-то легкое', foods: ['Салат', 'Суп', 'Овощи'] },
  { mood: 'Что-то сладкое', foods: ['Торт', 'Тирамису', 'Чизкейк'] },
  { mood: 'Что-то необычное', foods: ['Суши', 'Том Ям', 'Хачапури', 'Паэлья'] },
  { mood: 'Что-то острое', foods: ['Том Ям', 'Азиатская кухня'] },
  { mood: 'Быстрый перекус', foods: ['Фалафель', 'Бургер', 'Пицца'] }
];

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isRecommenderOpen, setIsRecommenderOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [recommendedFood, setRecommendedFood] = useState<string | null>(null);
  
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

  const handleFoodCategorySelect = (category: string) => {
    setIsCommandOpen(false);
    // We would navigate to the homepage and filter by this category
    navigate('/?category=' + encodeURIComponent(category));
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    const selectedMoodOption = moodBasedRecommendations.find(m => m.mood === mood);
    if (selectedMoodOption) {
      const randomIndex = Math.floor(Math.random() * selectedMoodOption.foods.length);
      setRecommendedFood(selectedMoodOption.foods[randomIndex]);
    }
  };

  const resetRecommendation = () => {
    setSelectedMood(null);
    setRecommendedFood(null);
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
                  location.pathname === item.path ? "bg-accent/50 text-accent-foreground" : ""
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

          {/* Food recommender button */}
          <NavigationMenuItem>
            <button
              onClick={() => setIsRecommenderOpen(true)}
              className={cn(
                navigationMenuTriggerStyle(),
                "text-base font-medium gap-2"
              )}
            >
              <HelpCircle className="h-4 w-4" />
              <span>Я не знаю что заказать</span>
            </button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile menu button */}
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
            <div className="space-y-2">
              <button 
                className="w-full flex items-center justify-between px-4 py-2 text-base font-medium rounded-md hover:bg-accent/10"
                onClick={() => {
                  setIsRecommenderOpen(true);
                  setIsOpen(false);
                }}
              >
                <span>Я не знаю что заказать</span>
                <HelpCircle className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </motion.div>
      )}

      {/* Enhanced Command Menu (Search) with Food Categories */}
      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <Command>
          <CommandInput placeholder="Поиск по меню и категориям блюд..." />
          <CommandList>
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
            <CommandGroup heading="Страницы">
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
            <CommandGroup heading="Категории блюд">
              {foodCategories.map((category) => (
                <CommandItem 
                  key={category}
                  onSelect={() => handleFoodCategorySelect(category)}
                >
                  <span>{category}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>

      {/* Food Recommender Dialog */}
      <Dialog open={isRecommenderOpen} onOpenChange={setIsRecommenderOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Помощь с выбором</DialogTitle>
            <DialogDescription>
              Не знаете, что заказать? Мы поможем вам выбрать!
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col space-y-4 py-4">
            {!selectedMood ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {moodBasedRecommendations.map((option) => (
                  <Button 
                    key={option.mood}
                    variant="outline"
                    className="h-auto py-3 justify-start text-left"
                    onClick={() => handleMoodSelect(option.mood)}
                  >
                    <span>{option.mood}</span>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <h3 className="text-lg font-medium">Вы выбрали: {selectedMood}</h3>
                
                <div className="bg-muted/50 rounded-lg p-6 my-4">
                  <p className="text-muted-foreground mb-2">Рекомендуем вам попробовать:</p>
                  <p className="text-2xl font-bold text-accent">{recommendedFood}</p>
                </div>
                
                <div className="flex space-x-3 justify-center mt-4">
                  <Button onClick={resetRecommendation} variant="outline">
                    Другой вариант
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsRecommenderOpen(false);
                      // Navigate to home with search for this food
                      if (recommendedFood) {
                        navigate('/?search=' + encodeURIComponent(recommendedFood));
                      }
                    }}
                  >
                    Найти блюдо
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Navigation;
