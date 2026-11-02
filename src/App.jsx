import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion'
import './App.css'
import LoadingScreen from './components/page/LoadingScreen'
import HeroSection from './components/page/HeroSection'
import IntroStatement from './components/page/IntroStatement'
import AboutSection from './components/page/AboutSection'
import Navbar from './components/page/Navbar'
import SocialSidebar from './components/page/SocialSidebar'
import ContactDrawer from './components/page/ContactDrawer'
import CustomCursor from './components/page/CustomCursor'
import EducationSection from './components/page/EducationSection'
import ProjectsSection from './components/page/ProjectsSection'
import HomeHighlights from './components/page/HomeHighlights'
import Footer from './components/page/Footer'
import SkillsPage from './components/page/SkillsPage'
import ExperiencePage from './components/page/ExperiencePage'

const HAS_LOADED_KEY = 'portfolioHasLoaded'

function App() {
  const alreadyLoaded = sessionStorage.getItem(HAS_LOADED_KEY) === 'true'
  const [isLoading, setIsLoading] = useState(!alreadyLoaded)
  const [isHomeRevealed, setIsHomeRevealed] = useState(alreadyLoaded)
  const [isInHero, setIsInHero] = useState(true)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const location = useLocation()
  const [viewportH, setViewportH] = useState(typeof window !== 'undefined' ? window.innerHeight : 800)

  useEffect(() => {
    const updateH = () => setViewportH(window.innerHeight)
    window.addEventListener('resize', updateH)
    return () => window.removeEventListener('resize', updateH)
  }, [])

  // Auto scroll to top upon navigating to a new route
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  /* Scroll progress driven by window scroll */
  const { scrollY } = useScroll()

  useEffect(() => {
    if (isLoading || isContactOpen) {
      document.body.style.overflow = 'hidden'
    } else {
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
    window.lenis = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.lenis = null
    }
  }, [isLoading])

  // Single scroll tracker — avoids duplicate listeners
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsInHero(latest < 50)
  })

  // Handle direct navigation to #projects on first click from any page
  useEffect(() => {
    if (location.pathname === '/' && (location.hash === '#projects' || location.state?.scrollTo === 'projects')) {
      let attempts = 0;
      const checkAndScroll = () => {
        const el = document.getElementById('projects');
        if (el) {
          setTimeout(() => {
            if (window.lenis) {
              window.lenis.scrollTo(el, { offset: 5, duration: 1.2, immediate: false });
            } else {
              const rect = el.getBoundingClientRect();
              const absoluteY = rect.top + window.pageYOffset + 5;
              window.scrollTo({ top: absoluteY, behavior: 'smooth' });
            }
          }, 80);
        } else if (attempts < 40) {
          attempts++;
          setTimeout(checkAndScroll, 50);
        }
      };
      checkAndScroll();
    }
  }, [location.pathname, location.hash, location.state]);

  const handleReveal = () => {
    sessionStorage.setItem(HAS_LOADED_KEY, 'true')
    setIsHomeRevealed(true)
  }

  const handleLoadingComplete = () => {
    sessionStorage.setItem(HAS_LOADED_KEY, 'true')
    setIsLoading(false)
  }

  return (
    <div className="app-container">
      <div className="portfolio-viewport-frame" aria-hidden="true" />

      <CustomCursor />
      {isLoading && <LoadingScreen onReveal={handleReveal} onComplete={handleLoadingComplete} />}
      <Navbar isLoaded={isHomeRevealed} onContactClick={() => setIsContactOpen(true)} isInHero={isInHero} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="home-scroll-container"
            >
              <SocialSidebar isLoaded={isHomeRevealed} isVisible={isInHero} />

              <div className="hero-scroll-stage">
                <HeroSection isLoaded={isHomeRevealed} />
              </div>

              <div className="intro-elevation-stage">
                <IntroStatement />
              </div>

              <div className="home-subsequent-content">
                <HomeHighlights onContactClick={() => setIsContactOpen(true)} />
                <ProjectsSection />

                <Footer onContactClick={() => setIsContactOpen(true)} />
              </div>
            </motion.div>
          } />
          <Route path="/about" element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="about-page-wrapper"
            >
              <AboutSection />
              <EducationSection />
              <Footer onContactClick={() => setIsContactOpen(true)} />
            </motion.div>
          } />
          <Route path="/skills" element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <SkillsPage onContactClick={() => setIsContactOpen(true)} />
            </motion.div>
          } />
          <Route path="/experience" element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <ExperiencePage onContactClick={() => setIsContactOpen(true)} />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>

      <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
}

export default App