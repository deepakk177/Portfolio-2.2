import { useRef, useEffect, useState } from 'react';

/**
 * ScrollProgressSection — Tutorial-03 style
 * A sticky image that expands from a rounded rectangle to full-bleed
 * as the user scrolls through a tall scroll container.
 */
const ScrollProgressSection = () => {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.min(Math.max(scrolled / total, 0), 1);
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Octagon expand logic
  const scale    = 0.5 + progress * 0.5;
  const p1 = Math.max(30 - progress * 30, 0);
  const p2 = Math.min(70 + progress * 30, 100);
  const p3 = Math.max(30 - progress * 30, 0);
  const p4 = Math.min(70 + progress * 30, 100);

  const clipPath = `polygon(
    ${p1}% 0%, 
    ${p2}% 0%, 
    100% ${p3}%, 
    100% ${p4}%, 
    ${p2}% 100%, 
    ${p1}% 100%, 
    0% ${p4}%, 
    0% ${p3}%
  )`;

  return (
    <section ref={sectionRef} className="sps-section">
      {/* Sticky viewport */}
      <div className="sps-sticky">
        <div
          className="sps-image-wrap"
          style={{
            scale: `${scale}`,
            clipPath,
            transform: 'translateZ(0)',
          }}
        >
          <img
            src="/two-heavens-as-one-vagabond.jpg"
            alt="Scroll progress — vagabond"
          />
          {/* Dark overlay so text stays legible */}
          <div className="sps-overlay" />
        </div>

        {/* Text overlay */}
        <div className="sps-text">
          <p className="sps-quote">
            "Precision in every stroke — the art of code is knowing
            when to cut and when to compose."
          </p>
          <h2 className="sps-big-word">Precision</h2>
        </div>

        {/* Progress bar */}
        <div className="sps-progress-bar">
          <div
            className="sps-progress-fill"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <style>{`
        .sps-section {
          position: relative;
          height: 300vh;
          background: #000;
        }
        .sps-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: grid;
          grid-template-rows: 1fr;
          overflow: hidden;
        }
        .sps-image-wrap {
          position: absolute;
          inset: 0;
          will-change: scale, clip-path;
          transition: clip-path 0.1s cubic-bezier(0.33, 1, 0.68, 1), scale 0.1s cubic-bezier(0.33, 1, 0.68, 1);
        }
        .sps-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          /* Subtle zoom effect */
          transform: scale(${1 + progress * 0.1});
          transition: transform 0.1s linear;
        }
        .sps-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.9) 100%);
          z-index: 1;
        }
        .sps-text {
          position: relative;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          padding: 0 2rem;
        }
        .sps-quote {
          font-size: clamp(0.7rem, 1.8vw, 1.1rem);
          color: rgba(255,255,255,1);
          max-width: 480px;
          line-height: 2;
          margin-bottom: 3rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          font-weight: 400;
          background: rgba(0,0,0,0.7);
          padding: 2rem 2.5rem;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }
        .sps-big-word {
          font-size: clamp(5rem, 25vw, 18rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.05em;
          color: rgba(255,255,255,0.035);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          position: absolute;
          bottom: -2rem;
          left: 0;
          right: 0;
          text-align: center;
          mix-blend-mode: color-dodge;
        }
        .sps-progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(255,255,255,0.1);
          z-index: 200;
        }
        .sps-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, rgba(255,90,55,0.8), rgba(255,200,50,0.8));
          transition: width 0.05s linear;
        }
      `}</style>
    </section>
  );
};

export default ScrollProgressSection;
