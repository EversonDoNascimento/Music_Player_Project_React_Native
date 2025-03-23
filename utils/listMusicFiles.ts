import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import getMetadata from "./getMetadata";
import { AudioWithMetadata } from "../types/audioMetadataType";
import { useAlbum } from "../contexts/AlbumContext";
import { musicType } from "../types/musicType";
import { AlbumType } from "../types/albumType";

export default function useMusicFiles() {
  const [audioFiles, setAudioFiles] = useState<AudioWithMetadata[]>([]);
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
        first: 20,
      });

      const filesWithMetadata: AudioWithMetadata[] = [];

      for (const asset of media.assets) {
        try {
          const metadata = await getMetadata(asset.uri);

          let albumCoverUri: string | null = null;

          if (metadata?.common?.picture?.length) {
            const picture = metadata.common.picture[0];
            const base64String = `data:${picture.format};base64,${Buffer.from(
              picture.data
            ).toString("base64")}`;
            albumCoverUri = base64String;
          }
          const file: AudioWithMetadata = {
            asset,
            metadata: null,
            albumCover: albumCoverUri,
          };
          filesWithMetadata.push(file);

          const albumId =
            asset.albumId || metadata?.common.album || "Desconhecido";
          const exists = albuns.some(
            (album: AlbumType) => album.id === albumId
          );

          if (!exists) {
            const newAlbum: AlbumType = {
              id: albumId,
              title: metadata?.common.album || "Desconhecido",
              cover: albumCoverUri || "",
              artist: metadata?.common.artist || "Desconhecido",
              year: metadata?.common.year || 0,
              genre: metadata?.common.genre || [],
              tracks: [],
            };
            setAlbum(newAlbum);
          }
        } catch (err) {
          console.warn(`Erro ao obter metadados de ${asset.filename}:`, err);

          filesWithMetadata.push({
            asset,
            metadata: null,
            albumCover: null,
          });
        }
      }

      setAudioFiles(filesWithMetadata);
      setLoading(false);
    }
    getMusicFiles();
  }, []);

  return { audioFiles, loading };
}
