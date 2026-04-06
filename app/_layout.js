import React from 'react';
import { View } from 'react-native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider, useAppContext } from '../src/context/AppContext';
import LoadingSpinner from '../src/components/LoadingSpinner';

function AppContent() {
  const { isLoading, settings } = useAppContext();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: settings.darkMode ? '#1A1A2E' : '#F0F4F8' }}>
        <LoadingSpinner message="Loading SkyView..." />
      </View>
    );
  }

  return (
    <>
      <StatusBar style={settings.darkMode ? 'light' : 'dark'} />
      <Slot />
    </>
  );
}

export default function RootLayout() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
