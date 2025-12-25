import { forwardRef } from 'react';

interface ECGLineProps {
  className?: string;
}

const ECGLine = forwardRef<SVGSVGElement, ECGLineProps>(({ className }, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 400 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(0 70% 55%)" stopOpacity="0" />
          <stop offset="20%" stopColor="hsl(0 70% 55%)" stopOpacity="1" />
          <stop offset="80%" stopColor="hsl(0 70% 55%)" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(0 70% 55%)" stopOpacity="0" />
        </linearGradient>
        
        <filter id="ecgGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* ECG heartbeat pattern */}
      <path
        className="ecg-path"
        d="M0 50 
           L40 50 
           L50 50 
           L60 45 
           L70 55 
           L80 50 
           L100 50 
           L110 50 
           L115 30 
           L120 70 
           L125 20 
           L130 80 
           L135 50 
           L140 50 
           L180 50 
           L190 50 
           L200 45 
           L210 55 
           L220 50 
           L240 50 
           L250 50 
           L255 30 
           L260 70 
           L265 20 
           L270 80 
           L275 50 
           L280 50 
           L320 50 
           L330 50 
           L340 45 
           L350 55 
           L360 50 
           L400 50"
        stroke="url(#ecgGradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#ecgGlow)"
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: 1000,
        }}
        className="ecg-path"
      />
    </svg>
  );
});

ECGLine.displayName = 'ECGLine';

export default ECGLine;
