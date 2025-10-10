import express from "express";
import { addSearchHistory, getSearchHistory } from "../controllers/searchHistoryController.js";

const router = express.Router();

router.post("/", addSearchHistory); // lưu lịch sử
router.get("/", getSearchHistory); // lấy lịch sử

export default router;
