import { AudioWithMetadata } from "./audioMetadataType";

export type AlbumType = {
  id: string;
  title: string;
  cover: string;
  artist: string;
  year: number;
  genre: string[];
  tracks: AudioWithMetadata[];
};
