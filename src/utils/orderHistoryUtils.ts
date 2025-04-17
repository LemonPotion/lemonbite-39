
import { FoodItem } from '../context/CartContext';

export interface Order {
  id: string;
  items: {
    item: FoodItem;
    quantity: number;
  }[];
  date: string; // ISO string format
  address: string;
  phoneNumber: string;
  total: number;
}

// Save order to local storage
export const saveOrder = (order: Order): void => {
  const orders = getOrders();
  orders.push(order);
  
  localStorage.setItem('orderHistory', JSON.stringify(orders));
};

// Get all orders from local storage
export const getOrders = (): Order[] => {
  const ordersString = localStorage.getItem('orderHistory');
  if (!ordersString) return [];
  
  try {
    return JSON.parse(ordersString);
  } catch (error) {
    console.error('Error parsing orders from localStorage:', error);
    return [];
  }
};

// Get orders for a specific date
export const getOrdersByDate = (date: Date): Order[] => {
  const orders = getOrders();
  const dateStr = date.toISOString().split('T')[0]; // Get YYYY-MM-DD format
  
  return orders.filter(order => order.date.startsWith(dateStr));
};

// Get unique dates that have orders
export const getOrderDates = (): Date[] => {
  const orders = getOrders();
  
  const uniqueDates = [...new Set(orders.map(order => order.date.split('T')[0]))];
  return uniqueDates.map(dateStr => new Date(dateStr));
};

// Helper to generate a unique ID
export const generateOrderId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get orders for the current month
export const getOrdersForMonth = (month: number, year: number): Order[] => {
  const orders = getOrders();
  
  return orders.filter(order => {
    const orderDate = new Date(order.date);
    return orderDate.getMonth() === month && orderDate.getFullYear() === year;
  });
};

// Get all dates in a month that have orders
export const getOrderDatesInMonth = (month: number, year: number): number[] => {
  const orders = getOrdersForMonth(month, year);
  
  // Get unique days of the month
  const uniqueDays = [...new Set(orders.map(order => {
    const date = new Date(order.date);
    return date.getDate();
  }))];
  
  return uniqueDays;
};
