import React from 'react';
import ServiceVisual from './ServiceVisual';
import './ServicesSection.css';

const ServiceCard = ({ number, title, description, tags, type, delay }) => {
  return (
    <div 
      className="service-card" 
      style={{ animationDelay: delay }}
    >
      <div className="service-card-content">
        <div className="service-number">{number}</div>
        <h3 className="service-title">{title}</h3>
        <p className="service-description">{description}</p>
        <div className="service-tags">
          {tags.map((tag, index) => (
            <span key={index} className="service-tag">{tag}</span>
          ))}
        </div>
        <div className="service-cta">Tenho interesse ↗</div>
      </div>
      <div className="service-visual-wrapper">
        <ServiceVisual type={type} />
      </div>
    </div>
  );
};

export default ServiceCard;
