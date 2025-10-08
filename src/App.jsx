import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import Hero from './component/Hero';
import Analytics from './component/Analytics';
import Newsletter from './component/Newsletter';
import Cards from './component/Cards';
import Footer from './component/Footer';
import Dictionary from './pages/Dictionary';
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
      <MainRoutes />
    </Router>
  );
}

function MainRoutes() {
  const location = useLocation();
  
  // ✅ Ẩn Navbar ở các trang login / register
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LayoutWithNavbar />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
