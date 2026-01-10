import { IoPlay } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import { tracks } from "../data/mockData";
import "../styles/AlbumCard.css";

function AlbumCard({ item }) {
  const navigate = useNavigate();
  const { playTrack } = usePlayer();

  const handleClick = () => {
    if (item.type === "playlist") {
      navigate(`/playlist/${item.id}`);
    }
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    // Play first track from this playlist/album
    playTrack(tracks[0], tracks);
  };

  return (
    <div className={`album-card ${item.type}`} onClick={handleClick}>
      <div className="album-card-cover-container">
        <img
          src={item.cover || item.image}
          alt={item.title || item.name}
          className="album-card-cover"
        />
        <button className="album-card-play" onClick={handlePlay}>
          <IoPlay style={{ marginLeft: 2 }} />
        </button>
      </div>
      <div className="album-card-content">
        <h3 className="album-card-title">{item.title || item.name}</h3>
        <p className="album-card-subtitle">
          {item.description || item.artist || `${item.followers} followers`}
        </p>
      </div>
    </div>
  );
}

export default AlbumCard;
