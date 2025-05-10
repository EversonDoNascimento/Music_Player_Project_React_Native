import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  children: React.ReactNode;
};
const Header = ({ children }: Props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <Pressable
          onPress={() => setShowModal(false)}
          className="w-full h-[90%] absolute z-20 items-center justify-center bottom-0 right-0"
        >
          <View className="w-3/4   justify-center items-center   bg-black/25 rounded-md p-2">
            {children}
          </View>
        </Pressable>
      )}
      <View className="w-full  bg-[#1d202c] flex-row justify-between items-center  mb-8 p-4 ">
        <View className="flex-row gap-2 justify-center items-center">
          {/* <FontAwesomeIcon icon={faMusic} size={30} color="white" /> */}
          <Text className="text-white font-semibold text-2xl">Library</Text>
        </View>
        <Pressable
          onPress={() => setShowModal(!showModal)}
          className="  justify-center items-center  gap-3"
        >
          <View className="w-11 h-1 bg-white rounded-full"></View>
          <View className="w-11 h-1 bg-white rounded-full"></View>
          <View className="w-11 h-1 bg-white rounded-full"></View>
        </Pressable>
      </View>
    </>
  );
};

export default Header;
