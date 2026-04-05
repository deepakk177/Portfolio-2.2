import { useEffect, useRef, useState } from 'react';

const images = [
  {
    src: '/project-1.png',
    fallback: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=900',
    label: 'Code & Craft',
    col: 'gallery-img-1',
  },
  {
    src: '/project-2.png',
    fallback: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=700',
    label: 'AI Systems',
    col: 'gallery-img-2',
  },
  {
    src: '/premium-design.png',
    fallback: 'https://images.unsplash.com/photo-1531297484001-80022131f1a1?auto=format&fit=crop&q=80&w=800',
    label: 'Design',
    col: 'gallery-img-3',
  },
  {
    src: '/my-profile.jpg',
    fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    label: 'Identity',
    col: 'gallery-img-4',
  },
];

const ScrollRevealGallery = () => {
  const figureRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [revealed, setRevealed] = useState([false, false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = figureRefs.current.indexOf(entry.target);
            if (idx !== -1) {
              setRevealed((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    figureRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="srg-section">
      <div className="srg-header">
        <span className="srg-label">SCROLL TO REVEAL</span>
        <h2 className="srg-title">
          Visual <span className="srg-italic">Footprints</span>
        </h2>
      </div>

      <div className="srg-grid">
        {images.map((img, i) => {
          const isHovered = hoveredIndex === i;
          const isOther   = hoveredIndex !== null && hoveredIndex !== i;
          const isIn      = revealed[i];

          return (
            <figure
              key={i}
              ref={(el) => (figureRefs.current[i] = el)}
              className={`srg-figure srg-${i + 1}`}
              style={{
                opacity:   isIn ? (isOther ? 0.35 : 1) : 0,
                transform: isIn
                  ? isHovered
                    ? 'translateY(-30px) scale(1.05)'
                    : isOther
                      ? 'scale(0.93)'
                      : 'translateY(0) scale(1)'
                  : 'translateY(60px) scale(0.95)',
                transitionDelay: isIn && !isHovered && hoveredIndex === null ? `${i * 0.12}s` : '0s',
                filter: isIn && isOther ? 'grayscale(80%)' : 'grayscale(0%)',
                zIndex: isHovered ? 10 : 1,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="srg-img-wrap">
                <img
                  src={img.src}
                  alt={img.label}
                  onError={(e) => { e.target.src = img.fallback; }}
                />
              </div>
              <figcaption
                className="srg-caption"
                style={{
                  opacity:   isIn ? 1 : 0,
                  transform: isIn ? 'translateY(0)' : 'translateY(6px)',
                  transitionDelay: isIn ? `${0.4 + i * 0.12}s` : '0s',
                }}
              >
                {img.label}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <style>{`
        .srg-section {
          padding: 8rem 2rem 10rem;
          background: #000;
          overflow: hidden;
        }

        /* ── Header ── */
        .srg-header {
          text-align: center;
          margin-bottom: 5rem;
        }
        .srg-label {
          font-size: 0.62rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          display: block;
          margin-bottom: 1rem;
        }
        .srg-title {
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1;
          margin: 0;
        }
        .srg-italic {
          font-style: italic;
          font-family: 'Playfair Display', serif;
          color: rgba(255,255,255,0.38);
          font-weight: 400;
          text-transform: none;
        }

        /* ── Grid ── */
        .srg-grid {
          display: grid;
          grid-template-columns: repeat(14, 1fr);
          gap: 0.5rem;
          max-width: 1300px;
          margin: 0 auto;
        }

        /* ── Figure base ── */
        .srg-figure {
          position: relative;
          cursor: pointer;
          will-change: transform, opacity, filter;
          transition:
            transform 0.65s cubic-bezier(0.33, 1, 0.68, 1),
            opacity   0.65s cubic-bezier(0.33, 1, 0.68, 1),
            filter    0.65s ease;
          border-radius: 0.25rem;
          overflow: hidden;
        }

        /* ── Image wrapper clips the image on hover (zoom inside) ── */
        .srg-img-wrap {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: inherit;
        }
        .srg-img-wrap img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.65s cubic-bezier(0.33, 1, 0.68, 1);
        }
        .srg-figure:hover .srg-img-wrap img {
          transform: scale(1.08);
        }

        /* ── Caption ── */
        .srg-caption {
          position: absolute;
          bottom: 0.85rem;
          left: 1rem;
          font-size: 0.58rem;
          text-transform: uppercase;
          letter-spacing: 0.35em;
          color: rgba(255,255,255,0.75);
          background: rgba(0,0,0,0.45);
          padding: 0.35rem 0.7rem;
          backdrop-filter: blur(4px);
          border-radius: 0.2rem;
          transition: opacity 0.5s ease, transform 0.5s ease;
          pointer-events: none;
        }

        /* ── Column placements — asymmetric editorial layout ── */
        .srg-1 {
          grid-column: 2 / 7;
          grid-row: 1;
          height: 340px;
        }
        .srg-2 {
          grid-column: 9 / 13;
          grid-row: 1;
          height: 280px;
          align-self: end;
        }
        .srg-3 {
          grid-column: 4 / 8;
          grid-row: 2;
          height: 360px;
          margin-top: 1.5rem;
        }
        .srg-4 {
          grid-column: 9 / 14;
          grid-row: 2;
          height: 310px;
          margin-top: 1.5rem;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .srg-grid {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .srg-figure {
            height: 240px !important;
            margin-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ScrollRevealGallery;
