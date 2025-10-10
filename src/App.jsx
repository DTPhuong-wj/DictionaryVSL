import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react"; // 👈 THÊM DÒNG NÀY
import LoginPage from "./admin/LoginPage";
import RegisterPage from "./admin/RegisterPage";
import DashboardPage from "./admin/DashboardPage";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Analytics from "./component/Analytics";
import Newsletter from "./component/Newsletter";
import Cards from "./component/Cards";
import Footer from "./component/Footer";
import Dictionary from "./pages/Dictionary";
import Login from "./pages/Login";
import Register from "./pages/Register";

function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Hero />
      <Analytics />
      <Newsletter />
      <Cards />
      <Footer />
    </>
  );
}

function App() {
  // 👇 THÊM DÒNG NÀY ĐỂ LƯU USER LOGIN
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        {/* 👇 Trang user */}
        <Route path="/" element={<LayoutWithNavbar />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👇 Trang admin */}
        <Route
          path="/admin/login"
          element={<LoginPage onLogin={(u) => setUser(u)} />} // ✅ Truyền hàm login
        />
        <Route path="/admin/register" element={<RegisterPage />} />
        <Route
          path="/admin/dashboard"
          element={
            user ? (
              <DashboardPage user={user} />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
