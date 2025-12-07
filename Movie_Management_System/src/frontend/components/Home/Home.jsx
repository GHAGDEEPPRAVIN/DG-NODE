import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";  


export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:1234/api/movies");
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:1234/api/movies/delete/${id}`);
      fetchMovies();
    } catch (err) {
      console.error(err);
    }
  };

  const editMovie = (id) => {
    navigate(`/edit/${id}`);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const moviePosterImage = (poster) => `./src/backend/uploads/${poster}`;

  return (
    <div className="home-container">
      <h1 className="page-title">Movies</h1>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />

      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <div className="movie-card" key={movie._id}>
            {movie.poster && (
              <img
                src={moviePosterImage(movie.poster)}
                alt="poster"
                className="movie-poster"
              />
            )}

            <h2 className="movie-title">
              {movie.title} <span>({movie.releaseYear})</span>
            </h2>

            <p className="movie-genre"><strong>Genre:</strong> {movie.genre}</p>

            <p className="movie-desc">
              <strong>Description:</strong> {movie.description}
            </p>

            <div className="card-buttons">
              <button className="edit-btn" onClick={() => editMovie(movie._id)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => deleteMovie(movie._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && <p>No movies found.</p>}
    </div>
  );
}
