import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditMovie.css"; // <-- Add CSS

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    releaseYear: "",
    poster: null,
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:1234/api/movies`);
        const movie = res.data.find((m) => m._id === id);

        if (movie) {
          setFormData({
            title: movie.title,
            description: movie.description,
            genre: movie.genre,
            releaseYear: movie.releaseYear,
            poster: null,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "poster") {
      setFormData({ ...formData, poster: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("genre", formData.genre);
    data.append("releaseYear", formData.releaseYear);

    if (formData.poster) {
      data.append("poster", formData.poster);
    }

    try {
      await axios.put(
        `http://localhost:1234/api/movies/update/${id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="edit-container">
      <h1>Edit Movie</h1>

      <form className="edit-form" onSubmit={handleUpdate}>

        <label>Title</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
        />

        <label>Description</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
        ></textarea>

        <label>Genre</label>
        <input 
          type="text" 
          name="genre" 
          value={formData.genre} 
          onChange={handleChange} 
          required 
        />

        <label>Release Year</label>
        <input 
          type="number" 
          name="releaseYear" 
          value={formData.releaseYear} 
          onChange={handleChange} 
          required 
        />

        <label>Poster (Optional)</label>
        <input 
          type="file" 
          name="poster" 
          onChange={handleChange}
        />

        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
}
