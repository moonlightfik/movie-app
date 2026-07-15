import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router-dom";
import "./layout.css";


const Navbar = () => {

  const navigate = useNavigate();
const location = useLocation();

  return (

    <header className="navbar">


      <div
        className="logo"
        onClick={() => navigate("/")}
      >
        CineStream
      </div>



      <nav className="nav-links">


        <span onClick={() => navigate("/")}>
          Movies
        </span>


        <span>
          TV Shows
        </span>


        <span
          onClick={() => navigate("/favorites")}
        >
          Favorites
        </span>


      </nav>


{location.pathname === "/browse" ? (
  <SearchBar />
) : (
  <div
    className="search-container"
    onClick={() => navigate("/browse")}
    style={{ cursor: "text" }}
  >
    <input
      className="search-input"
      placeholder="Search movies..."
      readOnly
    />
  </div>
)}

    </header>

  );

};


export default Navbar;