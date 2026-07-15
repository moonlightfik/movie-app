import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../features/movies/movieAPI";
import "./SearchBar.css";

const SearchBar = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      const movies = await searchMovies(query);
      setResults(movies.slice(0, 6));
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="search-container">
      <input
        ref={inputRef}
        className="search-input"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length > 0 && (
        <div className="search-results">
          {results.map((movie) => (
            <div
              key={movie.id}
              className="search-item"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />

              <div>
                <h4>{movie.title}</h4>
                <p>{movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;