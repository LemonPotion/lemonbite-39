
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
