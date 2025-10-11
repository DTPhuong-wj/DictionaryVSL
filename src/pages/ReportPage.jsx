import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { createReport, getReportsByUser } from "../api/reportAPI";
import "react-toastify/dist/ReactToastify.css";

export default function ReportPage({ user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      const res = await getReportsByUser(user.id);
      setHistory(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch {
      toast.error("❌ Lỗi khi lấy lịch sử report");
    }
  };

  useEffect(() => fetchHistory(), []);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return toast.warn("Nhập đầy đủ tiêu đề và nội dung");
    setLoading(true);
    try {
      await createReport({ userID: user.id, title, content });
      toast.success("✅ Gửi report thành công!");
      setTitle(""); setContent("");
      fetchHistory();
    } catch {
      toast.error("❌ Lỗi khi gửi report");
    } finally { setLoading(false); }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold mb-6">Gửi Report</h1>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Tiêu đề"
        className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Nội dung"
        className="border rounded p-3 w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-2"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Đang gửi..." : "Gửi"}
      </button>

      <h2 className="text-2xl font-semibold mb-4 mt-6">Lịch sử báo cáo</h2>
      <div className="max-h-96 overflow-y-auto space-y-2">
        {history.length === 0 ? <p>Chưa có report nào</p> :
          history.map(r => (
            <div key={r.reportID} className="border p-4 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition">
              <p className="font-bold text-lg">{r.title}</p>
              <p className="text-gray-700 mt-1">{r.content}</p>
              <p className="text-gray-400 text-sm mt-2">{new Date(r.createdAt).toLocaleString()}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
