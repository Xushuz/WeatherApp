import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../src/context/AppContext';
import { getTheme } from '../../src/utils/theme';
import { fetchCurrentWeather, getWeatherIconUrl } from '../../src/services/weatherApi';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, removeFavorite, updateLastCity, settings } = useAppContext();
  const theme = getTheme(settings.darkMode);
  const [weatherPreviews, setWeatherPreviews] = useState({});

  useEffect(() => {
    const fetchPreviews = async () => {
      const previews = {};
      for (const city of favorites) {
        try {
          const data = await fetchCurrentWeather(city, settings.units);
          previews[city] = data;
        } catch (err) {
          previews[city] = null;
        }
      }
      setWeatherPreviews(previews);
    };
    if (favorites.length > 0) fetchPreviews();
  }, [favorites, settings.units]);

  const handleCityPress = (city) => {
    updateLastCity(city);
    router.navigate('/');
  };

  const handleRemove = (city) => {
    Alert.alert('Remove Favorite', `Remove ${city} from your favorites?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeFavorite(city) },
    ]);
  };

  const tempUnit = settings.units === 'metric' ? '°C' : '°F';

  const renderItem = ({ item: city }) => {
    const preview = weatherPreviews[city];
    return (
      <TouchableOpacity style={[styles.card, { backgroundColor: theme.card }]} onPress={() => handleCityPress(city)} activeOpacity={0.7}>
        <View style={styles.cardContent}>
          {preview && preview.weather ? (
            <Image source={{ uri: getWeatherIconUrl(preview.weather[0].icon) }} style={styles.icon} />
          ) : (
            <Ionicons name="cloud-outline" size={40} color={theme.textSecondary} />
          )}
          <View style={styles.textSection}>
            <Text style={[styles.cityName, { color: theme.text }]}>{city}</Text>
            {preview && preview.main && (
              <Text style={[styles.temp, { color: theme.textSecondary }]}>
                {Math.round(preview.main.temp)}{tempUnit} · {preview.weather[0].main}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity onPress={() => handleRemove(city)} style={styles.removeBtn}>
          <Ionicons name="trash-outline" size={22} color={theme.accent} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (favorites.length === 0) {
    return (
      <View style={[styles.container, styles.emptyContainer, { backgroundColor: theme.background }]}>
        <Ionicons name="heart-outline" size={64} color={theme.border} />
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No favorite cities yet</Text>
        <Text style={[styles.emptyHint, { color: theme.textSecondary }]}>
          Search for a city and tap the heart icon to save it
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList data={favorites} keyExtractor={(item) => item} renderItem={renderItem} contentContainerStyle={styles.list} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyContainer: { justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { fontSize: 18, marginTop: 16, fontWeight: '600' },
  emptyHint: { fontSize: 14, marginTop: 8, textAlign: 'center', paddingHorizontal: 40 },
  list: { padding: 16 },
  card: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16, borderRadius: 12, marginBottom: 10,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 3,
  },
  cardContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  icon: { width: 48, height: 48 },
  textSection: { marginLeft: 12, flex: 1 },
  cityName: { fontSize: 18, fontWeight: '600' },
  temp: { fontSize: 14, marginTop: 2 },
  removeBtn: { padding: 8 },
});
