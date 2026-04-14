import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import showtimes from "../../data/showtimes";
import movies from "../../data/movies";
import { getSeatsByShowtime } from "../../data/seats";
import "./SeatSelection.css";

const SeatSelection = () => {
  const { showtimeId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const showtime = showtimes.find(
    (item) => item.id === Number(showtimeId)
  );

  const movie = movies.find(
    (item) => item.id === showtime?.movieId
  );

  const seats = useMemo(() => {
    return getSeatsByShowtime(Number(showtimeId));
  }, [showtimeId]);

  const toggleSeat = (seat) => {
    if (seat.isReserved) return;

    const exists = selectedSeats.includes(seat.id);

    if (exists) {
      setSelectedSeats(selectedSeats.filter((item) => item !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  if (!showtime || !movie) {
    return (
      <section className="seat-selection">
        <div className="container">
          <h2>Seans bulunamadı.</h2>
        </div>
      </section>
    );
  }

  const totalPrice = selectedSeats.length * showtime.price;

  return (
    <section className="seat-selection">
      <div className="container">
        <div className="seat-selection__header">
          <p className="seat-selection__subtitle">Koltuk Seçimi</p>
          <h1 className="seat-selection__title">{movie.title}</h1>
          <p className="seat-selection__text">
            {showtime.date} • {showtime.time} • {showtime.hall} • {showtime.format}
          </p>
        </div>

        <div className="seat-selection__screen">PERDE</div>

        <div className="seat-selection__content">
          <div className="seat-selection__grid">
            {seats.map((seat) => {
              const isSelected = selectedSeats.includes(seat.id);

              return (
                <button
                  key={seat.id}
                  className={`seat 
                    ${seat.isReserved ? "seat--reserved" : ""}
                    ${isSelected ? "seat--selected" : ""}
                  `}
                  onClick={() => toggleSeat(seat)}
                >
                  {seat.id}
                </button>
              );
            })}
          </div>

          <div className="booking-summary">
            <h3 className="booking-summary__title">Rezervasyon Özeti</h3>

            <div className="booking-summary__row">
              <span>Film</span>
              <span>{movie.title}</span>
            </div>

            <div className="booking-summary__row">
              <span>Seans</span>
              <span>{showtime.time}</span>
            </div>

            <div className="booking-summary__row">
              <span>Salon</span>
              <span>{showtime.hall}</span>
            </div>

            <div className="booking-summary__row">
              <span>Seçili Koltuklar</span>
              <span>
                {selectedSeats.length > 0 ? selectedSeats.join(", ") : "-"}
              </span>
            </div>

            <div className="booking-summary__row booking-summary__row--total">
              <span>Toplam</span>
              <span>{totalPrice} ₺</span>
            </div>

            <button
              className="booking-summary__button"
              disabled={selectedSeats.length === 0}
            >
              Rezervasyonu Tamamla
            </button>

            <Link to={`/movies/${movie.id}/showtimes`} className="booking-summary__back">
              Seanslara Geri Dön
            </Link>
          </div>
        </div>

        <div className="seat-selection__legend">
          <div className="seat-selection__legend-item">
            <span className="seat-selection__legend-box"></span>
            <span>Boş</span>
          </div>
          <div className="seat-selection__legend-item">
            <span className="seat-selection__legend-box seat-selection__legend-box--selected"></span>
            <span>Seçili</span>
          </div>
          <div className="seat-selection__legend-item">
            <span className="seat-selection__legend-box seat-selection__legend-box--reserved"></span>
            <span>Dolu</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeatSelection;