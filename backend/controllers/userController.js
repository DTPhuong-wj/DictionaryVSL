import { User } from "../models/User.js";
import bcrypt from "bcrypt";

// Lấy danh sách users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: "user" },  // chỉ lấy user
      attributes: ["userID","name","email","role"]
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Thêm user
export const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Hash password trước khi lưu
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  await User.update({ name, email, password, role }, { where: { userID: id } });
  res.json({ message: "Updated" });
};

// Xóa user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { userID: id } });
  res.json({ message: "Deleted" });
};
