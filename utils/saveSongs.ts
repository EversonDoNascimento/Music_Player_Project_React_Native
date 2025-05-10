import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveSongs = async (songs: object) => {
  try {
    await AsyncStorage.setItem("songs", JSON.stringify(songs));
  } catch (e) {
    console.error("Erro ao salvar", e);
  }
};

export const getSavedSongs = async () => {
  try {
    const value = await AsyncStorage.getItem("songs");
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.error("Erro ao obter", e);
  }
};
