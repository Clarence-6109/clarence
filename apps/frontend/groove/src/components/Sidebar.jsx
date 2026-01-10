import {
  IoAdd,
  IoHeart,
  IoHome,
  IoLibrary,
  IoMusicalNotes,
  IoSearch,
  IoSettingsOutline,
} from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { featuredPlaylists } from "../data/mockData";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <IoMusicalNotes />
        </div>
        <span className="logo-text">Groove</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <IoHome />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <IoSearch />
          <span>Search</span>
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <IoLibrary />
          <span>Your Library</span>
        </NavLink>
      </nav>

      <div className="sidebar-divider" />

      <NavLink
        to="/liked"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        style={{ margin: "0 12px" }}
      >
        <IoHeart />
        <span>Liked Songs</span>
      </NavLink>

      <button className="create-playlist-btn">
        <IoAdd />
        <span>Create Playlist</span>
      </button>

      <div className="sidebar-divider" />

      <span className="sidebar-section-title">Playlists</span>

      <div className="sidebar-playlists">
        {featuredPlaylists.slice(0, 6).map((playlist) => (
          <Link
            key={playlist.id}
            to={`/playlist/${playlist.id}`}
            className="playlist-item"
          >
            <img
              src={playlist.cover}
              alt={playlist.title}
              className="playlist-item-cover"
            />
            <div className="playlist-item-info">
              <div className="playlist-item-title">{playlist.title}</div>
              <div className="playlist-item-type">Playlist</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">JD</div>
        <div className="user-info">
          <div className="user-name">John Doe</div>
          <div className="user-plan">Premium</div>
        </div>
        <IoSettingsOutline
          style={{ color: "var(--text-secondary)", cursor: "pointer" }}
        />
      </div>
    </aside>
  );
}

export default Sidebar;
