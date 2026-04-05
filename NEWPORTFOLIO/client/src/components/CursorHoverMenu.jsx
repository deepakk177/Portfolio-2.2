import { useRef, useState, useEffect } from 'react';
import { Github, Twitter, Instagram, Linkedin, Music } from 'lucide-react';

/**
 * CursorHoverMenu — Socials version with Sounds
 * Linear one-by-one layout with hover sounds.
 */
const socials = [
  {
    id: 1,
    label: 'GitHub',
    sub: 'deepakk177',
    url: 'https://github.com/deepakk177',
    icon: Github,
    color: '#ffffff',
    bg: 'rgba(255,255,255,0.05)',
    sound: '/sounds/y2mate_dRSdKeL.mp3'
  },
  {
    id: 2,
    label: 'Twitter',
    sub: 'porte_deep74061',
    url: 'https://x.com/porte_deep74061',
    icon: Twitter,
    color: '#1DA1F2',
    bg: 'rgba(29, 161, 242, 0.1)',
    sound: '/sounds/it_was_at_this_moment.mp3'
  },
  {
    id: 3,
    label: 'Instagram',
    sub: '__deepakk.singh',
    url: 'https://www.instagram.com/__deepakk.singh/',
    icon: Instagram,
    color: '#E4405F',
    bg: 'rgba(228, 64, 95, 0.1)',
    sound: '/sounds/u_60prvfn0xb-thud-sound-effect-319090.mp3'
  },
  {
    id: 4,
    label: 'LinkedIn',
    sub: 'Deepak Singh Porte',
    url: 'https://www.linkedin.com/in/deepak-singh-porte-a0566a224/',
    icon: Linkedin,
    color: '#0077b5',
    bg: 'rgba(0, 119, 181, 0.1)',
    sound: '/sounds/No God Please No - The Office - QuickSounds.com.mp3'
  },
  {
    id: 5,
    label: 'Spotify',
    sub: 'Playlists',
    url: 'https://open.spotify.com/user/cp6w2t5oalpevo0na6jzsuz28',
    icon: Music,
    color: '#1DB954',
    bg: 'rgba(29, 185, 84, 0.1)',
    sound: '/sounds/french-meme-song.mp3'
  },
];

const CursorHoverMenu = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [lerped, setLerped] = useState({ x: 0, y: 0 });
  const [echos, setEchos] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const rafRef = useRef(null);
  const rawRef = useRef({ x: 0, y: 0 });
  const lerpedRef = useRef({ x: 0, y: 0 });
  const echosRef = useRef([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const audioRef = useRef(null);

  const lerp = (a, b, t) => a + (b - a) * t;

  const playHoverSound = (soundPath) => {
    if (!soundPath) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const audio = new Audio(soundPath);
    audio.volume = 0.4;
    audioRef.current = audio;
    audio.play().catch(err => console.warn("Sound play blocked:", err));
  };

  const stopHoverSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  useEffect(() => {
    const handleMove = (e) => {
      rawRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMove);

    const tick = () => {
      lerpedRef.current = {
        x: lerp(lerpedRef.current.x, rawRef.current.x, 0.12),
        y: lerp(lerpedRef.current.y, rawRef.current.y, 0.12),
      };
      const alphas = [0.25, 0.55, 0.78];
      const prev = [lerpedRef.current, ...echosRef.current];
      echosRef.current = alphas.map((a, i) => ({
        x: lerp(echosRef.current[i].x, prev[i].x, a),
        y: lerp(echosRef.current[i].y, prev[i].y, a),
      }));

      setLerped({ ...lerpedRef.current });
      setEchos([...echosRef.current]);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="chm-section" id="connect">
      <div className="chm-header">
        <span className="chm-eyebrow">GET IN TOUCH</span>
        <h2 className="chm-title">
          Find me on <span className="chm-italic">Socials</span>
        </h2>
      </div>

      <div className="chm-grid-container">
        <div className="chm-grid">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`chm-item ${hoveredId && hoveredId !== social.id ? 'chm-dimmed' : ''} ${hoveredId === social.id ? 'chm-active' : ''}`}
              onMouseEnter={() => {
                setHoveredId(social.id);
                playHoverSound(social.sound);
              }}
              onMouseLeave={() => {
                setHoveredId(null);
                stopHoverSound();
              }}
            >
              <div className="chm-thumb" style={{ color: social.color }}>
                <social.icon size={28} />
              </div>
              <div className="chm-text-group">
                <span className="chm-label">{social.label}</span>
                <span className="chm-sub">{social.sub}</span>
              </div>
              <div className="chm-arrow">
                <social.icon size={16} />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Floating cursor logo */}
      {hoveredId && (
        <div
          className="chm-cursor-img"
          style={{
            transform: `translate3d(${lerped.x}px, ${lerped.y}px, 0)`,
          }}
        >
          {socials.map((social) => (
            <div
              key={social.id}
              className={`chm-cursor-figure ${hoveredId === social.id ? 'chm-cursor-visible' : ''}`}
              style={{ background: social.bg }}
            >
              <social.icon size={64} style={{ color: social.color }} />
              <span className="chm-cursor-label" style={{ color: social.color }}>{social.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Echo dots */}
      {echos.map((e, i) => (
        <div
          key={i}
          className="chm-echo"
          style={{
            transform: `translate3d(${e.x - 3}px, ${e.y - 3}px, 0)`,
            opacity: hoveredId ? 0.6 - i * 0.15 : 0,
          }}
        />
      ))}

      <style>{`
        .chm-section {
          position: relative;
          padding: 8rem 2rem 10rem;
          background: #060606;
          overflow: hidden;
        }
        .chm-header {
          text-align: center;
          margin-bottom: 5rem;
        }
        .chm-eyebrow {
          font-size: 0.6rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          display: block;
          margin-bottom: 1rem;
        }
        .chm-title {
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1;
        }
        .chm-italic {
          font-style: italic;
          font-family: 'Playfair Display', serif;
          color: rgba(255,255,255,0.35);
          font-weight: 400;
          text-transform: none;
        }

        .chm-grid-container {
          max-width: 900px;
          margin: 0 auto;
        }
        .chm-grid {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .chm-item {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          padding: 3rem 2rem;
          text-decoration: none;
          position: relative;
          background: #060606;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          overflow: hidden;
        }
        .chm-item:hover {
          background: rgba(255,255,255,0.02);
          padding-left: 3rem;
        }
        .chm-thumb {
          flex-shrink: 0;
          width: 3.5rem;
          height: 3.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.03);
          border-radius: 50%;
          z-index: 1;
          transition: all 0.4s ease;
        }
        .chm-active .chm-thumb {
          transform: scale(0.9) rotate(-10deg);
          background: rgba(255,255,255,0.08);
        }

        .chm-text-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex: 1;
          z-index: 1;
        }
        .chm-label {
          font-size: clamp(1.8rem, 4vw, 3.2rem);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: #fff;
          transition: color 0.3s ease;
        }
        .chm-dimmed .chm-label {
          color: rgba(255,255,255,0.15);
        }
        .chm-active .chm-label {
          color: #fff !important;
        }

        .chm-sub {
          font-size: 0.65rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          font-weight: 600;
        }

        .chm-arrow {
          opacity: 0;
          transform: translateX(-20px);
          transition: all 0.4s ease;
          color: rgba(255,255,255,0.4);
        }
        .chm-active .chm-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Floating cursor logo */
        .chm-cursor-img {
          position: fixed;
          top: -80px;
          left: -100px;
          z-index: 9998;
          pointer-events: none;
          will-change: transform;
        }
        .chm-cursor-figure {
          width: 220px;
          height: 180px;
          border-radius: 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.2rem;
          opacity: 0;
          scale: 0.6;
          translate: 0 15%;
          transition:
            opacity 0.25s cubic-bezier(0.86,0,0.31,1),
            scale 0.6s cubic-bezier(0.35,0.35,0,1),
            translate 0.6s cubic-bezier(0.35,0.35,0,1);
          position: absolute;
          top: 0;
          left: 0;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }
        .chm-cursor-label {
          font-size: 0.85rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.35em;
        }
        .chm-cursor-figure.chm-cursor-visible {
          opacity: 1;
          scale: 1;
          translate: 0 0;
          transition:
            opacity 0.2s,
            scale 0.6s cubic-bezier(0.35,0.35,0,1),
            translate 0.6s cubic-bezier(0.35,0.35,0,1);
        }

        .chm-echo {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.7);
          z-index: 9997;
          pointer-events: none;
          will-change: transform, opacity;
          transition: opacity 0.3s ease;
        }

        @media (max-width: 768px) {
          .chm-cursor-img, .chm-echo { display: none; }
          .chm-item { padding: 2rem 1.5rem; gap: 1.5rem; }
          .chm-item:hover { padding-left: 1.5rem; }
          .chm-thumb { width: 2.8rem; height: 2.8rem; }
          .chm-label { font-size: 1.4rem; }
        }
      `}</style>
    </section>
  );
};

export default CursorHoverMenu;
