import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-card__image-wrapper">
        <img src={movie.image} alt={movie.title} className="movie-card__image" />
        <div className="movie-card__overlay"></div>
        <span className="movie-card__rating">⭐ {movie.rating}</span>
      </div>

      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__meta">
          {movie.genre} • {movie.duration}
        </p>
        <p className="movie-card__description">{movie.description}</p>

        <Link to={`/movies/${movie.id}`} className="movie-card__button">
          Detayları Gör
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;