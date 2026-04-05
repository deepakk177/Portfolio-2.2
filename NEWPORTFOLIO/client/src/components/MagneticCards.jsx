import { useRef, useState, useEffect, useCallback } from 'react';
// Lucide icons removed in favor of provided logos

/**
 * MagneticCards — Tutorial-07 style
 * 3D perspective cards that magnetically tilt toward the cursor
 * and scatter/restack on hover.
 * Updated to display social media accounts instead of projects.
 */
const cardData = [
  {
    logo: '/github-logo.png',
    label: 'GitHub',
    url: 'https://github.com/deepakk177',
    bg: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
  },
  {
    logo: '/x-logo.png',
    label: 'Twitter',
    url: 'https://x.com/porte_deep74061',
    bg: 'https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&q=80&w=800',
  },
  {
    logo: '/instagram-logo.png',
    label: 'Instagram',
    url: 'https://www.instagram.com/__deepakk.singh/',
    bg: 'https://images.unsplash.com/photo-1531297484001-80022131f1a1?auto=format&fit=crop&q=80&w=800',
  },
];

const MagneticCard = ({ card, index, anyHovered }) => {
  const ref = useRef(null);
  const [magnetic, setMagnetic] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouse = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = 500;
    if (dist < radius) {
      const strength = 0.08;
      setMagnetic({
        x: (dx / rect.width) * 100 * strength,
        y: (dy / rect.height) * 100 * strength,
      });
    } else {
      setMagnetic({ x: 0, y: 0 });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [handleMouse]);

  // Scatter positions when any card is hovered
  const scatterTransforms = [
    { translate: '-5% 5%', rotate: '5deg' },
    { translate: '0 -10%', rotate: '0deg' },
    { translate: '5% 0%', rotate: '-5deg' },
  ];
  const restTransforms = [
    { translate: '0 -5%', rotate: '-5deg' },
    { translate: '0 0', rotate: '5deg' },
    { translate: '0 10%', rotate: '10deg' },
  ];

  const scatter = anyHovered
    ? scatterTransforms[index]
    : restTransforms[index];

  return (
    <figure
      ref={ref}
      className={`mc-card mc-card-${index + 1}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.open(card.url, '_blank')}
      style={{
        transform: `translate(${magnetic.x * 0.5}%, ${magnetic.y * 0.5}%) rotateX(${magnetic.y * -0.5}deg) rotateY(${magnetic.x * 0.5}deg)`,
        scale: anyHovered ? (hovered ? '1.05' : '0.8') : '0.9',
        translate: scatter.translate,
        rotate: scatter.rotate,
        cursor: 'pointer',
      }}
    >
      <div className="mc-card-bg">
        <img
          src={card.bg}
          alt={card.label}
          className="mc-bg-img"
        />
        <div className="mc-overlay" />
      </div>
      <div className="mc-content">
        <img src={card.logo} alt={card.label} className="mc-social-logo" />
      </div>
      <figcaption className="mc-caption">{card.label}</figcaption>
    </figure>
  );
};

const MagneticCards = () => {
  const [anyHovered, setAnyHovered] = useState(false);

  return (
    <section className="mc-section">
      <div className="mc-header">
        <span className="mc-eyebrow">MAGNETIC INTERACTION</span>
        <h2 className="mc-title">
          Find me on <span className="mc-title-italic">Socials</span>
        </h2>
      </div>

      <div
        className="mc-grid"
        onMouseEnter={() => setAnyHovered(true)}
        onMouseLeave={() => setAnyHovered(false)}
      >
        {cardData.map((card, i) => (
          <MagneticCard
            key={i}
            card={card}
            index={i}
            anyHovered={anyHovered}
          />
        ))}
      </div>

      <style>{`
        .mc-section {
          padding: 8rem 2rem 10rem;
          background: #030303;
          overflow: hidden;
        }
        .mc-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .mc-eyebrow {
          font-size: 0.6rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
          display: block;
          margin-bottom: 1rem;
        }
        .mc-title {
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1;
        }
        .mc-title-italic {
          font-style: italic;
          font-family: 'Playfair Display', serif;
          color: rgba(255,255,255,0.35);
          font-weight: 400;
          text-transform: none;
        }

        .mc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          max-width: 1100px;
          margin: 0 auto;
          perspective: 80rem;
          min-height: 450px;
          align-items: center;
        }
        .mc-card {
          position: relative;
          overflow: hidden;
          border-radius: 0.6rem;
          height: 380px;
          will-change: transform, scale, translate, rotate;
          transition:
            scale 0.6s cubic-bezier(0.35, 0.35, 0, 1),
            rotate 0.6s cubic-bezier(0.35, 0.35, 0, 1),
            translate 0.6s cubic-bezier(0.35, 0.35, 0, 1);
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mc-card-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .mc-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) brightness(0.3);
          transition: filter 0.8s ease, transform 0.8s ease;
        }
        .mc-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%);
        }
        .mc-card:hover .mc-bg-img {
          filter: grayscale(0%) brightness(0.6);
          transform: scale(1.1);
        }
        .mc-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mc-social-logo {
          width: 60px;
          height: 60px;
          object-fit: contain;
          opacity: 0.6;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .mc-card:hover .mc-social-logo {
          opacity: 1;
          transform: scale(1.15);
        }
        .mc-caption {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .mc-card:hover .mc-caption {
          opacity: 1;
          transform: translateY(0);
        }

        /* Card stacking */
        .mc-card-1 { z-index: 1; }
        .mc-card-2 { z-index: 2; margin-left: -15%; margin-right: -15%; }
        .mc-card-3 { z-index: 1; }

        @media (max-width: 768px) {
          .mc-grid {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }
          .mc-card { margin: 0 !important; width: 100%; height: 280px; }
        }
      `}</style>
    </section>
  );
};

export default MagneticCards;
