
import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeMessageProps {
  onContinue: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onContinue }) => {
  return (
    <div className="bg-blue-50 rounded-lg shadow-sm p-6 max-w-md mx-auto relative border border-blue-100">
      <button 
        onClick={onContinue}
        className="absolute top-3 right-3 text-blue-400 hover:text-blue-600 transition-colors"
        aria-label="Close"
      >
        <X size={18} />
      </button>
      
      <div className="text-center space-y-5">
        <h1 className="text-2xl font-bold text-gray-700">
          A fresh approach to food delivery
        </h1>
        
        <p className="text-gray-600">
          We bring chef-quality meals to your doorstep in minutes.
        </p>
        
        <Button 
          onClick={onContinue}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-150"
        >
          Explore Menu
        </Button>
      </div>
    </div>
  );
};

export default WelcomeMessage;
