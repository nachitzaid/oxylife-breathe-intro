import { forwardRef } from 'react';

interface GrainTextureProps {
  className?: string;
  intensity?: number;
}

const GrainTexture = forwardRef<HTMLDivElement, GrainTextureProps>(
  ({ className, intensity = 0.15 }, ref) => {
    return (
      <div
        ref={ref}
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
          opacity: intensity,
          mixBlendMode: 'overlay',
          animation: 'grain 0.8s steps(10) infinite',
        }}
      />
    );
  }
);

GrainTexture.displayName = 'GrainTexture';

export default GrainTexture;




