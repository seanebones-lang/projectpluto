import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DailyInvocationScreen from './src/screens/DailyInvocationScreen';
import PathTracker from './src/components/PathTracker';
import BookOfDaysScreen from './src/screens/BookOfDaysScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>90 Days ad Gloriam</Text>
      <PathTracker progress={50} />
      {/* Navigation would be implemented here with React Navigation */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
});
