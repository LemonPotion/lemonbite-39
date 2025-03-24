
import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeMessageProps {
  onContinue: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onContinue }) => {
  return (
    <div className="glass-morphism rounded-2xl shadow-md p-8 max-w-2xl mx-auto relative modal-enter">
      <button 
        onClick={onContinue}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Close"
      >
        <X size={20} />
      </button>
      
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="flex items-center space-x-3">
          <div className="bg-[#FFEB66] p-2 rounded-full">
            <Sparkles className="h-5 w-5 text-[#403E43]" />
          </div>
          <span className="text-sm font-medium text-[#8A898C]">LEMONBITE</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-[#221F26] tracking-tight leading-tight">
          A <span className="text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text">fresh</span> approach to food delivery
        </h1>
        
        <p className="text-lg text-[#555555] max-w-md">
          We're not just another delivery service. We're the future of how you'll experience food, 
          bringing chef-quality meals to your doorstep in minutes.
        </p>
        
        <Button 
          onClick={onContinue}
          className="px-6 py-5 bg-[#403E43] hover:bg-[#221F26] text-white rounded-xl font-medium text-base transition-colors"
        >
          Explore Menu
        </Button>
      </div>
    </div>
  );
};

export default WelcomeMessage;
