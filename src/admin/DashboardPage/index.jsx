import { useEffect, useState } from "react";
import axios from "axios";
import UserManagement from "../../admin/DashboardPage/UserManagement.jsx";
import WordManagement from "./WordManagement";

// Sidebar item component
const SidebarItem = ({ label, onClick }) => (
  <li
    className="p-4 hover:bg-gray-700 cursor-pointer rounded-md"
    onClick={onClick}
  >
    {label}
  </li>
);

export default function DashboardPage({ user, onLogout }) {
  const [stats, setStats] = useState({
    userCount: 0,
    wordCount: 0,
    reportCount: 0,
    favoriteCount: 0,
    searchCount: 0,
  });

  const [activeSection, setActiveSection] = useState("Stats");

  // Lấy dữ liệu thống kê từ backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy thống kê:", err);
      }
    };
    fetchStats();
  }, []);

  const data = [
    { label: "Người dùng", value: stats.userCount },
    { label: "Từ vựng", value: stats.wordCount },
    { label: "Báo cáo", value: stats.reportCount },
    { label: "Yêu thích", value: stats.favoriteCount },
    { label: "Lịch sử tìm kiếm", value: stats.searchCount },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">{user.name}</h1>
        <ul className="space-y-2">
          <SidebarItem label="Dashboard" onClick={() => setActiveSection("Stats")} />
          <SidebarItem label="Users" onClick={() => setActiveSection("Users")} />
          <SidebarItem label="Words" onClick={() => setActiveSection("Words")} />
          <SidebarItem label="Reports" onClick={() => setActiveSection("Reports")} />
          <SidebarItem label="Logout" onClick={onLogout} />
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">{activeSection}</h2>

        {activeSection === "Stats" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data.map((item) => (
              <div
                key={item.label}
                className="bg-white shadow rounded-xl p-6 text-center"
              >
                <p className="text-gray-500">{item.label}</p>
                <p className="text-3xl font-bold text-blue-600">{item.value}</p>
              </div>
            ))}
          </div>
        )}

        {activeSection === "Users" && <UserManagement />}

        {activeSection === "Words" && <WordManagement />}


        {activeSection === "Reports" && (
          <p>Phần quản lý Reports: có thể fetch từ API /reports</p>
        )}
      </main>
    </div>
  );
}
