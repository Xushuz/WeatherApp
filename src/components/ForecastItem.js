import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getWeatherIconUrl } from '../services/weatherApi';

const ForecastItem = ({ item, units, theme }) => {
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const date = new Date(item.dt * 1000);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const iconUrl = getWeatherIconUrl(item.weather[0].icon);

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <View style={styles.dateSection}>
        <Text style={[styles.day, { color: theme.text }]}>{dayName}</Text>
        <Text style={[styles.time, { color: theme.textSecondary }]}>{time}</Text>
      </View>
      <Image source={{ uri: iconUrl }} style={styles.icon} />
      <Text style={[styles.temp, { color: theme.text }]}>
        {Math.round(item.main.temp)}{tempUnit}
      </Text>
      <Text style={[styles.desc, { color: theme.textSecondary }]} numberOfLines={1}>
        {item.weather[0].main}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center', padding: 12,
    marginHorizontal: 16, marginVertical: 4, borderRadius: 12,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 2,
  },
  dateSection: { width: 60 },
  day: { fontSize: 14, fontWeight: '600' },
  time: { fontSize: 11 },
  icon: { width: 40, height: 40, marginHorizontal: 8 },
  temp: { fontSize: 18, fontWeight: '600', width: 60, textAlign: 'center' },
  desc: { fontSize: 13, flex: 1, textAlign: 'right' },
});

export default ForecastItem;
