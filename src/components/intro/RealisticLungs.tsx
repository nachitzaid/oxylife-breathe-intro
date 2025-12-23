import { forwardRef } from 'react';

interface RealisticLungsProps {
  className?: string;
}

const RealisticLungs = forwardRef<SVGSVGElement, RealisticLungsProps>(({ className }, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 400 450"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Realistic lung tissue gradient */}
        <linearGradient id="lungTissueLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a0a0" />
          <stop offset="30%" stopColor="#e8b4b4" />
          <stop offset="60%" stopColor="#d4a3a3" />
          <stop offset="100%" stopColor="#b08888" />
        </linearGradient>
        
        <linearGradient id="lungTissueRight" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c9a0a0" />
          <stop offset="30%" stopColor="#e8b4b4" />
          <stop offset="60%" stopColor="#d4a3a3" />
          <stop offset="100%" stopColor="#b08888" />
        </linearGradient>
        
        {/* Bronchi gradient */}
        <linearGradient id="bronchiGradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#e0c4c4" />
          <stop offset="100%" stopColor="#c99999" />
        </linearGradient>
        
        {/* Trachea gradient */}
        <linearGradient id="tracheaGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#f0d8d8" />
          <stop offset="50%" stopColor="#e8cccc" />
          <stop offset="100%" stopColor="#d4b8b8" />
        </linearGradient>
        
        {/* Blood vessel gradient */}
        <linearGradient id="vesselGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b4f5f" />
          <stop offset="50%" stopColor="#a85d6d" />
          <stop offset="100%" stopColor="#8b4f5f" />
        </linearGradient>
        
        {/* Subtle inner shadow for depth */}
        <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feOffset in="blur" dx="2" dy="2" result="offsetBlur" />
          <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
        </filter>
        
        {/* Glow for breathing effect */}
        <filter id="breathGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Texture pattern for realistic look */}
        <pattern id="lungTexture" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="2" cy="2" r="0.8" fill="#00000008" />
          <circle cx="6" cy="6" r="0.6" fill="#00000006" />
          <circle cx="4" cy="4" r="0.4" fill="#00000004" />
        </pattern>
      </defs>
      
      {/* Background glow */}
      <ellipse 
        className="lung-glow"
        cx="200" 
        cy="230" 
        rx="160" 
        ry="180" 
        fill="url(#breathGlow)"
        opacity="0.15"
        style={{ filter: 'blur(30px)' }}
      />
      
      {/* Trachea (windpipe) */}
      <g className="trachea-group">
        {/* Main trachea */}
        <path
          d="M200 30 
             C200 30, 195 35, 195 40
             L195 95
             C195 100, 190 105, 185 110
             L185 125
             M200 30
             C200 30, 205 35, 205 40
             L205 95
             C205 100, 210 105, 215 110
             L215 125"
          fill="none"
          stroke="url(#tracheaGrad)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Trachea rings */}
        {[40, 52, 64, 76, 88].map((y, i) => (
          <ellipse
            key={i}
            cx="200"
            cy={y}
            rx="7"
            ry="3"
            fill="none"
            stroke="#d4b8b8"
            strokeWidth="1.5"
            opacity="0.6"
          />
        ))}
        
        {/* Bronchi split */}
        <path
          d="M190 95 C175 105, 155 115, 135 130
             M210 95 C225 105, 245 115, 265 130"
          fill="none"
          stroke="url(#bronchiGradient)"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </g>
      
      {/* Left Lung */}
      <g className="left-lung">
        {/* Main lung shape */}
        <path
          className="lung-body-left"
          d="M175 120
             C145 125, 100 140, 70 180
             C40 220, 30 280, 35 330
             C40 370, 55 400, 85 415
             C115 430, 150 425, 175 410
             C195 398, 195 380, 195 350
             L195 160
             C195 140, 188 125, 175 120Z"
          fill="url(#lungTissueLeft)"
          filter="url(#innerShadow)"
        />
        
        {/* Texture overlay */}
        <path
          d="M175 120
             C145 125, 100 140, 70 180
             C40 220, 30 280, 35 330
             C40 370, 55 400, 85 415
             C115 430, 150 425, 175 410
             C195 398, 195 380, 195 350
             L195 160
             C195 140, 188 125, 175 120Z"
          fill="url(#lungTexture)"
          opacity="0.5"
        />
        
        {/* Lobes division lines */}
        <path
          className="lobe-line"
          d="M55 250 C90 260, 130 255, 175 245"
          fill="none"
          stroke="#a08080"
          strokeWidth="2"
          opacity="0.4"
        />
        <path
          className="lobe-line"
          d="M45 320 C85 335, 130 330, 180 310"
          fill="none"
          stroke="#a08080"
          strokeWidth="2"
          opacity="0.4"
        />
        
        {/* Bronchial tree left */}
        <g className="bronchi-left" opacity="0.7">
          <path d="M175 135 C150 150, 120 170, 100 200" stroke="#c99999" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M145 165 C125 180, 95 200, 70 235" stroke="#c99999" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M120 190 C100 210, 75 240, 55 280" stroke="#c99999" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M100 210 C85 230, 65 260, 50 300" stroke="#c99999" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M130 180 C110 195, 90 220, 80 250" stroke="#c99999" strokeWidth="2" fill="none" strokeLinecap="round" />
          
          {/* Smaller branches */}
          <path d="M80 235 C70 250, 55 270, 50 290" stroke="#d4aaaa" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M95 220 C80 235, 65 255, 60 280" stroke="#d4aaaa" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M110 200 C95 215, 80 235, 75 260" stroke="#d4aaaa" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M65 260 C55 280, 48 310, 50 340" stroke="#d4aaaa" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M85 250 C70 275, 60 305, 65 340" stroke="#d4aaaa" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>
        
        {/* Blood vessels left */}
        <g className="vessels-left" opacity="0.5">
          <path d="M180 140 C160 160, 130 190, 115 230" stroke="url(#vesselGradient)" strokeWidth="2" fill="none" />
          <path d="M160 170 C140 195, 110 230, 90 275" stroke="url(#vesselGradient)" strokeWidth="1.5" fill="none" />
          <path d="M140 200 C120 230, 95 270, 80 310" stroke="url(#vesselGradient)" strokeWidth="1" fill="none" />
        </g>
      </g>
      
      {/* Right Lung (larger, 3 lobes) */}
      <g className="right-lung">
        {/* Main lung shape */}
        <path
          className="lung-body-right"
          d="M225 120
             C255 125, 300 140, 330 180
             C360 220, 370 280, 365 330
             C360 370, 345 400, 315 415
             C285 430, 250 425, 225 410
             C205 398, 205 380, 205 350
             L205 160
             C205 140, 212 125, 225 120Z"
          fill="url(#lungTissueRight)"
          filter="url(#innerShadow)"
        />
        
        {/* Texture overlay */}
        <path
          d="M225 120
             C255 125, 300 140, 330 180
             C360 220, 370 280, 365 330
             C360 370, 345 400, 315 415
             C285 430, 250 425, 225 410
             C205 398, 205 380, 205 350
             L205 160
             C205 140, 212 125, 225 120Z"
          fill="url(#lungTexture)"
          opacity="0.5"
        />
        
        {/* Lobes division lines (3 lobes on right) */}
        <path
          className="lobe-line"
          d="M225 200 C260 195, 300 200, 345 210"
          fill="none"
          stroke="#a08080"
          strokeWidth="2"
          opacity="0.4"
        />
        <path
          className="lobe-line"
          d="M225 280 C265 290, 310 295, 350 290"
          fill="none"
          stroke="#a08080"
          strokeWidth="2"
          opacity="0.4"
        />
        <path
          className="lobe-line"
          d="M220 350 C260 360, 305 355, 345 340"
          fill="none"
          stroke="#a08080"
          strokeWidth="2"
          opacity="0.4"
        />
        
        {/* Bronchial tree right */}
        <g className="bronchi-right" opacity="0.7">
          <path d="M225 135 C250 150, 280 170, 300 200" stroke="#c99999" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M255 165 C275 180, 305 200, 330 235" stroke="#c99999" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M280 190 C300 210, 325 240, 345 280" stroke="#c99999" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M300 210 C315 230, 335 260, 350 300" stroke="#c99999" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M270 180 C290 195, 310 220, 320 250" stroke="#c99999" strokeWidth="2" fill="none" strokeLinecap="round" />
          
          {/* Smaller branches */}
          <path d="M320 235 C330 250, 345 270, 350 290" stroke="#d4aaaa" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M305 220 C320 235, 335 255, 340 280" stroke="#d4aaaa" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M290 200 C305 215, 320 235, 325 260" stroke="#d4aaaa" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M335 260 C345 280, 352 310, 350 340" stroke="#d4aaaa" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M315 250 C330 275, 340 305, 335 340" stroke="#d4aaaa" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>
        
        {/* Blood vessels right */}
        <g className="vessels-right" opacity="0.5">
          <path d="M220 140 C240 160, 270 190, 285 230" stroke="url(#vesselGradient)" strokeWidth="2" fill="none" />
          <path d="M240 170 C260 195, 290 230, 310 275" stroke="url(#vesselGradient)" strokeWidth="1.5" fill="none" />
          <path d="M260 200 C280 230, 305 270, 320 310" stroke="url(#vesselGradient)" strokeWidth="1" fill="none" />
        </g>
      </g>
      
      {/* Heart silhouette (between lungs) */}
      <g className="heart-area" opacity="0.3">
        <path
          d="M200 180
             C185 180, 175 195, 175 215
             C175 240, 185 260, 200 280
             C215 260, 225 240, 225 215
             C225 195, 215 180, 200 180Z"
          fill="#9b6b6b"
        />
      </g>
      
      {/* Diaphragm hint */}
      <path
        className="diaphragm"
        d="M30 400 C80 430, 150 445, 200 445 C250 445, 320 430, 370 400"
        fill="none"
        stroke="#8b7777"
        strokeWidth="3"
        opacity="0.3"
        strokeLinecap="round"
      />
    </svg>
  );
});

RealisticLungs.displayName = 'RealisticLungs';

export default RealisticLungs;
