import { useState } from "react";
import { IoAdd, IoGrid, IoList } from "react-icons/io5";
import { Link } from "react-router-dom";
import AlbumCard from "../components/AlbumCard";
import { artists, featuredPlaylists, recentlyPlayed } from "../data/mockData";
import "../styles/Library.css";

function Library() {
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const allItems = [
    ...featuredPlaylists.map((p) => ({ ...p, itemType: "playlist" })),
    ...recentlyPlayed.map((p) => ({ ...p, itemType: "playlist" })),
    ...artists.map((a) => ({ ...a, itemType: "artist" })),
  ];

  const filteredItems = allItems.filter((item) => {
    if (filter === "all") return true;
    if (filter === "playlists") return item.itemType === "playlist";
    if (filter === "artists") return item.itemType === "artist";
    return true;
  });

  return (
    <div className="library">
      <div className="library-header">
        <h1 className="section-title" style={{ marginBottom: 0 }}>
          Your Library
        </h1>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <button className="btn-icon">
            <IoAdd />
          </button>
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <IoList />
            </button>
            <button
              className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <IoGrid />
            </button>
          </div>
        </div>
      </div>

      <div className="library-filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === "playlists" ? "active" : ""}`}
          onClick={() => setFilter("playlists")}
        >
          Playlists
        </button>
        <button
          className={`filter-btn ${filter === "artists" ? "active" : ""}`}
          onClick={() => setFilter("artists")}
        >
          Artists
        </button>
      </div>

      {viewMode === "grid" ? (
        <div className="library-grid">
          {filteredItems.map((item, index) => (
            <AlbumCard
              key={`${item.itemType}-${item.id}-${index}`}
              item={item}
            />
          ))}
        </div>
      ) : (
        <div className="library-list">
          {filteredItems.map((item, index) => (
            <Link
              key={`${item.itemType}-${item.id}-${index}`}
              to={item.itemType === "playlist" ? `/playlist/${item.id}` : "#"}
              className="library-item"
            >
              <img
                src={item.cover || item.image}
                alt={item.title || item.name}
                className={`library-item-cover ${
                  item.itemType === "artist" ? "artist" : ""
                }`}
              />
              <div className="library-item-info">
                <div className="library-item-title">
                  {item.title || item.name}
                </div>
                <div className="library-item-meta">
                  {item.itemType === "playlist"
                    ? `Playlist • ${item.tracks} songs`
                    : "Artist"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Library;
