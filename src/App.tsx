import { useEffect } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import GlassFooter from './components/GlassFooter'
import GlassNavbar from './components/GlassNavbar'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Photography from './pages/Photography'
import Projects from './pages/Projects'

const Layout = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const isPhotographyPage = location.pathname.startsWith('/photography')

  return (
    <div className="min-h-screen bg-base">
      {isPhotographyPage ? <GlassNavbar /> : <Navbar />}
      <Outlet />
      {isPhotographyPage ? <GlassFooter /> : <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/photography" element={<Photography />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
