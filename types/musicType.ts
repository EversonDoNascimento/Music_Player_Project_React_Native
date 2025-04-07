export type musicType = {
  id: string; // ID único do arquivo
  filename: string; // Nome do arquivo
  uri: string; // Caminho do arquivo
  duration: number; // Duração do áudio em segundos
  mediaType: "audio"; // Tipo do arquivo (neste caso, sempre "audio")
  width?: number; // Largura da capa (se houver)
  height?: number; // Altura da capa (se houver)
  creationTime?: number; // Timestamp de criação do arquivo
  modificationTime?: number; // Timestamp da última modificação
};

export type AudioFile = {
  albumId: string;
  creationTime: number;
  duration: number;
  filename: string;
  height: number;
  id: string;
  mediaType: string;
  modificationTime: number;
  uri: string;
  width: number;
};
