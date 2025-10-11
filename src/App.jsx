import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { io } from "socket.io-client";
// ===== Admin =====
import LoginPage from "./admin/LoginPage";
import RegisterPage from "./admin/RegisterPage";
import DashboardPage from "./admin/DashboardPage/index.jsx";
import ReportPage from "./pages/ReportPage.jsx";

// ===== User =====
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Hero from "./component/Hero";
import Analytics from "./component/Analytics";
import Newsletter from "./component/Newsletter";
import Cards from "./component/Cards";
import History from "./component/History";
import Dictionary from "./pages/Dictionary";
import Login from "./pages/Login";
import Register from "./pages/Register";

const socket = io("http://localhost:8080");

// Layout dùng chung cho user
function UserLayout({ children, user, onLogout }) {
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <main className="min-h-[calc(100vh-80px)]">{children}</main>
      <Footer />
    </>
  );
}


function App() {
  const [user, setUser] = useState(null);

  // Tự động login lại khi reload
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
  if (user) {
    socket.emit("registerUser", user.userID);
  }

  socket.on("newNotification", (msg) => {
    alert("Thông báo từ admin: " + msg);
  });

  return () => socket.off("newNotification");
}, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* ===== User Routes ===== */}
        <Route
          path="/"
          element={
              <UserLayout user={user} onLogout={handleLogout}>
                <Hero />
                <Analytics />
                <Newsletter />
                <Cards />
              </UserLayout>          
          }
        />
        {/* <Route path="/history" element={<History user={currentUser} />} /> */}
        <Route
          path="/report"
          element={user ? <ReportPage user={user} /> : <Navigate to="/login" />}
        />

        <Route
          path="/dictionary"
          element={
            <UserLayout user={user} onLogout={handleLogout}>
              <Dictionary />
            </UserLayout>
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* ===== Admin Routes ===== */}
        <Route
          path="/admin/login"
          element={<LoginPage onLogin={handleLogin} />}
        />
        <Route path="/admin/register" element={<RegisterPage />} />

        <Route
          path="/admin/dashboard"
          element={
            user && user.role === "admin" ? (
              <DashboardPage user={user} onLogout={handleLogout} />
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
