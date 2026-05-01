import { useEffect, useState } from "react";
import "./Home.css";
import MovieCard from "../../components/movie/MovieCard";
import { getMovieById, getImageUrl } from "../../services/tmdb";
import { Link } from "react-router-dom";

const movieIds = [
  687163,  // Project Hail Mary
  872585,  // Oppenheimer
  157336,  // Interstellar
  414906,  // The Batman
  1325734, // The Drama
  693134,  // Dune: Part Two
  969681,  // Spider-Man: Brand New Day
  858024,  // Hamnet
];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoadingMovies(true);

      const results = await Promise.all(
        movieIds.map(async (id) => {
          const movie = await getMovieById(id);

          if (!movie) return null;

          return {
            id: movie.id,
            title: movie.title,
            genre: movie.genres?.map((genre) => genre.name).join(" / ") || "Film",
            duration: movie.runtime ? `${movie.runtime} dk` : "Bilinmiyor",
            rating: movie.vote_average ? movie.vote_average.toFixed(1) : "N/A",
            image: getImageUrl(movie.poster_path),
            description: movie.overview || "Açıklama yok",
          };
        })
      );

      setMovies(results.filter(Boolean));
      setLoadingMovies(false);
    };

    fetchMovies();
  }, []);

  return (
    <>
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
            <a href="#featured-movies" className="home-hero__primary-btn">
            Filmleri İncele
            </a>

            <Link to="/movies" className="home-hero__secondary-btn">
            Tüm Filmler
            </Link>
            </div>
          </div>

          <div className="home-hero__visual">
            <div className="home-hero__card">
              <p className="home-hero__card-label">Bugünün Öne Çıkanı</p>
              <h3 className="home-hero__card-title">Project Hail Mary</h3>
              <p className="home-hero__card-info">IMAX • 19:30 • Salon 3</p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-movies" id="featured-movies">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="section-header__subtitle">Vizyondakiler</p>
              <h2 className="section-header__title">Öne Çıkan Filmler</h2>
            </div>
          </div>

          {loadingMovies ? (
            <p className="home-loading-text">Filmler yükleniyor...</p>
          ) : (
            <div className="featured-movies__grid">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="features">
        <div className="container features__container">
          <div className="feature-box">
            <h3 className="feature-box__title">Hızlı Rezervasyon</h3>
            <p className="feature-box__text">
              Sadece birkaç adımda film, seans ve koltuk seçimini tamamla.
            </p>
          </div>

          <div className="feature-box">
            <h3 className="feature-box__title">Güvenli Deneyim</h3>
            <p className="feature-box__text">
              Kullanıcı dostu arayüz ile rezervasyonlarını kolayca yönet.
            </p>
          </div>

          <div className="feature-box">
            <h3 className="feature-box__title">Modern Tasarım</h3>
            <p className="feature-box__text">
              Karanlık tema ve sinema atmosferine uygun premium görünüm.
            </p>
          </div>
        </div>
      </section>

      <section className="promo">
        <div className="container promo__container">
          <div>
            <p className="promo__subtitle">Sinema Keyfini Kaçırma</p>
            <h2 className="promo__title">
              Haftanın En Popüler Filmleri Seni Bekliyor
            </h2>
          </div>
          <Link to="/movies" className="promo__button">
          Hemen İncele
        </Link>
        </div>
      </section>
    </>
  );
};

export default Home;