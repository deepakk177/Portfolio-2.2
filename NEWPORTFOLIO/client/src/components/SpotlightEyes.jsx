import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * SpotlightEyes — Tutorial-08 faithful recreation
 * SVG-based cartoon character with bouncing body animation.
 * The eyes track mouse cursor using atan2 trig (angle + distance).
 */
const SpotlightEyes = () => {
  const cardRef = useRef(null);
  const [angle, setAngle] = useState(Math.PI / 2);
  const [distance, setDistance] = useState(0);

  const handleMouse = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    setAngle(Math.atan2(dy, dx));
    setDistance(Math.sqrt(dx * dx + dy * dy));
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [handleMouse]);

  const clampDist = Math.min(distance, 800);
  // Mirror tutorial-08 exact formula: sin/cos of angle × clamped distance
  const eyeX = Math.sin(angle) * clampDist * -0.0075;
  const eyeY = Math.cos(angle) * clampDist * 0.01;
  const pupilX = Math.sin(angle) * clampDist * -0.075;
  const pupilY = Math.cos(angle) * clampDist * 0.1;

  return (
    <section className="se-section">
      <div className="se-inner">

        {/* Left: text */}
        <div className="se-text-col">
          <span className="se-eyebrow">INTERACTIVE PLAYGROUND</span>
          <h2 className="se-title">
            Watch <span className="se-italic">Me</span>
          </h2>
          <p className="se-desc">
            Move your cursor — the character's eyes follow in real-time
            using trigonometric spotlight tracking, faithfully recreated
            from the tutorial-08 interaction.
          </p>
        </div>

        {/* Right: card + character */}
        <div className="se-card" ref={cardRef}>

          {/* ── Shadow ellipse ── */}
          <svg viewBox="0 0 1080 90" className="se-shadow-svg">
            <ellipse fill="#101214" cx="540" cy="45" rx="381" ry="42" opacity="0.35" />
          </svg>

          {/* ── Body (bounces) ── */}
          <svg viewBox="0 0 1080 1080" className="se-svg se-body">
            <g stroke="none" fill="none" fillRule="evenodd">
              {/* Right hand / arm */}
              <path d="M273,451 C137,479 88,537 144,585" stroke="#544D56" strokeWidth="60" strokeLinecap="round" />
              <path d="M207,564 C158,507 61,612 121,648 C121,669 126,678 131,682 C120,708 159,748 202,724 C231,725 247,709 247,693 C292,684 300,566 207,564 Z" stroke="#544D56" strokeWidth="10" fill="#FDF8E6" />
              {/* Left hand / arm */}
              <path d="M850,475 C949,472 981,535 952,570" stroke="#544D56" strokeWidth="60" strokeLinecap="round" />
              <path d="M872,564 C921,507 1018,612 958,648 C958,669 950,684 945,689 C957,727 907,753 877,724 C848,725 832,709 832,693 C810,684 806,672 804,663 C778,660 773,561 872,564 Z" stroke="#544D56" strokeWidth="10" fill="#FDF8E6" />
              {/* Right foot */}
              <path d="M406,881 C397,843 526,823 527,871 C573,895 558,980 556,985 C563,988 562,1002 555,1008 C514,1040 457,1026 449,1026 C442,1027 353,1067 252,1023 C247,1018 246,1005 255,1004 C205,934 268,805 406,881 Z" stroke="#101214" strokeWidth="10" fill="#8A4B2A" />
              <line x1="431" y1="689" x2="468" y2="861" stroke="#101214" strokeWidth="60" strokeLinecap="round" />
              {/* Left foot */}
              <path d="M558,894 C553,840 693,844 691,890 C754,841 893,885 837,1002 C848,1005 847,1041 833,1045 C711,1073 668,1039 656,1039 C644,1039 591,1058 539,1027 C534,1023 535,1005 541,1003 C520,977 520,907 558,894 Z" stroke="#101214" strokeWidth="10" fill="#8A4B2A" />
              <line x1="578" y1="699" x2="621" y2="875" stroke="#101214" strokeWidth="60" strokeLinecap="round" />
              {/* Main body */}
              <path d="M236,688 C240,712 310,713 310,713 L315,703 L723,724 C723,724 719,734 725,736 C732,739 814,746 826,731 C837,717 823,597 850,386 C878,174 897,137 895,116 C893,96 853,45 829,41 C804,38 723,44 723,44 C723,44 726,34 702,34 C678,33 472,27 454,27 C437,26 432,35 432,35 C432,35 376,28 367,27 C358,25 307,14 300,41 C294,68 214,524 236,688 Z" fill="#3A3C39" />
              <path d="M723,724 C734,725 735,719 736,709 C743,554 764,368 765,358 C765,348 760,343 747,342 C735,340 357,309 338,308 C319,306 315,313 312,326 C305,354 276,663 285,693 C287,702 315,703 315,703 L723,724 Z" fill="#8A8476" />
              <path d="M740,636 C749,501 764,367 765,358 C765,348 760,343 747,342 C735,340 357,309 338,308 C319,306 315,313 312,326 C307,345 293,490 286,593 Z" fill="#FDF8E6" />
            </g>
          </svg>

          {/* ── Eyes layer (separate so we can apply eye transform) ── */}
          <div className="se-eyes-layer">
            <div className="se-eye-wrap">
              {/* Left eye */}
              <div
                className="se-eye se-eye-l"
                style={{ transform: `translate(${eyeX}%, ${eyeY}%)` }}
              >
                <div
                  className="se-pupil"
                  style={{ transform: `translate(${pupilX}%, ${pupilY}%)` }}
                />
              </div>
              {/* Right eye */}
              <div
                className="se-eye se-eye-r"
                style={{ transform: `translate(${eyeX}%, ${eyeY}%)` }}
              >
                <div
                  className="se-pupil"
                  style={{ transform: `translate(${pupilX}%, ${pupilY}%)` }}
                />
              </div>
            </div>
          </div>

          {/* ── Face SVG (on top, bounces) ── */}
          <svg viewBox="0 0 1080 1080" className="se-svg se-face">
            <g stroke="none" fill="none" fillRule="evenodd">
              <circle fill="#FDF8E6" cx="610" cy="496" r="38" />
              {/* Mouth open */}
              <path d="M621,464 C572,511 503,521 442,512 C456,602 624,624 621,464 Z" stroke="#101214" strokeWidth="10" fill="#101214" strokeLinejoin="round" />
              {/* Inner lip */}
              <path d="M504,578 C546,590 597,574 615,515 C581,509 562,530 562,530 C562,530 514,524 504,578 Z" fill="#FF4F36" />
              {/* Nose */}
              <path d="M496,395 C568,399 565,503 484,495 C413,488 415,390 496,395 Z" stroke="#101214" strokeWidth="10" fill="#FF4F36" />
              <path d="M479,406 C509,408 507,451 474,447 C444,445 445,404 479,406 Z" fill="#FFA27D" />
              {/* Eyebrow arches */}
              <path d="M598,170 C619,146 694,156 705,198" stroke="#544D56" strokeWidth="10" />
              <path d="M339,189 C362,138 427,141 449,157" stroke="#544D56" strokeWidth="10" />
            </g>
          </svg>

          <span className="se-note">Move cursor to play</span>
        </div>
      </div>

      <style>{`
        .se-section {
          padding: 8rem 2rem 10rem;
          background: #000;
          overflow: hidden;
        }
        .se-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          gap: 5rem;
          align-items: center;
          flex-wrap: wrap;
        }

        /* ── Text col ── */
        .se-text-col { flex: 1; min-width: 280px; }
        .se-eyebrow {
          font-size: 0.6rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          display: block;
          margin-bottom: 1rem;
        }
        .se-title {
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1;
          margin-bottom: 1.5rem;
        }
        .se-italic {
          font-style: italic;
          font-family: 'Playfair Display', serif;
          color: rgba(255,255,255,0.35);
          font-weight: 400;
          text-transform: none;
        }
        .se-desc {
          color: rgba(255,255,255,0.4);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          line-height: 2;
          max-width: 380px;
        }

        /* ── Card ── */
        .se-card {
          flex: 1;
          min-width: 280px;
          max-width: 380px;
          background: linear-gradient(145deg, #FFD23F 0%, #FFA500 100%);
          border-radius: 1.8rem;
          padding: 2.5rem 1.5rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          box-shadow:
            0 0 0 1px rgba(255,210,63,0.3),
            0 30px 80px rgba(255,210,63,0.12),
            0 60px 120px rgba(0,0,0,0.5);
          overflow: visible;
        }

        .se-shadow-svg {
          width: 85%;
          margin-bottom: -1rem;
          position: relative;
          z-index: 0;
        }

        /* ── Character SVG layers ── */
        .se-svg {
          width: 100%;
          display: block;
          position: relative;
        }
        .se-body {
          animation: se-body-bounce 1.2s ease-in-out infinite;
          transform-origin: center bottom;
          position: relative;
          z-index: 1;
          margin-top: -0.5rem;
        }
        .se-face {
          position: absolute;
          top: calc(2.5rem);
          left: 1.5rem;
          right: 1.5rem;
          bottom: auto;
          width: calc(100% - 3rem);
          z-index: 3;
          animation: se-face-bounce 1.2s ease-in-out infinite;
          animation-delay: -0.0075s;
          transform-origin: center bottom;
          pointer-events: none;
        }

        @keyframes se-body-bounce {
          0%, 100% { transform: scaleY(1) skewX(0deg); }
          25%       { transform: scaleY(0.95) skewX(0deg); }
          50%       { transform: scaleY(1) skewX(2deg); }
          75%       { transform: scaleY(0.95) skewX(0deg); }
        }
        @keyframes se-face-bounce {
          0%, 100% { transform: scaleY(1) skewX(0deg); }
          25%       { transform: scaleY(0.95) skewX(0deg); }
          50%       { transform: scaleY(1) skewX(2deg); }
          75%       { transform: scaleY(0.95) skewX(0deg); }
        }

        /* ── Eyes (positioned over the notebook area in the body SVG) ── */
        .se-eyes-layer {
          position: absolute;
          /* Tuned to match where the notebook/face area sits in the SVG */
          top: calc(2.5rem + 17%);
          left: 1.5rem;
          right: 1.5rem;
          z-index: 2;
          animation: se-face-bounce 1.2s ease-in-out infinite;
          animation-delay: -0.0075s;
          transform-origin: center bottom;
        }
        .se-eye-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8%;
          padding: 0 24%;
        }
        .se-eye {
          width: 16%;
          aspect-ratio: 0.85 / 1;
          background: #fff;
          border: 2px solid #101214;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform;
          transition: transform 0.08s linear;
        }
        .se-eye-l { margin-top: -4%; }
        .se-pupil {
          width: 50%;
          height: 50%;
          border-radius: 50%;
          background: conic-gradient(from 5.5rad, #101214 300deg, #fff 300deg);
          will-change: transform;
          transition: transform 0.08s linear;
        }

        .se-note {
          margin-top: 1.2rem;
          font-size: 0.58rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.35);
          font-weight: 700;
          position: relative;
          z-index: 4;
        }

        @media (max-width: 768px) {
          .se-inner { flex-direction: column; align-items: center; text-align: center; }
          .se-desc { margin: 0 auto; }
          .se-card { max-width: 320px; }
        }
      `}</style>
    </section>
  );
};

export default SpotlightEyes;
