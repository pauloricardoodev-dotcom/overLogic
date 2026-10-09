import React, { useState, useEffect, useRef } from 'react';
import ServiceCard from './ServiceCard';
import './ServicesSection.css';

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsExiting(false);
        } else {
          setIsExiting(true);
          setIsVisible(false);
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

  const services = [
    {
      number: '01',
      title: 'Sistemas Web',
      description: 'Sistemas personalizados para simplificar processos, organizar informações e tornar o dia a dia do seu negócio mais eficiente.',
      tags: ['Dashboards', 'Agendamentos', 'Sistemas internos'],
      type: 'web'
    },
    {
      number: '02',
      title: 'Sites Institucionais',
      description: 'Sites modernos, responsivos e alinhados à identidade da sua empresa para construir uma presença digital profissional.',
      tags: ['Empresas', 'Serviços', 'Portfólios'],
      type: 'institucional'
    },
    {
      number: '03',
      title: 'Landing Pages',
      description: 'Páginas desenvolvidas para apresentar produtos, serviços ou campanhas de forma clara, envolvente e focada em resultados.',
      tags: ['Campanhas', 'Produtos', 'Conversão'],
      type: 'landing'
    },
    {
      number: '04',
      title: 'E-commerce',
      description: 'Lojas virtuais completas para colocar seus produtos na internet e oferecer uma experiência de compra simples e profissional.',
      tags: ['WordPress', 'WooCommerce'],
      type: 'ecommerce'
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className={`services-section ${isVisible ? 'visible' : ''} ${isExiting ? 'exiting' : ''}`}
    >
      {/* Background circuit lines */}
      <svg className="services-bg-lines" viewBox="0 0 1717 920" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <g stroke="rgba(230,23,44,0.25)" strokeWidth="1" fill="none">
          <polyline points="0,200 80,200 80,350 40,350" />
          <polyline points="1717,250 1650,250 1650,150 1550,150" />
          <polyline points="1717,700 1600,700 1600,850 1717,850" />
          <polyline points="1400,900 1400,800 1520,800 1520,680 1717,680" />
          <polyline points="650,50 650,150 780,150" />
          <polyline points="0,750 100,750 100,880" />
        </g>
        <g fill="#e6172c">
          <circle cx="1630" cy="230" r="3" />
          <circle cx="1717" cy="130" r="3" />
          <circle cx="1680" cy="550" r="2.5" />
          <circle cx="780" cy="680" r="2.5" />
          <circle cx="90" cy="720" r="2.5" />
          <circle cx="90" cy="520" r="2.5" />
        </g>
      </svg>

      <div className="services-container">
        {/* Header */}
        <div className="services-header">
          <div className="services-label">O QUE FAZEMOS</div>
          <h2 className="services-title">
            Soluções digitais para transformar ideias em <span className="accent">realidade</span>.
          </h2>
          <p className="services-description">
            Da presença digital de uma empresa a sistemas completos, desenvolvemos soluções sob medida para diferentes necessidades e momentos do seu negócio.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              delay={`${index * 150}ms`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
