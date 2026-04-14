import "./Home.css";

const Home = () => {
  return (
    <section className="home-hero">
      <div className="container home-hero__container">
        <div className="home-hero__content">
          <span className="home-hero__badge">Yeni Nesil Sinema Deneyimi</span>
          <h1 className="home-hero__title">
            En Sevdiğin Filmler İçin
            <span> Koltuğunu Hemen Ayırt</span>
          </h1>
          <p className="home-hero__text">
            Vizyondaki filmleri keşfet, sana uygun seansı seç ve birkaç adımda
            rezervasyonunu tamamla.
          </p>

          <div className="home-hero__actions">
            <button className="home-hero__primary-btn">Bilet Al</button>
            <button className="home-hero__secondary-btn">Vizyondakiler</button>
          </div>
        </div>

        <div className="home-hero__visual">
          <div className="home-hero__card">
            <p className="home-hero__card-label">Bugünün Öne Çıkanı</p>
            <h3 className="home-hero__card-title">Dune: Part Two</h3>
            <p className="home-hero__card-info">IMAX • 19:30 • Salon 3</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;