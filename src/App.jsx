import { useState } from 'react'
import './App.css'
import LoadingScreen from './components/LoadingScreen'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import Navbar from './components/Navbar'
import SocialSidebar from './components/SocialSidebar'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="app-container">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Navbar isLoaded={!isLoading} />
      <SocialSidebar isLoaded={!isLoading} />
      <HeroSection isLoaded={!isLoading} />
      <AboutSection />
    </div>
  )
}

export default App
