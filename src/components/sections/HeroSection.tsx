import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import MistEffect from '@/components/intro/MistEffect';
import AirParticles from '@/components/intro/AirParticles';
import OxylifeLogo from '@/components/ui/OxylifeLogo';
import { useLanguage } from '@/contexts/LanguageContext';
import gsap from 'gsap';

// ============ DÉTECTION MOBILE ============
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

const isSmallMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 640;
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { t } = useLanguage();
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // ============ PARALLAX DÉSACTIVÉ SUR MOBILE ============
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isMobileDevice ? ['0%', '0%'] : ['0%', '50%']
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5],
    isMobileDevice ? [1, 1] : [1, 0.8]
  );

  useEffect(() => {
    setIsMobileDevice(isMobile());
    setIsSmall(isSmallMobile());

    const handleResize = () => {
      setIsMobileDevice(isMobile());
      setIsSmall(isSmallMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isInView || !logoRef.current || !glowRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setLogoAnimationComplete(true);
      },
    });

    // ============ ANIMATION ADAPTÉE MOBILE ============
    const animationConfig = isMobileDevice ? {
      fallDuration: 0.4,      // Réduit de 0.6s
      bounceScale: 1.1,       // Réduit de 1.3
      glowScale: 2,           // Réduit de 3-4
      totalDuration: 1.8,     // Réduit de 2.8s
    } : {
      fallDuration: 0.6,
      bounceScale: 1.3,
      glowScale: 3,
      totalDuration: 2.8,
    };

    // Initial setup
    tl.set(logoRef.current, {
      y: -400,
      x: 0,
      rotation: -180,
      scale: 0.3,
      opacity: 0,
      filter: 'blur(20px)',
    })
      .set(glowRef.current, {
        scale: 0,
        opacity: 0,
      })
      .set(contentRef.current, {
        opacity: 0,
        y: 30,
      });

    // Phase 1: Logo falls from sky (adapté mobile)
    tl.to(logoRef.current, {
      y: 0,
      rotation: 0,
      scale: 1.2,
      opacity: 1,
      filter: 'blur(0px)',
      duration: animationConfig.fallDuration,
      ease: 'power4.out',
    })

      // Phase 2: Bounce impact (réduit sur mobile)
      .to(logoRef.current, {
        y: -50,
        scale: animationConfig.bounceScale,
        rotation: 10,
        duration: 0.1,
        ease: 'power2.out',
      })
      .to(logoRef.current, {
        y: 10,
        scale: 0.95,
        rotation: -5,
        duration: 0.15,
        ease: 'bounce.out',
      }, '-=0.05')

      // Phase 3: Small bounces (réduits sur mobile)
      .to(logoRef.current, {
        y: -8,
        scale: 1.03,
        rotation: 3,
        duration: 0.1,
        ease: 'power2.out',
      })
      .to(logoRef.current, {
        y: 2,
        scale: 0.98,
        rotation: -2,
        duration: 0.1,
        ease: 'bounce.out',
      }, '-=0.05')

      // Phase 4: Settle (plus rapide)
      .to(logoRef.current, {
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.2,
        ease: 'elastic.out(1, 0.4)',
      })

      // Phase 5: Glow effect (réduit)
      .to(glowRef.current, {
        scale: animationConfig.glowScale,
        opacity: 0.6,
        duration: 0.15,
        ease: 'power2.out',
      })
      .to(glowRef.current, {
        scale: animationConfig.glowScale + 1,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      })

      // Phase 6: Logo pulse (simplifié)
      .to(logoRef.current, {
        scale: 1.08,
        filter: 'brightness(1.3) drop-shadow(0 0 40px rgba(80, 190, 204, 0.6))',
        duration: 0.15,
        ease: 'power2.out',
      })
      .call(() => setShowParticles(true))
      .to(logoRef.current, {
        scale: 1,
        filter: 'brightness(1) drop-shadow(0 0 30px rgba(80, 190, 204, 0.4))',
        duration: 0.15,
        ease: 'power2.in',
      })

      // Phase 7: Content fade (plus rapide)
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.1');

    return () => {
      tl.kill();
    };
  }, [isInView, isMobileDevice]);

  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen flex flex-col items-center ${isMobileDevice ? 'justify-start pt-10' : 'justify-center pt-20'} px-4 sm:px-6 overflow-hidden`}
      id="hero"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'hsl(220 25% 6%)' }}
      />

      {/* Mist background effect - Désactivé sur petit mobile */}
      {!isSmall && <MistEffect />}

      {/* Air particles - Réduit sur mobile */}
      <AirParticles isActive={showParticles} count={isMobileDevice ? 20 : 50} />

      {/* Animated gradient orbs - Désactivés sur mobile */}
      {!isMobileDevice && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, hsl(187 80% 50% / 0.15), transparent 60%)',
              top: '-20%',
              left: '-10%',
              filter: 'blur(60px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, hsl(200 70% 45% / 0.12), transparent 60%)',
              bottom: '-10%',
              right: '-5%',
              filter: 'blur(50px)',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -40, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      )}

      {/* Grid pattern overlay - Opacité réduite sur mobile */}
      <div
        className={`absolute inset-0 ${isMobileDevice ? 'opacity-[0.01]' : 'opacity-[0.03]'}`}
        style={{
          backgroundImage: `
            linear-gradient(hsl(187 60% 55%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(187 60% 55%) 1px, transparent 1px)
          `,
          backgroundSize: isSmall ? '80px 80px' : '60px 60px',
        }}
      />

      {/* Explosive glow effect - Réduit sur mobile */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, hsl(187 80% 60% / 0.6), transparent 70%)',
          filter: isMobileDevice ? 'blur(40px)' : 'blur(80px)',
        }}
      />

      {/* Logo container with cinematic animation */}
      <div className={`absolute inset-0 flex ${isMobileDevice ? 'items-start pt-24' : 'items-center'} justify-center z-10`}>
        <div
          ref={logoRef}
          className="flex flex-col items-center"
          style={{ color: 'hsl(200 20% 95%)' }}
        >
          <OxylifeLogo
            className={`w-auto ${isSmall ? 'h-24 sm:h-32' : 'h-40 md:h-56 lg:h-72'
              }`}
            animate={logoAnimationComplete}
          />
        </div>
      </div>

      {/* Main content with parallax - appears after logo animation */}
      <motion.div
        ref={contentRef}
        style={{ y, opacity, scale }}
        className={`relative z-20 text-center max-w-5xl mx-auto ${isMobileDevice ? 'mt-72' : 'mt-auto'} mb-16 sm:mb-20 px-4`}
      >
        {/* Floating badge - Taille adaptée mobile */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8"
          style={{
            background: 'hsl(187 60% 55% / 0.1)',
            border: '1px solid hsl(187 60% 55% / 0.3)',
          }}
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-breath"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs sm:text-sm font-outfit text-breath-light">
            Leader au Maroc en solutions respiratoires
          </span>
        </motion.div>

        {/* Main headline - Responsive typography */}
        <motion.h1
          className={`font-outfit font-bold mb-4 sm:mb-6 leading-tight ${isSmall
            ? 'text-3xl'
            : 'text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl'
            }`}
        >
          <span className="block text-foreground">Respirez</span>
          <span
            className="block"
            style={{
              background:
                'linear-gradient(135deg, hsl(187 80% 55%), hsl(200 70% 50%), hsl(170 60% 45%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            librement.
          </span>
        </motion.h1>

        {/* Subheadline - Responsive text */}
        <motion.p
          className={`text-muted-foreground font-outfit font-light mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed ${isSmall
            ? 'text-sm'
            : 'text-base sm:text-lg md:text-xl lg:text-2xl'
            }`}
        >
          Solutions innovantes contre l'apnée du sommeil. CPAP, masques
          respiratoires et expertise médicale au Maroc.
        </motion.p>

        {/* CTA Buttons - Stack sur petit mobile */}
        <motion.div
          className={`flex ${isSmall ? 'flex-col' : 'flex-col sm:flex-row'
            } gap-3 sm:gap-4 justify-center items-center`}
        >
          <Button
            size={isSmall ? 'sm' : 'lg'}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 sm:px-8 py-3 sm:py-6 text-sm sm:text-base font-outfit w-full sm:w-auto"
            onClick={() => {
              const productsSection = document.getElementById('products');
              productsSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('hero.discover')}
          </Button>

          <Button
            variant="outline"
            size={isSmall ? 'sm' : 'lg'}
            className="border-primary/50 text-foreground hover:bg-primary/10 px-6 sm:px-8 py-3 sm:py-6 text-sm sm:text-base font-outfit w-full sm:w-auto"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('hero.contact')}
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - Caché sur petit mobile */}
      {!isSmall && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={logoAnimationComplete ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-3 z-20"
        >
          <span className="text-xs font-outfit text-muted-foreground uppercase tracking-widest">
            Explorer
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
          >
            <motion.div
              className="w-1.5 h-2.5 rounded-full"
              style={{ background: 'hsl(187 60% 55%)' }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;