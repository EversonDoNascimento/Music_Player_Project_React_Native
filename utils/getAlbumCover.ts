import { Buffer } from "buffer";

export function getAlbumCover(metadata: any): string | null {
  try {
    const picture = metadata?.common?.picture?.[0];

    if (picture && picture.data && typeof picture.data === "object") {
      const buffer = Buffer.from(picture.data);
      const base64 = buffer.toString("base64");
      return `data:${picture.format};base64,${base64}`;
    }
  } catch (err) {
    console.warn("Erro ao gerar capa do álbum:", err);
  }

  return null;
}
