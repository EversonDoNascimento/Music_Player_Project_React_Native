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
  data: musicType;
};
export default function CardMusic({ data }: Props) {
  return (
    <Pressable
      onPress={() => {
        // alert(data.albumId);
      }}
      className=" flex w-full flex-row items-center  gap-5 mb-4 p-4 border-b-slate-600 border-b-[1px]"
    >
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=870&q=80",
        }}
        width={80}
        height={80}
      ></Image>
      <View className="gap-2">
        <View className="flex flex-row gap-2  items-center">
          <FontAwesomeIcon icon={faMusic} size={10} color="white" />
          <Text className="text-white">{data.filename}</Text>
        </View>
        {/* <View className="flex flex-row gap-2  items-center">
          <FontAwesomeIcon icon={faCompactDisc} size={10} color="white" />
          <Text className="text-white">{data.duration}</Text>
        </View> */}
        <View className="flex flex-row gap-2  items-center">
          <FontAwesomeIcon icon={faClock} size={10} color="white" />
          <Text className="text-white">{formatDuration(data.duration)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
