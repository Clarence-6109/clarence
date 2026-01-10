import { createContext, useCallback, useContext, useState } from "react";
import { tracks } from "../data/mockData";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState(tracks);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState("off"); // off, all, one
  const [likedSongs, setLikedSongs] = useState(
    tracks.filter((t) => t.liked).map((t) => t.id)
  );

  const playTrack = useCallback(
    (track, trackList = queue) => {
      setCurrentTrack(track);
      setQueue(trackList);
      setCurrentIndex(trackList.findIndex((t) => t.id === track.id));
      setIsPlaying(true);
      setProgress(0);
    },
    [queue]
  );

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const nextTrack = useCallback(() => {
    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = (currentIndex + 1) % queue.length;
    }
    setCurrentIndex(nextIndex);
    setCurrentTrack(queue[nextIndex]);
    setProgress(0);
  }, [currentIndex, queue, shuffle]);

  const prevTrack = useCallback(() => {
    if (progress > 10) {
      setProgress(0);
      return;
    }
    let prevIndex;
    if (shuffle) {
      prevIndex = Math.floor(Math.random() * queue.length);
    } else {
      prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    }
    setCurrentIndex(prevIndex);
    setCurrentTrack(queue[prevIndex]);
    setProgress(0);
  }, [currentIndex, queue, shuffle, progress]);

  const toggleLike = useCallback((trackId) => {
    setLikedSongs((prev) =>
      prev.includes(trackId)
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId]
    );
  }, []);

  const toggleShuffle = useCallback(() => {
    setShuffle((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeat((prev) => {
      if (prev === "off") return "all";
      if (prev === "all") return "one";
      return "off";
    });
  }, []);

  const value = {
    currentTrack,
    isPlaying,
    queue,
    volume,
    setVolume,
    progress,
    setProgress,
    shuffle,
    repeat,
    likedSongs,
    playTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    toggleLike,
    toggleShuffle,
    toggleRepeat,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
