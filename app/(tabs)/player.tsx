import { Image, Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";
import { useCurrentAlbumPlayProvider } from "../../contexts/CurrentAlbumPlay";

export default function Screen() {
  const {
    album,
    currentMusic,
    setMusic,
    playSound,
    pauseSound,
    duration,
    isPlaying,
    currentPosition,
    progress,
    nextSound,
    prevSound,
  } = useCurrentAlbumPlayProvider();

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
        <Text className="text-white font-bold text-xl">{album?.artist}</Text>
      </View>

      {album?.cover ? (
        <Image
          source={{ uri: album?.cover }}
          style={{ width: 380, height: 380, borderRadius: 5 }}
        />
      ) : (
        <FontAwesome name="music" size={380} color="white" />
      )}

      <View className="my-8 justify-center items-center">
        <Text className="text-white font-bold text-xl">{album?.title}</Text>
        <Text className="text-white/50">{currentMusic?.filename}</Text>
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
          <Pressable onPress={prevSound}>
            <FontAwesome name="backward" size={25} color="white" />
          </Pressable>
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
          <Pressable onPress={nextSound}>
            <FontAwesome name="forward" size={25} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
