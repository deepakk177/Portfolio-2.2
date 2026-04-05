import { useEffect, useRef, useCallback } from 'react';

/**
 * SwordCursor — A high-performance sword-follows-cursor effect.
 *
 * The sword video (/sword.mp4) is rendered on a hidden <video> element.
 * A <canvas> composites:
 *   1. A fading motion trail (glowing sword slashes drawn per frame)
 *   2. The sword video frame rotated toward the direction of movement
 *
 * The dot cursor from CustomCursor is kept; SwordCursor adds the sword on top.
 */
const SwordCursor = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(null);

  // Raw + smoothed cursor position
  const mouse = useRef({ x: -300, y: -300 });
  const smooth = useRef({ x: -300, y: -300 });
  const prev = useRef({ x: -300, y: -300 });

  // Angle of sword (radians) — smoothed
  const angle = useRef(0);
  const targetAngle = useRef(0);

  // Trail: array of { x, y, angle, alpha }
  const trail = useRef([]);

  // Whether video has enough data
  const videoReady = useRef(false);

  /* ─── resize canvas ────────────────────────────────────────── */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  /* ─── draw loop ────────────────────────────────────────────── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const video = videoRef.current;

    const W = canvas.width;
    const H = canvas.height;

    // 1. Fade the canvas slowly so trail persists for a moment
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.fillRect(0, 0, W, H);

    // 2. Lerp smooth cursor toward raw mouse (spring-like)
    const LERP = 0.14;
    smooth.current.x += (mouse.current.x - smooth.current.x) * LERP;
    smooth.current.y += (mouse.current.y - smooth.current.y) * LERP;

    const dx = mouse.current.x - prev.current.x;
    const dy = mouse.current.y - prev.current.y;
    const dist = Math.hypot(dx, dy);

    // 3. Compute target angle from velocity
    if (dist > 1.5) {
      // Angle: sword tip points in direction of travel
      // We offset by 45° so the blade edge leads
      targetAngle.current = Math.atan2(dy, dx) + Math.PI / 4;
    }

    // Smooth angle interpolation (handles wrap-around)
    let da = targetAngle.current - angle.current;
    // Normalise to [-π, π]
    while (da > Math.PI) da -= 2 * Math.PI;
    while (da < -Math.PI) da += 2 * Math.PI;
    angle.current += da * 0.10;

    prev.current.x = mouse.current.x;
    prev.current.y = mouse.current.y;

    // 4. Push trail point
    if (dist > 0.5) {
      trail.current.push({
        x: smooth.current.x,
        y: smooth.current.y,
        angle: angle.current,
        alpha: 1.0,
        life: 1.0,
      });
      if (trail.current.length > 18) trail.current.shift();
    }

    // 5. Draw trail (older = more transparent, smaller)
    trail.current.forEach((pt, i) => {
      pt.life -= 0.055;
      if (pt.life <= 0) return;
      const scale = 0.35 + (i / trail.current.length) * 0.25;
      const alpha = pt.life * 0.45;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(pt.x, pt.y);
      ctx.rotate(pt.angle);

      // Glow stroke (sword gash)
      const len = 60 + scale * 50;
      const grad = ctx.createLinearGradient(-len * 0.2, 0, len * 0.8, 0);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(0.3, 'rgba(200,220,255,0.9)');
      grad.addColorStop(0.7, 'rgba(180,200,255,0.6)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.beginPath();
      ctx.moveTo(-len * 0.2, 0);
      ctx.lineTo(len * 0.8, 0);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5 * scale;
      ctx.shadowBlur = 18 * scale;
      ctx.shadowColor = 'rgba(160,200,255,0.8)';
      ctx.stroke();

      ctx.restore();
    });

    // 6. Draw the sword video frame at cursor
    const SZ = 160; // sword render size (px)
    if (video && videoReady.current && video.readyState >= 2) {
      ctx.save();
      ctx.translate(smooth.current.x, smooth.current.y);
      ctx.rotate(angle.current);

      // Glow behind sword
      ctx.shadowBlur = 40;
      ctx.shadowColor = 'rgba(180, 220, 255, 0.7)';

      // Draw video frame — centered on hilt (slightly offset so tip leads)
      ctx.drawImage(
        video,
        -SZ * 0.15,   // offset x (hilt behind cursor center)
        -SZ * 0.15,   // offset y
        SZ,
        SZ
      );

      // Blue-white rim highlight
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = 0.25;
      ctx.drawImage(video, -SZ * 0.15, -SZ * 0.15, SZ, SZ);

      ctx.restore();
    } else {
      // Fallback: draw a sharp sword shape if video not ready
      ctx.save();
      ctx.translate(smooth.current.x, smooth.current.y);
      ctx.rotate(angle.current);

      // Blade
      const bladeGrad = ctx.createLinearGradient(0, -4, 90, 0);
      bladeGrad.addColorStop(0, '#aacfff');
      bladeGrad.addColorStop(0.5, '#ffffff');
      bladeGrad.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.lineTo(90, 0);
      ctx.lineTo(0, 3);
      ctx.closePath();
      ctx.fillStyle = bladeGrad;
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(140,200,255,0.9)';
      ctx.fill();

      // Guard crosspiece
      ctx.beginPath();
      ctx.moveTo(-2, -14);
      ctx.lineTo(-2, 14);
      ctx.strokeStyle = 'rgba(200,200,255,0.9)';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#aaccff';
      ctx.stroke();

      // Hilt
      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.lineTo(-22, 0);
      ctx.strokeStyle = 'rgba(180,180,220,0.7)';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.restore();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  /* ─── lifecycle ────────────────────────────────────────────── */
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Setup video
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;
      const onCanPlay = () => {
        videoReady.current = true;
        video.play().catch(() => {});
      };
      video.addEventListener('canplaythrough', onCanPlay);
      video.addEventListener('loadeddata', onCanPlay);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [draw, resizeCanvas]);

  return (
    <>
      {/* Hidden video element — acts as image source for canvas */}
      <video
        ref={videoRef}
        src="/sword.mp4"
        muted
        loop
        playsInline
        preload="auto"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {/* Full-screen canvas overlay — pointer-events: none so it doesn't block clicks */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9995,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default SwordCursor;
