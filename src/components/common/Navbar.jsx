import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container navbar__container">
        <div className="navbar__logo">
          <span className="navbar__logo-main">Cinema</span>
          <span className="navbar__logo-accent">Book</span>
        </div>

        <nav className="navbar__menu">
          <Link to="/" className="navbar__link">Ana Sayfa</Link>
          <Link to="/movies" className="navbar__link">Filmler</Link>
          <Link to="/showtimes" className="navbar__link">Seanslar</Link>
          <Link to="/my-reservations" className="navbar__link">Rezervasyonlarım</Link>
        </nav>

        <div className="navbar__actions">
          <button className="navbar__login-btn">Giriş Yap</button>
          <button className="navbar__register-btn">Kayıt Ol</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;