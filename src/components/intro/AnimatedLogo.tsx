import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface OxylifeLogoProps {
  className?: string;
  animate?: boolean;
}

const OxylifeLogo = forwardRef<SVGSVGElement, OxylifeLogoProps>(
  ({ className = 'h-16 w-auto', animate = true }, ref) => {
    // Animation de respiration - inspire/expire
    const breathingAnimation = {
      scale: [1, 1.08, 1],
      opacity: [0.9, 1, 0.9],
    };

    // Animation des particules Z (troubles respiratoires)
    const zParticles = [
      { delay: 0, x: 20, y: -25, rotation: -15 },
      { delay: 0.3, x: 35, y: -35, rotation: 10 },
      { delay: 0.6, x: 50, y: -45, rotation: -8 },
    ];

    return (
      <motion.svg
        ref={ref}
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="760"
        height="328"
        viewBox="0 0 760 328"
        preserveAspectRatio="xMidYMid meet"
        className={className}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <defs>
          {/* Gradient pour effet de respiration */}
          <linearGradient id="breath-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <motion.stop 
              offset="0%" 
              stopColor="#50becc"
              animate={animate ? {
                stopColor: ['#50becc', '#13a99f', '#50becc'],
              } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.stop 
              offset="100%" 
              stopColor="#13a99f"
              animate={animate ? {
                stopColor: ['#13a99f', '#50becc', '#13a99f'],
              } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </linearGradient>

          {/* Filtre pour l'effet lumineux */}
          <filter id="glow-effect">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Masque pour l'effet de pulsation */}
          <radialGradient id="pulse-gradient">
            <stop offset="0%" stopColor="white" stopOpacity="1"/>
            <stop offset="100%" stopColor="white" stopOpacity="0.3"/>
          </radialGradient>
        </defs>

        {/* Groupe principal avec animation de respiration */}
        <motion.g
          animate={animate ? breathingAnimation : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: 'center' }}
        >
          {/* Fond blanc */}
          <g fill="#ffffff">
            <motion.path 
              d="M0 164 l0 -164 380 0 380 0 0 164 0 164 -224 0 c-198.4 0 -224 -0.2 -224 -1.5 0 -1.3 2.1 -1.5 13 -1.5 8 0 13 -0.4 13 -1 0 -0.5 2.4 -1 5.3 -1 9.8 0 39.9 -3.1 73.6 -7.5 65.5 -8.5 83 -9.5 170.2 -9.5 59.6 0 97.6 0.9 112.4 2.6 22.6 2.6 -41.6 -9.9 -72 -14 -48.3 -6.5 -103.3 -9.5 -140.3 -7.7 -27.6 1.3 -36.5 2.1 -79.7 6.7 -74 7.9 -90.3 8.8 -151 8.8 -64.1 0.1 -101.5 -1.9 -158.5 -8.4 -14 -1.7 -28 -3.2 -31 -3.5 l-5.5 -0.6 7.5 2.5 c4.1 1.4 15.4 4.6 25 7 46.3 11.8 94.9 19.5 142.7 22.8 10.1 0.7 18.3 1.6 18.3 2 0 0.4 6.1 0.8 13.5 0.8 11.3 0 13.5 0.2 13.5 1.5 0 1.3 -16.3 1.5 -141 1.5 l-141 0 0 -164z m126.7 69.4 c25.7 -6.7 47.9 -29.5 54.9 -56.4 2.2 -8.7 2.2 -24.5 0 -33 -5.5 -20.5 -20.5 -40.5 -36.6 -48.9 l-6.5 -3.3 7.6 7.1 c12.8 11.8 21 24.5 24.5 37.4 1.7 6.3 1.8 24.6 0.3 31.9 -1.9 8.8 -7.5 18.6 -14.8 25.9 -14.1 14 -41.2 29.2 -61.4 34.3 l-8.7 2.3 5.7 1.7 c12.5 3.7 23.3 4 35 1z m124.3 -50.4 c0 -1.1 -0.4 -2 -1 -2 -0.5 0 -1 0.9 -1 2 0 1.1 0.5 2 1 2 0.6 0 1 -0.9 1 -2z"
              animate={animate ? {
                opacity: [0.9, 1, 0.9],
              } : {}}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </g>

          {/* Éléments cyan avec gradient animé */}
          <g fill="url(#breath-gradient)" filter="url(#glow-effect)">
            <motion.path 
              d="M270 327.3 c-68.8 -1.8 -155.9 -15.8 -210.2 -33.8 -19.3 -6.4 -27.9 -10.5 -21.8 -10.5 2.8 0 43.8 5.7 50.5 7 2.8 0.5 7.3 1.4 10 1.9 4.8 0.9 11.5 2 24.7 4.1 10.3 1.5 21.6 2.9 33.3 4 6.1 0.6 15.3 1.5 20.5 2 52.6 5.2 130.2 3.3 203 -4.9 25.7 -2.9 38.1 -4.3 58 -6.2 16.3 -1.7 114.6 -2.3 143.5 -1 69.3 3.2 86.2 5.7 159.8 23.8 8.1 2 14.6 3.8 14.4 3.9 -0.2 0.2 -6.6 -0.5 -14.3 -1.6 -37.6 -5.2 -76 -7 -154.3 -7 -84 0 -102.1 1 -167.2 9.5 -61.1 8 -98 10.2 -149.9 8.8z"
              animate={animate ? {
                pathLength: [0.98, 1, 0.98],
                opacity: [0.9, 1, 0.9],
              } : {}}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <path d="M97.5 237.6 c-10.2 -2.1 -21.5 -6.5 -21.5 -8.5 0 -0.5 3.4 -1.4 7.6 -2 20.9 -3.1 53.4 -19.9 69.5 -36 16.7 -16.7 20.7 -40.4 10.5 -62.7 -6.1 -13.3 -14.1 -21.8 -40 -42.6 -6.4 -5.1 8.3 -1.8 21.7 5 14.5 7.2 26.7 20.2 34.1 36.4 5.6 12 7 18.6 6.9 33.3 0 15.4 -1.4 21.9 -7.8 35 -9.7 20.2 -28.2 35.5 -49.3 41 -8.4 2.2 -23.4 2.7 -31.7 1.1z"/>
            <path d="M685 238.3 c-5.3 -0.8 -13.7 -3.8 -19 -6.7 -12.5 -6.7 -21.2 -15.6 -26.7 -27.4 -13.7 -29.4 1.8 -62.2 35.5 -75 6 -2.3 8.1 -2.6 20.7 -2.7 11.8 0 15.1 0.4 21 2.2 20.5 6.5 37.5 23.5 41.5 41.3 0.6 3 1 6.9 0.8 8.5 l-0.3 3 -59.2 0.3 -59.3 0.2 0 3.3 c0.1 14.4 12.3 32.9 27 40.9 11.2 6.1 16 7.3 30 7.3 14.7 0 21.2 -1.8 32.9 -9.1 7.1 -4.4 10.1 -5 10.1 -2 0 3.7 -16.9 12.7 -28.3 15 -7 1.5 -20.6 1.9 -26.7 0.9z m67.6 -66 c-2 -14.7 -19.6 -32.5 -38.6 -38.9 -8.5 -2.9 -27.3 -2.7 -36.2 0.4 -8.6 3 -20.1 10.5 -25.5 16.6 -4.2 4.8 -9.5 14.7 -10.7 20.1 -0.4 1.7 -0.9 3.8 -1.2 4.8 -0.5 1.6 2.6 1.7 56.2 1.7 l56.7 0 -0.7 -4.7z"/>
            <path d="M423.7 236.3 c-0.4 -0.3 -0.7 -29.2 -0.7 -64 l0 -63.4 2.3 0.3 2.2 0.3 0.3 60.8 0.2 60.7 40.6 0 c26.2 0 41.2 0.4 42.5 1 1.5 0.9 1.7 1.5 0.9 3 -1 1.9 -2.4 2 -44.4 2 -23.8 0 -43.6 -0.3 -43.9 -0.7z"/>
            <path d="M535.3 236.3 c-1 -0.4 -1.3 -12.3 -1.3 -55 l0 -54.4 2.3 0.3 2.2 0.3 0 54.4 c0 35.5 -0.3 54.5 -1 54.7 -0.5 0.1 -1.6 0 -2.2 -0.3z"/>
            <path d="M589.3 236.3 c-1 -0.4 -1.3 -10.8 -1.3 -47.4 l0 -46.9 -12.6 0 c-11.4 0 -12.5 -0.2 -12.2 -1.7 0.3 -1.6 1.8 -1.8 12.4 -2.1 l12.2 -0.3 0.4 -12.2 c0.4 -10.3 0.9 -13 3 -17.7 4.9 -10.7 15.7 -17.3 28.3 -17.4 6.4 -0.1 7 0.1 7 1.9 0 1.7 -0.9 2.1 -6.2 2.7 -11 1.2 -19.4 6.2 -23.3 13.8 -2.4 4.6 -4 13.7 -4 22.2 l0 6.8 15 0 c14.3 0 15 0.1 15 2 0 1.9 -0.7 2 -14.5 2 -8 0 -14.6 0.1 -14.7 0.3 -0.1 0.1 -0.5 21.3 -0.8 47.1 -0.3 30 -0.9 47 -1.5 47.2 -0.5 0.1 -1.6 0 -2.2 -0.3z"/>
            <path d="M532.4 103.6 c-0.3 -0.8 -0.4 -2.7 -0.2 -4.3 0.2 -2.2 0.9 -2.9 3.1 -3.1 1.6 -0.2 3.5 0.2 4.3 0.9 1.7 1.4 1.8 5.1 0.2 6.7 -1.7 1.7 -6.7 1.5 -7.4 -0.2z"/>
          </g>

          {/* Élément noir */}
          <g fill="#050505">
            <path d="M332 270.5 c0 -0.9 1 -3.7 2.1 -6.3 8.4 -18.3 12.9 -28.7 12.9 -29.7 0 -0.7 -1.6 -4.8 -3.6 -9.1 -2 -4.4 -4.5 -9.9 -5.6 -12.4 -1.1 -2.5 -3.2 -6.7 -4.5 -9.5 -2.3 -4.6 -16.9 -36.1 -22.3 -48 -1.3 -2.7 -4.5 -9.7 -7.2 -15.5 -5 -10.6 -5.3 -13 -2 -13 1.5 0 3.9 4.4 11.2 20.3 5.1 11.1 11.5 24.9 14.2 30.7 2.7 5.8 8.8 19 13.6 29.4 4.8 10.3 9.1 18.8 9.7 18.8 0.5 0 3.7 -6.2 7.2 -13.9 3.5 -7.6 13.8 -29.9 23 -49.6 14.6 -31.3 16.9 -35.8 18.7 -35.5 1.4 0.2 2 1 1.9 2.3 -0.1 1.2 -4.3 10.8 -9.2 21.5 -5 10.7 -19.5 42.2 -32.3 70 -19.8 42.9 -23.7 50.5 -25.6 50.8 -1.5 0.2 -2.2 -0.2 -2.2 -1.3z"/>
          </g>

          {/* Élément vert */}
          <g fill="#13a99f">
            <path d="M200.5 306.9 c-13.1 -0.8 -34.5 -2.5 -42.5 -3.4 -1.9 -0.2 -6.4 -0.6 -10 -1 -25.2 -2.4 -84.3 -12.8 -93 -16.4 -3.5 -1.4 -1.8 -1.3 9.6 0.4 5.4 0.8 21.8 2.8 36.4 4.5 57.7 6.5 95 8.5 156 8.4 57 0 74.6 -1.1 147.5 -8.8 45.2 -4.8 51.8 -5.4 80.7 -6.7 47.4 -2.3 123 2.9 170.3 11.5 4.4 0.8 12 2.2 16.9 3 4.9 0.9 9.2 1.8 9.4 2.1 0.8 0.8 -1.7 0.6 -14 -0.9 -21.8 -2.8 -38.9 -4.1 -83.3 -6.5 -21.3 -1.2 -130.2 -0.6 -143.5 0.7 -21.7 2.2 -33 3.4 -58 6.3 -20.8 2.3 -45.9 4.5 -68.5 6 -21.7 1.4 -96.7 1.9 -114 0.8z"/>
          </g>
        </motion.g>

        {/* Particules Z Z Z (troubles respiratoires) */}
        {animate && zParticles.map((particle, index) => (
          <motion.g key={index}>
            <motion.text
              x="120"
              y="140"
              fontSize="28"
              fontWeight="bold"
              fontFamily="Arial, sans-serif"
              fill="#50becc"
              opacity="0"
              animate={{
                x: [120, 120 + particle.x],
                y: [140, 140 + particle.y],
                opacity: [0, 0.8, 0],
                rotate: [0, particle.rotation, particle.rotation * 2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: particle.delay,
                ease: 'easeOut',
              }}
            >
              Z
            </motion.text>
          </motion.g>
        ))}

        {/* Ondes de respiration (cercles concentriques) */}
        {animate && [1, 2, 3].map((i) => (
          <motion.circle
            key={`wave-${i}`}
            cx="130"
            cy="165"
            r="30"
            fill="none"
            stroke="#50becc"
            strokeWidth="1.5"
            opacity="0"
            animate={{
              r: [30, 30 + i * 15],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Indicateur de flux d'air */}
        {animate && [0, 1, 2, 3].map((i) => (
          <motion.line
            key={`airflow-${i}`}
            x1="80"
            y1={155 + i * 8}
            x2="100"
            y2={155 + i * 8}
            stroke="#13a99f"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0"
            animate={{
              x1: [80, 110],
              x2: [100, 130],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.svg>
    );
  }
);

OxylifeLogo.displayName = 'OxylifeLogo';

export default OxylifeLogo;