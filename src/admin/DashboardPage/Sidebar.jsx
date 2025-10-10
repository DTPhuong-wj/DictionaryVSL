export default function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    { id: "dashboard", label: "Bảng điều khiển" },
    { id: "users", label: "Quản lý người dùng" },
    { id: "words", label: "Quản lý từ điển" },
    { id: "reports", label: "Thống kê" },
  ];

  return (
    <div className="w-64 bg-blue-600 text-white flex flex-col">
      <h2 className="text-2xl font-bold text-center py-4 border-b border-blue-400">
        Admin Panel
      </h2>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`block w-full text-left px-6 py-3 hover:bg-blue-500 ${
              activePage === item.id ? "bg-blue-700" : ""
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
