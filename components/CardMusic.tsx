import { Image, Pressable, Text, View } from "react-native";
import { AudioFile } from "../types/musicType";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import formatDuration from "../utils/formatDurationMusic";
import { AlbumType } from "../types/albumType";

type Props = {
  data: AudioFile;
  album: AlbumType | undefined;
};
export default function CardMusic({ data, album }: Props) {
  return (
    <Pressable
      onPress={() => {
        console.log(data.uri);
      }}
      className=" flex w-full flex-row items-center  gap-5 mb-4 p-4 border-b-slate-600 border-b-[1px]"
    >
      {album?.cover ? (
        <Image
          source={{ uri: album.cover }}
          style={{ width: 60, height: 60, borderRadius: 5, marginRight: 10 }}
        />
      ) : (
        <FontAwesomeIcon icon={faMusic} size={60} color="white" />
      )}
      <View className="gap-2">
        <View className="flex flex-row gap-2  items-center">
          <FontAwesomeIcon icon={faMusic} size={10} color="white" />
          <Text className="text-white">{data.filename}</Text>
        </View>
        <View className="flex flex-row gap-2  items-center">
          <FontAwesomeIcon icon={faCompactDisc} size={10} color="white" />
          <Text className="text-white">{album?.artist}</Text>
        </View>
        <View className="flex flex-row gap-2  items-center">
          <FontAwesomeIcon icon={faClock} size={10} color="white" />
          <Text className="text-white">{formatDuration(data.duration)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
