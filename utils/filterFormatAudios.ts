import * as MediaLibrary from "expo-media-library";

export default function filteredAudioFiles(media: MediaLibrary.Asset[]) {
  return media.filter((file) => file.filename.endsWith(".mp3"));
}
