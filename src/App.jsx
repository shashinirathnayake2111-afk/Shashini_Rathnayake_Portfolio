import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion'
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
import ExperiencePage from './components/page/ExperiencePage'

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

  // ── Hero layer: fades + blurs out with cinematic camera pushback & depth ──
  const heroOpacity = useTransform(scrollY, [0, viewportH * 0.75], [1, 0])
  const heroFilter  = useTransform(scrollY, [0, viewportH * 0.8], ['blur(0px) brightness(1)', 'blur(10px) brightness(0.35)'])
  const heroScale   = useTransform(scrollY, [0, viewportH], [1, 0.92])
  // Hard-hide hero once covered so it never consumes GPU or interferes with page
  const heroVisibility = useTransform(scrollY, (y) => y >= viewportH ? 'hidden' : 'visible')
  const heroPointerEvents = useTransform(scrollY, (y) => y > 40 ? 'none' : 'auto')

  // ── Intro layer: Awwwards elevated card reveal with subtle horizon rim ──
  const introBorderRadius = useTransform(scrollY, [0, viewportH * 0.9], ['28px 28px 0px 0px', '0px 0px 0px 0px'])
  const introBoxShadow    = useTransform(
    scrollY,
    [0, viewportH * 0.7, viewportH],
    [
      '0 -5px 18px rgba(230, 201, 168, 0.05), 0 -12px 30px rgba(0, 0, 0, 0.7)',
      '0 -3px 10px rgba(230, 201, 168, 0.03), 0 -6px 15px rgba(0, 0, 0, 0.4)',
      '0 0px 0px rgba(0, 0, 0, 0)'
    ]
  )



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

  // On all pages (Hero, About, Skills, Experience), show full navbar at page top (scrollY < 50).
  // When scrolling down past 50px (into intro, education, projects, etc.),
  // hide full navbar and show hamburger menu + "AVAILABLE FOR WORK" pill.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsInHero(latest < 50)
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsInHero(window.scrollY < 50)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
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
              <SocialSidebar isLoaded={!isLoading} isVisible={isInHero} />

              {/* Fixed Hero Stage — stays behind during initial scroll, fades with depth */}
              <motion.div
                className="hero-fixed-stage"
                style={{
                  scale: heroScale,
                  opacity: heroOpacity,
                  filter: heroFilter,
                  visibility: heroVisibility,
                  pointerEvents: heroPointerEvents,
                }}
              >
                <HeroSection isLoaded={!isLoading} />
              </motion.div>

              {/* Elevated Intro Curtain — rises directly over Hero with curved glowing top, then docks */}
              <motion.div
                className="intro-elevation-stage"
                style={{
                  borderRadius: introBorderRadius,
                  boxShadow: introBoxShadow,
                }}
              >
                <IntroStatement />
              </motion.div>

              {/* Subsequent Homepage Sections — follow immediately with zero black screen gap */}
              <div className="home-subsequent-content">
                {/* ProjectsSection — has its own per-row entrance animations */}
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
              <SkillsMarquee />
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