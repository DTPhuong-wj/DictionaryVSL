import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

import "./models/User.js";
import "./models/Word.js";
import "./models/Category.js";
import "./models/Favorite.js";
import "./models/SearchHistory.js";
import "./models/Report.js";
import "./models/Statistic.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// 🚀 Đồng bộ database (tự tạo bảng nếu chưa có)
sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database đã đồng bộ và tạo bảng tự động!");
});

app.listen(8080, () => console.log("🚀 Server chạy tại http://localhost:8080"));
