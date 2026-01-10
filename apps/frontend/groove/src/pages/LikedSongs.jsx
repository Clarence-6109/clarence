import { IoDownloadOutline, IoPlay, IoShuffle } from "react-icons/io5";
import TrackItem from "../components/TrackItem";
import { usePlayer } from "../context/PlayerContext";
import { tracks } from "../data/mockData";
import "../styles/Playlist.css";

function LikedSongs() {
  const { likedSongs, playTrack } = usePlayer();

  const likedTracks = tracks.filter((t) => likedSongs.includes(t.id));

  const handlePlayAll = () => {
    if (likedTracks.length > 0) {
      playTrack(likedTracks[0], likedTracks);
    }
  };

  const handleShuffle = () => {
    if (likedTracks.length > 0) {
      const shuffled = [...likedTracks].sort(() => Math.random() - 0.5);
      playTrack(shuffled[0], shuffled);
    }
  };

  return (
    <div className="playlist-page">
      <div
        className="playlist-hero"
        style={{
          background:
            "linear-gradient(180deg, rgba(236, 72, 153, 0.4) 0%, transparent 100%)",
        }}
      >
        <div
          className="playlist-cover"
          style={{
            background: "linear-gradient(135deg, #5b21b6 0%, #ec4899 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 80,
          }}
        >
          ❤️
        </div>
        <div className="playlist-info">
          <span className="playlist-type">Playlist</span>
          <h1 className="playlist-title">Liked Songs</h1>
          <div className="playlist-meta">
            <strong>John Doe</strong>
            <span>•</span>
            <span>{likedTracks.length} songs</span>
          </div>
        </div>
      </div>

      <div className="playlist-actions">
        <button className="play-all-btn" onClick={handlePlayAll}>
          <IoPlay style={{ marginLeft: 3 }} />
        </button>
        <button className="action-btn" onClick={handleShuffle}>
          <IoShuffle />
        </button>
        <button className="action-btn">
          <IoDownloadOutline />
        </button>
      </div>

      {likedTracks.length > 0 ? (
        <div className="playlist-tracks">
          <div className="track-list-header">
            <span>#</span>
            <span>Title</span>
            <span>Album</span>
            <span>Duration</span>
            <span></span>
          </div>
          {likedTracks.map((track, index) => (
            <TrackItem
              key={track.id}
              track={track}
              index={index}
              trackList={likedTracks}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "var(--text-secondary)",
          }}
        >
          <h3
            style={{
              fontSize: 24,
              marginBottom: 12,
              color: "var(--text-primary)",
            }}
          >
            Songs you like will appear here
          </h3>
          <p>Save songs by tapping the heart icon.</p>
        </div>
      )}
    </div>
  );
}

export default LikedSongs;
