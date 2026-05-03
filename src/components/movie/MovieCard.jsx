import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <article className="movie-card">
      <div className="movie-card__image-wrapper">
        <img
          src={movie.image || "/no-image.png"}
          alt={movie.title}
          className="movie-card__image"
          loading="lazy"
        />

        <div className="movie-card__overlay"></div>

        <span className="movie-card__rating">
          ⭐ {movie.rating || "N/A"}
        </span>
      </div>

      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>

        <p className="movie-card__meta">
          {movie.genre || "Film"} • {movie.duration || "-"}
        </p>

        <p className="movie-card__description">
          {movie.description?.slice(0, 90)}...
        </p>

        {/* 🎬 FRAGMAN BUTONU */}
       

        <Link to={`/movies/${movie.id}`} className="movie-card__button">
          Detayları Gör
        </Link>
      </div>
    </article>
  );
};

export default MovieCard;