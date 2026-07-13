import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "./movieSlice";
import "./movie.css";

const MovieList = () => {
  const dispatch = useDispatch();

  const {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getMovies(1));
  }, [dispatch]);

  if (loading) return <h2 className="loading">Loading...</h2>;

  if (error) return <h2 className="error">{error}</h2>;

  return (
    <div className="container">
      <h1 className="title">🎬 Popular Movies</h1>

      <div className="grid">
        {movies.map((movie) => (
          <div className="card" key={movie.id}>
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
        ))}
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
  );
};

export default MovieList;