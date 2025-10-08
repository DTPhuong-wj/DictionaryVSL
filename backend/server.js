import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const SECRET = process.env.JWT_SECRET || "super_secret_key";

// ✅ REGISTER
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const [user] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
  if (user.length > 0) return res.status(400).json({ message: "Username exists" });

  const hashed = await bcrypt.hash(password, 10);
  await db.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [username, hashed, "user"]);
  res.json({ message: "Register successful" });
});

// ✅ LOGIN
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
  if (rows.length === 0) return res.status(404).json({ message: "User not found" });

  const user = rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1d" });
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

app.listen(8080, () => console.log("✅ Backend running at http://localhost:8080"));
