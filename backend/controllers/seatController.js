import pool from "../config/db.js";

export const getSeatsByShowtime = async (req, res) => {
  try {
    const { showtimeId } = req.params;

    const result = await pool.query(
      `
      SELECT 
        id,
        seat_no AS "seatNo",
        LEFT(seat_no, 1) AS row,
        is_reserved AS "isReserved"
      FROM seats
      WHERE showtime_id = $1
      ORDER BY 
        LEFT(seat_no, 1),
        CAST(SUBSTRING(seat_no FROM 2) AS INTEGER)
      `,
      [showtimeId]
    );

    const seats = result.rows.map((seat) => ({
      id: seat.seatNo,
      dbId: seat.id,
      row: seat.row,
      isReserved: seat.isReserved,
    }));

    res.json({ seats });
  } catch (error) {
    res.status(500).json({
      message: "Koltuklar alınamadı.",
      error: error.message,
    });
  }
};

export const reserveSeats = async (showtimeId, selectedSeats) => {
  await pool.query(
    `
    UPDATE seats
    SET is_reserved = true
    WHERE showtime_id = $1
    AND seat_no = ANY($2)
    `,
    [showtimeId, selectedSeats]
  );
};