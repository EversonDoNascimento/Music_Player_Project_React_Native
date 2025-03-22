import * as MediaLibrary from "expo-media-library";

export type AudioMetadataType = {
  format: {
    container: string;
    codec: string;
    lossless: boolean;
    sampleRate: number;
    bitsPerSample: number;
    numberOfChannels: number;
    duration: number;
    bitrate: number;
  };
  common: {
    title?: string;
    artist?: string;
    album?: string;
    year?: number;
    track?: {
      no?: number;
      of?: number;
    };
    disk?: {
      no?: number;
      of?: number;
    };
    genre?: string[];
    picture?: {
      format: string;
      data: ArrayBuffer;
    }[];
  };
  quality: {
    warnings: string[];
  };
};

export type AudioWithMetadata = {
  asset: MediaLibrary.Asset;
  metadata: AudioMetadataType | null;
  albumCover?: string | null;
};
