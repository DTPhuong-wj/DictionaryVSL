import React, { useState, useEffect } from "react";
import axios from "axios";

const Dictionary = ({ user }) => {
  const [words, setWords] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedWord, setSelectedWord] = useState(null);
  const [history, setHistory] = useState([]);

  // Lấy từ vựng
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/words");
        setWords(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi fetch từ vựng:", err);
        setLoading(false);
      }
    };
    fetchWords();
  }, []);

  // Lấy lịch sử tìm kiếm nếu user đã đăng nhập
  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/search-history?userID=${user.userID}`
        );
        setHistory(res.data);
      } catch (err) {
        console.error("Lỗi khi fetch lịch sử:", err);
      }
    };

    fetchHistory();
  }, [user]);

  const filteredWords = words.filter((item) =>
    item.word.toLowerCase().includes(search.toLowerCase())
  );

  const handleReport = async (wordID) => {
    if (!user) {
      alert("Bạn cần đăng nhập để gửi report!");
      return;
    }

    const message = prompt("Bạn muốn góp ý gì về từ này?");
    if (!message) return;

    try {
      await axios.post("http://localhost:8080/api/reports", {
        wordID,
        userID: user.userID,
        message,
      });
      alert("Report đã gửi thành công!");
    } catch (err) {
      console.error(err);
      alert("Gửi report thất bại!");
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center text-gray-500">
        Đang tải từ vựng...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto text-center mb-6">
        <h1 className="text-4xl font-bold text-[#00df9a] mb-3">Dictionary</h1>
        <p className="text-gray-600">
          Tra cứu từ vựng kèm video minh họa bằng ngôn ngữ ký hiệu.
        </p>
      </div>

      {/* Lịch sử tìm kiếm */}
      {user && history.length > 0 && (
        <div className="max-w-[600px] mx-auto mb-4 flex flex-wrap gap-2">
          {history.map((h) => (
            <button
              key={h.historyID}
              className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 text-sm"
              onClick={() => setSearch(h.word)}
            >
              {h.word}
            </button>
          ))}
        </div>
      )}

      {/* Search box */}
      <div className="max-w-[600px] mx-auto mb-10">
        <input
          type="text"
          placeholder="Nhập từ cần tìm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#00df9a] outline-none"
        />
      </div>

      {/* Word cards */}
      <div className="max-w-[1100px] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredWords.length > 0 ? (
          filteredWords.map((item) => (
            <div
              key={item.wordID}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedWord(item)}
            >
              <h2 className="text-xl font-semibold mb-2 text-[#00df9a]">
                {item.word}
              </h2>
              <p className="text-gray-700 mb-3 text-center line-clamp-2">
                {item.description}
              </p>
              {item.video_url?.endsWith(".gif") ? (
                <img
                  src={item.video_url}
                  alt={item.word}
                  className="w-full h-40 rounded-md object-cover"
                />
              ) : (
                <video
                  src={item.video_url}
                  className="w-full h-40 rounded-md object-cover"
                  muted
                  autoPlay
                  loop
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Không tìm thấy từ nào phù hợp.
          </p>
        )}
      </div>

      {/* Modal chi tiết */}
      {selectedWord && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedWord(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full flex flex-col md:flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hình ảnh / video */}
            <div className="md:w-1/2 w-full">
              {selectedWord.video_url.endsWith(".gif") ? (
                <img
                  src={selectedWord.video_url}
                  alt={selectedWord.word}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={selectedWord.video_url}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Mô tả và nút */}
            <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#00df9a] mb-4">
                  {selectedWord.word}
                </h2>
                <p className="text-gray-700">{selectedWord.description}</p>
              </div>
              <div className="flex flex-col mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mb-2"
                  onClick={() => setSelectedWord(null)}
                >
                  Đóng
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleReport(selectedWord.wordID)}
                >
                  Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dictionary;
