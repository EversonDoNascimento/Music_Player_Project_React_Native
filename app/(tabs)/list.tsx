import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import useMusicFiles from "../../utils/listMusicFiles";
import CardAlbum from "../../components/CardAlbum";
import { useEffect, useState } from "react";
import { getSavedSongs } from "../../utils/saveSongs";
import { AlbumType } from "../../types/albumType";
import Header from "../../components/Header";
import { FontAwesome } from "@expo/vector-icons";
export default function Screen() {
  // const { albuns } = useAlbum();
  const { loading, getMusicFiles } = useMusicFiles();
  const [savedSongs, setSavedSongs] = useState<AlbumType[]>([]);
  useEffect(() => {
    (async () => {
      const albuns = await getSavedSongs();
      setSavedSongs(albuns);
    })();
  }, []);
  return (
    <View className="w-full h-full bg-[#1d202c]  relative">
      <Header>
        <Pressable
          className="flex-row items-center gap-2 w-full h-8 justify-center"
          onPress={() => {
            getMusicFiles();
          }}
        >
          <FontAwesome name="refresh" size={24} color="white" />

          <Text className="text-white font-semibold text-xl">Reload</Text>
        </Pressable>
      </Header>

      {loading && (
        <View className="w-full h-full flex-col justify-center items-center  absolute ">
          <ActivityIndicator size="large" color="white"></ActivityIndicator>
          <Text className="text-white">Carregando Músicas...</Text>
        </View>
      )}

      <FlatList
        data={savedSongs}
        renderItem={({ item }) => <CardAlbum data={item}></CardAlbum>}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 10,
          marginHorizontal: 15,
        }}
      ></FlatList>
    </View>
  );
}
