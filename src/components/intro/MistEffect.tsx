import { forwardRef } from 'react';

interface MistEffectProps {
  className?: string;
}

const MistEffect = forwardRef<HTMLDivElement, MistEffectProps>(({ className }, ref) => {
  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Layer 1 - Slow moving mist */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, hsl(210 30% 85% / 0.15), transparent)',
          animation: 'mist 20s ease-in-out infinite',
        }}
      />
      
      {/* Layer 2 - Medium speed mist */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 30% 60%, hsl(187 60% 55% / 0.1), transparent)',
          animation: 'mist 15s ease-in-out infinite reverse',
          animationDelay: '-5s',
        }}
      />
      
      {/* Layer 3 - Fast subtle mist */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(ellipse 100% 60% at 70% 40%, hsl(200 60% 50% / 0.08), transparent)',
          animation: 'mist 12s ease-in-out infinite',
          animationDelay: '-8s',
        }}
      />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(220 25% 6% / 0.4) 70%, hsl(220 25% 6% / 0.8) 100%)',
        }}
      />
    </div>
  );
});

MistEffect.displayName = 'MistEffect';

export default MistEffect;
