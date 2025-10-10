import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi đăng nhập");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-xl shadow-md" onSubmit={handleLogin}>
        <h1 className="text-2xl font-bold mb-4 text-center">Đăng nhập Admin</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          className="border p-2 w-full mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
          Đăng nhập
        </button>

        {/* 🔗 Link sang trang đăng ký */}
        <p className="text-center text-sm mt-4">
          Chưa có tài khoản?{" "}
          <span
            onClick={() => navigate("/admin/register")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Đăng ký ngay
          </span>
        </p>
      </form>
    </div>
  );
}
