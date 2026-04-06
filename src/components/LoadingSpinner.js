import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const LoadingSpinner = ({ message = 'Loading...', color = '#4A90D9' }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={color} />
    <Text style={[styles.message, { color }]}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  message: { marginTop: 12, fontSize: 16 },
});

export default LoadingSpinner;
