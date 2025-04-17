
import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-card text-card-foreground p-6 rounded-xl shadow-lg w-full max-w-md mx-4 z-50 relative animate-scale-in border border-border">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
        
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          
          <h2 className="text-2xl font-semibold mb-2 text-foreground">Спасибо за заказ :)</h2>
          <p className="text-muted-foreground mb-6">
            Мы получили ваш заказ, скоро с вами свяжется оператор для подтверждения
          </p>
          
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Заказать ещё
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
