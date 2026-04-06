import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../src/context/AppContext';
import { getTheme } from '../../src/utils/theme';

export default function SettingsScreen() {
  const { settings, toggleDarkMode, toggleUnits } = useAppContext();
  const theme = getTheme(settings.darkMode);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.settingRow, { backgroundColor: theme.card }]}>
        <View style={styles.settingInfo}>
          <Ionicons name="moon-outline" size={24} color={theme.primary} />
          <View style={styles.settingText}>
            <Text style={[styles.settingTitle, { color: theme.text }]}>Dark Mode</Text>
            <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
              Switch between light and dark theme
            </Text>
          </View>
        </View>
        <Switch
          value={settings.darkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: '#D0D0D0', true: theme.primary }}
          thumbColor={settings.darkMode ? '#FFFFFF' : '#F4F4F4'}
        />
      </View>

      <View style={[styles.settingRow, { backgroundColor: theme.card }]}>
        <View style={styles.settingInfo}>
          <Ionicons name="thermometer-outline" size={24} color={theme.primary} />
          <View style={styles.settingText}>
            <Text style={[styles.settingTitle, { color: theme.text }]}>Temperature Units</Text>
            <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
              Currently: {settings.units === 'metric' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.unitToggle, { backgroundColor: theme.primary }]} onPress={toggleUnits}>
          <Text style={styles.unitToggleText}>{settings.units === 'metric' ? '°C' : '°F'}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.infoSection, { borderTopColor: theme.border }]}>
        <Text style={[styles.infoTitle, { color: theme.text }]}>SkyView Weather</Text>
        <Text style={[styles.infoText, { color: theme.textSecondary }]}>Version 1.0.0</Text>
        <Text style={[styles.infoText, { color: theme.textSecondary }]}>Powered by OpenWeatherMap API</Text>
        <Text style={[styles.infoText, { color: theme.textSecondary }]}>Built with React Native & Expo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16 },
  settingRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16, marginHorizontal: 16, marginBottom: 10, borderRadius: 12,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 3,
  },
  settingInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  settingText: { marginLeft: 12, flex: 1 },
  settingTitle: { fontSize: 16, fontWeight: '600' },
  settingDesc: { fontSize: 13, marginTop: 2 },
  unitToggle: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  unitToggleText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  infoSection: { alignItems: 'center', marginTop: 40, paddingTop: 24, marginHorizontal: 16, borderTopWidth: 1 },
  infoTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  infoText: { fontSize: 13, marginBottom: 4 },
});
