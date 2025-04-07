import { useLocalSearchParams } from "expo-router";
import { FlatList, ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useAlbum } from "../../contexts/AlbumContext";
import CardMusic from "../../components/CardMusic";
import { AlbumType } from "../../types/albumType";

const Screen = () => {
  const { id } = useLocalSearchParams();
  const { albuns } = useAlbum();
  const [album, setAlbum] = useState<AlbumType>();
  useEffect(() => {
    () => {
      const temp = albuns.find((a) => a.id === id);
      setAlbum(albuns.find((a) => a.id === id));
      console.log("Tamanho do albun: ", temp?.tracks);
    };
  }, [albuns, album]);

  return (
    <View className="w-full h-full bg-[#1d202c] p-4 relative">
      <FlatList
        data={albuns.find((a) => a.id === id)?.tracks}
        renderItem={({ item }) => (
          <CardMusic
            data={item}
            album={albuns.find((a) => a.id === id)}
          ></CardMusic>
        )}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
};

export default Screen;
