import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const PathTracker = ({ progress = 0 }) => {
  const animatedProgress = useSharedValue(progress);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value}%`,
    backgroundColor: '#FFD700', // Gold for luminous effect
  }));

  React.useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 1000 });
  }, [progress]);

  return (
    <View style={styles.container}>
      <Text>90-Stone Path Progress: {Math.round(progress)}%</Text>
      <Animated.View style={[styles.trackerBar, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  trackerBar: {
    height: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.5)', // Semi-transparent gold
    borderRadius: 10,
  },
});

export default PathTracker;
