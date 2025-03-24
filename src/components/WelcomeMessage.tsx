
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeMessageProps {
  onContinue: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onContinue }) => {
  return (
    <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-md p-8 max-w-2xl mx-auto">
      <div className="relative flex flex-col items-start text-left space-y-6 z-10">
        <div className="flex items-center space-x-3">
          <div className="bg-[#FFEB66] p-2 rounded-full">
            <Sparkles className="h-5 w-5 text-[#403E43]" />
          </div>
          <span className="text-sm font-medium text-[#8A898C]">LEMONBITE</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#221F26] tracking-tight leading-tight">
          A <span className="text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text">fresh</span> approach to food delivery
        </h1>
        
        <p className="text-lg text-[#555555] max-w-lg">
          We're not just another delivery service. We're the future of how you'll experience food, 
          bringing chef-quality meals to your doorstep in minutes.
        </p>
        
        <div className="pt-4 flex items-center space-x-4">
          <Button 
            onClick={onContinue}
            className="px-8 py-6 bg-[#403E43] hover:bg-[#221F26] text-white rounded-xl font-medium text-lg transition-colors"
          >
            Explore Menu
          </Button>
          
          <span className="text-[#8A898C] text-sm">No minimum order</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
