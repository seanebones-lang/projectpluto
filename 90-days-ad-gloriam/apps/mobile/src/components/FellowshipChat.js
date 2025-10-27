import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { io } from 'socket.io-client';

const FellowshipChat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:3000', {
      auth: {
        token: 'your-jwt-token-here' // Replace with actual JWT from auth context
      }
    });
    
    newSocket.on('connect', () => {
      console.log('Connected to Fellowship server');
      newSocket.emit('joinRoom', 'fellowship');
    });

    newSocket.on('message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && messageInput.trim()) {
      socket.emit('sendMessage', messageInput);
      setMessageInput('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fellowship Circles</Text>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.message}>
            <Text style={styles.userName}>{msg.user}:</Text>
            <Text style={styles.messageText}>{msg.message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={messageInput}
          onChangeText={setMessageInput}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
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
    marginBottom: 20,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 10,
  },
  message: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  userName: {
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  messageText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default FellowshipChat;
