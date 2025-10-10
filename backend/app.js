import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

sequelize.sync({ alter: true }).then(() => console.log("DB synced"));

app.listen(8080, () => console.log("Server running at http://localhost:8080"));
