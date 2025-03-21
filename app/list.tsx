import { FlatList, Text, View } from "react-native";
import { MUSIC_LIST } from "../CONSTANTES/musicList";
import CardMusic from "../components/CardMusic";

export default function Screen() {
  return (
    <View className="w-full h-full bg-[#1d202c] p-4">
      <FlatList
        data={MUSIC_LIST}
        renderItem={({ item }) => <CardMusic data={item}></CardMusic>}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
    </View>
  );
}
