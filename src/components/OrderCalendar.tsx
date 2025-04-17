
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DayCell from './DayCell';
import { Order, getOrdersForMonth } from '../utils/orderHistoryUtils';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

const OrderCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const { addItem } = useCart();
  const isMobile = useIsMobile();

  // Load orders for the current month
  React.useEffect(() => {
    const ordersForMonth = getOrdersForMonth(currentMonth, currentYear);
    setOrders(ordersForMonth);
  }, [currentMonth, currentYear]);

  const handlePrevMonth = () => {
    setSelectedDay(null);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    setSelectedDay(null);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day: number) => {
    if (selectedDay === day) {
      setSelectedDay(null);
    } else {
      setSelectedDay(day);
    }
  };

  // Get orders for the selected day
  const selectedDayOrders = selectedDay
    ? orders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate.getDate() === selectedDay;
      })
    : [];

  // Generate days for the current month
  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    // Adjust for Sunday as first day (0)
    const startDayIndex = firstDay === 0 ? 6 : firstDay - 1;
    
    const days = [];
    
    // Previous month days
    for (let i = startDayIndex - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        orders: []
      });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate.getDate() === day;
      });
      
      days.push({
        day,
        isCurrentMonth: true,
        orders: dayOrders
      });
    }
    
    // Next month days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows of 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        orders: []
      });
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const handleAddItemToCart = (item: any, quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      addItem(item);
    }
    
    toast.success(`${item.name} добавлен в корзину`, {
      position: "bottom-center",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            История заказов
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevMonth}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Предыдущий месяц</span>
            </Button>
            <span className="text-sm font-medium min-w-[100px] text-center">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextMonth}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Следующий месяц</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Day names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <DayCell
              key={`${day.day}-${index}`}
              day={day.day}
              orders={day.orders}
              isCurrentMonth={day.isCurrentMonth}
              onDayClick={handleDayClick}
              isSelected={selectedDay === day.day && day.isCurrentMonth}
            />
          ))}
        </div>
        
        {/* Selected day orders */}
        <AnimatePresence>
          {selectedDay && selectedDayOrders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 border-t pt-4"
            >
              <h3 className="text-md font-medium mb-2">
                Заказы на {selectedDay} {monthNames[currentMonth]}:
              </h3>
              <ScrollArea className={`pr-4 ${isMobile ? 'h-[300px]' : 'max-h-[400px]'}`}>
                {selectedDayOrders.map(order => (
                  <Card key={order.id} className="mb-4">
                    <CardHeader className="py-3 px-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm">
                          {new Date(order.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </CardTitle>
                        <span className="text-sm font-medium">₽{order.total}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="space-y-2">
                        {order.items.map(({ item, quantity }) => (
                          <div key={`${order.id}-${item.id}`} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded overflow-hidden">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-xs text-muted-foreground">₽{item.price} × {quantity}</p>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="h-8"
                              onClick={() => handleAddItemToCart(item, quantity)}
                            >
                              <ShoppingBag className="h-3.5 w-3.5 mr-1" />
                              В корзину
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </motion.div>
          )}
          
          {selectedDay && selectedDayOrders.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-center py-10 border-t"
            >
              <p className="text-muted-foreground">Нет заказов на эту дату</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Empty state when no orders for the month */}
        {orders.length === 0 && (
          <div className="text-center py-10 mt-4 border-t">
            <p className="text-muted-foreground">
              Нет заказов за {monthNames[currentMonth]} {currentYear}
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                const today = new Date();
                setCurrentMonth(today.getMonth());
                setCurrentYear(today.getFullYear());
              }}
            >
              Вернуться к текущему месяцу
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCalendar;
