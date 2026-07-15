import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import MovieList from "./features/movies/MovieList";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import Browse from "./pages/Browse";




function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <main className="content">

        <Routes>

          <Route
            path="/"
            element={<MovieList />}
          />


          <Route
            path="/favorites"
            element={<Favorites />}
          />


          <Route
            path="/browse"
            element={<Browse />}
          />
          <Route
            path="/movie/:id"
            element={<MovieDetails />}
/>

        </Routes>

      </main>


      <Footer />

    </BrowserRouter>

  );
}


export default App;