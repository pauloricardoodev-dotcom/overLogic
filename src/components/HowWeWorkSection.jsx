import React, { useState, useEffect, useRef } from 'react';
import './HowWeWorkSection.css';

const HowWeWorkSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
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
          const phases = [1, 2, 3, 4, 5, 6, 7];
          phases.forEach((p, index) => {
            setTimeout(() => {
              setAnimationPhase(p);
            }, 200 + (index * 250));
          });
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.3,
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

  const steps = [
    {
      number: '01',
      title: 'Primeiro, entendemos o problema.',
      description: 'Antes de escrever uma linha de código, entendemos sua necessidade, seus objetivos e o que realmente precisa ser resolvido.',
      label: 'ENTENDEMOS'
    },
    {
      number: '02',
      title: 'Transformamos necessidades em um plano.',
      description: 'Definimos funcionalidades, estrutura, tecnologia e prioridades para construir uma solução clara e eficiente.',
      label: 'PLANEJAMOS'
    },
    {
      number: '03',
      title: 'É aqui que a ideia ganha forma.',
      description: 'Desenvolvemos a solução com foco em performance, experiência e qualidade, mantendo você próximo de cada etapa.',
      label: 'DESENVOLVEMOS'
    },
    {
      number: '04',
      title: 'Pronto para sair do papel.',
      description: 'Entregamos a solução funcionando e preparada para fazer parte do dia a dia do seu negócio.',
      label: 'ENTREGAMOS'
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className={`how-we-work-section ${isVisible ? 'visible' : ''}`}
    >
      {/* Background circuit lines */}
      <svg className="how-bg-lines" viewBox="0 0 1717 920" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <g stroke="rgba(230,23,44,0.2)" strokeWidth="1" fill="none">
          <polyline points="0,180 100,180 100,300 50,300" />
          <polyline points="1717,220 1650,220 1650,120 1550,120" />
          <polyline points="1717,680 1580,680 1580,820 1717,820" />
          <polyline points="1380,900 1380,780 1500,780 1500,660 1717,660" />
          <polyline points="680,30 680,140 810,140" />
          <polyline points="0,720 110,720 110,870" />
        </g>
        <g fill="#e6172c">
          <circle cx="1630" cy="200" r="2.5" />
          <circle cx="1717" cy="100" r="2.5" />
          <circle cx="1670" cy="520" r="2" />
          <circle cx="790" cy="650" r="2" />
          <circle cx="100" cy="690" r="2" />
          <circle cx="100" cy="490" r="2" />
        </g>
      </svg>

      <div className="how-container">
        {/* Header */}
        <div className="how-header">
          <div className="how-label">COMO TRABALHAMOS</div>
          <h2 className="how-title">
            Da ideia ao produto.
          </h2>
          <p className="how-description">
            Um processo simples, transparente e pensado para transformar necessidades reais em soluções que funcionam.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="process-timeline">
          {/* Timeline Line */}
          <div className={`timeline-line ${animationPhase >= 2 ? 'active' : ''}`}>
            <div className="timeline-progress" style={{ width: animationPhase >= 2 ? '100%' : '0%' }}></div>
          </div>

          {/* Steps */}
          {steps.map((step, index) => (
            <div
              key={index}
              className={`process-step ${activeStep === index ? 'active' : ''} ${animationPhase >= (index + 3) ? 'visible' : ''}`}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Connection Point */}
              <div className={`step-point ${animationPhase >= (index + 3) ? 'lit' : ''}`}>
                <div className="point-inner"></div>
                <div className="point-glow"></div>
              </div>

              {/* Step Content */}
              <div className="step-content">
                <div className="step-number">{step.number}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                
                {/* Visual Element */}
                <div className="step-visual">
                  {index === 0 && (
                    <svg viewBox="0 0 120 100" className="step-visual-svg">
                      {/* Analysis blocks */}
                      <g>
                        <rect x="10" y="20" width="25" height="25" fill="rgba(255, 40, 50, 0.15)" stroke="rgba(255, 60, 70, 0.4)" strokeWidth="1"/>
                        <rect x="40" y="20" width="25" height="25" fill="rgba(255, 40, 50, 0.1)" stroke="rgba(255, 60, 70, 0.3)" strokeWidth="1"/>
                        <rect x="70" y="20" width="25" height="25" fill="rgba(255, 40, 50, 0.08)" stroke="rgba(255, 60, 70, 0.25)" strokeWidth="1"/>
                        <rect x="25" y="50" width="25" height="25" fill="rgba(255, 40, 50, 0.12)" stroke="rgba(255, 60, 70, 0.35)" strokeWidth="1"/>
                        <rect x="55" y="50" width="25" height="25" fill="rgba(255, 40, 50, 0.08)" stroke="rgba(255, 60, 70, 0.25)" strokeWidth="1"/>
                        {/* Connection lines */}
                        <line x1="22.5" y1="45" x2="22.5" y2="50" stroke="rgba(255, 80, 90, 0.3)" strokeWidth="1"/>
                        <line x1="52.5" y1="45" x2="52.5" y2="50" stroke="rgba(255, 80, 90, 0.3)" strokeWidth="1"/>
                        <line x1="35" y1="32.5" x2="40" y2="32.5" stroke="rgba(255, 80, 90, 0.3)" strokeWidth="1"/>
                        <line x1="65" y1="32.5" x2="70" y2="32.5" stroke="rgba(255, 80, 90, 0.3)" strokeWidth="1"/>
                      </g>
                    </svg>
                  )}
                  
                  {index === 1 && (
                    <svg viewBox="0 0 120 100" className="step-visual-svg">
                      {/* Wireframe representation */}
                      <g>
                        <rect x="10" y="10" width="100" height="60" fill="rgba(20, 5, 8, 0.8)" stroke="rgba(255, 60, 70, 0.4)" strokeWidth="1"/>
                        <rect x="10" y="10" width="100" height="15" fill="rgba(30, 8, 12, 0.9)" stroke="rgba(255, 60, 70, 0.3)" strokeWidth="0.5"/>
                        <circle cx="20" cy="17.5" r="3" fill="rgba(255, 50, 60, 0.7)"/>
                        <circle cx="30" cy="17.5" r="3" fill="rgba(255, 70, 80, 0.4)"/>
                        {/* Content blocks */}
                        <rect x="18" y="32" width="30" height="8" fill="rgba(255, 30, 40, 0.15)" rx="1"/>
                        <rect x="18" y="44" width="50" height="6" fill="rgba(255, 30, 40, 0.1)" rx="1"/>
                        <rect x="18" y="54" width="40" height="6" fill="rgba(255, 30, 40, 0.08)" rx="1"/>
                        <rect x="55" y="32" width="50" height="28" fill="rgba(255, 30, 40, 0.06)" stroke="rgba(255, 50, 60, 0.2)" strokeWidth="0.5" rx="2"/>
                      </g>
                    </svg>
                  )}
                  
                  {index === 2 && (
                    <svg viewBox="0 0 120 100" className="step-visual-svg">
                      {/* Development/building interface */}
                      <g>
                        {/* Main window */}
                        <rect x="5" y="5" width="110" height="70" fill="rgba(20, 5, 8, 0.9)" stroke="rgba(255, 80, 90, 0.5)" strokeWidth="1"/>
                        <rect x="5" y="5" width="110" height="18" fill="rgba(40, 10, 15, 0.95)" stroke="rgba(255, 80, 90, 0.4)" strokeWidth="0.5"/>
                        <circle cx="15" cy="14" r="3.5" fill="rgba(255, 60, 70, 0.8)"/>
                        <circle cx="28" cy="14" r="3.5" fill="rgba(255, 80, 90, 0.5)"/>
                        <circle cx="41" cy="14" r="3.5" fill="rgba(255, 100, 110, 0.3)"/>
                        {/* Code blocks */}
                        <rect x="12" y="30" width="25" height="4" fill="rgba(255, 40, 50, 0.2)" rx="0.5"/>
                        <rect x="12" y="38" width="35" height="4" fill="rgba(255, 40, 50, 0.15)" rx="0.5"/>
                        <rect x="12" y="46" width="28" height="4" fill="rgba(255, 40, 50, 0.12)" rx="0.5"/>
                        <rect x="45" y="30" width="60" height="35" fill="rgba(255, 40, 50, 0.08)" stroke="rgba(255, 60, 70, 0.25)" strokeWidth="0.5" rx="2"/>
                        {/* Building elements */}
                        <rect x="50" y="38" width="20" height="4" fill="rgba(255, 50, 60, 0.3)" rx="0.5"/>
                        <rect x="50" y="46" width="15" height="4" fill="rgba(255, 50, 60, 0.25)" rx="0.5"/>
                        <rect x="50" y="54" width="25" height="4" fill="rgba(255, 50, 60, 0.2)" rx="0.5"/>
                        {/* Particles */}
                        <circle cx="85" cy="40" r="2" fill="rgba(255, 80, 90, 0.6)"/>
                        <circle cx="92" cy="48" r="1.5" fill="rgba(255, 80, 90, 0.5)"/>
                        <circle cx="80" cy="55" r="1.5" fill="rgba(255, 80, 90, 0.4)"/>
                      </g>
                    </svg>
                  )}
                  
                  {index === 3 && (
                    <svg viewBox="0 0 120 100" className="step-visual-svg">
                      {/* System status */}
                      <g>
                        <rect x="10" y="10" width="100" height="70" fill="rgba(15, 3, 5, 0.9)" stroke="rgba(255, 60, 70, 0.4)" strokeWidth="1"/>
                        <rect x="10" y="10" width="100" height="20" fill="rgba(25, 6, 10, 0.95)" stroke="rgba(255, 60, 70, 0.3)" strokeWidth="0.5"/>
                        <text x="20" y="24" fill="rgba(255, 80, 90, 0.8)" fontSize="10" fontFamily="monospace" fontWeight="600">SYSTEM</text>
                        <text x="20" y="42" fill="rgba(255, 100, 110, 0.7)" fontSize="8" fontFamily="monospace">STATUS:</text>
                        <text x="55" y="42" fill="#4ade80" fontSize="8" fontFamily="monospace" fontWeight="600">ONLINE</text>
                        {/* Progress bar */}
                        <rect x="20" y="52" width="80" height="8" fill="rgba(20, 5, 8, 0.8)" stroke="rgba(255, 60, 70, 0.3)" strokeWidth="0.5" rx="1"/>
                        <rect x="20" y="52" width="80" height="8" fill="rgba(255, 40, 50, 0.6)" rx="1"/>
                        {/* Ready indicator */}
                        <text x="45" y="72" fill={animationPhase >= 7 ? '#4ade80' : 'rgba(255, 80, 90, 0.5)'} fontSize="9" fontFamily="monospace" fontWeight="600" className={`ready-text ${animationPhase >= 7 ? 'ready' : ''}`}>READY</text>
                      </g>
                    </svg>
                  )}
                </div>
              </div>

              {/* Step Label */}
              <div className="step-label">{step.label}</div>
            </div>
          ))}
        </div>

        {/* Closing Statement */}
        <div className={`closing-statement ${animationPhase >= 7 ? 'visible' : ''}`}>
          <h3 className="closing-text">
            Você traz a <span className="accent">ideia</span>. Nós cuidamos do resto.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HowWeWorkSection;