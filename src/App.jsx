import { useState } from 'react'
import Navbar from './component/Navbar';
import Analytics from './component/Analytics';
import Cards from './component/Cards';
import Footer from './component/Footer';
import Hero from './component/Hero';
import Newsletter from './component/Newsletter';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <Hero />
      <Analytics />
      <Newsletter />
      <Cards />
      <Footer />
    </div>
)
}

export default App
