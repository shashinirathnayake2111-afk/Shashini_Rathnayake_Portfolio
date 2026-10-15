# Shashini Rathnayake — Portfolio

<div align="center">

  <img src="public/og-image.png" alt="Shashini Rathnayake Portfolio Preview" width="10%" style="border-radius: 12px; border: 1px solid rgba(230,201,168,0.2);" />

  <br/><br/>

  <h3>✨ Full Stack Developer &amp; UI/UX Designer ✨</h3>

  <p align="center">
    An Awwwards-inspired, high-performance developer portfolio built with React 19, Framer Motion, and modern Vanilla CSS. Featuring cinematic page transitions, physics-based 3D interactions, tactile carousels, and fluid responsive design.
  </p>

  <p align="center">
    <a href="https://shashinirathnayake.vercel.app/" target="_blank">
      <img src="https://img.shields.io/badge/Live%20Demo-View%20Portfolio-E6C9A8?style=for-the-badge&logo=vercel&logoColor=black" alt="Live Demo" />
    </a>
    <a href="https://github.com/shashinirathnayake2111-afk/Shashini_Rathnayake_Portfolio" target="_blank">
      <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" />
    </a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/Vite-8.2-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Framer%20Motion-12.4-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Lenis-Smooth%20Scroll-black?style=flat-square" alt="Lenis" />
    <img src="https://img.shields.io/badge/CSS3-Vanilla%20Luxury-1572B6?style=flat-square&logo=css3&logoColor=white" alt="Vanilla CSS" />
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
  </p>

</div>

---

## 🌟 Overview

This portfolio is crafted from the ground up to showcase engineering depth alongside modern UI/UX design sensibilities. Rather than relying on boilerplate frameworks, every micro-animation, scroll-driven interaction, and design token is custom-built to deliver an editorial, cinematic browsing experience.

### 🎯 Key Highlights
- **Curtain Hero Transition**: Parallax moon & atmospheric starfield with layered depth fade into the stargazer intro statement.
- **Horizontal Swipe Project Carousel**: 3-card spotlight with trackpad swipe, mouse drag, category filters, and interactive case study modals.
- **3D Physics Bento Cards**: Interactive mouse-tracking rotation physics with real-time specular glare reflections.
- **Draggable Certification Deck**: Layered swipe deck showcasing verified certificates and engineering credentials.
- **Recruiter-First Features**: Downloadable verified CV, one-click email copy with instant feedback, live work status indicator, and comprehensive OpenGraph / Twitter Cards SEO.

---

## 🚀 Key Features

### 1. 🌌 Hero & Stargazer Intro
- **Layered Parallax Universe**: Multi-tier starry sky with breathing moon pulse and cloud drifting.
- **Curtain Roll Elevation**: Smooth scroll-triggered docking with zero black screen gap.
- **Ambient Stargazer Silhouette**: Deep night palette blended with celestial particle shimmer.

### 2. 🎠 Gesture-Driven Project Carousel
- **3-Card Focus Stage**: Interactive card carousel with depth scaling (`scale: 1.0` center, `scale: 0.88` side cards).
- **Multi-Input Navigation**: Supports left/right button triggers, touch swipes, mouse click-and-drag, and trackpad horizontal scrolling.
- **Interactive Case Study Modals**: In-depth breakdowns including:
  - Client background & problem statement
  - Engineering architecture & design solutions
  - Full tech stack badges & direct links to GitHub / Live demo / Figma

### 3. 🧩 Interactive Bento & About Section
- **3D Gyroscope-Like Tilt**: Tilt calculations mapped to mouse offset with spring dampening.
- **Real-time Stat Counters**: Dynamic numerical counters celebrating industry experience, shipped projects, and certifications.
- **Integrated Resume Access**: Direct, professional CV download buttons across both desktop and mobile drawer menus.

### 4. 🧭 Seamless Route Transitions & Adaptive Navigation
- **Framer Motion Route Orchestration**: Silky page enter/exit animations with route-change scroll restoration.
- **Floating Pill & Hamburger Navigation**: Adapts automatically based on viewport scroll position:
  - Top hero: Full desktop navigation bar with theme toggle.
  - Scrolled body: Sleek "AVAILABLE FOR WORK" status pill + floating frosted hamburger menu.

### 5. 📬 Interactive Contact Drawer & Footer
- **Slide-out Drawer**: Accessible form with live field validation and Formspree backend delivery.
- **Elevated Footer**: Quick site exploration links, copyable direct email, "Back to Top" trigger, and responsive mobile layout.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
|---|---|
| **Core Framework** | React 19, React DOM 19 |
| **Build Tool & Bundler** | Vite 8, React Plugin |
| **Routing** | React Router v7 |
| **Motion & Animation** | Framer Motion 12, Lenis Smooth Scroll |
| **Styling & Theming** | Pure Vanilla CSS3, Custom Design System Tokens, CSS Grid, Flexbox, Glassmorphism |
| **Icons & Typography** | Lucide React, Devicon, Google Fonts (`Bebas Neue`, `Chakra Petch`, `Poppins`) |
| **Form Handling** | Formspree API Integration |
| **Deployment & Hosting** | Vercel Serverless Platform |

---

## 📂 Project Directory Structure

```plaintext
My_Portfolio/
├── public/
│   ├── favicon.svg             # Vector favicon
│   ├── og-image.png            # OpenGraph social share card
│   └── resume.pdf              # Verified CV for direct access
├── src/
│   ├── assets/                 # High-resolution media, project mockups & certificates
│   ├── components/
│   │   ├── page/
│   │   │   ├── AboutSection.jsx       # 3D Bento stats & personal engineering philosophy
│   │   │   ├── ContactDrawer.jsx      # Slide-out interactive contact form
│   │   │   ├── CustomCursor.jsx       # Fluid trailing cursor follower
│   │   │   ├── EducationSection.jsx   # Timeline & draggable certification swipe deck
│   │   │   ├── ExperiencePage.jsx     # Enterprise career history & metric breakdowns
│   │   │   ├── Footer.jsx             # Comprehensive footer with quick-nav & contact
│   │   │   ├── HeroSection.jsx        # Cinematic night sky, profile reveal & social links
│   │   │   ├── IntroStatement.jsx     # Stargazer curtain transition with dust drift
│   │   │   ├── LoadingScreen.jsx      # SVG signature loader with countdown
│   │   │   ├── Navbar.jsx             # Adaptive navigation bar & mobile drawer menu
│   │   │   ├── ProjectsSection.jsx    # Horizontal gesture carousel & case study modal
│   │   │   ├── SkillsMarquee.jsx      # Infinite technology loop ticker
│   │   │   ├── SkillsPage.jsx         # Technical capabilities categorized grid
│   │   │   └── SocialSidebar.jsx      # Fixed floating social anchor
│   │   └── styles/                    # Component-scoped Vanilla CSS design stylesheets
│   ├── App.jsx                        # Master routing, scroll stages, and Lenis init
│   ├── App.css                        # Global elevation layers and stage styling
│   ├── index.css                      # Global design tokens, resets & font definitions
│   └── main.jsx                       # Application entry point
├── index.html                         # Rich SEO, OpenGraph & Twitter Card metadata
├── package.json                       # Dependencies and build scripts
└── vite.config.js                     # Vite configuration & font optimization
```

---

## ⚡ Getting Started Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher recommended) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/shashinirathnayake2111-afk/Shashini_Rathnayake_Portfolio.git
cd Shashini_Rathnayake_Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Launch local development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application with hot module replacement (HMR).

### 4. Build for production
```bash
npm run build
```
Creates an optimized, production-ready bundle inside the `dist/` folder.

---

## 🎨 Design Philosophy & Color Palette

The interface is styled around a bespoke luxury dark palette with warm gold accents:

| Token | Hex Code | Purpose |
|---|---|---|
| **Canvas Dark** | `#050505` | Primary immersive background |
| **Deep Charcoal** | `#0d0d0c` | Card backgrounds and structural containers |
| **Accent Gold** | `#a07840` | Main title accents, eyebrows, and glowing borders |
| **Champagne Cream** | `#f2ead9` | Primary headings and crisp typography |
| **Soft Sand** | `#E6C9A8` | Interactive button accents, borders, and status highlights |
| **Emerald Live** | `#10b981` | Live availability beacon status indicator |

---

## 📬 Contact & Connect

- **Portfolio**: [shashinirathnayake.vercel.app](https://shashinirathnayake.vercel.app/)
- **Email**: [shashinirathnayake2111@gmail.com](mailto:shashinirathnayake2111@gmail.com)
- **LinkedIn**: [linkedin.com/in/shashini-rathnayake-dev](https://www.linkedin.com/in/shashini-rathnayake-dev/)
- **GitHub**: [@shashinirathnayake2111-afk](https://github.com/shashinirathnayake2111-afk)
- **Behance**: [behance.net/shashinirathnayke](https://www.behance.net/shashinirathnayke)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to explore the code for inspiration and learning!
