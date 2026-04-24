import pool from "../config/db.js";

export const getAllReservations = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        r.id,
        r.user_id AS "userId",
        m.title AS "movieTitle",
        s.date,
        s.time,
        s.hall,
        r.total_price AS "totalPrice",
        r.status,
        COALESCE(array_agg(se.seat_no) FILTER (WHERE se.seat_no IS NOT NULL), '{}') AS seats
      FROM reservations r
      JOIN showtimes s ON s.id = r.showtime_id
      JOIN movies m ON m.id = s.movie_id
      LEFT JOIN reservation_seats rs ON rs.reservation_id = r.id
      LEFT JOIN seats se ON se.id = rs.seat_id
      GROUP BY r.id, m.title, s.date, s.time, s.hall
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

export const createReservation = async (req, res) => {
  const { userId, showtimeId, seats, totalPrice } = req.body;

  try {
    const reservationResult = await pool.query(
      `
      INSERT INTO reservations
      (user_id, showtime_id, movie_id, total_price, status)
      SELECT $1, s.id, s.movie_id, $3, 'Onaylandı'
      FROM showtimes s
      WHERE s.id = $2
      RETURNING *
      `,
      [userId, showtimeId, totalPrice]
    );

    const reservation = reservationResult.rows[0];

    for (const seatNo of seats) {
      const seatResult = await pool.query(
        `
        SELECT id FROM seats
        WHERE showtime_id = $1 AND seat_no = $2
        `,
        [showtimeId, seatNo]
      );

      if (seatResult.rows.length > 0) {
        const seatId = seatResult.rows[0].id;

        await pool.query(
          `
          INSERT INTO reservation_seats
          (reservation_id, seat_id)
          VALUES ($1, $2)
          `,
          [reservation.id, seatId]
        );

        await pool.query(
          `
          UPDATE seats
          SET is_reserved = true
          WHERE id = $1
          `,
          [seatId]
        );
      }
    }

    res.status(201).json({
      message: "Rezervasyon oluşturuldu.",
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Rezervasyon başarısız.",
      error: error.message,
    });
  }
};