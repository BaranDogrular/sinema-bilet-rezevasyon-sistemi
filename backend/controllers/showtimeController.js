import pool from "../config/db.js";

export const getAllShowtimes = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        showtimes.id,
        showtimes.movie_id AS "movieId",
        movies.tmdb_id AS "tmdbId",
        movies.title AS "movieTitle",
        showtimes.hall,
        showtimes.date,
        showtimes.time,
        showtimes.price,
        showtimes.format
      FROM showtimes
      JOIN movies ON movies.id = showtimes.movie_id
      ORDER BY showtimes.id ASC
    `);

    res.json({ showtimes: result.rows });
  } catch (error) {
    res.status(500).json({
      message: "Seanslar alınamadı.",
      error: error.message,
    });
  }
};

export const getShowtimeById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        showtimes.id,
        showtimes.movie_id AS "movieId",
        movies.tmdb_id AS "tmdbId",
        movies.title AS "movieTitle",
        showtimes.hall,
        showtimes.date,
        showtimes.time,
        showtimes.price,
        showtimes.format
      FROM showtimes
      JOIN movies ON movies.id = showtimes.movie_id
      WHERE showtimes.movie_id = (
      SELECT id FROM movies WHERE id = $1 OR tmdb_id = $1
    )
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Seans bulunamadı." });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Seans alınamadı.",
      error: error.message,
    });
  }
};