import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ===== Admin =====
import LoginPage from "./admin/LoginPage";
import RegisterPage from "./admin/RegisterPage";
import DashboardPage from "./admin/DashboardPage/index.jsx";


// ===== User =====
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Analytics from "./component/Analytics";
import Newsletter from "./component/Newsletter";
import Cards from "./component/Cards";
import Footer from "./component/Footer";
import Dictionary from "./pages/Dictionary";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Layout chính của user
function LayoutWithNavbar({ user, onLogout }) {
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <Hero />
      <Analytics />
      <Newsletter />
      <Cards />
      <Footer />
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  // ♻️ Tự động login lại khi reload
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Hàm xử lý khi login thành công
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Hàm logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* ===== Trang user ===== */}
        <Route
          path="/"
          element={<LayoutWithNavbar user={user} onLogout={handleLogout} />}
        />
        <Route
          path="/dictionary"
          element={<LayoutWithNavbar user={user} onLogout={handleLogout} />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* ===== Trang admin ===== */}
        <Route path="/admin/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/admin/register" element={<RegisterPage />} />

        {/* 🚫 Dashboard admin: chỉ cho phép truy cập nếu đã login */}
       <Route
        path="/admin/dashboard"
        element={
          user && user.role === "admin" ? (
            <DashboardPage user={user} onLogout={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              setUser(null);
            }} />
          ) : (
            <Navigate to="/admin/login" />
          )
        }
      />

      </Routes>
    </Router>
  );
}

export default App;
