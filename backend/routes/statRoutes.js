import express from "express";
import { getStats } from "../controllers/statController.js";
const router = express.Router();

// 🟢 GET /api/stats
router.get("/", getStats);

export default router;
