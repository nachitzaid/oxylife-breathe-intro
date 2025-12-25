import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import OxylifeLogo from '@/components/ui/OxylifeLogo';
import GrainTexture from './GrainTexture';
import MistEffect from './MistEffect';

interface BreathingIntroProps {
  onComplete: () => void;
  onSkip: () => void;
  language?: 'fr' | 'en' | 'ar';
}

const BreathingIntro = ({ onComplete, onSkip, language = 'fr' }: BreathingIntroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  
  const [animateLogo, setAnimateLogo] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return;
    
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 1000);
      },
    });
    
    // Initial setup
    tl.set(logoRef.current, {
      opacity: 0,
      y: -200, // Start from above the screen
      scale: 0.5,
      rotation: 0,
    })
    .set(backgroundRef.current, {
      backgroundColor: 'hsl(220 25% 6%)',
    })
    .set(grainRef.current, {
      opacity: 0.1,
    });
    
    // Logo falls down like a ball (bounce effect)
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0, // Center position
      scale: 1,
      duration: 0.8,
      ease: 'bounce.out', // Bounce effect like a ball
      onStart: () => setAnimateLogo(true),
    })
    // Small bounce after landing
    .to(logoRef.current, {
      y: -20,
      scale: 1.05,
      duration: 0.2,
      ease: 'power2.out',
    })
    .to(logoRef.current, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'bounce.out',
    })
    // Slight rotation for more dynamic effect
    .to(logoRef.current, {
      rotation: -5,
      duration: 0.15,
      ease: 'power2.out',
    })
    .to(logoRef.current, {
      rotation: 5,
      duration: 0.15,
      ease: 'power2.out',
    })
    .to(logoRef.current, {
      rotation: 0,
      duration: 0.2,
      ease: 'power2.out',
    })
    // Hold for breathing animation
    .to(logoRef.current, {
      duration: 2,
    });
    
    return () => {
      tl.kill();
    };
  }, [onComplete]);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        backgroundColor: 'hsl(220 25% 6%)',
      }}
    >
      {/* Background color controller */}
      <div ref={backgroundRef} className="absolute inset-0 transition-colors duration-1000" />
      
      {/* Grain texture for ambiance */}
      <GrainTexture ref={grainRef} intensity={0.1} />
      
      {/* Mist background effect */}
      <MistEffect />
      
      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Logo with ball drop animation */}
        <motion.div
          ref={logoRef}
          className="flex flex-col items-center"
          style={{ color: 'hsl(200 20% 95%)' }}
        >
          <OxylifeLogo className="h-48 md:h-64 lg:h-80 w-auto" animate={animateLogo} />
        </motion.div>
      </div>
      
      {/* Skip button */}
      <button
        onClick={onSkip}
        className="absolute bottom-8 right-8 z-20 px-6 py-2.5 text-sm font-outfit font-medium tracking-wide rounded-full transition-all duration-300 hover:scale-105"
        style={{
          background: 'hsl(220 20% 12% / 0.8)',
          border: '1px solid hsl(210 20% 25%)',
          color: 'hsl(200 20% 70%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {language === 'fr' ? 'Passer l\'intro →' : language === 'en' ? 'Skip intro →' : 'تخطي المقدمة →'}
      </button>
    </div>
  );
};

export default BreathingIntro;
