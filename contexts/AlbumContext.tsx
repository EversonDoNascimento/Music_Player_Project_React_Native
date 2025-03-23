import { createContext, ReactNode, useContext, useState } from "react";
import { AlbumType } from "../types/albumType";

interface AlbumContextType {
  albuns: AlbumType[];
  setAlbum: (album: AlbumType) => void;
}

export const AlbumContext = createContext<AlbumContextType | null>(null);

export const AlbumProvider = ({ children }: { children: ReactNode }) => {
  const [albuns, setAlbuns] = useState<AlbumType[]>([]);
  function setAlbum(album: AlbumType) {
    setAlbuns((prev) => {
      const exists = prev.some((a) => a.id === album.id);
      if (exists) return prev;
      return [...prev, album];
    });
  }
  return (
    <AlbumContext.Provider value={{ albuns, setAlbum }}>
      {children}
    </AlbumContext.Provider>
  );
};

export const useAlbum = () => {
  const context = useContext(AlbumContext);
  if (context === null) {
    throw new Error("useAlbum must be used within a AlbumProvider");
  }
  return context;
};
