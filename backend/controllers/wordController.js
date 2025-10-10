import { Word } from "../models/Word.js";

// Lấy danh sách từ
export const getWords = async (req, res) => {
  try {
    const words = await Word.findAll();
    res.json(words);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Thêm từ mới
export const addWord = async (req, res) => {
  try {
    const { word, description, video_url } = req.body;
    const newWord = await Word.create({ word, description, video_url });
    res.status(201).json(newWord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật từ
export const updateWord = async (req, res) => {
  try {
    const { id } = req.params;
    const { word, description, video_url } = req.body;
    await Word.update({ word, description, video_url }, { where: { wordID: id } });
    res.json({ message: "Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Xóa từ
export const deleteWord = async (req, res) => {
  try {
    const { id } = req.params;
    await Word.destroy({ where: { wordID: id } });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
