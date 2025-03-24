
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeMessageProps {
  onContinue: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onContinue }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#F6F6F7]/80 to-white/70 backdrop-blur-lg border border-white/20 rounded-2xl shadow-glass p-10 max-w-2xl mx-auto transition-all duration-300 animate-float">
      {/* Background design elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-yellow-100/50 blur-xl animate-pulse-light"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-yellow-50/50 blur-xl animate-pulse-light" style={{animationDelay: "1s"}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-yellow-200/30 blur-xl animate-pulse-light" style={{animationDelay: "0.5s"}}></div>
      </div>
      
      <div className="relative flex flex-col items-start text-left space-y-8 z-10">
        <div className="flex items-center space-x-3 animate-fade-in">
          <div className="bg-[#FFEB66] p-2 rounded-full shadow-md">
            <Sparkles className="h-5 w-5 text-[#403E43]" />
          </div>
          <span className="text-sm font-medium text-[#8A898C]">LEMONBITE</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#221F26] tracking-tight leading-tight bg-clip-text animate-fade-in" style={{animationDelay: "0.2s"}}>
          A <span className="text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">fresh</span> approach to food delivery
        </h1>
        
        <p className="text-lg text-[#555555] max-w-lg animate-fade-in" style={{animationDelay: "0.4s"}}>
          We're not just another delivery service. We're the future of how you'll experience food, 
          bringing chef-quality meals to your doorstep in minutes.
        </p>
        
        <div className="pt-4 flex items-center space-x-4 animate-fade-in" style={{animationDelay: "0.6s"}}>
          <Button 
            onClick={onContinue}
            className="px-8 py-6 bg-[#403E43]/90 backdrop-blur-sm hover:bg-[#221F26] text-white rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105 shadow-float"
          >
            Explore Menu
          </Button>
          
          <span className="text-[#8A898C] text-sm">No minimum order</span>
        </div>
        
        <div className="absolute bottom-8 right-8 transform rotate-12 opacity-20 animate-float" style={{animationDelay: "1s"}}>
          <div className="w-24 h-24 rounded-full border-8 border-yellow-200"></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
