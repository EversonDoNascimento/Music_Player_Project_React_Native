import { FlatList, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import CardMusic from "../../components/CardMusic";
import useMusicFiles from "../../utils/listMusicFiles";
import filteredAudioFiles from "../../utils/filterFormatAudios";
import useMusicFilesWithMetadata from "../../utils/listMusicFiles";
import {
  AudioMetadataType,
  AudioWithMetadata,
} from "../../types/audioMetadataType";
import { musicType } from "../../types/musicType";

export default function Screen() {
  const list: musicType[] = filteredAudioFiles(useMusicFiles());

  return (
    <View className="w-full h-full bg-[#1d202c] p-4 relative">
      <FlatList
        data={list}
        renderItem={({ item }) => <CardMusic data={item}></CardMusic>}
        // keyExtractor={(item) => item.asset.
      ></FlatList>
    </View>
  );
}
