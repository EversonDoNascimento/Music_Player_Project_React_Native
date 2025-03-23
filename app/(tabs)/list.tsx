import { FlatList, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import CardMusic from "../../components/CardMusic";
import useMusicFiles from "../../utils/listMusicFiles";
import filteredAudioFiles from "../../utils/filterFormatAudios";
import { musicType } from "../../types/musicType";
import { useEffect, useState } from "react";
import getMusicFiles from "../../utils/listMusicFiles";
import { useAlbum } from "../../contexts/AlbumContext";

export default function Screen() {
  const [listAudio, setListAudio] = useState([]);
  const [loading, setLoading] = useState(false);
  const { albuns } = useAlbum();
  const list = useMusicFiles();

  return (
    <View className="w-full h-full bg-[#1d202c] p-4 relative">
      {list.loading && <Text>Loading</Text>}
      {!list.loading &&
        albuns.length > 0 &&
        albuns.map((album) => <Text key={album.id}>{album.artist}</Text>)}
      <FlatList
        data={list.audioFiles}
        renderItem={({ item }) => <CardMusic data={item}></CardMusic>}
        // keyExtractor={(item) => item.asset.
      ></FlatList>
    </View>
  );
}
