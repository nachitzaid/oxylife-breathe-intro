import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
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
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, hsl(170 60% 40% / 0.1), transparent 60%)',
            top: '40%',
            right: '20%',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
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

      {/* Main content with parallax */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center max-w-5xl mx-auto"
      >
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
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

        {/* Main headline with letter animation */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-outfit font-bold mb-6 leading-[1.1]"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.03 } },
          }}
        >
          <span className="block text-foreground">
            {'Respirez'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 50, rotateX: -90 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: { duration: 0.6, ease: 'backOut' },
                  },
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          <span className="block">
            {'librement.'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                style={{
                  background:
                    'linear-gradient(135deg, hsl(187 80% 55%), hsl(200 70% 50%), hsl(170 60% 45%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                variants={{
                  hidden: { opacity: 0, y: 50, rotateX: -90 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: { duration: 0.6, ease: 'backOut', delay: 0.3 },
                  },
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-outfit font-light mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Solutions innovantes contre l'apnée du sommeil. CPAP, masques
          respiratoires et expertise médicale au Maroc.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px hsl(187 60% 55% / 0.5)' }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-5 rounded-full font-outfit font-semibold text-lg overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(187 70% 50%), hsl(200 60% 45%))',
              color: 'hsl(220 30% 8%)',
            }}
          >
            <motion.span
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, hsl(200 60% 45%), hsl(187 70% 50%))',
              }}
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Découvrir nos solutions
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              borderColor: 'hsl(187 60% 55%)',
              boxShadow: '0 0 30px hsl(187 60% 55% / 0.2)',
            }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-5 rounded-full font-outfit font-medium text-lg transition-colors"
            style={{
              background: 'transparent',
              border: '2px solid hsl(187 60% 55% / 0.4)',
              color: 'hsl(187 60% 65%)',
            }}
          >
            Contactez-nous
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
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
