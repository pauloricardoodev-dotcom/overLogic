import React from 'react';
import './ServiceVisual.css';

const ServiceVisual = ({ type }) => {
  const renderVisual = () => {
    switch (type) {
      case 'web':
        return (
          <svg viewBox="0 0 200 160" className="service-visual">
            {/* Window 1 - Main dashboard */}
            <g transform="translate(20, 30)">
              <rect x="0" y="0" width="120" height="90" fill="rgba(20, 5, 8, 0.9)" stroke="rgba(0, 220, 255, 0.6)" strokeWidth="1"/>
              <rect x="0" y="0" width="120" height="25" fill="rgba(40, 10, 15, 0.95)" stroke="rgba(0, 220, 255, 0.4)" strokeWidth="0.5"/>
              <circle cx="12" cy="12.5" r="4" fill="rgba(0, 220, 255, 0.8)"/>
              <circle cx="24" cy="12.5" r="4" fill="rgba(0, 220, 255, 0.5)"/>
              <circle cx="36" cy="12.5" r="4" fill="rgba(0, 220, 255, 0.3)"/>
              {/* Dashboard content */}
              <rect x="10" y="35" width="35" height="20" fill="rgba(0, 220, 255, 0.15)" stroke="rgba(0, 220, 255, 0.3)" strokeWidth="0.5"/>
              <rect x="10" y="60" width="35" height="20" fill="rgba(0, 220, 255, 0.1)" stroke="rgba(0, 220, 255, 0.25)" strokeWidth="0.5"/>
              <rect x="52" y="35" width="58" height="45" fill="rgba(0, 220, 255, 0.08)" stroke="rgba(0, 220, 255, 0.2)" strokeWidth="0.5"/>
              <line x1="52" y1="50" x2="110" y2="50" stroke="rgba(0, 220, 255, 0.3)" strokeWidth="1"/>
              <line x1="52" y1="65" x2="110" y2="65" stroke="rgba(0, 220, 255, 0.3)" strokeWidth="1"/>
            </g>
            
            {/* Window 2 - Stacked */}
            <g transform="translate(60, 55)">
              <rect x="0" y="0" width="100" height="70" fill="rgba(15, 3, 5, 0.85)" stroke="rgba(0, 220, 255, 0.4)" strokeWidth="0.8"/>
              <rect x="0" y="0" width="100" height="20" fill="rgba(30, 8, 12, 0.9)" stroke="rgba(0, 220, 255, 0.3)" strokeWidth="0.5"/>
              <circle cx="10" cy="10" r="3" fill="rgba(0, 220, 255, 0.7)"/>
              <circle cx="20" cy="10" r="3" fill="rgba(0, 220, 255, 0.4)"/>
              <rect x="8" y="28" width="30" height="15" fill="rgba(0, 220, 255, 0.12)" stroke="rgba(0, 220, 255, 0.25)" strokeWidth="0.5"/>
              <rect x="8" y="48" width="30" height="15" fill="rgba(0, 220, 255, 0.08)" stroke="rgba(0, 220, 255, 0.2)" strokeWidth="0.5"/>
              <rect x="42" y="28" width="50" height="35" fill="rgba(0, 220, 255, 0.06)" stroke="rgba(0, 220, 255, 0.18)" strokeWidth="0.5"/>
            </g>
            
            {/* Glow effect */}
            <ellipse cx="100" cy="140" rx="60" ry="12" fill="rgba(0, 220, 255, 0.3)" filter="url(#glow)"/>
          </svg>
        );
        
      case 'institucional':
        return (
          <svg viewBox="0 0 200 160" className="service-visual">
            {/* Browser window */}
            <g transform="translate(25, 25)">
              <rect x="0" y="0" width="150" height="100" fill="rgba(20, 5, 8, 0.9)" stroke="rgba(0, 220, 255, 0.6)" strokeWidth="1"/>
              <rect x="0" y="0" width="150" height="22" fill="rgba(40, 10, 15, 0.95)" stroke="rgba(0, 220, 255, 0.4)" strokeWidth="0.5"/>
              <circle cx="12" cy="11" r="4" fill="rgba(0, 220, 255, 0.8)"/>
              <circle cx="24" cy="11" r="4" fill="rgba(0, 220, 255, 0.5)"/>
              <circle cx="36" cy="11" r="4" fill="rgba(0, 220, 255, 0.3)"/>
              {/* URL bar */}
              <rect x="50" y="5" width="95" height="12" fill="rgba(15, 3, 5, 0.8)" stroke="rgba(0, 220, 255, 0.3)" strokeWidth="0.5" rx="2"/>
              {/* Content */}
              <rect x="12" y="32" width="45" height="8" fill="rgba(0, 220, 255, 0.2)" rx="1"/>
              <rect x="12" y="46" width="70" height="6" fill="rgba(0, 220, 255, 0.12)" rx="1"/>
              <rect x="12" y="56" width="60" height="6" fill="rgba(0, 220, 255, 0.1)" rx="1"/>
              <rect x="12" y="66" width="55" height="6" fill="rgba(0, 220, 255, 0.08)" rx="1"/>
              <rect x="12" y="76" width="40" height="6" fill="rgba(0, 220, 255, 0.06)" rx="1"/>
              {/* Image placeholder */}
              <rect x="65" y="32" width="73" height="50" fill="rgba(0, 220, 255, 0.08)" stroke="rgba(0, 220, 255, 0.2)" strokeWidth="0.5" rx="2"/>
            </g>
            
            {/* Secondary window behind */}
            <g transform="translate(45, 40)">
              <rect x="0" y="0" width="130" height="85" fill="rgba(15, 3, 5, 0.7)" stroke="rgba(0, 220, 255, 0.3)" strokeWidth="0.6"/>
            </g>
            
            <ellipse cx="100" cy="145" rx="55" ry="10" fill="rgba(0, 220, 255, 0.25)" filter="url(#glow)"/>
          </svg>
        );
        
      case 'landing':
        return (
          <svg viewBox="0 0 200 160" className="service-visual">
            {/* Landing page composition */}
            <g transform="translate(30, 20)">
              {/* Header section */}
              <rect x="0" y="0" width="140" height="25" fill="rgba(40, 10, 15, 0.95)" stroke="rgba(0, 220, 255, 0.5)" strokeWidth="0.8"/>
              <rect x="10" y="8" width="30" height="10" fill="rgba(0, 220, 255, 0.6)" rx="1"/>
              <rect x="100" y="6" width="30" height="14" fill="rgba(0, 220, 255, 0.4)" stroke="rgba(0, 220, 255, 0.5)" strokeWidth="0.5" rx="2"/>
              
              {/* Hero section */}
              <rect x="0" y="30" width="140" height="50" fill="rgba(20, 5, 8, 0.9)" stroke="rgba(0, 220, 255, 0.5)" strokeWidth="0.8"/>
              <rect x="15" y="42" width="50" height="8" fill="rgba(0, 220, 255, 0.25)" rx="1"/>
              <rect x="15" y="55" width="70" height="6" fill="rgba(0, 220, 255, 0.15)" rx="1"/>
              <rect x="15" y="65" width="55" height="6" fill="rgba(0, 220, 255, 0.1)" rx="1"/>
              <rect x="80" y="38" width="50" height="35" fill="rgba(0, 220, 255, 0.1)" stroke="rgba(0, 220, 255, 0.25)" strokeWidth="0.5" rx="2"/>
              
              {/* Features section */}
              <rect x="0" y="85" width="140" height="45" fill="rgba(15, 3, 5, 0.85)" stroke="rgba(0, 220, 255, 0.4)" strokeWidth="0.6"/>
              <rect x="10" y="95" width="35" height="28" fill="rgba(0, 220, 255, 0.08)" stroke="rgba(0, 220, 255, 0.2)" strokeWidth="0.5" rx="1"/>
              <rect x="52" y="95" width="35" height="28" fill="rgba(0, 220, 255, 0.08)" stroke="rgba(0, 220, 255, 0.2)" strokeWidth="0.5" rx="1"/>
              <rect x="94" y="95" width="35" height="28" fill="rgba(0, 220, 255, 0.08)" stroke="rgba(0, 220, 255, 0.2)" strokeWidth="0.5" rx="1"/>
              
              {/* CTA button */}
              <rect x="45" y="105" width="50" height="12" fill="rgba(0, 220, 255, 0.3)" stroke="rgba(0, 220, 255, 0.5)" strokeWidth="0.5" rx="2"/>
            </g>
            
            <ellipse cx="100" cy="150" rx="50" ry="10" fill="rgba(0, 220, 255, 0.25)" filter="url(#glow)"/>
          </svg>
        );
        
      case 'ecommerce':
        return (
          <svg viewBox="0 0 200 160" className="service-visual">
            {/* E-commerce interface */}
            <g transform="translate(20, 25)">
              {/* Main product area */}
              <rect x="0" y="0" width="90" height="80" fill="rgba(20, 5, 8, 0.9)" stroke="rgba(0, 220, 255, 0.6)" strokeWidth="1"/>
              <rect x="10" y="10" width="70" height="45" fill="rgba(0, 220, 255, 0.1)" stroke="rgba(0, 220, 255, 0.3)" strokeWidth="0.5" rx="2"/>
              <rect x="10" y="62" width="40" height="8" fill="rgba(0, 220, 255, 0.2)" rx="1"/>
              <rect x="10" y="74" width="25" height="4" fill="rgba(0, 220, 255, 0.15)" rx="1"/>
              
              {/* Cart sidebar */}
              <g transform="translate(95, 0)">
                <rect x="0" y="0" width="65" height="80" fill="rgba(15, 3, 5, 0.85)" stroke="rgba(0, 220, 255, 0.4)" strokeWidth="0.8"/>
                <rect x="8" y="8" width="20" height="6" fill="rgba(0, 220, 255, 0.25)" rx="1"/>
                {/* Cart items */}
                <rect x="8" y="20" width="49" height="18" fill="rgba(0, 220, 255, 0.08)" stroke="rgba(0, 220, 255, 0.2)" strokeWidth="0.5" rx="1"/>
                <rect x="8" y="42" width="49" height="18" fill="rgba(0, 220, 255, 0.08)" stroke="rgba(0, 220, 255, 0.2)" strokeWidth="0.5" rx="1"/>
                {/* Checkout button */}
                <rect x="8" y="65" width="49" height="10" fill="rgba(0, 220, 255, 0.35)" stroke="rgba(0, 220, 255, 0.5)" strokeWidth="0.5" rx="2"/>
              </g>
              
              {/* Product grid below */}
              <g transform="translate(0, 90)">
                <rect x="0" y="0" width="42" height="35" fill="rgba(15, 3, 5, 0.8)" stroke="rgba(0, 220, 255, 0.3)" strokeWidth="0.6"/>
                <rect x="48" y="0" width="42" height="35" fill="rgba(15, 3, 5, 0.8)" stroke="rgba(0, 220, 255, 0.3)" strokeWidth="0.6"/>
                <rect x="96" y="0" width="42" height="35" fill="rgba(15, 3, 5, 0.8)" stroke="rgba(0, 220, 255, 0.3)" strokeWidth="0.6"/>
              </g>
            </g>
            
            <ellipse cx="100" cy="150" rx="55" ry="10" fill="rgba(0, 220, 255, 0.3)" filter="url(#glow)"/>
          </svg>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="service-visual-container">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {renderVisual()}
    </div>
  );
};

export default ServiceVisual;
