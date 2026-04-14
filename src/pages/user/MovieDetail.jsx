import { Link, useParams } from "react-router-dom";
import movies from "../../data/movies";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const movie = movies.find((item) => item.id === Number(id));

  if (!movie) {
    return (
      <section className="movie-detail movie-detail--not-found">
        <div className="container">
          <h2>Film bulunamadı.</h2>
          <Link to="/movies" className="movie-detail__back-button">
            Filmlere Dön
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="movie-detail">
      <div className="container movie-detail__container">
        <div className="movie-detail__image-wrapper">
          <img
            src={movie.image}
            alt={movie.title}
            className="movie-detail__image"
          />
        </div>

        <div className="movie-detail__content">
          <p className="movie-detail__badge">Öne Çıkan Film</p>
          <h1 className="movie-detail__title">{movie.title}</h1>

          <div className="movie-detail__meta">
            <span>{movie.genre}</span>
            <span>{movie.duration}</span>
            <span>⭐ {movie.rating}</span>
          </div>

          <p className="movie-detail__description">{movie.description}</p>

          <div className="movie-detail__info-boxes">
            <div className="movie-detail__info-box">
              <h4>Yönetmen</h4>
              <p>Christopher Nolan</p>
            </div>
            <div className="movie-detail__info-box">
              <h4>Salon Türü</h4>
              <p>IMAX / 3D</p>
            </div>
            <div className="movie-detail__info-box">
              <h4>Durum</h4>
              <p>Vizyonda</p>
            </div>
          </div>

          <div className="movie-detail__actions">
            <button className="movie-detail__primary-btn">Seans Seç</button>
            <Link to="/movies" className="movie-detail__secondary-btn">
              Filmlere Dön
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetail;