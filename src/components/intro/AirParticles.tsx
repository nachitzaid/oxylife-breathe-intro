import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface AirParticlesProps {
  isActive: boolean;
  count?: number;
}

const AirParticles = ({ isActive, count = 20 }: AirParticlesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
  }));
  
  useEffect(() => {
    if (!containerRef.current || !isActive) return;
    
    const particleElements = containerRef.current.querySelectorAll('.air-particle');
    
    particleElements.forEach((particle, index) => {
      gsap.to(particle, {
        y: -window.innerHeight,
        x: `+=${Math.random() * 100 - 50}`,
        opacity: 0,
        duration: 8 + Math.random() * 4,
        delay: particles[index].delay,
        repeat: -1,
        ease: 'none',
      });
    });
    
    return () => {
      gsap.killTweensOf(particleElements);
    };
  }, [isActive, particles]);
  
  if (!isActive) return null;
  
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="air-particle absolute rounded-full bg-breath/60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
};

export default AirParticles;
