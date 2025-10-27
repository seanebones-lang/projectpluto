import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const DailyInvocationScreen = () => {
  useEffect(() => {
    scheduleDailyNotification();
  }, []);

  const scheduleDailyNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Invocation',
        body: 'Start your day with a spiritual quote or Psalm.',
      },
      trigger: {
        hour: 8,
        minute: 0,
        repeats: true,
      },
    });
  };

  return (
    <View>
      <Text>Daily Invocation Screen</Text>
      <Text>Your daily quote or Psalm goes here.</Text>
      <Button title='Schedule Notification' onPress={scheduleDailyNotification} />
    </View>
  );
};

export default DailyInvocationScreen;
