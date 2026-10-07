import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { useScroll, useTransform, motion } from 'framer-motion'
import './App.css'
import LoadingScreen from './components/page/LoadingScreen'
import HeroSection from './components/page/HeroSection'
import IntroStatement from './components/page/IntroStatement'
import AboutSection from './components/page/AboutSection'
import Navbar from './components/page/Navbar'
import SocialSidebar from './components/page/SocialSidebar'
import ContactDrawer from './components/page/ContactDrawer'
import CustomCursor from './components/page/CustomCursor'
import SkillsMarquee from './components/page/SkillsMarquee'
import EducationSection from './components/page/EducationSection'
import ProjectsSection from './components/page/ProjectsSection'
import Footer from './components/page/Footer'
import SkillsPage from './components/page/SkillsPage'

const HAS_LOADED_KEY = 'portfolioHasLoaded'

/* ── Cinematic scroll-reveal wrapper for sections below hero ── */
const SectionReveal = ({ children, style }) => (
  <motion.div
    initial={{ opacity: 0, y: 60, clipPath: 'inset(8% 0% 0% 0% round 24px)' }}
    whileInView={{
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0% round 0px)',
    }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    }}
    style={style}
  >
    {children}
  </motion.div>
)

function App() {
  const alreadyLoaded = sessionStorage.getItem(HAS_LOADED_KEY) === 'true'
  const [isLoading, setIsLoading] = useState(!alreadyLoaded)
  const [isInHero, setIsInHero] = useState(true)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const heroRef = useRef(null)
  const location = useLocation()

  /* Hero scroll progress — drives the curtain reveal of the next section */
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })



  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

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
    const handleScroll = () => {
      setIsInHero(window.scrollY < window.innerHeight - 20)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const handleLoadingComplete = () => {
    sessionStorage.setItem(HAS_LOADED_KEY, 'true')
    setIsLoading(false)
  }

  return (
    <div className="app-container">
      <CustomCursor />
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <Navbar isLoaded={!isLoading} onContactClick={() => setIsContactOpen(true)} isInHero={isInHero} />

      <Routes>
        <Route path="/" element={
          <>
            <SocialSidebar isLoaded={!isLoading} isVisible={isInHero} />

            {/* Hero — scroll target for reveal animation */}
            <div ref={heroRef}>
              <HeroSection isLoaded={!isLoading} />
            </div>

            <SectionReveal>
              <IntroStatement />
            </SectionReveal>

            {/* ProjectsSection — has its own per-row entrance animations */}
            <ProjectsSection />

            <SectionReveal>
              <Footer onContactClick={() => setIsContactOpen(true)} />
            </SectionReveal>
          </>
        } />
        <Route path="/about" element={
          <div className="about-page-wrapper">
            <AboutSection />
            <SkillsMarquee />
            <EducationSection />
            <Footer onContactClick={() => setIsContactOpen(true)} />
          </div>
        } />
        <Route path="/skills" element={
          <SkillsPage onContactClick={() => setIsContactOpen(true)} />
        } />
      </Routes>

      <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
}

export default App