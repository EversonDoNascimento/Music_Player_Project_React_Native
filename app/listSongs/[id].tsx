import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { FlatList, View } from "react-native";
import { useCallback, useState } from "react";
import CardMusic from "../../components/CardMusic";
import { AlbumType } from "../../types/albumType";
import { getSavedSongs } from "../../utils/saveSongs";
import { AudioFile } from "../../types/musicType";
import Header from "../../components/Header";

const Screen = () => {
  const { id } = useLocalSearchParams();
  const [album, setAlbum] = useState<AlbumType>();
  const [songs, setSongs] = useState<AudioFile[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const songs = await getSavedSongs();
        const temp = songs.find((a: any) => a.id === id);
        setAlbum(temp);
        setSongs(temp.tracks);
      })();

      return () => {
        console.log("Saindo da tela");
      };
    }, [])
  );
  return (
    <View className="w-full h-full bg-[#1d202c] p-4 relative">
      <Header></Header>
      <FlatList
        data={songs}
        renderItem={({ item }) => (
          <CardMusic data={item} album={album}></CardMusic>
        )}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
};

export default Screen;
