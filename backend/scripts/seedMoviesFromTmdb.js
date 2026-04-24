import axios from "axios";
import dotenv from "dotenv";
import pool from "../config/db.js";

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

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

const seedMovies = async () => {
  try {
    console.log("TMDB filmleri çekiliyor...");

    for (const tmdbId of movieIds) {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`
      );

      const movie = response.data;

      const title = movie.title;
      const genre = movie.genres?.map((item) => item.name).join(" / ") || "Film";
      const duration = movie.runtime ? `${movie.runtime} dk` : "Bilinmiyor";
      const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
      const image = movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : "";
      const description = movie.overview || "Açıklama yok";
      const releaseDate = movie.release_date || "Bilinmiyor";

      await pool.query(
        `
        INSERT INTO movies 
        (tmdb_id, title, genre, duration, rating, image, description, release_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (tmdb_id) DO UPDATE SET
          title = EXCLUDED.title,
          genre = EXCLUDED.genre,
          duration = EXCLUDED.duration,
          rating = EXCLUDED.rating,
          image = EXCLUDED.image,
          description = EXCLUDED.description,
          release_date = EXCLUDED.release_date
        `,
        [
          tmdbId,
          title,
          genre,
          duration,
          rating,
          image,
          description,
          releaseDate,
        ]
      );

      console.log(`${title} database'e eklendi/güncellendi.`);
    }

    console.log("Tüm filmler başarıyla database'e aktarıldı.");
    process.exit();
  } catch (error) {
    console.error("Seed hatası:", error.message);
    process.exit(1);
  }
};

seedMovies();