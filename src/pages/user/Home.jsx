import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import MovieCard from "../../components/movie/MovieCard";
import { getMovieById, getImageUrl } from "../../services/tmdb";

const movieIds = [
  687163,
  872585,
  157336,
  414906,
  1325734,
  693134,
  969681,
  858024,
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
            genre:
              movie.genres?.map((genre) => genre.name).join(" / ") || "Film",
            duration: movie.runtime ? `${movie.runtime} dk` : "Bilinmiyor",
            rating: movie.vote_average
              ? movie.vote_average.toFixed(1)
              : "N/A",
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
            <span className="home-hero__badge">
              Premium Sinema Rezervasyon Deneyimi
            </span>

            <h1 className="home-hero__title">
              Sinema Keyfini
              <span> Koltuğunu Seçerek Yaşa</span>
            </h1>

            <p className="home-hero__text">
              Vizyondaki filmleri keşfet, sana en uygun seansı seç ve
              rezervasyonunu modern, hızlı ve güvenli bir deneyimle tamamla.
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
              Film, seans ve koltuk seçimini birkaç adımda tamamla.
            </p>
          </div>

          <div className="feature-box">
            <h3 className="feature-box__title">Güvenli Deneyim</h3>
            <p className="feature-box__text">
              Rezervasyonlarını kullanıcı dostu panelden kolayca yönet.
            </p>
          </div>

          <div className="feature-box">
            <h3 className="feature-box__title">Premium Arayüz</h3>
            <p className="feature-box__text">
              Sinema atmosferine uygun modern ve şık bir rezervasyon deneyimi.
            </p>
          </div>
        </div>
      </section>

      <section className="promo">
        <div className="container promo__container">
          <div>
            <p className="promo__subtitle">Sinema Keyfini Kaçırma</p>
            <h2 className="promo__title">
              Haftanın en popüler filmleri için yerini hemen ayırt
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