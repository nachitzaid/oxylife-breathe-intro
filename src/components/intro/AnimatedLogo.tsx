import { forwardRef, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedLogoProps {
  className?: string;
  animate?: boolean;
}

const AnimatedLogo = forwardRef<HTMLDivElement, AnimatedLogoProps>(
  ({ className, animate = false }, ref) => {
    const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
    const taglineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!animate) return;

      const tl = gsap.timeline();

      // Animate each letter with stagger
      tl.fromTo(
        lettersRef.current.filter(Boolean),
        {
          opacity: 0,
          y: 40,
          rotateX: -90,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.08,
          ease: 'back.out(1.7)',
        }
      );

      // Add breathing pulse after letters appear
      tl.to(lettersRef.current.filter(Boolean), {
        scale: 1.02,
        duration: 1.2,
        ease: 'power2.inOut',
        stagger: 0.02,
      }).to(lettersRef.current.filter(Boolean), {
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.02,
      });

      return () => {
        tl.kill();
      };
    }, [animate]);

    const logoText = 'OxyLife';
    const letters = logoText.split('');

    return (
      <div ref={ref} className={className}>
        <div
          className="flex items-center justify-center gap-0 perspective-1000"
          style={{ perspective: '1000px' }}
        >
          {letters.map((letter, index) => {
            const isOxy = index < 3;
            return (
              <span
                key={index}
                ref={(el) => (lettersRef.current[index] = el)}
                className="inline-block font-outfit font-bold text-6xl md:text-7xl lg:text-8xl"
                style={{
                  color: isOxy ? 'hsl(187, 60%, 55%)' : 'hsl(200, 20%, 90%)',
                  textShadow: isOxy
                    ? '0 0 40px hsl(187 60% 55% / 0.5), 0 0 80px hsl(187 60% 55% / 0.3)'
                    : '0 0 30px hsl(200 20% 90% / 0.3)',
                  transformStyle: 'preserve-3d',
                  opacity: animate ? 0 : 1,
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>

        {/* Decorative underline */}
        <div
          className="mt-4 mx-auto h-0.5 rounded-full"
          style={{
            width: '60%',
            background:
              'linear-gradient(90deg, transparent, hsl(187 60% 55% / 0.6), hsl(187 60% 55%), hsl(187 60% 55% / 0.6), transparent)',
            boxShadow: '0 0 20px hsl(187 60% 55% / 0.4)',
          }}
        />

        {/* Oxygen molecule hint */}
        <div className="flex justify-center mt-3 gap-4 opacity-50">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <circle cx="8" cy="12" r="6" fill="none" stroke="hsl(187, 60%, 55%)" strokeWidth="1" />
            <circle cx="16" cy="12" r="6" fill="none" stroke="hsl(187, 60%, 55%)" strokeWidth="1" />
            <text x="6" y="14" fontSize="6" fill="hsl(187, 60%, 55%)" fontFamily="Arial">O</text>
            <text x="14" y="14" fontSize="6" fill="hsl(187, 60%, 55%)" fontFamily="Arial">₂</text>
          </svg>
        </div>
      </div>
    );
  }
);

AnimatedLogo.displayName = 'AnimatedLogo';

export default AnimatedLogo;
