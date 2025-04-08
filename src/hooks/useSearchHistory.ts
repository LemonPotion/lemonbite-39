
import { useState, useEffect } from 'react';

const SEARCH_HISTORY_KEY = 'lemonbite-search-history';
const MAX_HISTORY_ITEMS = 5;

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse search history:', error);
        localStorage.removeItem(SEARCH_HISTORY_KEY);
      }
    }
  }, []);

  // Add a new search term to history
  const addToHistory = (term: string) => {
    if (!term.trim()) return;
    
    setHistory(prev => {
      // Remove duplicates and add new term at the beginning
      const newHistory = [
        term, 
        ...prev.filter(item => item.toLowerCase() !== term.toLowerCase())
      ].slice(0, MAX_HISTORY_ITEMS);
      
      // Save to localStorage
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  // Clear a specific item from history
  const removeFromHistory = (term: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(item => item !== term);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  // Clear all history
  const clearHistory = () => {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
    setHistory([]);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory
  };
}
