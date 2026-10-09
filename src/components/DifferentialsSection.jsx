import React, { useState, useEffect, useRef } from 'react';
import './DifferentialsSection.css';

const DifferentialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeDifferential, setActiveDifferential] = useState(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Trigger progressive animation
          let phase = 0;
          const phases = [1, 2, 3, 4, 5, 6, 7, 8];
          phases.forEach((p, index) => {
            setTimeout(() => {
              setAnimationPhase(p);
            }, 100 + (index * 200));
          });
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const differentials = [
    {
      number: '01',
      title: 'Sob medida',
      description: 'Nada de soluções genéricas. Desenvolvemos de acordo com a necessidade e o objetivo de cada projeto.',
      position: 'top-left'
    },
    {
      number: '02',
      title: 'Comunicação direta',
      description: 'Você não precisa passar por uma cadeia de intermediários. A comunicação é simples, transparente e próxima.',
      position: 'top-right'
    },
    {
      number: '03',
      title: 'Tecnologia com propósito',
      description: 'Escolhemos as ferramentas pensando no problema que precisa ser resolvido — não apenas na tecnologia do momento.',
      position: 'bottom-left'
    },
    {
      number: '04',
      title: 'Atenção aos detalhes',
      description: 'Do código à interface, cuidamos dos detalhes que tornam uma solução mais agradável, rápida e confiável.',
      position: 'bottom-right'
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className={`differentials-section ${isVisible ? 'visible' : ''}`}
    >
      {/* Background circuit lines */}
      <svg className="differentials-bg-lines" viewBox="0 0 1717 920" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <g stroke="rgba(230,23,44,0.2)" strokeWidth="1" fill="none">
          <polyline points="0,150 90,150 90,280 40,280" />
          <polyline points="1717,180 1600,180 1600,80 1500,80" />
          <polyline points="1717,620 1620,620 1620,780 1717,780" />
          <polyline points="1420,900 1420,780 1540,780 1540,660 1717,660" />
          <polyline points="680,20 680,130 810,130" />
          <polyline points="0,680 120,680 120,830" />
        </g>
        <g fill="#e6172c">
          <circle cx="1580" cy="160" r="2.5" />
          <circle cx="1717" cy="60" r="2.5" />
          <circle cx="1640" cy="500" r="2" />
          <circle cx="790" cy="620" r="2" />
          <circle cx="110" cy="660" r="2" />
          <circle cx="110" cy="460" r="2" />
        </g>
      </svg>

      <div className="differentials-container">
        {/* Header */}
        <div className="differentials-header">
          <div className={`differentials-label ${animationPhase >= 1 ? 'visible' : ''}`}>POR QUE OVERLOGIC?</div>
          <h2 className={`differentials-title ${animationPhase >= 2 ? 'visible' : ''}`}>
            Tecnologia que<br />
            <span className="accent">faz sentido.</span>
          </h2>
          <p className={`differentials-description ${animationPhase >= 3 ? 'visible' : ''}`}>
            Não acreditamos em complicar o que pode ser simples. Cada projeto é pensado para resolver um problema real, com tecnologia adequada e atenção aos detalhes.
          </p>
        </div>

        {/* Core and Differentials */}
        <div className="differentials-core-layout">
          {/* Connection Lines */}
          <div className={`connection-lines ${animationPhase >= 4 ? 'visible' : ''}`}>
            {differentials.map((diff, index) => (
              <div 
                key={index} 
                className={`connection-line ${diff.position} ${activeDifferential === index ? 'active' : ''}`}
              >
                <div className="connection-path"></div>
                <div className="connection-point"></div>
              </div>
            ))}
          </div>

          {/* Central Core */}
          <div className={`central-core ${animationPhase >= 5 ? 'visible' : ''} ${activeDifferential !== null ? 'reacting' : ''}`}>
            <svg className="core-visual" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              {/* Outer ring */}
              <circle 
                cx="200" 
                cy="200" 
                r="180" 
                fill="none" 
                stroke="rgba(255, 60, 70, 0.15)" 
                strokeWidth="1"
                strokeDasharray="400 200"
                className={`core-ring outer ${animationPhase >= 6 ? 'active' : ''}`}
              />
              
              {/* Middle ring */}
              <circle 
                cx="200" 
                cy="200" 
                r="140" 
                fill="none" 
                stroke="rgba(255, 60, 70, 0.2)" 
                strokeWidth="1"
                strokeDasharray="300 150"
                className={`core-ring middle ${animationPhase >= 6 ? 'active' : ''}`}
              />
              
              {/* Inner ring */}
              <circle 
                cx="200" 
                cy="200" 
                r="100" 
                fill="none" 
                stroke="rgba(255, 60, 70, 0.25)" 
                strokeWidth="1.5"
                strokeDasharray="200 100"
                className={`core-ring inner ${animationPhase >= 6 ? 'active' : ''}`}
              />
              
              {/* Core circle */}
              <circle 
                cx="200" 
                cy="200" 
                r="60" 
                fill="rgba(20, 5, 8, 0.9)" 
                stroke="rgba(255, 60, 70, 0.4)" 
                strokeWidth="2"
                className={`core-circle ${animationPhase >= 6 ? 'active' : ''}`}
              />
              
              {/* Technical indicators */}
              <g className={`core-indicators ${animationPhase >= 7 ? 'visible' : ''}`}>
                {/* Small circles around */}
                <circle cx="200" cy="40" r="3" fill="rgba(255, 60, 70, 0.6)" />
                <circle cx="360" cy="200" r="3" fill="rgba(255, 60, 70, 0.6)" />
                <circle cx="200" cy="360" r="3" fill="rgba(255, 60, 70, 0.6)" />
                <circle cx="40" cy="200" r="3" fill="rgba(255, 60, 70, 0.6)" />
                
                {/* Diagonal indicators */}
                <circle cx="310" cy="90" r="2" fill="rgba(255, 60, 70, 0.4)" />
                <circle cx="90" cy="310" r="2" fill="rgba(255, 60, 70, 0.4)" />
                <circle cx="310" cy="310" r="2" fill="rgba(255, 60, 70, 0.4)" />
                <circle cx="90" cy="90" r="2" fill="rgba(255, 60, 70, 0.4)" />
                
                {/* Small technical lines */}
                <line x1="200" y1="100" x2="200" y2="130" stroke="rgba(255, 60, 70, 0.3)" strokeWidth="1" />
                <line x1="200" y1="270" x2="200" y2="300" stroke="rgba(255, 60, 70, 0.3)" strokeWidth="1" />
                <line x1="100" y1="200" x2="130" y2="200" stroke="rgba(255, 60, 70, 0.3)" strokeWidth="1" />
                <line x1="270" y1="200" x2="300" y2="200" stroke="rgba(255, 60, 70, 0.3)" strokeWidth="1" />
              </g>
              
              {/* Subtle glow */}
              <circle 
                cx="200" 
                cy="200" 
                r="70" 
                fill="none" 
                stroke="rgba(255, 60, 70, 0.1)" 
                strokeWidth="4"
                className="core-glow"
              />
            </svg>
            
            {/* Logo text */}
            <div className={`core-logo ${animationPhase >= 6 ? 'visible' : ''}`}>
              <span className="core-over">over</span>
              <span className="core-logic">Logic</span>
            </div>
          </div>

          {/* Differentials */}
          <div className="differentials-grid">
            {differentials.map((diff, index) => (
              <div
                key={index}
                className={`differential-item ${diff.position} ${animationPhase >= (index + 5) ? 'visible' : ''} ${activeDifferential === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveDifferential(index)}
                onMouseLeave={() => setActiveDifferential(null)}
              >
                {/* Visual element */}
                <div className="differential-visual">
                  {index === 0 && (
                    <svg viewBox="0 0 80 80" className="differential-visual-svg">
                      {/* Geometric blocks being organized */}
                      <g>
                        <rect x="10" y="10" width="20" height="20" fill="rgba(255, 40, 50, 0.15)" stroke="rgba(255, 60, 70, 0.4)" strokeWidth="1"/>
                        <rect x="35" y="10" width="20" height="20" fill="rgba(255, 40, 50, 0.1)" stroke="rgba(255, 60, 70, 0.3)" strokeWidth="1"/>
                        <rect x="10" y="35" width="20" height="20" fill="rgba(255, 40, 50, 0.12)" stroke="rgba(255, 60, 70, 0.35)" strokeWidth="1"/>
                        <rect x="35" y="35" width="20" height="20" fill="rgba(255, 40, 50, 0.08)" stroke="rgba(255, 60, 70, 0.25)" strokeWidth="1"/>
                        {/* Central organizing point */}
                        <circle cx="42.5" cy="42.5" r="8" fill="rgba(255, 60, 70, 0.2)" stroke="rgba(255, 80, 90, 0.4)" strokeWidth="1"/>
                      </g>
                    </svg>
                  )}
                  
                  {index === 1 && (
                    <svg viewBox="0 0 80 80" className="differential-visual-svg">
                      {/* Communication interface */}
                      <g>
                        <circle cx="25" cy="25" r="12" fill="rgba(255, 40, 50, 0.15)" stroke="rgba(255, 60, 70, 0.4)" strokeWidth="1"/>
                        <circle cx="55" cy="25" r="12" fill="rgba(255, 40, 50, 0.1)" stroke="rgba(255, 60, 70, 0.3)" strokeWidth="1"/>
                        <circle cx="40" cy="55" r="12" fill="rgba(255, 40, 50, 0.12)" stroke="rgba(255, 60, 70, 0.35)" strokeWidth="1"/>
                        {/* Connection lines */}
                        <line x1="25" y1="25" x2="40" y2="55" stroke="rgba(255, 80, 90, 0.3)" strokeWidth="1"/>
                        <line x1="55" y1="25" x2="40" y2="55" stroke="rgba(255, 80, 90, 0.3)" strokeWidth="1"/>
                        <line x1="25" y1="25" x2="55" y2="25" stroke="rgba(255, 80, 90, 0.25)" strokeWidth="1"/>
                        {/* Connection points */}
                        <circle cx="25" cy="25" r="3" fill="rgba(255, 60, 70, 0.6)"/>
                        <circle cx="55" cy="25" r="3" fill="rgba(255, 60, 70, 0.5)"/>
                        <circle cx="40" cy="55" r="3" fill="rgba(255, 60, 70, 0.7)"/>
                      </g>
                    </svg>
                  )}
                  
                  {index === 2 && (
                    <svg viewBox="0 0 80 80" className="differential-visual-svg">
                      {/* Geometric layers converging */}
                      <g>
                        <polygon points="40,10 70,30 70,60 40,80 10,60 10,30" fill="rgba(255, 40, 50, 0.08)" stroke="rgba(255, 60, 70, 0.3)" strokeWidth="1"/>
                        <polygon points="40,20 60,35 60,55 40,70 20,55 20,35" fill="rgba(255, 40, 50, 0.12)" stroke="rgba(255, 60, 70, 0.4)" strokeWidth="1"/>
                        <polygon points="40,30 50,40 50,50 40,60 30,50 30,40" fill="rgba(255, 40, 50, 0.18)" stroke="rgba(255, 60, 70, 0.5)" strokeWidth="1"/>
                        {/* Central point */}
                        <circle cx="40" cy="45" r="4" fill="rgba(255, 60, 70, 0.8)"/>
                      </g>
                    </svg>
                  )}
                  
                  {index === 3 && (
                    <svg viewBox="0 0 80 80" className="differential-visual-svg">
                      {/* Abstract interface with details */}
                      <g>
                        <rect x="5" y="5" width="70" height="50" fill="rgba(20, 5, 8, 0.8)" stroke="rgba(255, 60, 70, 0.4)" strokeWidth="1"/>
                        <rect x="5" y="5" width="70" height="12" fill="rgba(30, 8, 12, 0.9)" stroke="rgba(255, 60, 70, 0.3)" strokeWidth="0.5"/>
                        {/* Detail indicators */}
                        <circle cx="12" cy="11" r="2" fill="rgba(255, 50, 60, 0.7)"/>
                        <circle cx="20" cy="11" r="2" fill="rgba(255, 70, 80, 0.5)"/>
                        <circle cx="28" cy="11" r="2" fill="rgba(255, 90, 100, 0.3)"/>
                        {/* Content blocks */}
                        <rect x="10" y="22" width="20" height="4" fill="rgba(255, 30, 40, 0.15)" rx="0.5"/>
                        <rect x="10" y="30" width="30" height="4" fill="rgba(255, 30, 40, 0.12)" rx="0.5"/>
                        <rect x="10" y="38" width="25" height="4" fill="rgba(255, 30, 40, 0.1)" rx="0.5"/>
                        <rect x="35" y="22" width="35" height="20" fill="rgba(255, 30, 40, 0.06)" stroke="rgba(255, 50, 60, 0.2)" strokeWidth="0.5" rx="2"/>
                        {/* Small detail points */}
                        <circle cx="60" cy="32" r="1.5" fill="rgba(255, 80, 90, 0.6)"/>
                        <circle cx="55" cy="38" r="1" fill="rgba(255, 80, 90, 0.5)"/>
                        <circle cx="65" cy="38" r="1" fill="rgba(255, 80, 90, 0.4)"/>
                      </g>
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className="differential-content">
                  <div className="differential-number">{diff.number}</div>
                  <h3 className="differential-title">{diff.title}</h3>
                  <p className="differential-description">{diff.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Statement */}
        <div className={`closing-statement ${animationPhase >= 8 ? 'visible' : ''}`}>
          <h3 className="closing-text">
            Porque <span className="accent">tecnologia boa</span> não precisa ser complicada.
          </h3>
          <div className="closing-tags">
            <span>SIMPLICIDADE</span>
            <span className="separator">//</span>
            <span>PERFORMANCE</span>
            <span className="separator">//</span>
            <span>PROPÓSITO</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifferentialsSection;