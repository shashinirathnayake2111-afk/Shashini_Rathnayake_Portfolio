import { useState } from 'react'
import './App.css'
import LoadingScreen from './components/page/LoadingScreen'
import HeroSection from './components/page/HeroSection'
import AboutSection from './components/page/AboutSection'
import Navbar from './components/page/Navbar'
import SocialSidebar from './components/page/SocialSidebar'

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