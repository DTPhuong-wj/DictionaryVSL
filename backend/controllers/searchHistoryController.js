import { SearchHistory } from "../models/SearchHistory.js";

// Thêm lịch sử tra cứu
export const addSearchHistory = async (req, res) => {
  try {
    const { userID, word } = req.body;
    const history = await SearchHistory.create({ userID: userID || null, word });
    res.json({ success: true, history });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Lưu lịch sử thất bại" });
  }
};

// Lấy lịch sử của user (hoặc toàn bộ nếu admin)
export const getSearchHistory = async (req, res) => {
  try {
    const { userID } = req.query; // có thể truyền userID
    const whereClause = userID ? { userID } : {};
    const history = await SearchHistory.findAll({ where: whereClause, order: [["created_at", "DESC"]] });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
