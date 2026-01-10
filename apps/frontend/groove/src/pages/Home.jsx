import { IoPlay } from "react-icons/io5";
import { Link } from "react-router-dom";
import AlbumCard from "../components/AlbumCard";
import { usePlayer } from "../context/PlayerContext";
import {
  albums,
  artists,
  featuredPlaylists,
  recentlyPlayed,
  tracks,
} from "../data/mockData";
import "../styles/Home.css";

function Home() {
  const { playTrack } = usePlayer();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const formatDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const handleQuickPlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    playTrack(tracks[0], tracks);
  };

  return (
    <div className="home">
      <header className="home-header">
        <h1 className="home-greeting">{getGreeting()}</h1>
        <p className="home-date">{formatDate()}</p>
      </header>

      <div className="quick-play-grid">
        {recentlyPlayed.slice(0, 6).map((item) => (
          <Link
            key={item.id}
            to={`/playlist/${item.id}`}
            className="quick-play-card"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              src={item.cover}
              alt={item.title}
              className="quick-play-cover"
            />
            <span className="quick-play-title">{item.title}</span>
            <button className="quick-play-btn" onClick={handleQuickPlay}>
              <IoPlay style={{ marginLeft: 2 }} />
            </button>
          </Link>
        ))}
      </div>

      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">Featured Playlists</h2>
          <Link to="/library" className="section-link">
            Show all
          </Link>
        </div>
        <div className="card-grid">
          {featuredPlaylists.map((playlist) => (
            <AlbumCard key={playlist.id} item={playlist} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">Popular Artists</h2>
          <Link to="/library" className="section-link">
            Show all
          </Link>
        </div>
        <div className="artist-row">
          {artists.map((artist) => (
            <div key={artist.id} className="artist-item">
              <img
                src={artist.image}
                alt={artist.name}
                className="artist-image"
              />
              <div className="artist-name">{artist.name}</div>
              <div className="artist-type">Artist</div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">New Releases</h2>
          <Link to="/library" className="section-link">
            Show all
          </Link>
        </div>
        <div className="card-grid">
          {albums.map((album) => (
            <AlbumCard key={album.id} item={album} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
