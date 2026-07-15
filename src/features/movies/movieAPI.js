import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const movieAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

// Popular Movies
export const fetchPopularMovies = async (page = 1) => {
  const response = await movieAPI.get(
    `/movie/popular?api_key=${API_KEY}&page=${page}`
  );

  return response.data;
};

// Movie Details
export const fetchMovieDetails = async (id) => {
  const response = await movieAPI.get(
    `/movie/${id}?api_key=${API_KEY}`
  );

  return response.data;
};

// Movie Cast
export const fetchMovieCredits = async (id) => {
  const response = await movieAPI.get(
    `/movie/${id}/credits?api_key=${API_KEY}`
  );

  return response.data;
};

// Trailer
export const fetchMovieVideos = async (id) => {
  const response = await movieAPI.get(
    `/movie/${id}/videos?api_key=${API_KEY}`
  );

  return response.data;
};

// Similar Movies
export const fetchRecommendations = async (id) => {
  const response = await movieAPI.get(
    `/movie/${id}/recommendations?api_key=${API_KEY}`
  );

  return response.data;
};

// Search
export const searchMovies = async (query) => {
  const response = await movieAPI.get(
    `/search/movie?api_key=${API_KEY}&query=${query}`
  );

  return response.data.results;
};