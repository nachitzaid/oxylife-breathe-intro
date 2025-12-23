import { forwardRef } from 'react';

interface LungsProps {
  className?: string;
}

const Lungs = forwardRef<SVGSVGElement, LungsProps>(({ className }, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Lung */}
      <path
        className="lung-left"
        d="M60 50 
           C30 60, 20 100, 25 140 
           C30 170, 50 180, 70 175 
           C85 172, 90 160, 90 140 
           L90 70 
           C90 55, 75 45, 60 50Z"
        fill="url(#lungGradient)"
        opacity="0.9"
      />
      
      {/* Right Lung */}
      <path
        className="lung-right"
        d="M140 50 
           C170 60, 180 100, 175 140 
           C170 170, 150 180, 130 175 
           C115 172, 110 160, 110 140 
           L110 70 
           C110 55, 125 45, 140 50Z"
        fill="url(#lungGradient)"
        opacity="0.9"
      />
      
      {/* Trachea */}
      <path
        className="trachea"
        d="M100 20 L100 65 
           C100 75, 90 75, 90 70 
           M100 65 
           C100 75, 110 75, 110 70"
        stroke="url(#tracheaGradient)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Bronchi details */}
      <g className="bronchi" opacity="0.5">
        <path d="M70 90 C60 95, 50 110, 45 130" stroke="hsl(187 60% 55%)" strokeWidth="2" fill="none" />
        <path d="M60 80 C50 85, 40 100, 35 120" stroke="hsl(187 60% 55%)" strokeWidth="1.5" fill="none" />
        <path d="M130 90 C140 95, 150 110, 155 130" stroke="hsl(187 60% 55%)" strokeWidth="2" fill="none" />
        <path d="M140 80 C150 85, 160 100, 165 120" stroke="hsl(187 60% 55%)" strokeWidth="1.5" fill="none" />
      </g>
      
      {/* Glow effect */}
      <circle
        className="lung-glow-circle"
        cx="100"
        cy="110"
        r="80"
        fill="url(#glowGradient)"
        opacity="0.3"
      />
      
      {/* Definitions */}
      <defs>
        <linearGradient id="lungGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(187 60% 55%)" />
          <stop offset="50%" stopColor="hsl(200 60% 50%)" />
          <stop offset="100%" stopColor="hsl(187 80% 40%)" />
        </linearGradient>
        
        <linearGradient id="tracheaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(187 60% 65%)" />
          <stop offset="100%" stopColor="hsl(187 60% 45%)" />
        </linearGradient>
        
        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(187 80% 60%)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(187 80% 60%)" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
});

Lungs.displayName = 'Lungs';

export default Lungs;
