import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface BeautifulLungsProps {
  className?: string;
}

const BeautifulLungs = forwardRef<SVGSVGElement, BeautifulLungsProps>(
  ({ className }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 400 450"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Soft gradient for lung tissue */}
          <linearGradient id="beautifulLungLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a8d5e2" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#b8e5f2" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#a0d0e0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8bc4d8" stopOpacity="0.85" />
          </linearGradient>
          
          <linearGradient id="beautifulLungRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a8d5e2" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#b8e5f2" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#a0d0e0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8bc4d8" stopOpacity="0.85" />
          </linearGradient>
          
          {/* Air flow gradient */}
          <linearGradient id="airFlowGradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#50becc" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#50becc" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#50becc" stopOpacity="0.2" />
          </linearGradient>
          
          {/* Glow effect */}
          <filter id="lungGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Breathing glow */}
          <radialGradient id="breathGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#50becc" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#50becc" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#50becc" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Background glow */}
        <ellipse
          cx="200"
          cy="230"
          rx="180"
          ry="200"
          fill="url(#breathGlow)"
          opacity="0.4"
        />
        
        {/* Trachea - elegant and smooth */}
        <g className="trachea-group">
          <path
            d="M200 30 
               C200 30, 195 40, 195 50
               L195 100
               C195 110, 190 115, 185 120
               L185 135
               M200 30
               C200 30, 205 40, 205 50
               L205 100
               C205 110, 210 115, 215 120
               L215 135"
            fill="none"
            stroke="url(#airFlowGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.8"
          />
          
          {/* Bronchi split - smooth curves */}
          <path
            d="M190 100 C175 110, 160 120, 145 135
               M210 100 C225 110, 240 120, 255 135"
            fill="none"
            stroke="url(#airFlowGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>
        
        {/* Left Lung - smooth and elegant */}
        <g className="left-lung">
          <motion.path
            className="lung-body-left"
            d="M180 130
               C150 135, 110 150, 85 185
               C60 220, 50 270, 55 320
               C60 360, 75 390, 105 405
               C135 420, 170 415, 180 400
               C185 390, 185 375, 185 360
               L185 150
               C185 135, 183 130, 180 130Z"
            fill="url(#beautifulLungLeft)"
            filter="url(#lungGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          
          {/* Air pathways - subtle */}
          <g className="air-pathways-left" opacity="0.4">
            <path
              d="M180 140 C150 155, 120 175, 100 200"
              stroke="#50becc"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M150 170 C130 190, 105 215, 85 250"
              stroke="#50becc"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M130 200 C110 225, 90 255, 75 290"
              stroke="#50becc"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </g>
        
        {/* Right Lung - smooth and elegant */}
        <g className="right-lung">
          <motion.path
            className="lung-body-right"
            d="M220 130
               C250 135, 290 150, 315 185
               C340 220, 350 270, 345 320
               C340 360, 325 390, 295 405
               C265 420, 230 415, 220 400
               C215 390, 215 375, 215 360
               L215 150
               C215 135, 217 130, 220 130Z"
            fill="url(#beautifulLungRight)"
            filter="url(#lungGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          
          {/* Air pathways - subtle */}
          <g className="air-pathways-right" opacity="0.4">
            <path
              d="M220 140 C250 155, 280 175, 300 200"
              stroke="#50becc"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M250 170 C270 190, 295 215, 315 250"
              stroke="#50becc"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M270 200 C290 225, 310 255, 325 290"
              stroke="#50becc"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </g>
        
        {/* Heart area - subtle hint */}
        <g className="heart-area" opacity="0.2">
          <path
            d="M200 180
               C185 180, 175 195, 175 210
               C175 230, 185 250, 200 270
               C215 250, 225 230, 225 210
               C225 195, 215 180, 200 180Z"
            fill="#50becc"
          />
        </g>
      </svg>
    );
  }
);

BeautifulLungs.displayName = 'BeautifulLungs';

export default BeautifulLungs;




