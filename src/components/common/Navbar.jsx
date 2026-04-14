import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="container navbar__container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-main">Eden</span>
          <span className="navbar__logo-accent">Cineverse</span>
        </Link>

        <nav className="navbar__menu">
          <Link to="/" className="navbar__link">
            Ana Sayfa
          </Link>

          <Link to="/movies" className="navbar__link">
            Filmler
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/my-reservations" className="navbar__link">
                Rezervasyonlarım
              </Link>

              <Link to="/profile" className="navbar__link">
                Profil
              </Link>
            </>
          )}

          {isAdmin && (
            <Link to="/admin" className="navbar__link">
              Admin Panel
            </Link>
          )}
        </nav>

        <div className="navbar__actions">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="navbar__login-btn">
                Giriş Yap
              </Link>
              <Link to="/register" className="navbar__register-btn">
                Kayıt Ol
              </Link>
            </>
          ) : (
            <>
              <span className="navbar__user-name">{user.name}</span>
              <button className="navbar__register-btn" onClick={handleLogout}>
                Çıkış Yap
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;