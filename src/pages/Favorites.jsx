import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../features/favorites/favoriteSlice";
import { useNavigate } from "react-router-dom";
import "../features/movies/movie.css";


const Favorites = () => {

  const dispatch = useDispatch();


  const favorites = useSelector(
    (state) => state.favorites.favorites
  );

const navigate = useNavigate();
  if (favorites.length === 0) {

    return (
      <div className="container">

        <h1 className="title">
          ❤️ Favorites
        </h1>

        <h2>
          No favorite movies yet
        </h2>

      </div>
    );

  }



  return (

    <div className="container">

      <h1 className="title">
        ❤️ My Favorite Movies
      </h1>



      <div className="grid">


        {favorites.map((movie) => (

         <div
  className="card"
  key={movie.id}
  onClick={() => navigate(`/movie/${movie.id}`, {
  state:{
    from:"favorites"
  }
})}
>

            <img

              className="poster"

              src={
                `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              }

              alt={movie.title}

            />



            <div className="info">


              <h3>
                {movie.title}
              </h3>



              <p>
                ⭐ {movie.vote_average}
              </p>



              <p>
                {movie.release_date}
              </p>


<button
  className="favorite-btn"
  onClick={(e) => {
    e.stopPropagation();
    dispatch(removeFavorite(movie.id));
  }}
>
 ❌ Remove Favorite
</button>


            </div>


          </div>


        ))}


      </div>


    </div>

  );

};


export default Favorites;