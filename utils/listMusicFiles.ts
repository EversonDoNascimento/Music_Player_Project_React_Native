import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import getMetadata from "./getMetadata";
import { AudioWithMetadata } from "../types/audioMetadataType";
import { useAlbum } from "../contexts/AlbumContext";
import { AlbumType } from "../types/albumType";
import { getAlbumCover } from "./getAlbumCover";

export default function useMusicFiles() {
  const [audioFiles, setAudioFiles] = useState<AlbumType[]>([]);
  const [loading, setLoading] = useState(true);
  const { albuns, setAlbum } = useAlbum();
  useEffect(() => {
    async function getMusicFiles() {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão negada!");
        setLoading(false);
        return;
      }

      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        album: undefined,
        first: 11,
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

          console.log(audioFiles);
          // setAlbum(audioFiles[0]);
        } catch (err) {
          // console.warn(`Erro ao obter metadados de ${asset.filename}:`, err);

          filesWithMetadata.push({
            asset,
            metadata: null,
            albumCover: null,
          });
        }
      }

      audioFiles.map((a) => {
        setAlbum(a);
      });
      setAudioFiles(audioFiles);
      setLoading(false);
    }
    getMusicFiles();
    console.log(albuns);
  }, []);

  return { audioFiles, loading };
}
