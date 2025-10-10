import { useEffect, useState } from "react";
import axios from "axios";

export default function ReportManagement() {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/reports");
      setReports(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolve = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/reports/resolve/${id}`);
      fetchReports();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa report này?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/reports/${id}`);
      fetchReports();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý Reports</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>UserID</th>
            <th>WordID</th>
            <th>Message</th>
            <th>Status</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.reportID}>
              <td>{r.reportID}</td>
              <td>{r.userID}</td>
              <td>{r.wordID}</td>
              <td>{r.message}</td>
              <td>{r.status}</td>
              <td className="space-x-2">
                {r.status === "pending" && (
                  <button
                    onClick={() => handleResolve(r.reportID)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Chấp nhận
                  </button>
                )}
                <button
                  onClick={() => handleDelete(r.reportID)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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
