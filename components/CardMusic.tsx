import { Image, Text, View } from "react-native";
import { musicType } from "../types/musicType";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

type Props = {
  data: musicType;
};
export default function CardMusic({ data }: Props) {
  return (
    <View className=" flex w-full flex-row items-center  gap-5 mb-4 p-4 border-b-slate-600 border-b-[1px]">
      <Image source={{ uri: data.image }} width={80} height={80}></Image>
      <View className="gap-2">
        <View className="flex flex-row gap-2  items-center">
          <FontAwesomeIcon icon={faMusic} size={10} color="white" />
          <Text className="text-white">{data.name}</Text>
        </View>
        <View className="flex flex-row gap-2  items-center">
          <FontAwesomeIcon icon={faCompactDisc} size={10} color="white" />
          <Text className="text-white">{data.artist}</Text>
        </View>
        <View className="flex flex-row gap-2  items-center">
          <FontAwesomeIcon icon={faClock} size={10} color="white" />
          <Text className="text-white">{data.duration}</Text>
        </View>
      </View>
    </View>
  );
}
