import { Link } from "react-router-dom";
import movies from "../../data/movies";
import showtimes from "../../data/showtimes";
import reservations from "../../data/reservations";
import "./Admin.css";

const AdminDashboard = () => {
  const totalRevenue = reservations.reduce(
    (sum, reservation) => sum + reservation.totalPrice,
    0
  );

  return (
    <section className="admin-page">
      <div className="container">
        <div className="admin-page__header">
          <p className="admin-page__subtitle">Yönetim Paneli</p>
          <h1 className="admin-page__title">Admin Dashboard</h1>
          <p className="admin-page__text">
            Film, seans ve rezervasyon durumlarını tek ekrandan takip et.
          </p>
        </div>

        <div className="admin-stats">
          <div className="admin-stat-card">
            <span className="admin-stat-card__label">Toplam Film</span>
            <strong className="admin-stat-card__value">{movies.length}</strong>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-card__label">Toplam Seans</span>
            <strong className="admin-stat-card__value">{showtimes.length}</strong>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-card__label">Rezervasyon</span>
            <strong className="admin-stat-card__value">{reservations.length}</strong>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-card__label">Toplam Gelir</span>
            <strong className="admin-stat-card__value">{totalRevenue} ₺</strong>
          </div>
        </div>

        <div className="admin-shortcuts">
          <Link to="/admin/movies" className="admin-page__action-btn">
            Film Yönetimi
          </Link>

          <Link to="/admin/showtimes" className="admin-page__action-btn">
            Seans Yönetimi
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;