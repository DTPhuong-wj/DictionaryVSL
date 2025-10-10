import express from "express";
import { db } from "./db.js"; // kết nối MySQL

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    // 1️⃣ Số người dùng có role = 'user'
    const [users] = await db.execute(
      "SELECT COUNT(*) as userCount FROM users WHERE role = 'user'"
    );

    // 2️⃣ Số từ vựng
    const [words] = await db.execute(
      "SELECT COUNT(*) as wordCount FROM word"
    );

    // 3️⃣ Số lượt yêu thích
    const [favorites] = await db.execute(
      "SELECT SUM(count) as favoriteCount FROM favorites"
    );

    // 4️⃣ Số lượt tìm kiếm
    const [searchHistory] = await db.execute(
      "SELECT COUNT(*) as searchCount FROM search_history"
    );

    // 5️⃣ Số lượt góp ý
    const [reports] = await db.execute(
      "SELECT COUNT(*) as reportCount FROM reports"
    );

    res.json({
      userCount: users[0].userCount || 0,
      wordCount: words[0].wordCount || 0,
      favoriteCount: favorites[0].favoriteCount || 0,
      searchCount: searchHistory[0].searchCount || 0,
      reportCount: reports[0].reportCount || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi lấy thống kê" });
  }
});

export default router;
