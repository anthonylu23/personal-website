import { useEffect } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import GlassNavbar from './components/GlassNavbar'
import Home from './pages/Home'
import Photography from './pages/Photography'
import PhotographyProject from './pages/PhotographyProject'

const Layout = () => {
  const location = useLocation()
  const hideNavbar = location.pathname.startsWith('/photography/')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-base">
      {!hideNavbar && <GlassNavbar />}
      <Outlet />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/photography/:id" element={<PhotographyProject />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
