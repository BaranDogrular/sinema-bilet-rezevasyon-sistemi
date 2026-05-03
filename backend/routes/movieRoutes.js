import express from "express";
import {
  getAllMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  getNowShowingMovies,
  getComingSoonMovies,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/", getAllMovies);

// Bunlar /:id'den önce olmalı
router.get("/now-showing", getNowShowingMovies);
router.get("/coming-soon", getComingSoonMovies);

router.get("/:id", getMovieById);
router.post("/", createMovie);
router.delete("/:id", deleteMovie);

export default router;