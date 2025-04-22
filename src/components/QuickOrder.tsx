import React, { useState, useEffect } from 'react';
import { useCart, FoodItem } from '../context/CartContext';
import { Bookmark, BookmarkCheck, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
const QuickOrder: React.FC = () => {
  const [savedOrders, setSavedOrders] = useState<{
    name: string;
    items: FoodItem[];
  }[]>([]);
  const {
    items,
    addToCart,
    clearCart
  } = useCart();
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [orderName, setOrderName] = useState('');
  useEffect(() => {
    const saved = localStorage.getItem('quickOrders');
    if (saved) {
      setSavedOrders(JSON.parse(saved));
    }
  }, []);
  const saveCurrentOrder = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty. Add items before saving an order.');
      return;
    }
    setShowSavePrompt(true);
  };
  const confirmSaveOrder = () => {
    if (!orderName.trim()) {
      toast.error('Please provide a name for your order');
      return;
    }
    const newOrder = {
      name: orderName,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description
      }))
    };
    const updatedOrders = [...savedOrders, newOrder];
    setSavedOrders(updatedOrders);
    localStorage.setItem('quickOrders', JSON.stringify(updatedOrders));
    setShowSavePrompt(false);
    setOrderName('');
    toast.success('Order saved for quick reordering!');
  };
  const loadOrder = (orderIndex: number) => {
    const orderToLoad = savedOrders[orderIndex];
    clearCart();
    orderToLoad.items.forEach(item => {
      addToCart(item);
    });
    toast.success(`"${orderToLoad.name}" loaded to your cart!`);
  };
  const deleteOrder = (orderIndex: number) => {
    const updatedOrders = savedOrders.filter((_, index) => index !== orderIndex);
    setSavedOrders(updatedOrders);
    localStorage.setItem('quickOrders', JSON.stringify(updatedOrders));
    toast.success('Order removed from saved orders');
  };
  if (savedOrders.length === 0 && !showSavePrompt) {
    return <div className="bg-white/60 rounded-lg p-4 shadow-sm border border-[#F77A54]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock size={18} className="text-[#F77A54]" />
            <h3 className="text-sm font-medium text-[#2E2E2E]">Быстрые заказы</h3>
          </div>
          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} onClick={saveCurrentOrder} className="text-xs px-3 py-1 bg-[#F77A54]/10 hover:bg-[#F77A54]/20 text-[#F77A54] rounded-full transition-colors flex items-center space-x-1">
            <Bookmark size={14} />
            <span>Сохранить текущий</span>
          </motion.button>
        </div>
        <p className="text-xs text-[#2E2E2E]/60 mt-2">Сохраняйте ваши любимые комбинации блюд</p>
      </div>;
  }
  return <div className="rounded-lg p-4 shadow-sm border border-[#F77A54]/20 bg-slate-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Clock size={18} className="text-[#F77A54]" />
          <h3 className="text-sm font-medium text-[#2E2E2E]">Быстрые заказы</h3>
        </div>
        {!showSavePrompt && <motion.button whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }} onClick={saveCurrentOrder} className="text-xs px-3 py-1 bg-[#F77A54]/10 hover:bg-[#F77A54]/20 text-[#F77A54] rounded-full transition-colors flex items-center space-x-1">
            <Bookmark size={14} />
            <span>Сохранить текущий</span>
          </motion.button>}
      </div>

      <AnimatePresence mode="wait">
        {showSavePrompt ? <motion.div initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -10
      }} className="bg-[#F2F0E3] p-3 rounded-md mb-2">
            <input type="text" placeholder="Название заказа (например, 'Семейный ужин')" value={orderName} onChange={e => setOrderName(e.target.value)} className="w-full mb-2 px-3 py-2 rounded border border-[#F77A54]/20 text-sm focus:outline-none focus:ring-1 focus:ring-[#F77A54]/50" />
            <div className="flex space-x-2">
              <motion.button whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} onClick={confirmSaveOrder} className="flex-1 text-xs px-3 py-2 bg-[#F77A54] text-white rounded-md transition-colors hover:bg-[#F77A54]/90">
                Сохранить
              </motion.button>
              <motion.button whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} onClick={() => {
            setShowSavePrompt(false);
            setOrderName('');
          }} className="flex-1 text-xs px-3 py-2 bg-gray-200 text-[#2E2E2E] rounded-md transition-colors hover:bg-gray-300">
                Отмена
              </motion.button>
            </div>
          </motion.div> : <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="space-y-2 max-h-48 overflow-y-auto">
            {savedOrders.map((order, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} className="bg-[#F2F0E3] p-2 rounded-md flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookmarkCheck size={16} className="text-[#F77A54]" />
                  <div>
                    <p className="text-sm font-medium text-[#2E2E2E]">{order.name}</p>
                    <p className="text-xs text-[#2E2E2E]/60">{order.items.length} блюд</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <motion.button whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} onClick={() => loadOrder(index)} className="text-xs px-2 py-1 bg-[#F77A54]/10 hover:bg-[#F77A54]/20 text-[#F77A54] rounded transition-colors">
                    Загрузить
                  </motion.button>
                  <motion.button whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} onClick={() => deleteOrder(index)} className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 text-[#2E2E2E] rounded transition-colors">
                    ✕
                  </motion.button>
                </div>
              </motion.div>)}
          </motion.div>}
      </AnimatePresence>
    </div>;
};
export default QuickOrder;