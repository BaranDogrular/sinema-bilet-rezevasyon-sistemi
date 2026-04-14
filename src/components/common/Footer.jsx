import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <h2 className="footer__logo">CinemaBook</h2>
            <p className="footer__text">
              En sevdiğin filmler için hızlı ve güvenli rezervasyon deneyimi.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h4 className="footer__title">Sayfalar</h4>
              <a href="/">Ana Sayfa</a>
              <a href="/movies">Filmler</a>
              <a href="/showtimes">Seanslar</a>
            </div>

            <div className="footer__column">
              <h4 className="footer__title">Hesap</h4>
              <a href="/login">Giriş Yap</a>
              <a href="/register">Kayıt Ol</a>
              <a href="/my-reservations">Rezervasyonlarım</a>
            </div>

            <div className="footer__column">
              <h4 className="footer__title">İletişim</h4>
              <span>support@cinemabook.com</span>
              <span>+90 555 555 55 55</span>
              <span>İstanbul, Türkiye</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 CinemaBook. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;