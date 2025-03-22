import { Image, Pressable, Text, View } from "react-native";
import { musicType } from "../types/musicType";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import * as MediaLibrary from "expo-media-library";
import formatDuration from "../utils/formatDurationMusic";
import { useEffect } from "react";
import getMetadata from "../utils/getMetadata";
import {
  AudioMetadataType,
  AudioWithMetadata,
} from "../types/audioMetadataType";

type Props = {
  data: AudioWithMetadata;
};
export default function CardMusic({ data }: Props) {
  return (
    <Pressable
      onPress={() => {
        alert(data.metadata?.common.artist);
      }}
      className=" flex w-full flex-row items-center  gap-5 mb-4 p-4 border-b-slate-600 border-b-[1px]"
    >
      {data.albumCover ? (
        <Image
          source={{ uri: data.albumCover }}
          style={{ width: 60, height: 60, borderRadius: 5, marginRight: 10 }}
        />
      ) : (
        <View
          style={{
            width: 60,
            height: 60,
            backgroundColor: "#444",
            borderRadius: 5,
            marginRight: 10,
          }}
        />
      )}
      <View className="gap-2">
        <View className="flex flex-row gap-2  items-center">
          <FontAwesomeIcon icon={faMusic} size={10} color="white" />
          <Text className="text-white">{data.asset.filename}</Text>
        </View>
        <View className="flex flex-row gap-2  items-center">
          <FontAwesomeIcon icon={faCompactDisc} size={10} color="white" />
          <Text className="text-white">{data.metadata?.common.album}</Text>
        </View>
        <View className="flex flex-row gap-2  items-center">
          <FontAwesomeIcon icon={faClock} size={10} color="white" />
          <Text className="text-white">
            {formatDuration(data.asset.duration)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
