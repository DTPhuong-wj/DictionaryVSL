import { useEffect, useState } from "react";
import axios from "axios";

export default function WordManagement() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    word: "",
    description: "",
    video_url: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Lấy danh sách từ
  const fetchWords = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/words");
      setWords(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  // Thêm từ
  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:8080/api/words", form);
      setForm({ word: "", description: "", video_url: "" });
      fetchWords();
    } catch (err) {
      console.error(err);
    }
  };

  // Sửa từ
  const handleEdit = (w) => {
    setEditingId(w.wordID);
    setForm({
      word: w.word,
      description: w.description,
      video_url: w.video_url,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/words/${editingId}`, form);
      setEditingId(null);
      setForm({ word: "", description: "", video_url: "" });
      fetchWords();
    } catch (err) {
      console.error(err);
    }
  };

  // Xóa từ
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa từ này?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/words/${id}`);
      fetchWords();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý từ vựng</h2>

      {/* Form thêm/sửa */}
      <div className="mb-6 p-4 bg-white shadow rounded-md flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Từ vựng"
          value={form.word}
          onChange={(e) => setForm({ ...form, word: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Mô tả"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="URL video"
          value={form.video_url}
          onChange={(e) => setForm({ ...form, video_url: e.target.value })}
          className="border p-2 rounded"
        />

        {editingId ? (
          <button
            onClick={handleUpdate}
            className="bg-yellow-500 px-4 py-2 rounded text-white"
          >
            Cập nhật
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-500 px-4 py-2 rounded text-white"
          >
            Thêm mới
          </button>
        )}
      </div>

      {/* Bảng từ vựng */}
        <table className="w-full table-fixed bg-white shadow rounded-md overflow-hidden">
        <thead className="bg-gray-100">
            <tr>
            <th className="w-1/12 p-2">ID</th>
            <th className="w-2/12 p-2">Từ</th>
            <th className="w-5/12 p-2">Mô tả</th>
            <th className="w-2/12 p-2">Video</th>
            <th className="w-2/12 p-2">Hành động</th>
            </tr>
        </thead>
        <tbody>
            {words.map((w) => (
            <tr key={w.wordID} className="border-b align-top">
                <td className="p-2">{w.wordID}</td>
                <td className="p-2">{w.word}</td>
                <td className="p-2 whitespace-normal break-words">{w.description}</td>
                <td className="p-2">
                <a href={w.video_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    Link video
                </a>
                </td>
                <td className="p-2 space-x-2">
                <button
                    onClick={() => handleEdit(w)}
                    className="bg-yellow-400 px-2 py-1 rounded text-white"
                >
                    Sửa
                </button>
                <button
                    onClick={() => handleDelete(w.wordID)}
                    className="bg-red-500 px-2 py-1 rounded text-white"
                >
                    Xóa
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
}
