import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// 🟢 Đăng ký
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existUser = await User.findOne({ where: { email } });
    if (existUser) return res.status(400).json({ message: "Email đã tồn tại!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({ message: "Đăng ký thành công!", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server khi đăng ký" });
  }
};

// 🟢 Đăng nhập
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📥 Dữ liệu nhận được:", email, password);

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("❌ Không tìm thấy user");
      return res.status(400).json({ message: "Email không tồn tại!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Sai mật khẩu");
      return res.status(400).json({ message: "Sai mật khẩu!" });
    }

    const token = jwt.sign(
      { id: user.userID, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("✅ Đăng nhập thành công:", user.email);
    res.json({
      message: "Đăng nhập thành công!",
      token,
      user: {
        id: user.userID,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("🔥 Lỗi server khi đăng nhập:", err);
    res.status(500).json({ message: "Lỗi server khi đăng nhập" });
  }
};

