import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import Capabilities from './components/Capabilities';
import Education from './components/Education';
import Footer from './components/Footer';
import MagneticButton from './components/MagneticButton';
import AboutDetail from './pages/AboutDetail';
import RevealText from './components/RevealText';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';

// ── New Tutorial-Inspired Components ──

import ScrollProgressSection from './components/ScrollProgressSection';
import CursorHoverMenu from './components/CursorHoverMenu';
import SpotlightEyes from './components/SpotlightEyes';

const HomeView = () => {
  const M = motion;
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <main>
        <Hero />



        {/* ── Tutorial-03: Scroll Progress Expanding Image ── */}
        <ScrollProgressSection />

        <ProjectGrid />



        {/* ── Tutorial-06: Cursor-Follow Skills Menu ── */}
        <CursorHoverMenu />

        <Capabilities />

        <Education />

        {/* ── Tutorial-08: Spotlight Eye-Tracking Character ── */}
        <SpotlightEyes />

        {/* Minimal About Preview */}
        <article id="about" className="py-40 bg-dark relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="relative aspect-square bg-surface overflow-hidden group">
                <M.img
                  src="/my-profile.jpg"
                  alt="Deepak Singh Porte - Profile"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000";
                  }}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1, transition: { duration: 1.5 } }}
                  viewport={{ once: true }}
                />
              </div>
              <div>
                <RevealText>
                  <h2 className="h-md mb-8 uppercase tracking-tight">I bring ideas to life through <br /><span className="text-muted italic font-serif normal-case">design & code.</span></h2>
                </RevealText>
                <RevealText delay={0.2}>
                  <p className="text-gray-400 mb-12 max-w-lg leading-relaxed uppercase text-xs tracking-widest leading-[2]">
                    Based in Bhopal, I specialize in building digital experiences that merge functionality with high-end aesthetics. My goal is to create products that not only look stunning but feel intuitive and responsive.
                  </p>
                </RevealText>
                <RevealText delay={0.4}>
                  <div onClick={() => navigate('/about-more')} className="cursor-pointer">
                    <MagneticButton>
                      Learn More
                    </MagneticButton>
                  </div>
                </RevealText>
              </div>
            </div>
          </div>

          {/* Decor */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
        </article>

        {/* Call to Action */}
        <section className="py-60 bg-surface flex flex-col items-center justify-center text-center px-6">
          <RevealText>
            <M.h2
              className="h-xl mb-16 max-w-4xl"
            >
              READY TO <span className="italic font-serif normal-case text-muted">Manifest</span> THE FUTURE?
            </M.h2>
          </RevealText>
          <RevealText delay={0.2}>
            <a href="#contact" className="interactive block">
              <MagneticButton className="px-20 py-8 text-lg md:text-xl">
                LET'S TALK
              </MagneticButton>
            </a>
          </RevealText>
        </section>
      </main>
      <Footer />
    </>
  );
};

function App() {
  useEffect(() => {
    const clickSound = new Audio('/sounds/u_1thl5d0szy-memeclick-506437.mp3');
    clickSound.volume = 0.4;

    const handleGlobalClick = (e) => {
      // Play sound if clicked element is a button, link, or contains 'interactive' class
      if (
        e.target.closest('button') || 
        e.target.closest('a') || 
        e.target.classList.contains('interactive') ||
        e.target.closest('.interactive')
      ) {
        clickSound.currentTime = 0;
        clickSound.play().catch(err => console.warn("Click sound blocked:", err));
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-dark min-h-screen text-white selection:bg-white selection:text-black">
        <CustomCursor />


        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/about-more" element={<AboutDetail />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
