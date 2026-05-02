import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/eden-navbar-logo.png";

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();

  return (
    <header className="navbar">
      <div className="container navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img
            src={logo}
            alt="Eden Cineverse"
            className="navbar__logo-full"
          />
        </Link>

        {/* Menü */}
        <nav className="navbar__menu">
          <NavLink to="/" className="navbar__link">
            Ana Sayfa
          </NavLink>

          <NavLink to="/movies" className="navbar__link">
            Filmler
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/my-reservations"
              className="navbar__link"
            >
              Rezervasyonlarım
            </NavLink>
          )}

          {isAuthenticated && (
            <NavLink to="/profile" className="navbar__link">
              Profil
            </NavLink>
          )}

          {isAdmin && (
            <NavLink to="/admin" className="navbar__link">
              Admin Panel
            </NavLink>
          )}
        </nav>

        {/* Sağ taraf */}
        <div className="navbar__actions">
          {isAuthenticated ? (
            <>
              <span className="navbar__user">
                Hoş geldin, {user?.name}
              </span>

              <button
                onClick={logout}
                className="navbar__button"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="navbar__button navbar__button--secondary"
              >
                Giriş Yap
              </Link>

              <Link
                to="/register"
                className="navbar__register-btn"
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;