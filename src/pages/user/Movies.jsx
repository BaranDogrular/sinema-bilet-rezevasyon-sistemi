import { useMemo, useState } from "react";
import movies from "../../data/movies";
import MovieCard from "../../components/movie/MovieCard";
import "./Movies.css";

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tümü");

  const genres = ["Tümü", ...new Set(movies.map((movie) => movie.genre))];

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesGenre =
        selectedGenre === "Tümü" || movie.genre === selectedGenre;

      return matchesSearch && matchesGenre;
    });
  }, [searchTerm, selectedGenre]);

  return (
    <section className="movies-page">
      <div className="container">
        <div className="movies-page__header">
          <p className="movies-page__subtitle">Film Arşivi</p>
          <h1 className="movies-page__title">Tüm Filmler</h1>
          <p className="movies-page__text">
            Vizyondaki ve öne çıkan filmleri keşfet, sana en uygun seçeneği hemen bul.
          </p>
        </div>

        <div className="movies-page__filters">
          <input
            type="text"
            placeholder="Film ara..."
            className="movies-page__search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="movies-page__select"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="movies-page__grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p className="movies-page__empty">Aradığınız kritere uygun film bulunamadı.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Movies;