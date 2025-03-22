// import * as MediaLibrary from "expo-media-library";
// import { useEffect, useState } from "react";
// import { parseBlob } from "music-metadata-browser";
// import { AudioWithMetadata } from "../types/audioMetadataType";

// export default function useMusicFilesWithMetadata() {
//   const [audioFiles, setAudioFiles] = useState<AudioWithMetadata[]>([]);

//   useEffect(() => {
//     async function getMusicFiles() {
//       const { status } = await MediaLibrary.requestPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permissão negada!");
//         return;
//       }

//       const media = await MediaLibrary.getAssetsAsync({
//         mediaType: "audio",
//         first: 50,
//       });

//       const filesWithMetadata: AudioWithMetadata[] = [];

//       for (const asset of media.assets) {
//         try {
//           const response = await fetch(asset.uri);
//           const blob = await response.blob();
//           const metadata = await parseBlob(blob);

//           filesWithMetadata.push({
//             asset,
//             metadata,
//           });
//         } catch (err) {
//           console.warn(`Erro ao obter metadados de ${asset.filename}:`, err);
//           // Mesmo se falhar, salva o asset com metadata nula
//           filesWithMetadata.push({
//             asset,
//             metadata: null,
//           });
//         }
//       }

//       setAudioFiles(filesWithMetadata);
//     }

//     getMusicFiles();
//   }, []);

//   return audioFiles;
// }

import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import getMetadata from "./getMetadata";

export default function useMusicFiles() {
  const [audioFiles, setAudioFiles] = useState<MediaLibrary.Asset[]>([]);

  useEffect(() => {
    async function getMusicFiles() {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão negada!");
        return;
      }

      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        first: 50,
      });

      setAudioFiles(media.assets);

      for (const asset of media.assets) {
        const metadata = await getMetadata(asset.uri);
        console.log(`${asset.filename}:`, metadata?.common || "Sem metadados");
      }
    }

    getMusicFiles();
  }, []);

  return audioFiles;
}
