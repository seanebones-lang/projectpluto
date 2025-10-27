import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Audio from 'expo-av';
import axios from 'axios';  // For API calls

const VoiceInteraction = () => {
  const [recording, setRecording] = useState(null);
  const [transcription, setTranscription] = useState('');

  useEffect(() => {
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { status } = await Audio.getPermissionsAsync();
      if (status.granted) {
        const newRecording = new Audio.Recording();
        await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await newRecording.startAsync();
        setRecording(newRecording);
      }
    } catch (error) {
      console.error('Recording failed:', error);
    }
  }

  async function stopRecording() {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const transcriptionResult = await transcribeAudio(uri);  // Call to Grok-3 API
      setTranscription(transcriptionResult);
      setRecording(null);
    }
  }

  async function transcribeAudio(uri: string) {
    const formData = new FormData();
    formData.append('file', { uri, type: 'audio/mp3', name: 'recording.mp3' });
    const response = await axios.post('https://api.grok.xai.com/v1/audio/transcriptions', formData, {
      headers: {
        'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.text;  // Assuming the API returns transcribed text
  }

  return (
    <View style={styles.container}>
      <Text>Voice Interaction for Prayers</Text>
      <Button title='Start Recording' onPress={startRecording} />
      <Button title='Stop Recording' onPress={stopRecording} />
      {transcription && <Text>Transcription: {transcription}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default VoiceInteraction;
