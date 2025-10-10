import { User } from "../models/User.js";
import { Word } from "../models/Word.js";
import { Report } from "../models/Report.js";
import { Favorite } from "../models/Favorite.js";
import { SearchHistory } from "../models/SearchHistory.js";

export const getStats = async (req, res) => {
  try {
    const userCount = await User.count();
    const wordCount = await Word.count();
    const reportCount = await Report.count();
    const favoriteCount = await Favorite.count();
    const searchCount = await SearchHistory.count();

    res.json({
      userCount,
      wordCount,
      reportCount,
      favoriteCount,
      searchCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server khi lấy thống kê" });
  }
};
