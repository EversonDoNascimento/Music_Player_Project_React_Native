import { parseBuffer } from "music-metadata-browser";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

export default async function getMetadata(uri: string) {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    if (!info.exists) {
      console.warn("Arquivo não encontrado:", uri);
      return null;
    }

    if (info.size && info.size > 50 * 1024 * 1024) {
      console.warn("Arquivo muito grande, ignorado:", uri);
      return null;
    }

    const base64Audio = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const buffer = Buffer.from(base64Audio, "base64");
    const metadata = await parseBuffer(buffer, "audio/mpeg");

    return metadata;
  } catch (error) {
    // console.error("Erro ao obter metadados:", error);
    return null;
  }
}
