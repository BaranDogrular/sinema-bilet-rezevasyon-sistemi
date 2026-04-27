import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    movies: 0,
    showtimes: 0,
    reservations: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Admin istatistikleri alınamadı:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="admin-dashboard">
      <div className="container">
        <div className="admin-dashboard__header">
          <p className="admin-dashboard__subtitle">Yönetim Paneli</p>
          <h1 className="admin-dashboard__title">Admin Panel</h1>
          <p className="admin-dashboard__text">
            Filmleri, seansları, kullanıcıları ve rezervasyonları buradan yönetebilirsin.
          </p>
        </div>

        <div className="admin-dashboard__stats">
          <div className="admin-dashboard__stat-card">
            <span>Filmler</span>
            <strong>{stats.movies}</strong>
          </div>

          <div className="admin-dashboard__stat-card">
            <span>Seanslar</span>
            <strong>{stats.showtimes}</strong>
          </div>

          <div className="admin-dashboard__stat-card">
            <span>Rezervasyonlar</span>
            <strong>{stats.reservations}</strong>
          </div>

          <div className="admin-dashboard__stat-card">
            <span>Kullanıcılar</span>
            <strong>{stats.users}</strong>
          </div>
        </div>

        <div className="admin-dashboard__actions">
          <Link to="/admin/movies" className="admin-dashboard__action-card">
            <h3>Film Yönetimi</h3>
            <p>Film ekle, listele veya sil.</p>
          </Link>

          <Link to="/admin/showtimes" className="admin-dashboard__action-card">
            <h3>Seans Yönetimi</h3>
            <p>Seans ekle, listele veya sil.</p>
          </Link>

          <Link to="/admin/reservations" className="admin-dashboard__action-card">
            <h3>Rezervasyon Yönetimi</h3>
            <p>Tüm rezervasyonları görüntüle.</p>
          </Link>

          <Link to="/admin/users" className="admin-dashboard__action-card">
            <h3>Kullanıcı Yönetimi</h3>
            <p>Kullanıcıları görüntüle.</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;