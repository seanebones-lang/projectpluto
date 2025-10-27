import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';

const ELCADailyDevotionScreen = () => {
  const [devotion, setDevotion] = useState(null);
  const [lectionary, setLectionary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDailyDevotion();
  }, []);

  const fetchDailyDevotion = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/ai/daily-devotion');
      setDevotion(response.data.devotion);
      setLectionary(response.data.lectionary);
      setError(null);
    } catch (err) {
      setError('Failed to load daily devotion. Please try again.');
      console.error('Error fetching devotion:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Loading your daily devotion...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={fetchDailyDevotion} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ELCA Daily Devotion</Text>
        <Text style={styles.subtitle}>
          {lectionary?.date ? new Date(lectionary.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : ''}
        </Text>
      </View>

      <View style={styles.lectionarySection}>
        <Text style={styles.sectionTitle}>Today's Lectionary Readings</Text>
        {lectionary?.readings.map((reading, index) => (
          <Text key={index} style={styles.reading}>• {reading}</Text>
        ))}
      </View>

      <View style={styles.devotionSection}>
        <Text style={styles.sectionTitle}>Reflection</Text>
        <Text style={styles.devotionText}>{devotion}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Grounded in Lutheran theology: Grace alone, Faith alone, Scripture alone
        </Text>
        <Button title="Refresh Devotion" onPress={fetchDailyDevotion} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontStyle: 'italic',
  },
  lectionarySection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  reading: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  devotionSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  devotionText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  footer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ELCADailyDevotionScreen;

