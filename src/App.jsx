import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import './App.css'
import LoadingScreen from './components/page/LoadingScreen'
import HeroSection from './components/page/HeroSection'
import AboutSection from './components/page/AboutSection'
import Navbar from './components/page/Navbar'
import SocialSidebar from './components/page/SocialSidebar'

const HAS_LOADED_KEY = 'portfolioHasLoaded'

function App() {
  // Skip the loading screen if it already played once this session
  // (e.g. navigating back, refreshing, or opening a second page).
  const alreadyLoaded = sessionStorage.getItem(HAS_LOADED_KEY) === 'true'
  const [isLoading, setIsLoading] = useState(!alreadyLoaded)

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  // Cinematic smooth scroll — weighted, glides instead of jumping.
  // Only starts once the loading screen is done, so it never fights
  // with the body-scroll-lock above.
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

  const handleLoadingComplete = () => {
    sessionStorage.setItem(HAS_LOADED_KEY, 'true')
    setIsLoading(false)
  }

  return (
    <div className="app-container">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <Navbar isLoaded={!isLoading} />
      <SocialSidebar isLoaded={!isLoading} />
      <HeroSection isLoaded={!isLoading} />
      <AboutSection />
    </div>
  )
}

export default App