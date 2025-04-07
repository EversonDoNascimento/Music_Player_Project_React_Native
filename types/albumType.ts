import { AudioFile } from "./musicType";

export type AlbumType = {
  id: string;
  title: string;
  cover: string;
  artist: string;
  year: number;
  genre: string[];
  tracks: AudioFile[];
};
