import express from "express";
import {
  getAdminStats,
  getAdminUsers,
  getAdminReservations,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", getAdminStats);
router.get("/users", getAdminUsers);
router.get("/reservations", getAdminReservations);

export default router;