import express from "express";
import {
  getAllShowtimes,
  getShowtimeById,
  getShowtimesByMovieId,
} from "../controllers/showtimeController.js";

const router = express.Router();

router.get("/", getAllShowtimes);
router.get("/movie/:movieId", getShowtimesByMovieId);
router.get("/:id", getShowtimeById);

export default router;