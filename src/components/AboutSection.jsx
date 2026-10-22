import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { subscribeConnection, isSlowConnection } from '../utils/connection';
import './AboutSection.css';

// Quanto a "tela" vira pra acompanhar o mouse (graus) — bem menos que o cubo do Hero
const TILT_X = 6;
const TILT_Y = 8;
const PARALLAX = 10; // deslocamento da imagem dentro do vidro (px)
const EASE = 0.08;
const GLITCH_MS = 520;

const TAGS = ['Sites e landing pages', 'Sistemas sob medida', 'Front-end e back-end'];

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const slow = useSyncExternalStore(subscribeConnection, isSlowConnection);
  const sectionRef = useRef(null);
  const wrapRef = useRef(null);
  const screenRef = useRef(null);
  const imgRef = useRef(null);
  const glitchTimer = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        setIsExiting(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    );
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // A tela holográfica "olha" pro cursor e ganha um reflexo que segue o mouse
  useEffect(() => {
    const wrap = wrapRef.current;
    const screen = screenRef.current;
    const img = imgRef.current;
    if (!wrap || !screen || !img) return undefined;
    if (slow || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const cur = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let raf = 0;

    const render = () => {
      cur.x += (target.x - cur.x) * EASE;
      cur.y += (target.y - cur.y) * EASE;
      screen.style.transform = `rotateX(${(-cur.y * TILT_X).toFixed(2)}deg) rotateY(${(cur.x * TILT_Y).toFixed(2)}deg)`;
      img.style.transform = `scale(1.06) translate(${(-cur.x * PARALLAX).toFixed(2)}px, ${(-cur.y * PARALLAX).toFixed(2)}px)`;
      const settled = Math.abs(target.x - cur.x) < 0.002 && Math.abs(target.y - cur.y) < 0.002;
      raf = settled ? 0 : requestAnimationFrame(render);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      target.x = clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2), -1, 1);
      target.y = clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2), -1, 1);
      // Reflexo: só quando o cursor está sobre a tela
      const gx = ((e.clientX - r.left) / r.width) * 100;
      const gy = ((e.clientY - r.top) / r.height) * 100;
      wrap.style.setProperty('--gx', `${clamp(gx, -20, 120).toFixed(1)}%`);
      wrap.style.setProperty('--gy', `${clamp(gy, -20, 120).toFixed(1)}%`);
      kick();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [slow]);

  useEffect(() => () => clearTimeout(glitchTimer.current), []);

  const onEnter = () => {
    setGlitch(true);
    clearTimeout(glitchTimer.current);
    glitchTimer.current = setTimeout(() => setGlitch(false), GLITCH_MS);
  };

  return (
    <div
      id="sobre"
      ref={sectionRef}
      className={`about-section ${isVisible ? 'visible' : ''} ${isExiting ? 'exiting' : ''}`}
    >
      <div className="about-container">
        <div className="about-text">
          <div className="about-label">QUEM SOU EU</div>
          <h2 className="about-title">
            Olá, eu sou o Paulo. Crio <span className="accent">soluções web</span>
          </h2>
          <p className="about-desc">
            Sou desenvolvedor e trabalho principalmente com o universo web: sites, sistemas e
            aplicações pensados sob medida para cada projeto. Gosto de entender o problema antes
            de escrever a primeira linha de código, para entregar algo claro, rápido e fácil de usar.
          </p>
          <p className="about-desc">
            Do visual na tela ao que acontece por trás dela, cuido de cada detalhe para que a
            tecnologia trabalhe a favor do seu negócio — e não o contrário.
          </p>
          <ul className="about-tags">
            {TAGS.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <a className="about-cta" href="#contato">
            Vamos conversar <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="about-visual">
          <div className="about-holo-wrap" ref={wrapRef} onPointerEnter={onEnter}>
            <div className="about-holo-screen" ref={screenRef}>
              <div className={`about-holo-glass ${glitch ? 'glitch' : ''}`}>
                <img
                  ref={imgRef}
                  className="about-holo-img"
                  src="/setup.jpg"
                  srcSet="/setup-800.jpg 800w, /setup.jpg 1400w"
                  sizes="(max-width: 860px) 100vw, 640px"
                  width="1400"
                  height="961"
                  decoding="async"
                  alt="Setup de desenvolvimento com dois monitores, iluminado em vermelho"
                  loading="lazy"
                  draggable="false"
                />
                <div className="about-holo-tint" />
                <div className="about-holo-scan" />
                <div className="about-holo-sweep" />
                <div className="about-holo-glare" />
                <span className="about-holo-corner tl" />
                <span className="about-holo-corner tr" />
                <span className="about-holo-corner bl" />
                <span className="about-holo-corner br" />
                <div className="about-holo-hud about-holo-hud-top">SETUP.IMG</div>
                <div className="about-holo-hud about-holo-hud-bottom">
                  <span className="about-holo-dot" /> ONLINE
                </div>
              </div>
            </div>
            <div className="about-holo-floor" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
