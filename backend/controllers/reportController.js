import { Report } from "../models/Report.js";

export const createReport = async (req, res) => {
  const { userID, title, content } = req.body;
  if (!userID || !title || !content)
    return res.status(400).json({ message: "Thiếu dữ liệu!" });

  try {
    const report = await Report.create({ userID, title, content });
    res.status(201).json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Không thể tạo report" });
  }
};
