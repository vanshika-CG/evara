import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="personalization" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="health-timeline" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="daily-checkin" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="deficiency" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="ingredient-scanner" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="hormone-risk" options={{ animation: 'slide_from_right' }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
