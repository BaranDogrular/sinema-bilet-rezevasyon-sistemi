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
    status: movie.status,
    trailerUrl: movie.trailer_url,
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

export const getNowShowingMovies = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM movies
      WHERE status = 'now_showing'
      ORDER BY id ASC
    `);

    const movies = result.rows.map(formatMovie);

    res.json({ movies });
  } catch (error) {
    res.status(500).json({
      message: "Vizyondaki filmler alınamadı.",
      error: error.message,
    });
  }
};

export const getComingSoonMovies = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM movies
      WHERE status = 'coming_soon'
      ORDER BY id ASC
    `);

    const movies = result.rows.map(formatMovie);

    res.json({ movies });
  } catch (error) {
    res.status(500).json({
      message: "Yakında gelecek filmler alınamadı.",
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

export const createMovie = async (req, res) => {
  try {
    const {
      tmdbId,
      title,
      genre,
      duration,
      rating,
      image,
      description,
      releaseDate,
      status = "now_showing",
      trailerUrl = null,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO movies
      (tmdb_id, title, genre, duration, rating, image, description, release_date, status, trailer_url)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
      `,
      [
        tmdbId,
        title,
        genre,
        duration,
        rating,
        image,
        description,
        releaseDate,
        status,
        trailerUrl,
      ]
    );

    res.status(201).json({
      message: "Film eklendi.",
      movie: formatMovie(result.rows[0]),
    });
  } catch (error) {
    res.status(500).json({
      message: "Film eklenemedi.",
      error: error.message,
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(`DELETE FROM movies WHERE id = $1 OR tmdb_id = $1`, [
      Number(id),
    ]);

    res.json({
      message: "Film silindi.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Film silinemedi.",
      error: error.message,
    });
  }
};