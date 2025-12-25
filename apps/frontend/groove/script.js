// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Sample data (in production, fetch from API like Spotify Web API)
  const songs = [
    {
      id: 1,
      title: "Song 1",
      artist: "Artist 1",
      albumArt: "https://via.placeholder.com/150",
      src: "https://example.com/song1.mp3",
    },
    {
      id: 2,
      title: "Song 2",
      artist: "Artist 2",
      albumArt: "https://via.placeholder.com/150",
      src: "https://example.com/song2.mp3",
    },
    {
      id: 3,
      title: "Song 3",
      artist: "Artist 3",
      albumArt: "https://via.placeholder.com/150",
      src: "https://example.com/song3.mp3",
    },
    // Add more
  ];

  const playlists = [
    { id: 1, name: "Playlist 1", songs: [1, 2] },
    { id: 2, name: "Playlist 2", songs: [3] },
  ];

  const audio = document.getElementById("audio-player");
  const playPauseBtn = document.getElementById("play-pause");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const progress = document.getElementById("progress");
  const volume = document.getElementById("volume");
  const songTitle = document.getElementById("song-title");
  const artist = document.getElementById("artist");
  const albumArt = document.getElementById("album-art");
  const searchInput = document.getElementById("search");
  const navLinks = document.querySelectorAll(".nav-links li");
  const views = document.querySelectorAll(".view");

  let currentPlaylist = songs;
  let currentIndex = 0;
  let isPlaying = false;
  let isShuffle = false;
  let isRepeat = false;

  // Render functions
  function renderPlaylists() {
    const playlistList = document.getElementById("playlist-list");
    playlistList.innerHTML = "";
    playlists.forEach((pl) => {
      const li = document.createElement("li");
      li.textContent = pl.name;
      li.addEventListener("click", () => showPlaylist(pl.id));
      playlistList.appendChild(li);
    });
  }

  function renderGrid(container, items, isPlaylist = false) {
    container.innerHTML = "";
    items.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
                <img src="\( {item.albumArt || 'https://via.placeholder.com/150'}" alt=" \){item.name || item.title}">
                <h3>${item.name || item.title}</h3>
                <p>${item.description || item.artist || "Playlist"}</p>
            `;
      if (isPlaylist) {
        card.addEventListener("click", () => showPlaylist(item.id));
      } else {
        card.addEventListener("click", () =>
          playSong(item.id, currentPlaylist)
        );
      }
      container.appendChild(card);
    });
  }

  // Navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const viewId = e.target.textContent
        .toLowerCase()
        .replace(" ", "-")
        .replace("your-", "");
      showView(viewId);
    });
  });

  function showView(viewId) {
    views.forEach((view) => view.classList.remove("active"));
    document.getElementById(viewId).classList.add("active");
    if (viewId === "home") {
      renderGrid(
        document.getElementById("featured-playlists"),
        playlists,
        true
      );
      renderGrid(document.getElementById("recently-played"), songs.slice(0, 6));
    } else if (viewId === "library") {
      renderGrid(document.getElementById("library-content"), playlists, true);
    }
  }

  // Playlist view
  function showPlaylist(playlistId) {
    const pl = playlists.find((p) => p.id === playlistId);
    if (!pl) return;
    currentPlaylist = pl.songs.map((sid) => songs.find((s) => s.id === sid));
    document.getElementById("playlist-title").textContent = pl.name;
    const songList = document.getElementById("playlist-songs");
    songList.innerHTML = "";
    currentPlaylist.forEach((song) => {
      const div = document.createElement("div");
      div.classList.add("song-item");
      div.textContent = `${song.title} - ${song.artist}`;
      div.addEventListener("click", () => playSong(song.id, currentPlaylist));
      songList.appendChild(div);
    });
    showView("playlist-view");
  }

  // Play song
  function playSong(songId, playlist) {
    const song = playlist.find((s) => s.id === songId);
    if (!song) return;
    currentIndex = playlist.indexOf(song);
    audio.src = song.src;
    audio.load();
    audio.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    albumArt.src = song.albumArt;
  }

  // Controls
  playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
      audio.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
  });

  prevBtn.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    playSong(currentPlaylist[currentIndex].id, currentPlaylist);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentPlaylist.length;
    playSong(currentPlaylist[currentIndex].id, currentPlaylist);
  });

  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      progress.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
  });

  volume.addEventListener("input", () => {
    audio.volume = volume.value;
  });

  audio.addEventListener("ended", () => {
    if (isRepeat) {
      audio.play();
    } else {
      nextBtn.click();
    }
  });

  document.getElementById("shuffle").addEventListener("click", () => {
    isShuffle = !isShuffle;
    // Implement shuffle logic if needed
  });

  document.getElementById("repeat").addEventListener("click", () => {
    isRepeat = !isRepeat;
  });

  // Search
  searchInput.addEventListener(
    "input",
    debounce(() => {
      const query = searchInput.value.toLowerCase();
      if (!query) return showView("home");
      showView("search-view");
      const results = songs.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.artist.toLowerCase().includes(query)
      );
      renderGrid(document.getElementById("search-results"), results);
    }, 300)
  );

  // Create playlist
  document.getElementById("create-playlist").addEventListener("click", () => {
    const name = prompt("Playlist name:");
    if (name) {
      const newPl = { id: playlists.length + 1, name, songs: [] };
      playlists.push(newPl);
      renderPlaylists();
    }
  });

  // Add song to playlist (simple, assumes current playlist view)
  document.getElementById("add-song").addEventListener("click", () => {
    const title = prompt("Song title:");
    if (title) {
      const newSong = {
        id: songs.length + 1,
        title,
        artist: "Unknown",
        albumArt: "https://via.placeholder.com/150",
        src: "",
      };
      songs.push(newSong);
      const currentPl = playlists.find(
        (p) => p.name === document.getElementById("playlist-title").textContent
      );
      currentPl.songs.push(newSong.id);
      showPlaylist(currentPl.id);
    }
  });

  // Debounce
  function debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  // Initial setup
  renderPlaylists();
  showView("home");
  // For real app, integrate Spotify API for data and playback (requires OAuth)
});
