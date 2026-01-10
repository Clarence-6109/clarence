import { Route, Routes } from "react-router-dom";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Library from "./pages/Library";
import LikedSongs from "./pages/LikedSongs";
import Playlist from "./pages/Playlist";
import Search from "./pages/Search";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-container">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/liked" element={<LikedSongs />} />
          </Routes>
        </div>
      </div>
      <Player />
    </div>
  );
}

export default App;
