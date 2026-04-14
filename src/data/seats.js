const rows = ["A", "B", "C", "D", "E", "F"];
const seatsPerRow = 8;

const reservedMap = {
  1: ["A2", "A3", "B4", "C6"],
  2: ["A1", "B2", "C3", "D5", "E6"],
  3: ["A4", "B5", "C2"],
  4: ["A1", "A2", "F8"],
  5: ["C4", "C5", "D4", "D5"],
  6: ["B3", "E7"],
  7: ["A8", "B8", "C8"],
};

export const getSeatsByShowtime = (showtimeId) => {
  const reservedSeats = reservedMap[showtimeId] || [];

  return rows.flatMap((row) =>
    Array.from({ length: seatsPerRow }, (_, index) => {
      const seatNumber = index + 1;
      const seatCode = `${row}${seatNumber}`;

      return {
        id: seatCode,
        row,
        number: seatNumber,
        isReserved: reservedSeats.includes(seatCode),
      };
    })
  );
};