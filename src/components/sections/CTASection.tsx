import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// ============ DÉTECTION MOBILE ============
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

const isSmallMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 640;
};

const CTASection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

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

  // ============ NOMBRE DE PARTICULES ADAPTÉ ============
  const particleCount = isMobileDevice ? 8 : 20;

  return (
    <section 
      ref={containerRef} 
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Animated background - Simplifié sur mobile */}
      <div className="absolute inset-0">
        {/* Background glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: isMobileDevice
              ? 'radial-gradient(ellipse 120% 100% at 50% 50%, hsl(187 60% 55% / 0.08), transparent 60%)'
              : 'radial-gradient(ellipse 100% 80% at 50% 50%, hsl(187 60% 55% / 0.15), transparent 60%)',
          }}
          animate={{
            scale: isMobileDevice ? [1, 1.05, 1] : [1, 1.1, 1],
            opacity: isMobileDevice ? [0.4, 0.6, 0.4] : [0.5, 0.8, 0.5],
          }}
          transition={{ 
            duration: isMobileDevice ? 10 : 8,
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        />

        {/* Floating particles - Réduits sur mobile */}
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
            style={{
              background: 'hsl(187 60% 55%)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: isMobileDevice ? [0, -15, 0] : [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: isMobileDevice 
                ? 3 + Math.random() * 2 
                : 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`text-center relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[3rem]`}
          style={{
            background: 'linear-gradient(145deg, hsl(220 25% 12%), hsl(220 25% 8%))',
            border: '1px solid hsl(210 20% 18%)',
            padding: isSmall ? '24px 16px' : 'var(--padding)',
          }}
          onAnimationStart={() => {
            if (!isSmall) {
              const style = (document.querySelector('[style*="padding"]') as HTMLElement)?.style;
              if (style) style.setProperty('--padding', '48px 48px');
            }
          }}
        >
          {/* Inner glow - Réduit sur mobile */}
          <motion.div
            className="absolute inset-0 opacity-50"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(187 60% 55% / 0.1), transparent 70%)',
            }}
            animate={{ 
              scale: isMobileDevice ? [1, 1.1, 1] : [1, 1.2, 1]
            }}
            transition={{ 
              duration: isMobileDevice ? 6 : 4,
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="relative z-10"
          >
            {/* Emoji - Taille adaptée */}
            <motion.div
              animate={{ 
                scale: isMobileDevice 
                  ? [1, 1.08, 1] 
                  : [1, 1.1, 1]
              }}
              transition={{ 
                duration: isMobileDevice ? 5 : 4,
                repeat: Infinity 
              }}
              className={isMobileDevice ? 'text-4xl sm:text-5xl' : 'text-6xl'}
            >
              👨‍⚕️
            </motion.div>

            {/* Heading - Responsive typography */}
            <h2 className={`font-outfit font-bold mb-4 sm:mb-6 leading-tight ${
              isSmall 
                ? 'text-2xl sm:text-3xl' 
                : 'text-3xl sm:text-4xl md:text-5xl'
            }`}>
              <span className="text-foreground">Prêt à </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, hsl(187 70% 55%), hsl(200 60% 50%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                mieux respirer
              </span>
              <span className="text-foreground"> ?</span>
            </h2>

            {/* Subheading - Responsive text */}
            <p className={`text-muted-foreground font-outfit mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed ${
              isSmall 
                ? 'text-xs sm:text-sm' 
                : 'text-sm sm:text-base md:text-lg'
            }`}>
              Contactez notre équipe pour une consultation gratuite et découvrez 
              comment OxyLife peut transformer votre qualité de vie.
            </p>

            {/* CTA Buttons - Stack sur petit mobile */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className={`flex ${
                isSmall ? 'flex-col' : 'flex-col sm:flex-row'
              } gap-3 sm:gap-4 justify-center items-center`}
            >
              {/* Appointment Button */}
              <Button
                size={isSmall ? 'sm' : 'lg'}
                className={`bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-outfit font-semibold rounded-full shadow-lg shadow-primary/30 transition-all active:scale-95 ${
                  isSmall 
                    ? 'px-6 py-2.5 text-sm w-full' 
                    : 'px-8 sm:px-10 py-3 sm:py-6 text-sm sm:text-lg w-full sm:w-auto'
                }`}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Prendre rendez-vous
              </Button>

              {/* Phone Button */}
              <Button
                variant="outline"
                size={isSmall ? 'sm' : 'lg'}
                className={`border-primary/50 text-foreground hover:bg-primary/10 font-outfit font-medium rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 sm:gap-3 ${
                  isSmall 
                    ? 'px-6 py-2.5 text-sm w-full' 
                    : 'px-6 sm:px-8 py-3 sm:py-6 text-sm sm:text-lg w-full sm:w-auto'
                }`}
                asChild
              >
                <a href="tel:+212600000000" className="flex items-center justify-center gap-2 sm:gap-3">
                  <motion.span
                    animate={{ 
                      rotate: isMobileDevice 
                        ? [0, 10, -10, 0] 
                        : [0, 15, -15, 0] 
                    }}
                    transition={{ 
                      duration: isMobileDevice ? 0.6 : 0.5,
                      repeat: Infinity, 
                      repeatDelay: 2 
                    }}
                  >
                    📞
                  </motion.span>
                  <span className={isSmall ? 'text-xs sm:text-sm' : ''}>
                    +212 6 00 00 00 00
                  </span>
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Decorative corners - Cachés sur petit mobile */}
          {!isSmall && (
            <>
              <motion.svg
                className="absolute top-4 sm:top-6 left-4 sm:left-6 w-8 h-8 sm:w-12 sm:h-12 opacity-30"
                viewBox="0 0 50 50"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 0.3, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <path
                  d="M0 30 L0 0 L30 0"
                  fill="none"
                  stroke="hsl(187 60% 55%)"
                  strokeWidth="2"
                />
              </motion.svg>
              <motion.svg
                className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 opacity-30"
                viewBox="0 0 50 50"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 0.3, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <path
                  d="M50 20 L50 50 L20 50"
                  fill="none"
                  stroke="hsl(187 60% 55%)"
                  strokeWidth="2"
                />
              </motion.svg>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;