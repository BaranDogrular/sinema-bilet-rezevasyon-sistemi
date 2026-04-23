import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <h2>
              Eden<span>Cineverse</span>
            </h2>
            <p>En sevdiğin filmler için hızlı ve güvenli rezervasyon deneyimi.</p>
          </div>

          <div className="footer__column">
            <h3>Sayfalar</h3>
            <ul>
              <li><Link to="/">Ana Sayfa</Link></li>
              <li><Link to="/movies">Filmler</Link></li>
              <li><Link to="/movies">Seanslar</Link></li>
            </ul>
          </div>

          <div className="footer__column">
            <h3>Hesap</h3>
            <ul>
              <li><Link to="/login">Giriş Yap</Link></li>
              <li><Link to="/register">Kayıt Ol</Link></li>
              <li><Link to="/my-reservations">Rezervasyonlarım</Link></li>
            </ul>
          </div>

          <div className="footer__column">
            <h3>İletişim</h3>
            <p>support@edencineverse.com</p>
            <p>+90 534 578 12 67</p>
            <p>İstanbul, Türkiye</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 EdenCineverse. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;