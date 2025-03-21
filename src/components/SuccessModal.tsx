
import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-40" onClick={onClose}></div>
      
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-4 z-50 relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
        
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-semibold mb-2">Спасибо за заказ :)</h2>
          <p className="text-gray-600 mb-6">
            Мы получили ваш заказ, скоро с вами свяжется оператор для подтверждения
          </p>
          
          <button
            onClick={onClose}
            className="w-full py-3 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors"
          >
            Заказать ещё
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
