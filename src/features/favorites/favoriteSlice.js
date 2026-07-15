import { createSlice } from "@reduxjs/toolkit";


const savedFavorites =
  JSON.parse(localStorage.getItem("favorites")) || [];


const initialState = {
  favorites: savedFavorites,
};


const favoriteSlice = createSlice({

  name: "favorites",

  initialState,


  reducers: {


    addFavorite: (state, action) => {

      const movie = action.payload;


      const exists = state.favorites.some(
        (fav) => fav.id === movie.id
      );


      if (!exists) {

        state.favorites.push(movie);


        localStorage.setItem(
          "favorites",
          JSON.stringify(state.favorites)
        );

      }

    },



    removeFavorite: (state, action) => {


      state.favorites =
        state.favorites.filter(
          (movie) =>
            movie.id !== action.payload
        );


      localStorage.setItem(

        "favorites",

        JSON.stringify(
          state.favorites
        )

      );


    },



  },

});



export const {
  addFavorite,
  removeFavorite,
} = favoriteSlice.actions;



export default favoriteSlice.reducer;