import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const CTASection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-32 px-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 80% at 50% 50%, hsl(187 60% 55% / 0.15), transparent 60%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: 'hsl(187 60% 55%)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center p-12 md:p-16 rounded-[3rem] relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, hsl(220 25% 12%), hsl(220 25% 8%))',
            border: '1px solid hsl(210 20% 18%)',
          }}
        >
          {/* Inner glow */}
          <motion.div
            className="absolute inset-0 opacity-50"
            style={{
              background:
                'radial-gradient(ellipse at center, hsl(187 60% 55% / 0.1), transparent 70%)',
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              💨
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold mb-6">
              <span className="text-foreground">Prêt à </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, hsl(187 70% 55%), hsl(200 60% 50%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                mieux respirer
              </span>
              <span className="text-foreground"> ?</span>
            </h2>

            <p className="text-lg text-muted-foreground font-outfit mb-10 max-w-2xl mx-auto">
              Contactez notre équipe pour une consultation gratuite et découvrez 
              comment OxyLife peut transformer votre qualité de vie.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 60px hsl(187 60% 55% / 0.5)' }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 rounded-full font-outfit font-semibold text-lg"
                style={{
                  background: 'linear-gradient(135deg, hsl(187 70% 50%), hsl(200 60% 45%))',
                  color: 'hsl(220 30% 8%)',
                  boxShadow: '0 0 40px hsl(187 60% 55% / 0.4)',
                }}
              >
                Prendre rendez-vous
              </motion.button>

              <motion.a
                href="tel:+212600000000"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-5 rounded-full font-outfit font-medium text-lg"
                style={{
                  background: 'hsl(220 25% 15%)',
                  color: 'hsl(187 60% 65%)',
                }}
              >
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  📞
                </motion.span>
                +212 6 00 00 00 00
              </motion.a>
            </div>
          </motion.div>

          {/* Decorative corners */}
          <svg
            className="absolute top-6 left-6 w-12 h-12 opacity-30"
            viewBox="0 0 50 50"
          >
            <path
              d="M0 30 L0 0 L30 0"
              fill="none"
              stroke="hsl(187 60% 55%)"
              strokeWidth="2"
            />
          </svg>
          <svg
            className="absolute bottom-6 right-6 w-12 h-12 opacity-30"
            viewBox="0 0 50 50"
          >
            <path
              d="M50 20 L50 50 L20 50"
              fill="none"
              stroke="hsl(187 60% 55%)"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
