import { useState, useEffect } from 'react'
import './App.css'
import LoadingScreen from './components/page/LoadingScreen'
import HeroSection from './components/page/HeroSection'
import AboutSection from './components/page/AboutSection'
import Navbar from './components/page/Navbar'
import SocialSidebar from './components/page/SocialSidebar'

const HAS_LOADED_KEY = 'portfolioHasLoaded'

function App() {
  const alreadyLoaded = sessionStorage.getItem(HAS_LOADED_KEY) === 'true'
  const [isLoading, setIsLoading] = useState(!alreadyLoaded)

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
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