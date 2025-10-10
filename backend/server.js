import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import "./models/User.js";
import statRoutes from "./routes/statRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stats", statRoutes);
app.use("/api/users", userRoutes);

// Sync DB
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database đã đồng bộ!"))
  .catch(err => console.error("❌ Lỗi khi sync DB:", err));

app.listen(8080, () => console.log("🚀 Server chạy tại http://localhost:8080"));
