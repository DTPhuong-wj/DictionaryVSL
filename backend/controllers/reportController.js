import { Report } from "../models/Report.js";
import { sendNotificationToUser } from "../server.js";

// Thêm report
export const addReport = async (req, res) => {
  try {
    const { userID, wordID, message } = req.body;
    const report = await Report.create({ userID, wordID, message, status: "pending" });
    res.json({ success: true, report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Gửi report thất bại" });
  }
};

// Lấy tất cả report (admin)
export const getReports = async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật status report (admin)
export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const report = await Report.findByPk(id);
    if (!report) return res.status(404).json({ message: "Report không tồn tại" });

    report.status = status;
    await report.save();

    // Gửi thông báo real-time cho user
    sendNotificationToUser(report.userID, `Report của bạn đã được ${status}`);

    res.json({ success: true, report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
