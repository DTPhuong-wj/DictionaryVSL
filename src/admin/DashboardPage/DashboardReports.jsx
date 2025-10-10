import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/reports");
      setReports(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleResolve = async (reportID) => {
    const message = prompt("Gửi thông báo cho user (hoặc để trống nếu không muốn):");
    try {
      await axios.put(`http://localhost:8080/api/reports/${reportID}`, {
        status: "resolved",
        notifyUser: !!message,
        message,
      });
      fetchReports();
    } catch (err) {
      console.error(err);
      alert("Xử lý thất bại!");
    }
  };

  const handleDelete = async (reportID) => {
    if (!window.confirm("Bạn có chắc muốn xóa report này?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/reports/${reportID}`);
      fetchReports();
    } catch (err) {
      console.error(err);
      alert("Xóa thất bại!");
    }
  };

  if (loading) return <p>Đang tải báo cáo...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý báo cáo</h2>
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Từ</th>
            <th className="border p-2">UserID</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.reportID} className="border-b">
              <td className="border p-2">{r.reportID}</td>
              <td className="border p-2">{r.wordID}</td>
              <td className="border p-2">{r.userID}</td>
              <td className="border p-2">{r.message}</td>
              <td className="border p-2">{r.status}</td>
              <td className="border p-2 space-x-2">
                {r.status === "pending" && (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleResolve(r.reportID)}
                  >
                    Chấp nhận
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(r.reportID)}
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
};

export default DashboardReports;
