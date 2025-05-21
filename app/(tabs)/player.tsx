import { useCallback, useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Audio } from "expo-av";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";
import { useCurrentAlbumPlayProvider } from "../../contexts/CurrentAlbumPlay";
import { useFocusEffect } from "expo-router";

export default function Screen() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState<number | undefined>(0);
  const ctxCurrentAlbum = useCurrentAlbumPlayProvider();

  const progress = useSharedValue(0);

  // Carregar e tocar automaticamente ao entrar na tela
  useFocusEffect(
    useCallback(() => {
      const music = ctxCurrentAlbum.currentMusic;
      if (!music) return;

      let mounted = true;
      let loadedSound: Audio.Sound;

      (async () => {
        const { sound } = await Audio.Sound.createAsync(
          { uri: music.uri },
          { shouldPlay: true }
        );
        if (!mounted) return;

        loadedSound = sound;
        setSound(sound);
        setIsPlaying(true);

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
          }
        });
      })();

      return () => {
        mounted = false;
        if (loadedSound) {
          loadedSound.unloadAsync();
        }
        setSound(null);
      };
    }, [ctxCurrentAlbum.currentMusic])
  );

  async function playSound() {
    if (!sound) return;

    const status = await sound.getStatusAsync();
    if (status.isLoaded && !status.isPlaying) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  }

  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying && sound) {
      interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && status.durationMillis) {
          setCurrentPosition(status.positionMillis);
          setDuration(status.durationMillis);

          const percent = status.positionMillis / status.durationMillis;
          progress.value = withTiming(percent, { duration: 500 });
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, sound]);

  function formatMillis(millis: number): string {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  return (
    <View className="bg-[#1d202c] w-full h-full flex-col justify-start p-4 items-center">
      <View className="mb-8 justify-center items-center">
        <Text className="text-white font-bold text-xl">Artist</Text>
      </View>

      {ctxCurrentAlbum.album?.cover ? (
        <Image
          source={{ uri: ctxCurrentAlbum.album?.cover }}
          style={{
            width: 380,
            height: 380,
            borderRadius: 5,
          }}
        />
      ) : (
        <FontAwesome name="music" size={380} color="white" />
      )}

      <View className="my-8 justify-center items-center">
        <Text className="text-white font-bold text-xl">
          {ctxCurrentAlbum.album?.title}
        </Text>
        <Text className="text-white/50">
          {ctxCurrentAlbum.currentMusic?.filename}
        </Text>
      </View>

      {/* Barra de progresso animada */}
      <View className="w-full relative my-2">
        <View className="h-1 rounded-lg w-full bg-white/25" />
        <Animated.View
          style={[
            {
              height: 4,
              backgroundColor: "white",
              position: "absolute",
              borderRadius: 8,
            },
            animatedProgressStyle,
          ]}
        />
      </View>

      {/* Tempo atual / total */}
      <View className="flex-row w-full justify-between items-end">
        <Text className=" text-white mb-4">
          {duration ? formatMillis(currentPosition) : "00:00"}
        </Text>
        <Text className=" text-white mb-4">
          {duration ? formatMillis(duration) : "00:00"}
        </Text>
      </View>

      {/* Controles */}
      <View>
        <View className="flex-row gap-11 justify-center items-center mt-8">
          <FontAwesome name="backward" size={25} color="white" />
          {!isPlaying ? (
            <Pressable
              className="justify-center items-center bg-black/25 rounded-full w-24 h-24"
              onPress={playSound}
            >
              <FontAwesome name="play" size={35} color="white" />
            </Pressable>
          ) : (
            <Pressable
              className="justify-center items-center bg-black/25 rounded-full w-24 h-24"
              onPress={pauseSound}
            >
              <FontAwesome name="pause" size={35} color="white" />
            </Pressable>
          )}
          <FontAwesome name="forward" size={25} color="white" />
        </View>
      </View>
    </View>
  );
}
