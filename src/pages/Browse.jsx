import { useEffect,useState } from "react";

import {

fetchTrendingMovies,

fetchTopRatedMovies,

fetchNowPlayingMovies,

fetchGenres,

searchMovies

} from "../features/movies/movieAPI";

import { useNavigate,useSearchParams } from "react-router-dom";

import "./Browse.css";

const Browse=()=>{

const navigate=useNavigate();

const [params]=useSearchParams();

const query=params.get("q");

const [trending,setTrending]=useState([]);

const [topRated,setTopRated]=useState([]);

const [nowPlaying,setNowPlaying]=useState([]);

const [genres,setGenres]=useState([]);

const [results,setResults]=useState([]);

useEffect(()=>{

const load=async()=>{

setTrending(await fetchTrendingMovies());

setTopRated(await fetchTopRatedMovies());

setNowPlaying(await fetchNowPlayingMovies());

setGenres(await fetchGenres());

if(query){

setResults(await searchMovies(query));

}

};

load();

},[query]);

const MovieRow=(title,movies)=>(

<>

<h2>{title}</h2>

<div className="movie-row">

{movies.slice(0,10).map(movie=>(

<img

key={movie.id}

src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}

onClick={()=>navigate(`/movie/${movie.id}`)}

/>

))}

</div>

</>

);

return(

<div className="browse">

<h1>Browse Movies</h1>

{query&&MovieRow(`Search Results for "${query}"`,results)}

{MovieRow("🔥 Trending",trending)}

{MovieRow("⭐ Top Rated",topRated)}

{MovieRow("🍿 Now Playing",nowPlaying)}

<h2>🎭 Genres</h2>

<div className="genres">

{genres.map(genre=>(

<span key={genre.id}>

{genre.name}

</span>

))}

</div>

</div>

);

};

export default Browse;