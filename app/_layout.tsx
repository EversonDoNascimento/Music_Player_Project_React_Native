import { Text, View } from "react-native";
import { Stack } from "expo-router";
import "../globals.css";
import { Buffer } from "buffer";
import { AlbumProvider } from "../contexts/AlbumContext";

export default function RootLayout() {
  global.Buffer = Buffer;

  return (
    <AlbumProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AlbumProvider>
  );
}
