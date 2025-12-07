import React, { useState } from "react";
import axios from "axios";
import "./AddMovie.css";

export default function AddMovie() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    releaseYear: ""
  });

  const [posterFile, setPosterFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setPosterFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = new FormData();
    movieData.append("title", formData.title);
    movieData.append("description", formData.description);
    movieData.append("genre", formData.genre);
    movieData.append("releaseYear", formData.releaseYear);
    movieData.append("poster", posterFile);

    try {
      await axios.post("http://localhost:1234/api/movies/add", movieData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Movie Added Successfully!");

      setFormData({
        title: "",
        description: "",
        genre: "",
        releaseYear: ""
      });
      setPosterFile(null);

    } catch (error) {
      console.error(error);
      alert("Error adding movie!");
    }
  };

  return (
    <div className="add-form-container">
      <h2>Add Movie</h2>

      <form className="add-form" onSubmit={handleSubmit}>
        
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter movie title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <label>Genre</label>
        <input
          type="text"
          name="genre"
          placeholder="Enter genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />

        <label>Release Year</label>
        <input
          type="number"
          name="releaseYear"
          placeholder="Enter release year"
          value={formData.releaseYear}
          onChange={handleChange}
          required
        />

        <label>Poster</label>
        <input
          type="file"
          name="poster"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}
