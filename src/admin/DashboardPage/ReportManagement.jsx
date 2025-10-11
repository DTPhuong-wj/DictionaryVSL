import { useEffect, useState } from "react";
import { fetchReports, resolveReport } from "../../api/reportAPI";

export default function ReportsManagement() {
  const [reports, setReports] = useState([]);
  const loadReports = async () => setReports((await fetchReports()).data);
  useEffect(() => loadReports(), []);

  const handleResolve = async (id) => {
    await resolveReport(id);
    loadReports();
  };

  return (
    <table className="w-full border">
      <thead>
        <tr><th>ID</th><th>User</th><th>Title</th><th>Content</th><th>Status</th><th>Action</th></tr>
      </thead>
      <tbody>
        {reports.map(r => (
          <tr key={r.reportID}>
            <td>{r.reportID}</td>
            <td>{r.userID}</td>
            <td>{r.title}</td>
            <td>{r.content}</td>
            <td>{r.status}</td>
            <td>
              {r.status === "pending" && (
                <button onClick={() => handleResolve(r.reportID)} className="bg-green-600 text-white px-2 rounded">Resolve</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
