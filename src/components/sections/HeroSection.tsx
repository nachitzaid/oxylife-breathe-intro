import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import MistEffect from '@/components/intro/MistEffect';
import AirParticles from '@/components/intro/AirParticles';
import OxylifeLogo from '@/components/ui/OxylifeLogo';
import { useLanguage } from '@/contexts/LanguageContext';
import gsap from 'gsap';

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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    if (!isInView || !logoRef.current || !glowRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setLogoAnimationComplete(true);
      },
    });

    // Initial setup - Logo starts from above screen, rotated, scaled down
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
      y: 50,
    });

    // Phase 1: Logo falls from sky with rotation (0-0.6s)
    tl.to(logoRef.current, {
      y: 0,
      rotation: 0,
      scale: 1.2,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.6,
      ease: 'power4.out',
    })
    // Phase 2: Big bounce impact (0.6-0.8s)
    .to(logoRef.current, {
      y: -80,
      scale: 1.3,
      rotation: 15,
      duration: 0.15,
      ease: 'power2.out',
    })
    .to(logoRef.current, {
      y: 20,
      scale: 0.95,
      rotation: -10,
      duration: 0.2,
      ease: 'bounce.out',
    })
    // Phase 3: Multiple small bounces (0.8-1.2s)
    .to(logoRef.current, {
      y: -15,
      scale: 1.05,
      rotation: 5,
      duration: 0.15,
      ease: 'power2.out',
    })
    .to(logoRef.current, {
      y: 5,
      scale: 0.98,
      rotation: -3,
      duration: 0.15,
      ease: 'bounce.out',
    })
    .to(logoRef.current, {
      y: -3,
      scale: 1.01,
      rotation: 1,
      duration: 0.1,
      ease: 'power2.out',
    })
    // Phase 4: Settle to center with final rotation (1.2-1.5s)
    .to(logoRef.current, {
      y: 0,
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: 'elastic.out(1, 0.5)',
    })
    // Phase 5: Explosive glow effect (1.5-1.8s)
    .to(glowRef.current, {
      scale: 3,
      opacity: 0.8,
      duration: 0.2,
      ease: 'power2.out',
    })
    .to(glowRef.current, {
      scale: 4,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    })
    // Phase 6: Logo pulse and particles appear (1.8-2.2s)
    .to(logoRef.current, {
      scale: 1.15,
      filter: 'brightness(1.5) drop-shadow(0 0 60px rgba(80, 190, 204, 0.8))',
      duration: 0.2,
      ease: 'power2.out',
    })
    .call(() => setShowParticles(true))
    .to(logoRef.current, {
      scale: 1,
      filter: 'brightness(1) drop-shadow(0 0 40px rgba(80, 190, 204, 0.6))',
      duration: 0.2,
      ease: 'power2.in',
    })
    // Phase 7: Content fades in (2.2-2.8s)
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.2');

    return () => {
      tl.kill();
    };
  }, [isInView]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      id="hero"
    >
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: 'hsl(220 25% 6%)' }}
      />

      {/* Mist background effect */}
      <MistEffect />

      {/* Air particles */}
      <AirParticles isActive={showParticles} count={50} />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
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
          className="absolute w-[600px] h-[600px] rounded-full"
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

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(187 60% 55%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(187 60% 55%) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Explosive glow effect */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, hsl(187 80% 60% / 0.6), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Logo container with cinematic animation */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div
          ref={logoRef}
          className="flex flex-col items-center"
          style={{ color: 'hsl(200 20% 95%)' }}
        >
          <OxylifeLogo 
            className="h-40 md:h-56 lg:h-72 w-auto" 
            animate={logoAnimationComplete}
          />
        </div>
      </div>

      {/* Main content with parallax - appears after logo animation */}
      <motion.div
        ref={contentRef}
        style={{ y, opacity, scale }}
        className="relative z-20 text-center max-w-5xl mx-auto mt-auto mb-20"
      >
        {/* Floating badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
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
          <span className="text-sm font-outfit text-breath-light">
            Leader au Maroc en solutions respiratoires
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-outfit font-bold mb-6 leading-[1.1]"
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

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-outfit font-light mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Solutions innovantes contre l'apnée du sommeil. CPAP, masques
          respiratoires et expertise médicale au Maroc.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-outfit"
            onClick={() => {
              const productsSection = document.getElementById('products');
              productsSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('hero.discover')}
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-primary/50 text-foreground hover:bg-primary/10 px-8 py-6 text-base font-outfit"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('hero.contact')}
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={logoAnimationComplete ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
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
    </section>
  );
};

export default HeroSection;
