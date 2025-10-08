import React, { useState } from "react";

const sampleData = [
  { id: 1, word: "Hello", meaning: "Xin chào", video: "/videos/hello.mp4" },
  { id: 2, word: "Thank you", meaning: "Cảm ơn", video: "/videos/thankyou.mp4" },
  { id: 3, word: "Love", meaning: "Yêu thương", video: "/videos/love.mp4" },
  { id: 4, word: "Friend", meaning: "Bạn bè", video: "/videos/friend.mp4" },
];

const Dictionary = () => {
  const [search, setSearch] = useState("");

  // Lọc từ theo ô tìm kiếm
  const filteredWords = sampleData.filter((item) =>
    item.word.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4">
      {/* Header */}
      <div className="max-w-[1000px] mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-[#00df9a] mb-3">Dictionary</h1>
        <p className="text-gray-600">
          Tra cứu từ vựng kèm video minh họa bằng ngôn ngữ ký hiệu.
        </p>
      </div>

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
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center"
            >
              <h2 className="text-xl font-semibold mb-2 text-[#00df9a]">
                {item.word}
              </h2>
              <p className="text-gray-700 mb-3">{item.meaning}</p>

              {/* Video demo */}
              <video
                src={item.video}
                controls
                className="w-full h-40 rounded-md object-cover"
              ></video>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Không tìm thấy từ nào phù hợp.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
