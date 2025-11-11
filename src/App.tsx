import { useEffect } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import GlassFooter from './components/GlassFooter'
import GlassNavbar from './components/GlassNavbar'
import Home from './pages/Home'
import Photography from './pages/Photography'
import Projects from './pages/Projects'

const Layout = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-base">
      <GlassNavbar />
      <Outlet />
      <GlassFooter />
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
