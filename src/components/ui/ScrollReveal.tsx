import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const ScrollReveal = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  className = '',
  once = true,
  amount = 0.3,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const directions = {
    up: { y: 60, x: 0, scale: 1 },
    down: { y: -60, x: 0, scale: 1 },
    left: { y: 0, x: 60, scale: 1 },
    right: { y: 0, x: -60, scale: 1 },
    fade: { y: 0, x: 0, scale: 1 },
    scale: { y: 0, x: 0, scale: 0.8 },
  };

  const { x, y, scale } = directions[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y, scale }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom easing for smooth animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

