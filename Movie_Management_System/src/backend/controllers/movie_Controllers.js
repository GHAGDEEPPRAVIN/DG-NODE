import Movie from "../modal/movie_Modal.js";

export const addMovie = async (req, res) => {
    try {
        const movieData = {
            ...req.body,
            poster: req.file ? req.file.filename : null
        };

        const newMovie = await Movie.create(movieData);

        res.status(201).json({
            message: "Movie added successfully",
            movie: newMovie
        });
    } catch (error) {
        console.error("SERVER ERROR:", error);
        res.status(500).json({ message: "Adding Movie Failed", error: error.message });
    }
};

export const getMovie = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Fetching Movies Failed" });
    }
};

export const updateMovie = async (req, res) => {
    try {
        const movieData = { ...req.body };

        if (req.file) {
            movieData.poster = req.file.filename;
        }

        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            movieData,
            { new: true }
        );

        res.json({ message: "Movie updated successfully", movie: updatedMovie });
    } catch (error) {
        res.status(500).json({ message: "Updating Movie Failed" });
    }
};

export const deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Deleting Movie Failed" });
    }
};
