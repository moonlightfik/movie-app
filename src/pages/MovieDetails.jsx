import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  addFavorite,
  removeFavorite,
} from "../features/favorites/favoriteSlice";

import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieVideos,
  fetchRecommendations,
} from "../features/movies/movieAPI";

import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

const favorites = useSelector(
  (state) => state.favorites.favorites
);

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);

        const [movieData, creditData, videoData, recommendationData] =
          await Promise.all([
            fetchMovieDetails(id),
            fetchMovieCredits(id),
            fetchMovieVideos(id),
            fetchRecommendations(id),
          ]);

        setMovie(movieData);

        setCast(creditData.cast.slice(0, 10));

        const officialTrailer = videoData.results.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        );

        setTrailer(officialTrailer);

        setRecommendations(recommendationData.results.slice(0, 8));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
const isFavorite = favorites.some(
  (fav) => fav.id === movie.id
);
  return (
    <div className="details-page">

      {/* HERO */}

      <div
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.55),rgba(17,24,39,1)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <button
  className="back-btn"
  onClick={() =>
    navigate("/", {
      state: {
        page: location.state?.page || 1,
      },
    })
  }
>
  ← Back
</button>

        <div className="hero-content">

          <h1>{movie.title}</h1>

          <div className="meta">

            <span>⭐ {movie.vote_average.toFixed(1)}</span>

            <span>{movie.release_date}</span>

            <span>{movie.runtime} min</span>

          </div>

          <div className="genres">

            {movie.genres.map((genre) => (
              <span key={genre.id}>
                {genre.name}
              </span>
            ))}

          </div>

          <p>{movie.overview}</p>

          <div className="hero-buttons">

            {trailer && (
              <a
                href={`https://youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="watch-btn">
                  ▶ Play Trailer
                </button>
              </a>
            )}

           <button
  className={`favorite-btn ${
    isFavorite ? "active" : ""
  }`}
  onClick={() => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  }}
>
  {isFavorite ? "❤️ Remove Favorite" : "🤍 Add to Favorites"}
</button>

          </div>

        </div>

      </div>

      {/* DETAILS */}

      <section className="movie-extra">

        <h2>Movie Information</h2>

        <div className="info-grid">

          <div>
            <strong>Language</strong>
            <p>{movie.original_language.toUpperCase()}</p>
          </div>

          <div>
            <strong>Status</strong>
            <p>{movie.status}</p>
          </div>

          <div>
            <strong>Budget</strong>
            <p>${movie.budget.toLocaleString()}</p>
          </div>

          <div>
            <strong>Revenue</strong>
            <p>${movie.revenue.toLocaleString()}</p>
          </div>

          <div>
            <strong>Popularity</strong>
            <p>{movie.popularity}</p>
          </div>

        </div>

      </section>

      {/* CAST */}

      <section>

        <h2>Cast & Crew</h2>

        <div className="cast-row">

          {cast.map((actor) => (

            <div className="actor" key={actor.id}>

              <img
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={actor.name}
              />

              <h4>{actor.name}</h4>

              <p>{actor.character}</p>

            </div>

          ))}

        </div>

      </section>

      {/* RECOMMENDATIONS */}

      <section>

        <h2>More Like This</h2>

        <div className="recommend-grid">

          {recommendations.map((movie) => (

            <div
              key={movie.id}
              className="recommend-card"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >

              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />

              <h4>{movie.title}</h4>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
};

export default MovieDetails;