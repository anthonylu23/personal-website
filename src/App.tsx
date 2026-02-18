import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import GlassNavbar from './components/GlassNavbar'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const Photography = lazy(() => import('./pages/Photography'))
const PhotographyProject = lazy(() => import('./pages/PhotographyProject'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))

const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-base px-6 text-textPrimary/80">
    <p className="text-xs font-semibold uppercase tracking-[0.28em]">Loading...</p>
  </div>
)

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
          <Route
            path="/photography"
            element={<Suspense fallback={<RouteFallback />}><Photography /></Suspense>}
          />
          <Route
            path="/photography/:id"
            element={<Suspense fallback={<RouteFallback />}><PhotographyProject /></Suspense>}
          />
          <Route
            path="/blog"
            element={<Suspense fallback={<RouteFallback />}><Blog /></Suspense>}
          />
          <Route
            path="/blog/:slug"
            element={<Suspense fallback={<RouteFallback />}><BlogPost /></Suspense>}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  )
}

export default App
