import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const CommunityChallenges = ({ userId }) => {
  const [challenges, setChallenges] = useState([]);
  const [userChallenges, setUserChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChallenges();
    if (userId) {
      fetchUserChallenges();
    }
  }, [userId]);

  const fetchChallenges = async () => {
    try {
      const response = await axios.get('http://localhost:3000/challenges');
      setChallenges(response.data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserChallenges = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/challenges/user/${userId}`);
      setUserChallenges(response.data);
    } catch (error) {
      console.error('Error fetching user challenges:', error);
    }
  };

  const joinChallenge = async (challengeId) => {
    try {
      await axios.post(`http://localhost:3000/challenges/${challengeId}/join`, {
        userId,
      });
      fetchUserChallenges();
      alert('Successfully joined the challenge!');
    } catch (error) {
      console.error('Error joining challenge:', error);
      alert('Failed to join challenge. Please try again.');
    }
  };

  const isUserInChallenge = (challengeId) => {
    return userChallenges.some(uc => uc.challengeId === challengeId);
  };

  const renderChallenge = ({ item }) => {
    const userParticipation = userChallenges.find(uc => uc.challengeId === item.id);
    const progressPercent = userParticipation 
      ? Math.round((userParticipation.progress / item.goalTarget) * 100)
      : 0;

    return (
      <View style={styles.challengeCard}>
        <Text style={styles.challengeTitle}>{item.title}</Text>
        <Text style={styles.challengeDescription}>{item.description}</Text>
        
        <View style={styles.challengeDetails}>
          <Text style={styles.detailText}>Goal: {item.goalTarget} {item.goalType}</Text>
          <Text style={styles.detailText}>
            {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
          </Text>
          <Text style={styles.detailText}>
            Participants: {item.participants?.length || 0}
          </Text>
        </View>

        {userParticipation ? (
          <View style={styles.progressSection}>
            <Text style={styles.progressText}>Your Progress: {progressPercent}%</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
            </View>
            {userParticipation.completedAt && (
              <Text style={styles.completedText}>Completed!</Text>
            )}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => joinChallenge(item.id)}
          >
            <Text style={styles.joinButtonText}>Join Challenge</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ELCA Community Challenges</Text>
      <Text style={styles.subtitle}>Join fellow Lutherans in shared spiritual goals</Text>
      
      <FlatList
        data={challenges}
        renderItem={renderChallenge}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
    padding: 20,
  },
  header: {
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
  listContainer: {
    paddingBottom: 20,
  },
  challengeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  challengeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  challengeDetails: {
    marginBottom: 15,
  },
  detailText: {
    fontSize: 12,
    color: '#CCCCCC',
    marginBottom: 5,
  },
  progressSection: {
    marginTop: 10,
  },
  progressText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
  },
  completedText: {
    fontSize: 14,
    color: '#00FF00',
    fontWeight: 'bold',
    marginTop: 5,
  },
  joinButton: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#4B0082',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B0082',
  },
});

export default CommunityChallenges;

