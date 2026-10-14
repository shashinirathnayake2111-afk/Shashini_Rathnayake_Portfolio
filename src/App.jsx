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
  const heroTrackRef = useRef(null)
  const location = useLocation()

  /* Scroll progress through the Hero → Intro transition track (0 → 1) */
  const { scrollYProgress: trackProgress } = useScroll({
    target: heroTrackRef,
    offset: ['start start', 'end end'],
  })

  // ── Hero layer: fades + blurs out quickly, then goes behind everything ──
  const heroOpacity = useTransform(trackProgress, [0, 0.22], [1, 0])
  const heroFilter = useTransform(trackProgress, [0, 0.22], ['blur(0px)', 'blur(12px)'])
  const heroScale  = useTransform(trackProgress, [0, 0.22], [1, 0.94])
  // Hard-hide hero once faded so it never bleeds through intro
  const heroVisibility = useTransform(trackProgress, (v) => v >= 0.22 ? 'hidden' : 'visible')
  const heroPointerEvents = useTransform(trackProgress, (v) => v > 0.1 ? 'none' : 'auto')

  // ── Intro layer: full-width slide-up (NO scale shrink = no corner bleed) ──
  // Starts below viewport, slides up and fades in — always 100vw wide
  const introY       = useTransform(trackProgress, [0, 0.05, 0.35], ['100vh', '60px', '0px'])
  const introOpacity = useTransform(trackProgress, [0, 0.05, 0.32], [0, 0.7, 1])
  const introPointerEvents = useTransform(trackProgress, (v) => v > 0.08 ? 'auto' : 'none')



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
      setIsInHero(window.scrollY < window.innerHeight * 0.45)
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
          <div className="home-scroll-container">
            <SocialSidebar isLoaded={!isLoading} isVisible={isInHero} />

            {/* Pinned Transition Stage: Intro blooms and emerges directly from the center of the Hero */}
            <div className="home-center-bloom-track" ref={heroTrackRef}>
              <div className="bloom-sticky-stage">

                {/* Background Hero Layer — fades & blurs, then hidden */}
                <motion.div
                  className="hero-stage-layer"
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

                {/* Intro Section — full-width slide-up, always covers hero fully */}
                <motion.div
                  className="intro-stage-layer"
                  style={{
                    y: introY,
                    opacity: introOpacity,
                    pointerEvents: introPointerEvents,
                  }}
                >
                  <IntroStatement />
                </motion.div>

              </div>
            </div>

            {/* Subsequent Homepage Sections */}
            <div className="home-subsequent-content">
              {/* ProjectsSection — has its own per-row entrance animations */}
              <ProjectsSection />

              <SectionReveal>
                <Footer onContactClick={() => setIsContactOpen(true)} />
              </SectionReveal>
            </div>
          </div>
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
        <Route path="/experience" element={
          <ExperiencePage onContactClick={() => setIsContactOpen(true)} />
        } />
      </Routes>

      <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
}

export default App