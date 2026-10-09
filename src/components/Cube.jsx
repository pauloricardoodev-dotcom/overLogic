import { useState, useRef, useEffect } from 'react';
import './Hero.css';

const Cube = ({ isLoaded }) => {
  const [rotation, setRotation] = useState({ x: -18, y: 0 });
  const animationRef = useRef(null);
  const lastYRef = useRef(0);

  const BASE_X = -18;
  const BASE_Y = 35;
  const ROTATION_SPEED = 0.15;

  // Cores sólidas para cada face do cubo normal
  const faceColors = {
    front: 'rgba(230, 23, 44, 0.25)',
    back: 'rgba(230, 23, 44, 0.2)',
    right: 'rgba(230, 23, 44, 0.22)',
    left: 'rgba(230, 23, 44, 0.22)',
    top: 'rgba(230, 23, 44, 0.18)',
    bottom: 'rgba(230, 23, 44, 0.15)'
  };

  useEffect(() => {
    let currentY = lastYRef.current;

    const animate = () => {
      currentY += ROTATION_SPEED;
      if (currentY >= 360) currentY = 0;
      lastYRef.current = currentY;
      setRotation({ x: BASE_X, y: currentY });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const createFace = (faceName, color) => {
    return (
      <div 
        className={`face ${faceName}`}
        style={{
          backgroundColor: color,
          boxShadow: `inset 0 0 30px rgba(255,255,255,0.1), inset 0 0 15px ${color}40`
        }}
      />
    );
  };

  return (
    <div className={`cube-wrap ${isLoaded ? 'loaded' : ''}`}>
      <div
        className={`cube ${isLoaded ? 'loaded' : ''}`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(0px)`,
        }}
      >
        {createFace('top', faceColors.top)}
        {createFace('front', faceColors.front)}
        {createFace('right', faceColors.right)}
        {createFace('bottom', faceColors.bottom)}
        {createFace('back', faceColors.back)}
        {createFace('left', faceColors.left)}
      </div>
      <div className={`glow-floor ${isLoaded ? 'loaded' : ''}`}></div>
    </div>
  );
};

export default Cube;
