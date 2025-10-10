import express from "express";
import { getUsers, addUser, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// Lấy tất cả user (chỉ role = user)
router.get("/", getUsers);

// Thêm user mới
router.post("/", addUser);

// Cập nhật user
router.put("/:id", updateUser);

// Xóa user
router.delete("/:id", deleteUser);

export default router;
