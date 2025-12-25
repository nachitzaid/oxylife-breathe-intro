import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import MagneticCursor from './MagneticCursor';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const MagneticButton = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
}: MagneticButtonProps) => {
  const baseStyles = 'relative font-outfit font-semibold rounded-full transition-all duration-300 overflow-hidden';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-[hsl(187,70%,50%)] to-[hsl(200,60%,45%)] text-background',
    secondary: 'bg-transparent border-2 border-[hsl(187,60%,55%)] text-[hsl(187,60%,65%)]',
    outline: 'bg-transparent border border-[hsl(210,20%,25%)] text-foreground hover:border-[hsl(187,60%,55%)]',
  };

  const sizeStyles = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-10 py-5 text-lg',
    lg: 'px-12 py-6 text-xl',
  };

  return (
    <MagneticCursor strength={0.15}>
      <motion.button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <motion.span
          className="relative z-10 flex items-center gap-2"
          whileHover={{ x: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {children}
        </motion.span>
        
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[hsl(200,60%,45%)] to-[hsl(187,70%,50%)]"
            initial={{ x: '100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.button>
    </MagneticCursor>
  );
};

export default MagneticButton;




