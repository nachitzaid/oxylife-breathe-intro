import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import RealisticLungs from './RealisticLungs';
import ECGLine from './ECGLine';
import MistEffect from './MistEffect';
import AirParticles from './AirParticles';
import AnimatedLogo from './AnimatedLogo';

interface BreathingIntroProps {
  onComplete: () => void;
  onSkip: () => void;
}

const BreathingIntro = ({ onComplete, onSkip }: BreathingIntroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lungsRef = useRef<SVGSVGElement>(null);
  const ecgRef = useRef<SVGSVGElement>(null);
  const textBreathRef = useRef<HTMLDivElement>(null);
  const dangerTextRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLDivElement>(null);
  
  const [currentScene, setCurrentScene] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
  const [animateLogo, setAnimateLogo] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500);
      },
    });
    
    // SCENE 0 - Pre-intro (0-0.5s)
    tl.set([textBreathRef.current, dangerTextRef.current, flashRef.current, logoRef.current, sloganRef.current, ecgRef.current], {
      opacity: 0,
    })
    .set(lungsRef.current, { 
      opacity: 0,
      scale: 0.85,
      filter: 'blur(15px)',
    });
    
    // SCENE 1 - "Respirer..." (0.5-3s)
    tl.to(textBreathRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 2,
      ease: 'power2.out',
      onStart: () => setCurrentScene(1),
    }, 0.5)
    .from(textBreathRef.current, {
      y: 30,
      filter: 'blur(8px)',
      duration: 2,
      ease: 'power2.out',
    }, 0.5);
    
    // SCENE 2 - Lungs appear + Inspiration (3-5s)
    tl.to(lungsRef.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.8,
      ease: 'expo.out',
      onStart: () => setCurrentScene(2),
    }, 3)
    .to(textBreathRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: 'power2.in',
    }, 3.5)
    // Realistic breathing - expansion
    .to(lungsRef.current, {
      scale: 1.06,
      duration: 2.5,
      ease: 'power1.inOut',
    }, 4);
    
    // SCENE 3 - Apnée/Freeze (5-7s)
    tl.to(lungsRef.current, {
      duration: 0.5,
      onStart: () => setCurrentScene(3),
    }, 6.5)
    .to(lungsRef.current, {
      filter: 'blur(2px) brightness(0.85) saturate(0.7)',
      duration: 1,
      ease: 'power2.in',
    }, 7)
    // Subtle distress tremor
    .to(lungsRef.current, {
      x: -1.5,
      repeat: 10,
      yoyo: true,
      duration: 0.05,
      ease: 'none',
    }, 7.5);
    
    // SCENE 4 - Danger Text (7-10s)
    tl.to(dangerTextRef.current, {
      opacity: 1,
      duration: 0.1,
      onStart: () => setCurrentScene(4),
    }, 8)
    .fromTo(dangerTextRef.current, 
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'power4.out' },
      8
    )
    .to(dangerTextRef.current, {
      x: -2,
      repeat: 6,
      yoyo: true,
      duration: 0.05,
      ease: 'none',
    }, 9);
    
    // SCENE 5 - Urgence/Flash + ECG (10-12s)
    tl.to(flashRef.current, {
      opacity: 0.25,
      duration: 0.15,
      onStart: () => setCurrentScene(5),
    }, 10)
    .to(flashRef.current, {
      opacity: 0,
      duration: 0.15,
    }, 10.15)
    .to(flashRef.current, {
      opacity: 0.2,
      duration: 0.15,
    }, 10.4)
    .to(flashRef.current, {
      opacity: 0,
      duration: 0.15,
    }, 10.55)
    .to(ecgRef.current, {
      opacity: 1,
      duration: 0.5,
    }, 10)
    .to(ecgRef.current?.querySelector('.ecg-path') || {}, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'none',
    }, 10.2)
    .to([dangerTextRef.current, ecgRef.current], {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in',
    }, 11.8);
    
    // SCENE 6 - Soulagement (12-14s)
    tl.to(lungsRef.current, {
      scale: 1,
      filter: 'blur(0px) brightness(1) saturate(1)',
      x: 0,
      duration: 2.5,
      ease: 'expo.inOut',
      onStart: () => {
        setCurrentScene(6);
        setShowParticles(true);
      },
    }, 12);
    
    // SCENE 7 - Logo textuel animé (14-18s)
    tl.to(lungsRef.current, {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(8px)',
      duration: 1.2,
      ease: 'power2.in',
    }, 14.5)
    .to(logoRef.current, {
      opacity: 1,
      duration: 0.1,
      onStart: () => {
        setCurrentScene(7);
        setAnimateLogo(true);
      },
    }, 15)
    // Slogan appears smoothly
    .to(sloganRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power2.out',
    }, 17)
    .from(sloganRef.current, {
      y: 20,
      duration: 1.5,
      ease: 'power2.out',
    }, 17);
    
    return () => {
      tl.kill();
    };
  }, [onComplete]);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-background overflow-hidden"
    >
      {/* Mist background effect */}
      <MistEffect />
      
      {/* Air particles (appear in relief scene) */}
      <AirParticles isActive={showParticles} count={30} />
      
      {/* Danger flash overlay */}
      <div
        ref={flashRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(0 60% 50% / 0.25) 30%, hsl(200 60% 50% / 0.15) 70%, transparent 100%)',
        }}
      />
      
      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Scene 1: Breath text */}
        <div
          ref={textBreathRef}
          className="absolute text-5xl md:text-7xl lg:text-8xl font-outfit font-light tracking-wider opacity-0"
          style={{
            textShadow: '0 0 40px hsl(187 60% 55% / 0.4)',
            color: 'hsl(200 20% 90%)',
          }}
        >
          Respirer...
        </div>
        
        {/* Scene 2-3: Realistic Lungs */}
        <RealisticLungs
          ref={lungsRef}
          className="absolute w-64 h-72 md:w-80 md:h-96 lg:w-96 lg:h-[28rem]"
        />
        
        {/* Scene 4: Danger text */}
        <div
          ref={dangerTextRef}
          className="absolute flex flex-col items-center gap-1 text-center opacity-0"
        >
          <span 
            className="text-3xl md:text-5xl lg:text-6xl font-outfit font-semibold"
            style={{ 
              color: 'hsl(0 65% 55%)',
              textShadow: '0 0 30px hsl(0 65% 55% / 0.4)',
            }}
          >
            Apnée
          </span>
          <span 
            className="text-xl md:text-3xl font-outfit font-light"
            style={{ color: 'hsl(0 40% 65%)' }}
          >
            du
          </span>
          <span 
            className="text-3xl md:text-5xl lg:text-6xl font-outfit font-semibold"
            style={{ 
              color: 'hsl(0 65% 55%)',
              textShadow: '0 0 30px hsl(0 65% 55% / 0.4)',
            }}
          >
            sommeil
          </span>
        </div>
        
        {/* Scene 5: ECG Line */}
        <ECGLine
          ref={ecgRef}
          className="absolute w-80 md:w-[500px] lg:w-[600px] h-24 opacity-0"
        />
        
        {/* Scene 7: Animated Text Logo */}
        <div
          ref={logoRef}
          className="absolute flex flex-col items-center opacity-0"
        >
          <AnimatedLogo animate={animateLogo} />
        </div>
        
        {/* Slogan */}
        <div
          ref={sloganRef}
          className="absolute mt-44 md:mt-52 lg:mt-60 text-center opacity-0"
        >
          <p 
            className="text-lg md:text-xl lg:text-2xl font-outfit font-light tracking-wide"
            style={{ 
              color: 'hsl(200 20% 75%)',
              textShadow: '0 0 20px hsl(187 60% 55% / 0.2)',
            }}
          >
            Respirez mieux. Vivez mieux.
          </p>
        </div>
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
        Passer l'intro →
      </button>
      
      {/* Scene indicator */}
      <div className="absolute bottom-8 left-8 z-20 flex gap-1.5">
        {[1, 2, 3, 4, 5, 6, 7].map((scene) => (
          <div
            key={scene}
            className="w-2 h-2 rounded-full transition-all duration-500"
            style={{
              background: currentScene >= scene 
                ? 'hsl(187 60% 55%)' 
                : 'hsl(220 20% 25%)',
              boxShadow: currentScene === scene 
                ? '0 0 10px hsl(187 60% 55% / 0.6)' 
                : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BreathingIntro;
