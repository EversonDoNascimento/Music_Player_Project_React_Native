import { Text, View } from "react-native";
import { Stack } from "expo-router";
import "../globals.css";
import { Buffer } from "buffer";

export default function RootLayout() {
  global.Buffer = Buffer;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
