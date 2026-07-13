import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPopularMovies } from "./movieAPI";

export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (page = 1) => {
    return await fetchPopularMovies(page);
  }
);

const movieSlice = createSlice({
  name: "movies",

  initialState: {
    movies: [],
    currentPage: 1,
    totalPages: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;