
export interface ApiMenuItem {
  Name: string;
  Price: number;
  Description: string;
  ImageUrl: string;
  Calories: number;
  MinutesToPrepare: number;
  FoodCategory: number;
  Id: string;
}

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  calories?: number;
  prepTime?: number;
  category?: number;
}
