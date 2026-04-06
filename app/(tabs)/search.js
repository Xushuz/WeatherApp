import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard,
  Alert, Image, ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../src/context/AppContext';
import { getTheme } from '../../src/utils/theme';
import { fetchCurrentWeather, getWeatherIconUrl } from '../../src/services/weatherApi';
import LoadingSpinner from '../../src/components/LoadingSpinner';

export default function SearchScreen() {
  const router = useRouter();
  const { settings, updateLastCity, addFavorite, isFavorite } = useAppContext();
  const theme = getTheme(settings.darkMode);

  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) { Alert.alert('Please enter a city name'); return; }
    Keyboard.dismiss();
    setLoading(true);
    setError(null);
    setSearchResult(null);
    try {
      const data = await fetchCurrentWeather(query.trim(), settings.units);
      setSearchResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewFull = () => {
    if (searchResult) {
      updateLastCity(searchResult.name);
      router.navigate('/');
    }
  };

  const tempUnit = settings.units === 'metric' ? '°C' : '°F';

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.searchRow}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
          placeholder="Search city..."
          placeholderTextColor={theme.textSecondary}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={[styles.searchButton, { backgroundColor: theme.primary }]} onPress={handleSearch}>
          <Ionicons name="search" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>

      {loading && <LoadingSpinner color={theme.primary} message="Searching..." />}

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={theme.accent} />
          <Text style={[styles.errorText, { color: theme.text }]}>{error}</Text>
        </View>
      )}

      {searchResult && (
        <View style={[styles.resultCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.cityName, { color: theme.text }]}>
            {searchResult.name}, {searchResult.sys.country}
          </Text>
          <View style={styles.resultRow}>
            <Image source={{ uri: getWeatherIconUrl(searchResult.weather[0].icon) }} style={styles.icon} />
            <Text style={[styles.temp, { color: theme.text }]}>
              {Math.round(searchResult.main.temp)}{tempUnit}
            </Text>
          </View>
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {searchResult.weather[0].description.charAt(0).toUpperCase() +
              searchResult.weather[0].description.slice(1)}
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.primary }]} onPress={handleViewFull}>
              <Ionicons name="eye-outline" size={18} color="#FFF" />
              <Text style={styles.actionText}>View Full Weather</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: isFavorite(searchResult.name) ? theme.accent : theme.border }]}
              onPress={() => addFavorite(searchResult.name)}
            >
              <Ionicons
                name={isFavorite(searchResult.name) ? 'heart' : 'heart-outline'}
                size={18}
                color={isFavorite(searchResult.name) ? '#FFF' : theme.text}
              />
              <Text style={[styles.actionText, { color: isFavorite(searchResult.name) ? '#FFF' : theme.text }]}>
                {isFavorite(searchResult.name) ? 'Saved' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!loading && !searchResult && !error && (
        <View style={styles.hintContainer}>
          <Ionicons name="search-outline" size={64} color={theme.border} />
          <Text style={[styles.hintText, { color: theme.textSecondary }]}>
            Search for a city to see the current weather
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16 },
  searchRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8 },
  input: { flex: 1, height: 48, borderRadius: 12, paddingHorizontal: 16, fontSize: 16, borderWidth: 1 },
  searchButton: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  resultCard: {
    margin: 16, padding: 20, borderRadius: 16, alignItems: 'center',
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4,
  },
  cityName: { fontSize: 22, fontWeight: '700' },
  resultRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  icon: { width: 80, height: 80 },
  temp: { fontSize: 40, fontWeight: '300' },
  description: { fontSize: 16, marginBottom: 16 },
  actions: { flexDirection: 'row', gap: 12 },
  actionButton: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16,
    paddingVertical: 10, borderRadius: 8, gap: 6,
  },
  actionText: { color: '#FFF', fontWeight: '600' },
  errorContainer: { alignItems: 'center', marginTop: 40 },
  errorText: { fontSize: 16, textAlign: 'center', marginTop: 12, paddingHorizontal: 32 },
  hintContainer: { alignItems: 'center', marginTop: 80 },
  hintText: { fontSize: 16, marginTop: 16, textAlign: 'center', paddingHorizontal: 32 },
});
