import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  FAVORITES: '@weather_favorites',
  SETTINGS: '@weather_settings',
  LAST_CITY: '@weather_last_city',
};

export const saveFavorites = async (favorites) => {
  try { await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites)); }
  catch (e) { console.error('Error saving favorites:', e); }
};

export const loadFavorites = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch (e) { return []; }
};

export const saveSettings = async (settings) => {
  try { await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings)); }
  catch (e) { console.error('Error saving settings:', e); }
};

export const loadSettings = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : { darkMode: false, units: 'metric' };
  } catch (e) { return { darkMode: false, units: 'metric' }; }
};

export const saveLastCity = async (city) => {
  try { await AsyncStorage.setItem(STORAGE_KEYS.LAST_CITY, city); }
  catch (e) { console.error('Error saving last city:', e); }
};

export const loadLastCity = async () => {
  try { return await AsyncStorage.getItem(STORAGE_KEYS.LAST_CITY); }
  catch (e) { return null; }
};
