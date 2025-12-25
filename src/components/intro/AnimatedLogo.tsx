import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import RespirAirLogo from './RespirAirLogo';

interface AnimatedLogoProps {
  className?: string;
  animate?: boolean;
}

const AnimatedLogo = forwardRef<HTMLDivElement, AnimatedLogoProps>(
  ({ className, animate = false }, ref) => {
    const containerVariants = {
      hidden: {
        opacity: 0,
        scale: 0.8,
        filter: 'blur(20px)',
      },
      visible: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1], // Custom easing for smooth entrance
        },
      },
    };

    const breathingVariants = {
      breathe: {
        scale: [1, 1.03, 1],
        filter: [
          'drop-shadow(0 0 20px rgba(80, 190, 204, 0.4))',
          'drop-shadow(0 0 40px rgba(80, 190, 204, 0.6))',
          'drop-shadow(0 0 20px rgba(80, 190, 204, 0.4))',
        ],
        transition: {
          duration: 3,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse' as const,
        },
      },
    };

    const pathVariants = {
      hidden: {
        pathLength: 0,
        opacity: 0,
      },
      visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: {
            duration: 2,
            ease: 'easeInOut',
          },
          opacity: {
            duration: 0.5,
          },
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={animate ? 'visible' : 'hidden'}
      >
        <motion.div
          variants={breathingVariants}
          animate={animate ? 'breathe' : 'visible'}
          className="flex items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <RespirAirLogo
              className="w-64 h-auto md:w-80 lg:w-96"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
);

AnimatedLogo.displayName = 'AnimatedLogo';

export default AnimatedLogo;
