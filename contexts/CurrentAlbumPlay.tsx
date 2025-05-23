import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AlbumType } from "../types/albumType";
import { AudioFile } from "../types/musicType";
import { Audio } from "expo-av";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useFocusEffect } from "expo-router";
interface AlbumContextType {
  album: AlbumType | undefined;
  currentMusic: AudioFile | undefined;
  setMusic: (music: AudioFile) => void;
  setAlbum: (album: AlbumType) => void;
  playSound: () => void;
  pauseSound: () => void;
  isPlaying: boolean;
  currentPosition: number;
  duration: number | undefined;
  progress: any;
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
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | undefined>(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const progress = useSharedValue(0);
  const soundRef = useRef<Audio.Sound | null>(null); // ✅ useRef para o som

  async function playSound() {
    if (!sound) return;

    const status = await sound.getStatusAsync();
    if (status.isLoaded && !status.isPlaying) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  }

  async function loadSound() {
    const music = currentMusic;
    if (!music) return;

    // Para o som atual se existir
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
      setIsPlaying(false);
    }

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: music.uri },
        { shouldPlay: true }
      );

      soundRef.current = newSound;
      setIsPlaying(true);
      setSound(newSound);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error("Erro ao carregar o som:", error);
    }
  }
  const setMusic = (music: AudioFile) => {
    setCurrentMusic(music);
  };

  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    loadSound();

    return () => {
      // Cleanup ao sair da tela
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      setIsPlaying(false);
    };
  }, [currentMusic]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying && sound) {
      interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && status.durationMillis) {
          setCurrentPosition(status.positionMillis);
          setDuration(status.durationMillis);

          const percent = status.positionMillis / status.durationMillis;
          progress.value = withTiming(percent, { duration: 500 });
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, sound]);

  return (
    <CurrentAlbumPlayContext.Provider
      value={{
        album,
        setAlbum,
        currentMusic,
        setMusic,
        playSound,
        pauseSound,
        isPlaying,
        currentPosition,
        duration,
        progress,
      }}
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
