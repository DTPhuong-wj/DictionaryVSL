import { useState } from "react";
import axios from "axios";

const ReportModal = ({ wordID, isOpen, onClose }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const userID = JSON.parse(localStorage.getItem("user")).userID;
      await axios.post("http://localhost:8080/api/reports", { userID, wordID, message });
      alert("Gửi report thành công!");
      setMessage("");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gửi report thất bại!");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-md w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-700 font-bold text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Báo cáo từ vựng</h2>
        <textarea
          className="w-full border p-2 rounded mb-4"
          rows={5}
          placeholder="Nhập lý do hoặc góp ý..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-green-500 px-4 py-2 rounded text-white"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ReportModal;
