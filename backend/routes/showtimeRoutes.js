import express from "express";

import {
  getAllShowtimes,
  getShowtimeById,
  getShowtimesByMovieId,
  createShowtime,
  deleteShowtime,
} from "../controllers/showtimeController.js";

const router = express.Router();

router.get("/", getAllShowtimes);
router.get("/movie/:movieId", getShowtimesByMovieId);
router.get("/:id", getShowtimeById);

router.post("/", createShowtime);
router.delete("/:id", deleteShowtime);

export default router;