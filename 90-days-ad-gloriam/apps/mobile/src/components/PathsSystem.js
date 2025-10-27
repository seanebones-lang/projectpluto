import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PathTracker from './PathTracker';  // Assuming this is the previously created component

import DigitalMonkPath from './DigitalMonkPath';
import SpiritualRenewalPath from './SpiritualRenewalPath';
import ServicePath from './ServicePath';

const PathsSystem = ({ activePath }) => {
  const paths = {
    digitalMonk: <DigitalMonkPath />,
    spiritualRenewal: <SpiritualRenewalPath />,
    service: <ServicePath />,
  };

  return (
    <View style={styles.container}>
      <Text>Paths of Pilgrimage</Text>
      <PathTracker progress={50} />  // Example progress; integrate with state in full app
      {paths[activePath] || <Text>Select a path to begin.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default PathsSystem;

// Sub-components for modularity

const DigitalMonkPath = () => (
  <View>
    <Text>Digital Monk Path: Focus on digital fasting and mindfulness.</Text>
    {/* Add specific features like timers */}
  </View>
);

const SpiritualRenewalPath = () => (
  <View>
    <Text>Spiritual Renewal Path: Meditation and prayer tracking.</Text>
    {/* Add reflection integration */}
  </View>
);

const ServicePath = () => (
  <View>
    <Text>Service Path: Log service hours and community actions.</Text>
    {/* Add service logging UI */}
  </View>
);
