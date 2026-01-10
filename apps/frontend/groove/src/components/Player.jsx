import { useEffect, useRef } from "react";
import {
  IoDesktop,
  IoHeart,
  IoHeartOutline,
  IoList,
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoRepeat,
  IoShuffle,
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeMute,
} from "react-icons/io5";
import { usePlayer } from "../context/PlayerContext";
import "../styles/Player.css";

function Player() {
  const {
    currentTrack,
    isPlaying,
    volume,
    setVolume,
    progress,
    setProgress,
    shuffle,
    repeat,
    likedSongs,
    togglePlay,
    nextTrack,
    prevTrack,
    toggleLike,
    toggleShuffle,
    toggleRepeat,
  } = usePlayer();

  const progressInterval = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextTrack();
            return 0;
          }
          return prev + 0.5;
        });
      }, 1000);
    } else {
      clearInterval(progressInterval.current);
    }

    return () => clearInterval(progressInterval.current);
  }, [isPlaying, nextTrack, setProgress]);

  const formatTime = (percentage) => {
    const totalSeconds = Math.floor((percentage / 100) * 240); // Assume 4 min song
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percentage = ((e.clientX - rect.left) / rect.width) * 100;
    setProgress(Math.min(100, Math.max(0, percentage)));
  };

  const handleVolumeClick = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percentage = ((e.clientX - rect.left) / rect.width) * 100;
    setVolume(Math.min(100, Math.max(0, percentage)));
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <IoVolumeMute />;
    if (volume < 33) return <IoVolumeLow />;
    if (volume < 66) return <IoVolumeMedium />;
    return <IoVolumeHigh />;
  };

  const isLiked = likedSongs.includes(currentTrack?.id);

  if (!currentTrack) return null;

  return (
    <div className="player">
      <div className="player-track">
        <img
          src={currentTrack.cover}
          alt={currentTrack.title}
          className="player-track-cover"
        />
        <div className="player-track-info">
          <div className="player-track-title">{currentTrack.title}</div>
          <div className="player-track-artist">{currentTrack.artist}</div>
        </div>
        <button
          className={`player-like-btn ${isLiked ? "liked" : ""}`}
          onClick={() => toggleLike(currentTrack.id)}
        >
          {isLiked ? <IoHeart /> : <IoHeartOutline />}
        </button>
      </div>

      <div className="player-controls">
        <div className="player-buttons">
          <button
            className={`control-btn ${shuffle ? "active" : ""}`}
            onClick={toggleShuffle}
          >
            <IoShuffle />
          </button>
          <button className="control-btn" onClick={prevTrack}>
            <IoPlaySkipBack />
          </button>
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? <IoPause /> : <IoPlay style={{ marginLeft: 2 }} />}
          </button>
          <button className="control-btn" onClick={nextTrack}>
            <IoPlaySkipForward />
          </button>
          <button
            className={`control-btn ${repeat !== "off" ? "active" : ""}`}
            onClick={toggleRepeat}
            style={{ position: "relative" }}
          >
            <IoRepeat />
            {repeat === "one" && (
              <span
                style={{
                  position: "absolute",
                  fontSize: 9,
                  fontWeight: 700,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                1
              </span>
            )}
          </button>
        </div>

        <div className="player-progress">
          <span className="progress-time">{formatTime(progress)}</span>
          <div className="progress-bar" onClick={handleProgressClick}>
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="progress-time">{currentTrack.duration}</span>
        </div>
      </div>

      <div className="player-extra">
        <button className="extra-btn">
          <IoList />
        </button>
        <button className="extra-btn">
          <IoDesktop />
        </button>
        <div className="volume-control">
          <button
            className="extra-btn"
            onClick={() => setVolume(volume === 0 ? 70 : 0)}
          >
            {getVolumeIcon()}
          </button>
          <div className="volume-slider" onClick={handleVolumeClick}>
            <div
              className="volume-slider-fill"
              style={{ width: `${volume}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
