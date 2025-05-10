import * as MediaLibrary from "expo-media-library";
import { useState } from "react";
import getMetadata from "./getMetadata";
import { AudioWithMetadata } from "../types/audioMetadataType";
import { AlbumType } from "../types/albumType";
import { getAlbumCover } from "./getAlbumCover";
import { saveSongs } from "./saveSongs";

export default function useMusicFiles() {
  const [loading, setLoading] = useState(false);
  async function getMusicFiles() {
    setLoading(true);
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Permissão negada!");
      setLoading(false);
      return;
    }

    const media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      album: undefined,
      first: 20,
    });

    const filesWithMetadata: AudioWithMetadata[] = [];
    const audioFiles: AlbumType[] = [];
    for (const asset of media.assets) {
      try {
        const metadata = await getMetadata(asset.uri);

        const albumCoverUri = getAlbumCover(metadata);
        if (!audioFiles.some((a) => a.id === asset.albumId)) {
          audioFiles.push({
            id: asset.albumId as string,
            title: metadata?.common.album || "Desconhecido",
            cover: albumCoverUri || "",
            artist: metadata?.common.artist || "Desconhecido",
            year: metadata?.common.year || 0,
            genre: metadata?.common.genre || [],
            tracks: [],
          });
        }

        audioFiles.map((a) => {
          if (a.id === asset.albumId) {
            a.tracks.push({
              albumId: asset.albumId as string,
              creationTime: asset.creationTime,
              duration: asset.duration,
              filename: asset.filename,
              height: asset.height,
              id: asset.id,
              mediaType: asset.mediaType,
              modificationTime: asset.modificationTime,
              uri: asset.uri,
              width: asset.width,
            });
          }
        });
      } catch (err) {
        filesWithMetadata.push({
          asset,
          metadata: null,
          albumCover: null,
        });
      }
    }
    saveSongs(audioFiles);
    setLoading(false);
  }

  return { loading, getMusicFiles };
}
