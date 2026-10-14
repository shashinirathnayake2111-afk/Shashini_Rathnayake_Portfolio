import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion'
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

  // ── Hero layer: fades + blurs out with cinematic camera pushback & depth ──
  const heroOpacity = useTransform(trackProgress, [0, 0.35], [1, 0])
  const heroFilter  = useTransform(trackProgress, [0, 0.38], ['blur(0px) brightness(1)', 'blur(10px) brightness(0.35)'])
  const heroScale   = useTransform(trackProgress, [0, 0.42], [1, 0.90])
  // Hard-hide hero once faded so it never consumes GPU or bleeds through
  const heroVisibility = useTransform(trackProgress, (v) => v >= 0.38 ? 'hidden' : 'visible')
  const heroPointerEvents = useTransform(trackProgress, (v) => v > 0.05 ? 'none' : 'auto')

  // ── Intro layer: Awwwards elevated card reveal with glowing horizon rim ──
  const introY            = useTransform(trackProgress, [0, 0.42], ['100vh', '0px'])
  const introScale        = useTransform(trackProgress, [0.06, 0.42], [0.94, 1])
  const introOpacity      = useTransform(trackProgress, [0, 0.08, 0.36], [0, 0.75, 1])
  const introBorderRadius = useTransform(trackProgress, [0, 0.38], ['36px 36px 0px 0px', '0px 0px 0px 0px'])
  const introBoxShadow    = useTransform(
    trackProgress,
    [0, 0.32, 0.44],
    [
      '0 -25px 80px rgba(230, 201, 168, 0.22)',
      '0 -10px 40px rgba(230, 201, 168, 0.1)',
      '0 0px 0px rgba(0, 0, 0, 0)'
    ]
  )
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

  // Sync isInHero state with trackProgress for instant responsiveness during transition
  useMotionValueEvent(trackProgress, 'change', (latest) => {
    if (location.pathname === '/') {
      if (latest < 0.04 && window.scrollY < 35) {
        setIsInHero(true)
      } else if (latest >= 0.04 || window.scrollY >= 35) {
        setIsInHero(false)
      }
    }
  })

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsInHero(false)
      return
    }

    const handleScroll = () => {
      // In Hero only when scroll is at the very top (first 35px)
      setIsInHero(window.scrollY < 35)
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

                {/* Intro Section — elevated Awwwards card, slides up with glowing rim and docks */}
                <motion.div
                  className="intro-stage-layer"
                  style={{
                    y: introY,
                    scale: introScale,
                    opacity: introOpacity,
                    borderRadius: introBorderRadius,
                    boxShadow: introBoxShadow,
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