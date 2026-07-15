import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getMovies } from "./movieSlice";
import {
  addFavorite,
  removeFavorite,
} from "../favorites/favoriteSlice";

import "./movie.css";

const MovieList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
  } = useSelector((state) => state.movies);

  const favorites = useSelector(
    (state) => state.favorites.favorites
  );

  useEffect(() => {
    dispatch(getMovies(1));
  }, [dispatch]);

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (error) {
    return <h2 className="error">{error}</h2>;
  }

  return (
    <div className="movie-page">
      <div className="container">
        <h1 className="title">🎬 Popular Movies</h1>

        <div className="grid">
          {movies.map((movie) => {
            const isFavorite = favorites.some(
              (fav) => fav.id === movie.id
            );

            return (
              <div className="card" key={movie.id}>

                {/* Clickable Area */}
                <div
                  className="movie-clickable"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className="poster"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />

                  <div className="info">
                    <h3>{movie.title}</h3>

                    <p>⭐ {movie.vote_average}</p>

                    <p>{movie.release_date}</p>
                  </div>
                </div>

                {/* Favorite Button */}
                <div style={{ padding: "16px" }}>
                  <button
                    className="favorite-btn"
                    type="button"
                    onClick={() => {
                      if (isFavorite) {
                        dispatch(removeFavorite(movie.id));
                      } else {
                        dispatch(addFavorite(movie));
                      }
                    }}
                  >
                    {isFavorite
                      ? "❤️ Remove Favorite"
                      : "🤍 Add to Favorites"}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        <div className="pagination">
          <button
            onClick={() => dispatch(getMovies(currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => dispatch(getMovies(currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieList;