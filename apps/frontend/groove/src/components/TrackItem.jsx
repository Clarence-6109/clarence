import { IoHeart, IoHeartOutline, IoPause, IoPlay } from "react-icons/io5";
import { usePlayer } from "../context/PlayerContext";
import "../styles/TrackItem.css";

function TrackItem({ track, index, trackList }) {
  const {
    currentTrack,
    isPlaying,
    likedSongs,
    playTrack,
    togglePlay,
    toggleLike,
  } = usePlayer();

  const isCurrentTrack = currentTrack?.id === track.id;
  const isLiked = likedSongs.includes(track.id);

  const handleClick = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track, trackList);
    }
  };

  return (
    <div
      className={`track-item ${isCurrentTrack ? "playing" : ""}`}
      onClick={handleClick}
    >
      <span className="track-number">{index + 1}</span>
      <span className="track-play-icon">
        {isCurrentTrack && isPlaying ? <IoPause /> : <IoPlay />}
      </span>

      <div className="track-info">
        <img src={track.cover} alt={track.title} className="track-cover" />
        <div className="track-details">
          <div className="track-title">{track.title}</div>
          <div className="track-artist">{track.artist}</div>
        </div>
      </div>

      <div className="track-album">{track.album}</div>

      <div className="track-duration">{track.duration}</div>

      <button
        className={`track-like ${isLiked ? "liked" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleLike(track.id);
        }}
      >
        {isLiked ? <IoHeart /> : <IoHeartOutline />}
      </button>
    </div>
  );
}

export default TrackItem;
