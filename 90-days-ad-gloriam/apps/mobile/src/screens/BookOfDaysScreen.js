import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Realm from 'realm';

// Define Realm schema
class JournalEntry extends Realm.Object {}
JournalEntry.schema = {
  name: 'JournalEntry',
  primaryKey: 'id',
  properties: {
    id: 'string',
    date: 'date',
    content: 'string',
  },
};

const BookOfDaysScreen = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [realm, setRealm] = useState(null);

  useEffect(() => {
    const openRealm = async () => {
      const newRealm = await Realm.open({ schema: [JournalEntry] });
      setRealm(newRealm);
      const allEntries = newRealm.objects('JournalEntry');
      setEntries(Array.from(allEntries));
    };
    openRealm();
  }, []);

  const addEntry = () => {
    if (realm && newEntry.trim()) {
      realm.write(() => {
        realm.create('JournalEntry', {
          id: Date.now().toString(),
          date: new Date(),
          content: newEntry,
        });
      });
      setNewEntry('');
      // Trigger sync if online (in a full app, integrate with network status)
    }
  };

  return (
    <View style={styles.container}>
      <Text>Book of Days Journal</Text>
      {entries.map((entry) => (
        <Text key={entry.id}>{entry.date.toDateString()}: {entry.content}</Text>
      ))}
      <TextInput
        style={styles.input}
        placeholder='Write your journal entry'
        value={newEntry}
        onChangeText={setNewEntry}
      />
      <Button title='Add Entry' onPress={addEntry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});

export default BookOfDaysScreen;
