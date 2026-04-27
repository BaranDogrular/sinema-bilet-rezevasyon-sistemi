import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./MyReservations.css";

const MyReservations = () => {
  const { user, isAuthenticated } = useAuth();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "http://localhost:5000/api/reservations"
        );

        const userReservations = response.data.reservations.filter(
          (reservation) => reservation.userId === user?.id
        );

        setReservations(userReservations);
      } catch (error) {
        console.error("Rezervasyonlar alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchReservations();
    }
  }, [user]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <section className="reservations-page">
        <div className="container">
          <h2>Rezervasyonlar yükleniyor...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="reservations-page">
      <div className="container">
        <div className="reservations-page__header">
          <p className="reservations-page__subtitle">Biletlerim</p>
          <h1 className="reservations-page__title">Rezervasyonlarım</h1>
          <p className="reservations-page__text">
            Satın aldığın veya ayırttığın tüm biletleri burada görüntüleyebilirsin.
          </p>
        </div>

        <div className="reservations-page__list">
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <div className="reservation-card" key={reservation.id}>
                <div className="reservation-card__top">
                  <h3 className="reservation-card__title">
                    {reservation.movieTitle}
                  </h3>
                  <span className="reservation-card__status">
                    {reservation.status}
                  </span>
                </div>

                <div className="reservation-card__details">
                  <div>
                    <span>Tarih</span>
                    <strong>{reservation.date}</strong>
                  </div>

                  <div>
                    <span>Saat</span>
                    <strong>{reservation.time}</strong>
                  </div>

                  <div>
                    <span>Salon</span>
                    <strong>{reservation.hall}</strong>
                  </div>

                  <div>
                    <span>Koltuklar</span>
                    <strong>{reservation.seats.join(", ")}</strong>
                  </div>

                  <div>
                    <span>Toplam</span>
                    <strong>{reservation.totalPrice} ₺</strong>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="reservations-page__empty">
              Henüz bir rezervasyon bulunmuyor.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyReservations;