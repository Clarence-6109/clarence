import { useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import AlbumCard from "../components/AlbumCard";
import TrackItem from "../components/TrackItem";
import { artists, featuredPlaylists, genres, tracks } from "../data/mockData";
import "../styles/Search.css";

function Search() {
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;

    const q = query.toLowerCase();

    return {
      tracks: tracks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.artist.toLowerCase().includes(q)
      ),
      playlists: featuredPlaylists.filter((p) =>
        p.title.toLowerCase().includes(q)
      ),
      artists: artists.filter((a) => a.name.toLowerCase().includes(q)),
    };
  }, [query]);

  const hasResults =
    searchResults &&
    (searchResults.tracks.length > 0 ||
      searchResults.playlists.length > 0 ||
      searchResults.artists.length > 0);

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <IoSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {searchResults ? (
        hasResults ? (
          <div className="search-results">
            {searchResults.tracks.length > 0 && (
              <section className="home-section">
                <h2 className="section-title">Songs</h2>
                {searchResults.tracks.map((track, index) => (
                  <TrackItem
                    key={track.id}
                    track={track}
                    index={index}
                    trackList={searchResults.tracks}
                  />
                ))}
              </section>
            )}

            {searchResults.artists.length > 0 && (
              <section className="home-section">
                <h2 className="section-title">Artists</h2>
                <div className="card-grid">
                  {searchResults.artists.map((artist) => (
                    <AlbumCard key={artist.id} item={artist} />
                  ))}
                </div>
              </section>
            )}

            {searchResults.playlists.length > 0 && (
              <section className="home-section">
                <h2 className="section-title">Playlists</h2>
                <div className="card-grid">
                  {searchResults.playlists.map((playlist) => (
                    <AlbumCard key={playlist.id} item={playlist} />
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="search-no-results">
            <h3>No results found for "{query}"</h3>
            <p>Please check your spelling or try different keywords.</p>
          </div>
        )
      ) : (
        <>
          <h2 className="section-title">Browse All</h2>
          <div className="genre-grid">
            {genres.map((genre) => (
              <div
                key={genre.id}
                className="genre-card"
                style={{ backgroundColor: genre.color }}
              >
                <span className="genre-card-title">{genre.name}</span>
                <img
                  src={genre.image}
                  alt={genre.name}
                  className="genre-card-image"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
