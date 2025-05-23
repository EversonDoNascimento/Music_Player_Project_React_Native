import { FontAwesome } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { useCurrentAlbumPlayProvider } from "../contexts/CurrentAlbumPlay";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const CardPlayer = () => {
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
  } = useCurrentAlbumPlayProvider();
  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });
  return (
    <View className="w-full items-center  absolute bottom-4   z-20">
      <View className="h-28 bg-black/50 w-[90%] rounded-t-md gap-4 p-2 flex-row items-center">
        {album?.cover ? (
          <Image
            source={{ uri: album?.cover }}
            style={{ width: 60, height: 60, borderRadius: 5, marginRight: 10 }}
          />
        ) : (
          <FontAwesome name="music" size={60} color="white" />
        )}

        <View>
          <Text className="text-white">{currentMusic?.filename}</Text>
          <Text className="text-white/50 text-sm">{album?.title}</Text>
          <View className="flex-row items-center justify-center gap-5 w-full mt-2 ">
            <FontAwesome name="backward" size={24} color="white" />
            {isPlaying ? (
              <Pressable onPress={pauseSound}>
                <FontAwesome
                  name="pause"
                  size={24}
                  color="white"
                  onPress={pauseSound}
                />
              </Pressable>
            ) : (
              <Pressable onPress={playSound}>
                <FontAwesome
                  name="play"
                  size={24}
                  color="white"
                  onPress={playSound}
                />
              </Pressable>
            )}
            <FontAwesome name="forward" size={24} color="white" />
          </View>
        </View>
      </View>
      <View className="w-[90%] h-1 ">
        <View className="h-[1px] rounded-lg w-full bg-white/25" />
        <Animated.View
          style={[
            {
              height: 1,
              backgroundColor: "white",
              position: "absolute",
              borderRadius: 8,
            },
            animatedProgressStyle,
          ]}
        />
      </View>
    </View>
  );
};

export default CardPlayer;
