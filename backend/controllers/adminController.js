import pool from "../config/db.js";

export const getAdminStats = async (req, res) => {
  try {
    const movies = await pool.query("SELECT COUNT(*) FROM movies");
    const showtimes = await pool.query("SELECT COUNT(*) FROM showtimes");
    const reservations = await pool.query("SELECT COUNT(*) FROM reservations");
    const users = await pool.query("SELECT COUNT(*) FROM users");

    res.json({
      movies: Number(movies.rows[0].count),
      showtimes: Number(showtimes.rows[0].count),
      reservations: Number(reservations.rows[0].count),
      users: Number(users.rows[0].count),
    });
  } catch (error) {
    res.status(500).json({
      message: "Admin istatistikleri alınamadı.",
      error: error.message,
    });
  }
};

export const getAdminUsers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, email, role, created_at
      FROM users
      ORDER BY id ASC
    `);

    res.json({ users: result.rows });
  } catch (error) {
    res.status(500).json({
      message: "Kullanıcılar alınamadı.",
      error: error.message,
    });
  }
};

export const getAdminReservations = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        r.id,
        u.name AS "userName",
        u.email AS "userEmail",
        m.title AS "movieTitle",
        st.date,
        st.time,
        st.hall,
        r.total_price AS "totalPrice",
        r.status,
        COALESCE(
          array_agg(s.seat_no ORDER BY s.seat_no)
          FILTER (WHERE s.seat_no IS NOT NULL),
          '{}'
        ) AS seats
      FROM reservations r
      JOIN users u ON u.id = r.user_id
      JOIN movies m ON m.id = r.movie_id
      JOIN showtimes st ON st.id = r.showtime_id
      LEFT JOIN reservation_seats rs ON rs.reservation_id = r.id
      LEFT JOIN seats s ON s.id = rs.seat_id
      GROUP BY r.id, u.name, u.email, m.title, st.date, st.time, st.hall
      ORDER BY r.id DESC
    `);

    res.json({ reservations: result.rows });
  } catch (error) {
    res.status(500).json({
      message: "Rezervasyonlar alınamadı.",
      error: error.message,
    });
  }
};