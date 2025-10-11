import express from "express";
import { Report } from "../models/Report.js";
import { sendNotificationToUser } from "../server.js";

const router = express.Router();

// Tạo report
router.post("/", async (req, res) => {
  const { userID, title, content } = req.body;
  if (!userID || !title || !content)
    return res.status(400).json({ message: "Thiếu dữ liệu!" });

  try {
    const report = await Report.create({ userID, title, content });
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: "Không thể tạo report" });
  }
});

// Lấy report của user
router.get("/user/:userID", async (req, res) => {
  try {
    const reports = await Report.findAll({
      where: { userID: req.params.userID },
      order: [["createdAt", "DESC"]],
    });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy report" });
  }
});

// Admin: lấy tất cả report
router.get("/", async (req, res) => {
  try {
    const reports = await Report.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy báo cáo" });
  }
});

// Admin: resolve report
router.put("/:id", async (req, res) => {
  const { status, notifyUser, message } = req.body;
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: "Report không tồn tại" });

    await report.update({ status });

    if (notifyUser && message) {
      sendNotificationToUser(report.userID, message);
    }

    res.json(report);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi update report" });
  }
});

// Admin: xóa report
router.delete("/:id", async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: "Report không tồn tại" });
    await report.destroy();
    res.json({ message: "Đã xóa report" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa report" });
  }
});

export default router;
