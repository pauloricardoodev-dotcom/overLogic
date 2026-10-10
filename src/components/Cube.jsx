import { useState, useRef, useEffect } from 'react';
import './Hero.css';

const FACES = ['top', 'front', 'right', 'bottom', 'back', 'left'];
const TILES = Array.from({ length: 9 }, (_, i) => i);

const Cube = ({ isLoaded }) => {
  const [rotation, setRotation] = useState({ x: -18, y: 35 });
  const animationRef = useRef(null);
  // Começa já em ângulo (3 faces visíveis), nunca de frente "chapado"
  const lastYRef = useRef(35);

  const BASE_X = -18;
  const BASE_Y = 35;
  const ROTATION_SPEED = 0.15;

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
        {FACES.map((face) => (
          <div key={face} className={`face ${face}`}>
            {TILES.map((i) => (
              <span key={i} className="tile" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cube;
