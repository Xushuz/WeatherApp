import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveFavorites, loadFavorites, saveSettings, loadSettings, saveLastCity, loadLastCity } from '../utils/storage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [settings, setSettings] = useState({ darkMode: false, units: 'metric' });
  const [lastCity, setLastCity] = useState('London');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const f = await loadFavorites();
        const s = await loadSettings();
        const c = await loadLastCity();
        setFavorites(f);
        setSettings(s);
        if (c) setLastCity(c);
      } catch (e) {
        console.error('Error loading data:', e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const addFavorite = async (city) => {
    if (favorites.some(f => f.toLowerCase() === city.toLowerCase())) return;
    const updated = [...favorites, city];
    setFavorites(updated);
    await saveFavorites(updated);
  };

  const removeFavorite = async (city) => {
    const updated = favorites.filter(f => f.toLowerCase() !== city.toLowerCase());
    setFavorites(updated);
    await saveFavorites(updated);
  };

  const isFavorite = (city) => favorites.some(f => f.toLowerCase() === city.toLowerCase());

  const toggleDarkMode = async () => {
    const updated = { ...settings, darkMode: !settings.darkMode };
    setSettings(updated);
    await saveSettings(updated);
  };

  const toggleUnits = async () => {
    const updated = { ...settings, units: settings.units === 'metric' ? 'imperial' : 'metric' };
    setSettings(updated);
    await saveSettings(updated);
  };

  const updateLastCity = async (city) => {
    setLastCity(city);
    await saveLastCity(city);
  };

  return (
    <AppContext.Provider value={{
      favorites, addFavorite, removeFavorite, isFavorite,
      settings, toggleDarkMode, toggleUnits,
      lastCity, updateLastCity, isLoading,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
};
