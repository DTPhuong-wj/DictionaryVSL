export default function DashboardPage({ user }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">
        Xin chào, {user?.name || "Admin"} 👋
      </h1>
      <p>Chào mừng đến trang quản trị!</p>
    </div>
  );
}
