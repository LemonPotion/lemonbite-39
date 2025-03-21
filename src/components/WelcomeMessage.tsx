
import React from 'react';
import { Smile } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeMessageProps {
  onContinue: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onContinue }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto animate-fade-in">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="bg-yellow-100 p-4 rounded-full">
          <Smile className="h-12 w-12 text-yellow-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900">Welcome to LemonBite!</h1>
        
        <p className="text-xl text-gray-700 font-medium">
          Experience the <span className="text-yellow-500 font-bold">fastest food delivery</span> in town.
          Our chefs prepare your meals with love, and we guarantee delivery in under 30 minutes.
        </p>
        
        <Button 
          onClick={onContinue}
          className="mt-6 px-8 py-6 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-bold text-lg"
        >
          Explore Our Menu
        </Button>
      </div>
    </div>
  );
};

export default WelcomeMessage;
