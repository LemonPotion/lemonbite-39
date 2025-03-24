
import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeMessageProps {
  onContinue: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onContinue }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto relative">
      <button 
        onClick={onContinue}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <X size={18} />
      </button>
      
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">
          A fresh approach to food delivery
        </h1>
        
        <p className="text-gray-600">
          We bring chef-quality meals to your doorstep in minutes.
        </p>
        
        <Button 
          onClick={onContinue}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          Explore Menu
        </Button>
      </div>
    </div>
  );
};

export default WelcomeMessage;
