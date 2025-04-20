// Function to save favorites to cookies
export const saveFavoritesToCookies = (favorites: string[]): void => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30); // 30 days expiration
  
  document.cookie = `favorites=${JSON.stringify(favorites)}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
};

// Function to get favorites from cookies
export const getFavoritesFromCookies = (): string[] => {
  const cookieString = document.cookie
    .split('; ')
    .find(row => row.startsWith('favorites='));
  
  if (cookieString) {
    try {
      const favoritesValue = cookieString.split('=')[1];
      return JSON.parse(decodeURIComponent(favoritesValue));
    } catch (error) {
      console.error('Error parsing favorites from cookies:', error);
      return [];
    }
  }
  
  return [];
};

const RECENTLY_VIEWED_KEY = 'lemonbite-recently-viewed';

export const saveRecentlyViewedToCookies = (items: any[]): void => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7); // 7 days expiration
  
  document.cookie = `${RECENTLY_VIEWED_KEY}=${JSON.stringify(items)}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
};

export const getRecentlyViewedFromCookies = (): any[] => {
  const cookieString = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${RECENTLY_VIEWED_KEY}=`));
  
  if (cookieString) {
    try {
      const value = cookieString.split('=')[1];
      return JSON.parse(decodeURIComponent(value));
    } catch (error) {
      console.error('Error parsing recently viewed from cookies:', error);
      return [];
    }
  }
  
  return [];
};
