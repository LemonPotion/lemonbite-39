
import React from 'react';
import { Button } from '@/components/ui/button';
import { Help, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuickSearchProps {
  onRandomItemRequest: () => void;
}

const QuickSearch: React.FC<QuickSearchProps> = ({ onRandomItemRequest }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center my-4"
    >
      <Button 
        onClick={onRandomItemRequest}
        variant="outline"
        className="group flex items-center gap-2 bg-accent/5 border-accent/20 hover:bg-accent/10 hover:border-accent/30 transition-all"
      >
        <Sparkles size={16} className="text-accent group-hover:animate-pulse" />
        <span>Я не знаю что заказать</span>
        <Help size={16} className="text-muted-foreground opacity-70" />
      </Button>
    </motion.div>
  );
};

export default QuickSearch;
