import { useState, useRef, useEffect } from 'react';
import './Hero.css';

const Cube = () => {
  const [rotation, setRotation] = useState({ x: -18, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const wrapRef = useRef(null);
  const animationRef = useRef(null);
  const lastYRef = useRef(0);

  const BASE_X = -18;
  const BASE_Y = 35;
  const MAX_TILT = 32;
  const ROTATION_SPEED = 0.15; // Velocidade da rotação automática

  useEffect(() => {
    let currentY = lastYRef.current;

    const animate = () => {
      if (!isHovering) {
        currentY += ROTATION_SPEED;
        if (currentY >= 360) currentY = 0;
        lastYRef.current = currentY;
        setRotation({ x: BASE_X, y: currentY });
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovering]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseMove = (e) => {
    if (!wrapRef.current) return;

    const rect = wrapRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    const rotY = BASE_Y + dx * MAX_TILT;
    const rotX = BASE_X - dy * MAX_TILT;

    setRotation({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Continua a rotação da posição atual, não reseta
  };

  return (
    <div
      ref={wrapRef}
      className="cube-wrap"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="cube"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(0px)`,
          transition: isHovering ? 'transform 0.1s ease-out' : 'none',
        }}
      >
        <div className="face top"></div>
        <div className="face front"></div>
        <div className="face right"></div>
        <div className="face bottom"></div>
        <div className="face back"></div>
        <div className="face left"></div>
      </div>
      <div className="glow-floor"></div>
    </div>
  );
};

export default Cube;
