import { createContext, ReactNode, useContext, useState } from "react";
import { AlbumType } from "../types/albumType";
import { AudioFile } from "../types/musicType";

interface AlbumContextType {
  album: AlbumType | undefined;
  currentMusic: AudioFile | undefined;
  setCurrentMusic: (music: AudioFile) => void;
  setAlbum: (album: AlbumType) => void;
}

export const CurrentAlbumPlayContext = createContext<AlbumContextType | null>(
  null
);

export const CurrentAlbumPlayProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [album, setAlbum] = useState<AlbumType>();
  const [currentMusic, setCurrentMusic] = useState<AudioFile>();

  return (
    <CurrentAlbumPlayContext.Provider
      value={{ album, setAlbum, currentMusic, setCurrentMusic }}
    >
      {children}
    </CurrentAlbumPlayContext.Provider>
  );
};

export const useCurrentAlbumPlayProvider = () => {
  const context = useContext(CurrentAlbumPlayContext);
  if (context === null) {
    throw new Error("useAlbum must be used within a AlbumProvider");
  }
  return context;
};
