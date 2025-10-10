export default function Header({ user, onLogout }) {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Xin chào, {user.name} 👋</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">{user.role}</span>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
}
