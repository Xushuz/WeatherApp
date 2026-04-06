import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getWeatherIconUrl } from '../services/weatherApi';

const WeatherCard = ({ weatherData, units, theme }) => {
  if (!weatherData) return null;
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'mph';
  const iconUrl = getWeatherIconUrl(weatherData.weather[0].icon);

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <Text style={[styles.cityName, { color: theme.text }]}>
        {weatherData.name}, {weatherData.sys.country}
      </Text>
      <View style={styles.mainInfo}>
        <Image source={{ uri: iconUrl }} style={styles.icon} />
        <Text style={[styles.temperature, { color: theme.text }]}>
          {Math.round(weatherData.main.temp)}{tempUnit}
        </Text>
      </View>
      <Text style={[styles.description, { color: theme.textSecondary }]}>
        {weatherData.weather[0].description.charAt(0).toUpperCase() +
          weatherData.weather[0].description.slice(1)}
      </Text>
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Feels Like</Text>
          <Text style={[styles.detailValue, { color: theme.text }]}>
            {Math.round(weatherData.main.feels_like)}{tempUnit}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Humidity</Text>
          <Text style={[styles.detailValue, { color: theme.text }]}>
            {weatherData.main.humidity}%
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Wind</Text>
          <Text style={[styles.detailValue, { color: theme.text }]}>
            {weatherData.wind.speed} {windUnit}
          </Text>
        </View>
      </View>
      <View style={styles.minMaxRow}>
        <Text style={[styles.minMax, { color: theme.textSecondary }]}>
          ↓ {Math.round(weatherData.main.temp_min)}{tempUnit}
        </Text>
        <Text style={[styles.minMax, { color: theme.textSecondary }]}>
          ↑ {Math.round(weatherData.main.temp_max)}{tempUnit}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16, padding: 20, marginHorizontal: 16, marginTop: 16,
    alignItems: 'center', elevation: 3,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4,
  },
  cityName: { fontSize: 24, fontWeight: '700' },
  mainInfo: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  icon: { width: 100, height: 100 },
  temperature: { fontSize: 48, fontWeight: '300' },
  description: { fontSize: 18, marginBottom: 16 },
  detailsRow: {
    flexDirection: 'row', justifyContent: 'space-around', width: '100%',
    paddingTop: 16, borderTopWidth: 1, borderTopColor: '#E0E0E040',
  },
  detailItem: { alignItems: 'center' },
  detailLabel: { fontSize: 12, marginBottom: 4 },
  detailValue: { fontSize: 16, fontWeight: '600' },
  minMaxRow: { flexDirection: 'row', justifyContent: 'center', gap: 24, marginTop: 12 },
  minMax: { fontSize: 14 },
});

export default WeatherCard;
