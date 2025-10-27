import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const WaypointMap = () => {
  const [location, setLocation] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      fetchWaypoints(currentLocation.coords.latitude, currentLocation.coords.longitude);
    })();
  }, []);

  const fetchWaypoints = async (lat, lng) => {
    try {
      const response = await axios.get('http://localhost:3000/waypoints/nearby', {
        params: { latitude: lat, longitude: lng, radius: 10000 }
      });
      setWaypoints(response.data);
    } catch (error) {
      console.error('Error fetching waypoints:', error);
    }
  };

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waypoints of Grace</Text>
      <Text style={styles.subtitle}>Find volunteer opportunities near you</Text>
      
      <MapView
        style={styles.map}
        initialRegion={location}
        showsUserLocation={true}
      >
        {waypoints.map((waypoint, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: waypoint.latitude,
              longitude: waypoint.longitude,
            }}
            title={waypoint.name}
            description={waypoint.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },
  error: {
    color: '#FF0000',
    fontSize: 16,
  },
});

export default WaypointMap;
