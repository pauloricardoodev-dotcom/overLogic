import { useEffect, useRef, useSyncExternalStore } from 'react';
import { subscribeConnection, isSlowConnection } from '../utils/connection';
import './TechBackground.css';

const LINK_DIST = 130;
const MOUSE_DIST = 170;
const RED = '230, 23, 44';
const GRAY = '190, 190, 198';

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const makeParticle = (w, h) => ({
  x: Math.random() * w,
  y: Math.random() * h,
  vx: (Math.random() - 0.5) * 0.3,
  vy: (Math.random() - 0.5) * 0.3,
  depth: 0.08 + Math.random() * 0.4, // quanto acompanha o scroll (parallax)
  r: 0.6 + Math.random() * 1.2,
  red: Math.random() < 0.18,
});

// Fundo fixo atrás do site inteiro: preto profundo, grade e partículas ligadas por linhas
const TechBackground = () => {
  const canvasRef = useRef(null);
  const slow = useSyncExternalStore(subscribeConnection, isSlowConnection);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return undefined;

    // Conexão lenta recebe o mesmo tratamento de movimento reduzido (desenho estático)
    const reduce = slow || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let parts = [];
    let raf = 0;
    let scrollY = window.scrollY;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = clamp(Math.round((w * h) / 16000), 35, 100);
      parts = Array.from({ length: count }, () => makeParticle(w, h));
    };

    const draw = (move) => {
      ctx.clearRect(0, 0, w, h);

      // posições na tela (y com parallax do scroll, dando a volta)
      const pts = parts.map((p) => {
        if (move) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x += w;
          else if (p.x > w) p.x -= w;
          if (p.y < 0) p.y += h;
          else if (p.y > h) p.y -= h;
        }
        const sy = (((p.y - scrollY * p.depth) % h) + h) % h;
        return { p, x: p.x, y: sy };
      });

      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i += 1) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j += 1) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            const k = 1 - d / LINK_DIST;
            const red = a.p.red || b.p.red;
            ctx.strokeStyle = `rgba(${red ? RED : GRAY}, ${(red ? 0.28 : 0.16) * k})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < MOUSE_DIST) {
          ctx.strokeStyle = `rgba(${RED}, ${0.5 * (1 - dm / MOUSE_DIST)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const { p, x, y } of pts) {
        if (p.red) {
          ctx.fillStyle = `rgba(${RED}, 0.12)`;
          ctx.beginPath();
          ctx.arc(x, y, p.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = p.red ? `rgba(${RED}, 0.9)` : `rgba(${GRAY}, ${0.3 + p.r * 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw(true);
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(loop);
    };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
      if (reduce) draw(false);
    };
    const onResize = () => {
      resize();
      if (reduce) draw(false);
    };

    resize();
    if (reduce) draw(false);
    else raf = requestAnimationFrame(loop);

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [slow]);

  return (
    <div className="tech-bg" aria-hidden="true">
      <div className="tech-grid" />
      <canvas ref={canvasRef} />
      <div className="tech-vignette" />
    </div>
  );
};

export default TechBackground;
