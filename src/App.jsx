import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  return (
    <Router>
      <Routes>
        {/* 👇 Trang user */}
        <Route path="/" element={<LayoutWithNavbar />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👇 Trang admin */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/register" element={<RegisterPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
