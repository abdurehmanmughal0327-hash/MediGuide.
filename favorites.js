import { getStoredItem, setStoredItem } from './utils.js';

const favoritesKey = 'mediwise-favorites';

function initFavorites() {
  const clearButton = document.getElementById('clearFavoritesButton');
  if (!clearButton) return;
  clearButton.addEventListener('click', () => {
    setStoredItem(favoritesKey, []);
    window.location.reload();
  });
}

initFavorites();
