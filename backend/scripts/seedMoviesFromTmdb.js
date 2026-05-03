import axios from "axios";
import dotenv from "dotenv";
import pool from "../config/db.js";

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const movieIds = [
  687163, 872585, 157336, 414906, 1325734,
  693134, 858024, 1314481, 936075, 1084242,
  1317149, 83533, 1083381, 1368337, 1315772,
  1084244, 1300968, 1003596, 1170608, 969681,
];

const getTrailerUrl = async (tmdbId) => {
  try {
    const videoRes = await axios.get(
      `${TMDB_BASE_URL}/movie/${tmdbId}/videos?api_key=${TMDB_API_KEY}&language=en-US`
    );

    const videos = videoRes.data.results || [];

    const trailer =
      videos.find(
        (vid) =>
          vid.site === "YouTube" &&
          vid.type === "Trailer" &&
          vid.official === true
      ) ||
      videos.find(
        (vid) => vid.site === "YouTube" && vid.type === "Trailer"
      );

    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  } catch (error) {
    return null;
  }
};

const seedMovies = async () => {
  try {
    console.log("TMDB filmleri çekiliyor...");

    for (const tmdbId of movieIds) {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`
      );

      const movie = response.data;

      const title = movie.title;
      const genre =
        movie.genres?.map((item) => item.name).join(" / ") || "Film";
      const duration = movie.runtime ? `${movie.runtime} dk` : "Bilinmiyor";
      const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
      const image = movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : "";
      const description = movie.overview || "Açıklama yok";
      const releaseDate = movie.release_date || null;
      const trailerUrl = await getTrailerUrl(tmdbId);

      await pool.query(
        `
        INSERT INTO movies
        (tmdb_id, title, genre, duration, rating, image, description, release_date, trailer_url)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        ON CONFLICT (tmdb_id) DO UPDATE SET
          title = EXCLUDED.title,
          genre = EXCLUDED.genre,
          duration = EXCLUDED.duration,
          rating = EXCLUDED.rating,
          image = EXCLUDED.image,
          description = EXCLUDED.description,
          release_date = EXCLUDED.release_date,
          trailer_url = EXCLUDED.trailer_url
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
          trailerUrl,
        ]
      );

      console.log(`${title} eklendi | Trailer: ${trailerUrl || "YOK"}`);
    }

    console.log("Tüm filmler başarıyla database'e aktarıldı.");
    process.exit();
  } catch (error) {
    console.error("Seed hatası:", error.message);
    process.exit(1);
  }
};

seedMovies();