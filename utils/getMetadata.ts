import { parseBlob } from "music-metadata-browser";

export default async function getMetadata(uri: string) {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const metadata = await parseBlob(blob);
    return metadata;
  } catch (error) {
    console.log("Erro ao obter metadados:", error);
  }
}
