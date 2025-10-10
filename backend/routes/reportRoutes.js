import express from "express";
import { Report } from "../models/Report.js";
import { sendNotificationToUser } from "../server.js";

const router = express.Router();

// Lấy tất cả report (Admin)
router.get("/", async (req, res) => {
  try {
    const reports = await Report.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy báo cáo", err });
  }
});

// Update report: accept or delete
router.put("/:id", async (req, res) => {
  try {
    const { status, notifyUser, message } = req.body; // status = 'resolved'
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: "Report không tồn tại" });

    await report.update({ status });

    // Gửi thông báo realtime cho user nếu cần
    if (notifyUser && message) {
      sendNotificationToUser(report.userID, message);
    }

    res.json(report);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi update report", err });
  }
});

// Xóa report
router.delete("/:id", async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: "Report không tồn tại" });
    await report.destroy();
    res.json({ message: "Đã xóa report" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa report", err });
  }
});

export default router;
