import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar'
import Hero from './component/Hero'
import Analytics from './component/Analytics'
import Newsletter from './component/Newsletter'
import Cards from './component/Cards'
import Footer from './component/Footer'
import Dictionary from './pages/Dictionary'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Analytics />
            <Newsletter />
            <Cards />
            <Footer />
          </>
        } />
        <Route path="/dictionary" element={<Dictionary />} />
      </Routes>
    </Router>
  )
}

export default App
