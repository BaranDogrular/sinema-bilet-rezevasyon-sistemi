import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();

  return (
    <header className="navbar">
      <div className="container navbar__container">
        <Link to="/" className="navbar__logo">
          Eden <span>Cineverse</span>
        </Link>

        <nav className="navbar__menu">
          <Link to="/">Ana Sayfa</Link>
          <Link to="/movies">Filmler</Link>

          {isAuthenticated && (
            <Link to="/my-reservations">Rezervasyonlarım</Link>
          )}
          {isAuthenticated && <Link to="/profile">Profil</Link>}
          {isAdmin && <Link to="/admin">Admin Panel</Link>}
        </nav>

        <div className="navbar__actions">
          {isAuthenticated ? (
            <>
              <span className="navbar__user">{user?.name}</span>
              <button onClick={logout} className="navbar__button">
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
              <Link to="/register" className="navbar__button">
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