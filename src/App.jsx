import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchSongs = async () => {
    if (!query.trim()) return;

    setLoading(true);

    const res = await fetch(
      `https://itunes.apple.com/search?term=${query}&media=music&limit=10`
    );
    const data = await res.json();

    setSongs(data.results);
    setLoading(false);
  };

  return (
    <div className="app">
      <div className="card">
        <h1>🎵 Song Search</h1>

        <div className="search">
          <input
            placeholder="Search song or artist"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={searchSongs}>Search</button>
        </div>

        {loading && <p className="loading">Loading...</p>}

        <ul className="list">
          {songs.map((song) => (
            <li key={song.trackId} className="item">
              <strong>{song.trackName}</strong>
              <span>{song.artistName}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
