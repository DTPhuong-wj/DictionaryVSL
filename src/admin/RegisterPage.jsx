import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        name,
        email,
        password,
      });
      alert("Đăng ký thành công! Hãy đăng nhập.");
      navigate("/admin/login");
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi khi đăng ký tài khoản");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-xl shadow-md w-[350px]"
        onSubmit={handleRegister}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Đăng ký Admin</h1>

        <input
          type="text"
          placeholder="Tên hiển thị"
          className="border p-2 w-full mb-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          className="border p-2 w-full mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          className="border p-2 w-full mb-4 rounded"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600">
          Đăng ký
        </button>

        {/* 🔗 Link sang trang đăng nhập */}
        <p className="text-center text-sm mt-4">
          Đã có tài khoản?{" "}
          <span
            onClick={() => navigate("/admin/login")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Đăng nhập
          </span>
        </p>
      </form>
    </div>
  );
}
