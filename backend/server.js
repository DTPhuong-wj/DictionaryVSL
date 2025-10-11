import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import reportRoutes from "./routes/reportRoutes.js";
import { sequelize } from "./config/db.js";
import "./models/Report.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import wordRoutes from "./routes/wordRoutes.js";
import statRoutes from "./routes/statRoutes.js";
import searchHistoryRoutes from "./routes/searchHistoryRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/stats", statRoutes);
app.use("/api/users", userRoutes);
app.use("/api/words", wordRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/search-history", searchHistoryRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const onlineUsers = new Map();

io.on("connection", (socket) => {
  socket.on("registerUser", (userID) => onlineUsers.set(userID, socket.id));
  socket.on("disconnect", () => {
    for (const [key, value] of onlineUsers) if (value === socket.id) onlineUsers.delete(key);
  });
});

export const sendNotificationToUser = (userID, message) => {
  const socketId = onlineUsers.get(userID);
  if (socketId) io.to(socketId).emit("newNotification", message);
};

sequelize.sync({ alter: true });
server.listen(8080, () => console.log("🚀 Server chạy tại http://localhost:8080"));
