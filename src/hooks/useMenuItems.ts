
import { useQuery } from '@tanstack/react-query';
import { ApiMenuItem, FoodItem } from '../types/api';

const fetchMenuItems = async (): Promise<ApiMenuItem[]> => {
  const response = await fetch('http://localhost:5058/api/v1/Dish/all');
  if (!response.ok) {
    throw new Error('Failed to fetch menu items');
  }
  return response.json();
};

const transformApiMenuItem = (apiItem: ApiMenuItem): FoodItem => {
  return {
    id: apiItem.Id,
    name: apiItem.Name,
    price: apiItem.Price,
    image: apiItem.ImageUrl,
    description: apiItem.Description,
    calories: apiItem.Calories,
    prepTime: apiItem.MinutesToPrepare,
    category: apiItem.FoodCategory,
  };
};

export const useMenuItems = () => {
  return useQuery({
    queryKey: ['menuItems'],
    queryFn: fetchMenuItems,
    select: (data: ApiMenuItem[]) => data.map(transformApiMenuItem),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
  });
};
