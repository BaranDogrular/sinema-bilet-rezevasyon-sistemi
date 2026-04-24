import pool from "../config/db.js";

const formatMovie = (movie) => {
  return {
    id: movie.id,
    tmdbId: movie.tmdb_id,
    title: movie.title,
    genre: movie.genre,
    duration: movie.duration,
    rating: movie.rating,
    image: movie.image,
    description: movie.description,
    releaseDate: movie.release_date,
  };
};

export const getAllMovies = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM movies
      ORDER BY id ASC
    `);

    const movies = result.rows.map(formatMovie);

    res.json({ movies });
  } catch (error) {
    res.status(500).json({
      message: "Filmler alınamadı.",
      error: error.message,
    });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM movies
      WHERE id = $1 OR tmdb_id = $1
      `,
      [Number(id)]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Film bulunamadı.",
      });
    }

    res.json(formatMovie(result.rows[0]));
  } catch (error) {
    res.status(500).json({
      message: "Film alınamadı.",
      error: error.message,
    });
  }
};