
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeMessageProps {
  onContinue: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onContinue }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#F6F6F7] to-white rounded-2xl shadow-lg p-10 max-w-2xl mx-auto">
      {/* Background design elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-yellow-100 opacity-50 blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-yellow-50 opacity-50 blur-xl"></div>
      </div>
      
      <div className="relative flex flex-col items-start text-left space-y-8 z-10">
        <div className="flex items-center space-x-3">
          <div className="bg-[#FFEB66] p-2 rounded-full">
            <Sparkles className="h-5 w-5 text-[#403E43]" />
          </div>
          <span className="text-sm font-medium text-[#8A898C]">LEMONBITE</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold text-[#221F26] tracking-tight leading-tight">
          A <span className="text-yellow-500">fresh</span> approach to food delivery
        </h1>
        
        <p className="text-lg text-[#555555] max-w-lg">
          We're not just another delivery service. We're the future of how you'll experience food, 
          bringing chef-quality meals to your doorstep in minutes.
        </p>
        
        <div className="pt-4 flex items-center space-x-4">
          <Button 
            onClick={onContinue}
            className="px-8 py-6 bg-[#403E43] hover:bg-[#221F26] text-white rounded-xl font-medium text-lg transition-all duration-200"
          >
            Explore Menu
          </Button>
          
          <span className="text-[#8A898C] text-sm">No minimum order</span>
        </div>
        
        <div className="absolute bottom-8 right-8 transform rotate-12 opacity-20">
          <div className="w-24 h-24 rounded-full border-8 border-yellow-200"></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
