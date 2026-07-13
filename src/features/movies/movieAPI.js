import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const movieAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const fetchPopularMovies = async (page = 1) => {
  const response = await movieAPI.get(
    `/movie/popular?api_key=${API_KEY}&page=${page}`
  );

  return response.data;
};