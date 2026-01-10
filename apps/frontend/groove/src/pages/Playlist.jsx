import {
  IoDownloadOutline,
  IoEllipsisHorizontal,
  IoHeartOutline,
  IoPlay,
  IoShuffle,
} from "react-icons/io5";
import { useParams } from "react-router-dom";
import TrackItem from "../components/TrackItem";
import { usePlayer } from "../context/PlayerContext";
import { featuredPlaylists, recentlyPlayed, tracks } from "../data/mockData";
import "../styles/Playlist.css";

function Playlist() {
  const { id } = useParams();
  const { playTrack } = usePlayer();

  const allPlaylists = [...featuredPlaylists, ...recentlyPlayed];
  const playlist =
    allPlaylists.find((p) => p.id === parseInt(id)) || allPlaylists[0];

  const handlePlayAll = () => {
    playTrack(tracks[0], tracks);
  };

  const handleShuffle = () => {
    const shuffled = [...tracks].sort(() => Math.random() - 0.5);
    playTrack(shuffled[0], shuffled);
  };

  return (
    <div className="playlist-page">
      <div className="playlist-hero">
        <img
          src={playlist.cover}
          alt={playlist.title}
          className="playlist-cover"
        />
        <div className="playlist-info">
          <span className="playlist-type">Playlist</span>
          <h1 className="playlist-title">{playlist.title}</h1>
          <p className="playlist-description">{playlist.description}</p>
          <div className="playlist-meta">
            <strong>Groove</strong>
            <span>•</span>
            <span>{playlist.tracks} songs</span>
            <span>•</span>
            <span>about 2 hr 30 min</span>
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
        <button className="action-btn">
          <IoHeartOutline />
        </button>
        <button className="action-btn">
          <IoEllipsisHorizontal />
        </button>
      </div>

      <div className="playlist-tracks">
        <div className="track-list-header">
          <span>#</span>
          <span>Title</span>
          <span>Album</span>
          <span>Duration</span>
          <span></span>
        </div>
        {tracks.map((track, index) => (
          <TrackItem
            key={track.id}
            track={track}
            index={index}
            trackList={tracks}
          />
        ))}
      </div>
    </div>
  );
}

export default Playlist;
