// src/admin/UserManagement.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [editingId, setEditingId] = useState(null);

  // Lấy danh sách user
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users");
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Lỗi khi fetch users:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Thêm user
  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:8080/api/users", form);
      setForm({ name: "", email: "", password: "", role: "user" });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // Sửa user
  const handleEdit = (user) => {
    setEditingId(user.userID);
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/users/${editingId}`, form);
      setEditingId(null);
      setForm({ name: "", email: "", password: "", role: "user" });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // Xóa user
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý người dùng</h2>

      {/* Form thêm/sửa */}
      <div className="mb-6 p-4 bg-white shadow rounded-md flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Tên"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 rounded"
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {editingId ? (
          <button
            onClick={handleUpdate}
            className="bg-yellow-500 px-4 py-2 rounded text-white"
          >
            Cập nhật
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-500 px-4 py-2 rounded text-white"
          >
            Thêm mới
          </button>
        )}
      </div>

      {/* Bảng hiển thị user */}
      <table className="w-full bg-white shadow rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Tên</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userID} className="border-b">
              <td className="p-2">{user.userID}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-400 px-2 py-1 rounded text-white"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(user.userID)}
                  className="bg-red-500 px-2 py-1 rounded text-white"
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
