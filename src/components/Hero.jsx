import { useState, useEffect, useRef } from 'react';
import Cube from './Cube';
import './Hero.css';

const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Sobre nós', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) {
          setIsExiting(true);
          setIsLoaded(false);
        } else {
          setIsExiting(false);
          setIsLoaded(true);
        }
      },
      {
        threshold: 0.1
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      clearTimeout(timer);
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div 
      id="inicio"
      ref={heroRef}
      className={`hero ${isLoaded ? 'loaded' : ''} ${isExiting ? 'exiting' : ''}`}
    >
      {/* Background circuit lines */}
      <svg className="bg-lines" viewBox="0 0 1717 920" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <g stroke="rgba(230,23,44,0.35)" strokeWidth="1" fill="none">
          <polyline points="0,150 90,150 90,320 40,320" />
          <polyline points="1717,180 1600,180 1600,90 1500,90" />
          <polyline points="1717,600 1620,600 1620,760 1717,760" />
          <polyline points="1450,900 1450,780 1560,780 1560,650 1717,650" />
          <polyline points="700,10 700,120 830,120" />
          <polyline points="0,700 120,700 120,850" />
        </g>
        <g fill="#e6172c">
          <circle cx="1590" cy="170" r="3.5" />
          <circle cx="1717" cy="70" r="3.5" />
          <circle cx="1660" cy="480" r="3" />
          <circle cx="775" cy="590" r="3" />
          <circle cx="103" cy="650" r="3" />
          <circle cx="103" cy="450" r="3" />
        </g>
      </svg>

      {/* Navigation */}
      <nav className={isLoaded ? 'loaded' : ''}>
        <div className="logo">
          <span className="over">over</span>
          <span className="logic">Logic</span>
        </div>
        <ul className="nav-links">
          {NAV_LINKS.map(({ label, href }, i) => (
            <li key={href} className={i === 0 ? 'active' : ''}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
        </div>
      </nav>

      {/* Main Content */}
      <div className="content">
        <Cube isLoaded={isLoaded} />

        <div className={`text-side ${isLoaded ? 'loaded' : ''}`}>
          <div className="eyebrow">TECNOLOGIA &nbsp;•&nbsp; INOVAÇÃO &nbsp;•&nbsp; RESULTADOS</div>
          <h1>
            Transformamos ideias em <span className="accent">soluções</span> inteligentes.
          </h1>
          <p className="desc">
            Na overLogic, desenvolvemos sistemas, aplicações e experiências digitais que impulsionam negócios e geram resultados reais.
          </p>
          <div className="btn-row">
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Fale conosco ↗
            </button>
            <button className="btn btn-secondary">
              <span className="play-circle">▶</span> Saiba mais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
