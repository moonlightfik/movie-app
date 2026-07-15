import { useNavigate } from "react-router-dom";
import "./layout.css";


const Navbar = () => {

  const navigate = useNavigate();


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



      <input

        className="search"

        placeholder="Search titles, actors..."

        onFocus={() => navigate("/browse")}

      />


    </header>

  );

};


export default Navbar;