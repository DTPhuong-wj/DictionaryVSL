import React, { useEffect, useState } from "react";
import axios from "axios";

const History = ({ user }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/search-history/${user.userID}`);
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, [user]);

  if (!user) return <p>Vui lòng đăng nhập để xem lịch sử</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Lịch sử tra cứu</h2>
      <ul className="space-y-2">
        {history.map((item) => (
          <li key={item.historyID} className="p-2 border rounded">
            <span className="font-semibold">{item.word}</span>
            <span className="text-gray-500 ml-2">
              ({new Date(item.createdAt).toLocaleString()})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
