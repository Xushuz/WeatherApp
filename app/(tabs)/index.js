import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../src/context/AppContext';
import { getTheme } from '../../src/utils/theme';
import { fetchCurrentWeather, fetchForecast } from '../../src/services/weatherApi';
import WeatherCard from '../../src/components/WeatherCard';
import ForecastItem from '../../src/components/ForecastItem';
import LoadingSpinner from '../../src/components/LoadingSpinner';

export default function HomeScreen() {
  const { lastCity, settings, isFavorite, addFavorite, removeFavorite } = useAppContext();
  const theme = getTheme(settings.darkMode);

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadWeatherData = useCallback(async () => {
    try {
      setError(null);
      const [weather, forecastData] = await Promise.all([
        fetchCurrentWeather(lastCity, settings.units),
        fetchForecast(lastCity, settings.units),
      ]);
      setCurrentWeather(weather);
      const dailyForecast = forecastData.list.filter((item) => {
        const hour = new Date(item.dt * 1000).getHours();
        return hour >= 11 && hour <= 14;
      });
      setForecast(dailyForecast.length > 0 ? dailyForecast : forecastData.list.slice(0, 5));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [lastCity, settings.units]);

  useEffect(() => {
    setLoading(true);
    loadWeatherData();
  }, [loadWeatherData]);

  const onRefresh = () => { setRefreshing(true); loadWeatherData(); };

  const handleToggleFavorite = () => {
    if (isFavorite(lastCity)) removeFavorite(lastCity);
    else addFavorite(lastCity);
  };

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <LoadingSpinner color={theme.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.background }]}>
        <Ionicons name="cloud-offline-outline" size={64} color={theme.textSecondary} />
        <Text style={[styles.errorText, { color: theme.text }]}>{error}</Text>
        <TouchableOpacity
          style={[styles.retryButton, { backgroundColor: theme.primary }]}
          onPress={() => { setLoading(true); loadWeatherData(); }}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />}
    >
      <TouchableOpacity style={styles.favButton} onPress={handleToggleFavorite}>
        <Ionicons name={isFavorite(lastCity) ? 'heart' : 'heart-outline'} size={28} color={theme.accent} />
      </TouchableOpacity>
      <WeatherCard weatherData={currentWeather} units={settings.units} theme={theme} />
      <Text style={[styles.sectionTitle, { color: theme.text }]}>5-Day Forecast</Text>
      {forecast.map((item, index) => (
        <ForecastItem key={index} item={item} units={settings.units} theme={theme} />
      ))}
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerContent: { justifyContent: 'center', alignItems: 'center', padding: 20 },
  favButton: { alignSelf: 'flex-end', padding: 16, paddingBottom: 0 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginHorizontal: 16, marginTop: 24, marginBottom: 8 },
  errorText: { fontSize: 16, textAlign: 'center', marginTop: 16, marginBottom: 20, paddingHorizontal: 32 },
  retryButton: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  retryText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});
