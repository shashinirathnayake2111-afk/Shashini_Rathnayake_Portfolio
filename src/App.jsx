import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import './App.css'
import LoadingScreen from './components/page/LoadingScreen'
import HeroSection from './components/page/HeroSection'
import AboutSection from './components/page/AboutSection'
import Navbar from './components/page/Navbar'
import SocialSidebar from './components/page/SocialSidebar'
import ContactDrawer from './components/page/ContactDrawer'

const HAS_LOADED_KEY = 'portfolioHasLoaded'

function App() {
  const alreadyLoaded = sessionStorage.getItem(HAS_LOADED_KEY) === 'true'
  const [isLoading, setIsLoading] = useState(!alreadyLoaded)
  const [isInHero, setIsInHero] = useState(true)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const heroRef = useRef(null)
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    // Only lock scrolling if loading, otherwise the drawer will handle its own locking
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else if (!isContactOpen) {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoading, isContactOpen])

  useEffect(() => {
    if (isLoading) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [isLoading])

  useEffect(() => {
    if (!heroRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsInHero(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [isLoading, location.pathname]) // re-run if path changes

  const handleLoadingComplete = () => {
    sessionStorage.setItem(HAS_LOADED_KEY, 'true')
    setIsLoading(false)
  }

  return (
    <div className="app-container">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <Navbar isLoaded={!isLoading} onContactClick={() => setIsContactOpen(true)} />
      
      <Routes>
        <Route path="/" element={
          <>
            <SocialSidebar isLoaded={!isLoading} isVisible={isInHero} />
            <div ref={heroRef}>
              <HeroSection isLoaded={!isLoading} />
            </div>
          </>
        } />
        <Route path="/about" element={
          <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <AboutSection />
          </div>
        } />
      </Routes>

      <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
}

export default App