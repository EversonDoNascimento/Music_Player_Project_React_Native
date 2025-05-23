import { Image, Pressable, Text } from "react-native";
import { AlbumType } from "../types/albumType";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "expo-router";
import { useCurrentAlbumPlayProvider } from "../contexts/CurrentAlbumPlay";

type Props = {
  data: AlbumType;
};
export default function CardAlbum({ data }: Props) {
  const navigation = useRouter();

  return (
    <Pressable
      onPress={() => {
        navigation.push(`listSongs/${data.id}`);
      }}
      className="flex flex-col items-center gap-4 justify-center bg-[#12141b] rounded-md p-4"
    >
      {data.cover ? (
        <Image
          source={{ uri: data.cover }}
          style={{
            width: 160,
            height: 160,
            borderRadius: 5,
          }}
        ></Image>
      ) : (
        <FontAwesomeIcon icon={faMusic} size={160} color="white" />
      )}
      <Text className="text-white">{data.title}</Text>
    </Pressable>
  );
}
