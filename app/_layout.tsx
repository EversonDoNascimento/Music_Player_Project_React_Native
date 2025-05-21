import { Text, View } from "react-native";
import { Stack } from "expo-router";
import "../globals.css";
import { Buffer } from "buffer";
import { AlbumProvider } from "../contexts/AlbumContext";
import { CurrentAlbumPlayProvider } from "../contexts/CurrentAlbumPlay";

export default function RootLayout() {
  global.Buffer = Buffer;

  return (
    <AlbumProvider>
      <CurrentAlbumPlayProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="listSongs/[id]" />
        </Stack>
      </CurrentAlbumPlayProvider>
    </AlbumProvider>
  );
}
