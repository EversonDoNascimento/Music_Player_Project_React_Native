import { Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { router } from "expo-router";

export default function Screen() {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/list");
    }, 2000);
  }, []);
  return (
    <View className="justify-center items-center w-full h-full bg-[#1d202c]">
      <View className="flex flex-col justify-center items-center gap-6">
        <FontAwesomeIcon icon={faMusic} size={80} color="white" />
        <Text className="text-3xl text-white font-InterBold">Music Player</Text>
      </View>
    </View>
  );
}
