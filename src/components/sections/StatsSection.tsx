import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const AnimatedCounter = ({ value, suffix = '', prefix = '', duration = 2 }: AnimatedCounterProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (current) => Math.round(current));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
      spring.set(value);
    }
  }, [isInView, isVisible, spring, value]);

  useEffect(() => {
    return display.on('change', (latest) => {
      setDisplayValue(latest);
    });
  }, [display]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};

const stats = [
  {
    value: 1500000,
    displayValue: 1.5,
    suffix: 'M+',
    label: 'Patients touchés en France',
    description: 'L\'apnée du sommeil est une épidémie silencieuse',
  },
  {
    value: 80,
    suffix: '%',
    label: 'Non diagnostiqués',
    description: 'La majorité des cas restent inconnus',
  },
  {
    value: 30,
    suffix: '+',
    label: 'Arrêts respiratoires/heure',
    description: 'Dans les cas sévères d\'apnée',
  },
  {
    value: 15,
    suffix: '+',
    label: 'Années d\'expertise',
    description: 'OxyLife à votre service',
  },
];

const StatsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(220 25% 6%), hsl(220 30% 8%), hsl(220 25% 6%))',
      }}
    >
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, hsl(187 60% 55%) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        animate={{ backgroundPosition: ['0 0', '40px 40px'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Glowing orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(187 80% 50% / 0.08), transparent 50%)',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          filter: 'blur(80px)',
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold mb-6">
            <span className="text-foreground">L'apnée du sommeil </span>
            <span
              style={{
                background: 'linear-gradient(135deg, hsl(0 70% 55%), hsl(20 80% 50%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              en chiffres
            </span>
          </h2>
          <p className="text-lg text-muted-foreground font-outfit max-w-2xl mx-auto">
            Une réalité qui touche des millions de personnes chaque nuit
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6, ease: 'backOut' }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  borderColor: 'hsl(187 60% 55% / 0.5)',
                }}
                className="relative p-8 rounded-3xl text-center overflow-hidden group"
                style={{
                  background: 'linear-gradient(145deg, hsl(220 25% 12%), hsl(220 25% 9%))',
                  border: '1px solid hsl(210 20% 18%)',
                }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, hsl(187 60% 55% / 0.1), transparent 70%)',
                  }}
                />

                {/* Number */}
                <div
                  className="text-5xl md:text-6xl font-outfit font-bold mb-4 relative"
                  style={{
                    background: 'linear-gradient(135deg, hsl(187 70% 55%), hsl(200 60% 50%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.displayValue !== undefined ? (
                    <AnimatedCounter value={stat.displayValue * 10} suffix={stat.suffix} />
                  ) : (
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  )}
                </div>

                {/* Label */}
                <h3 className="text-lg font-outfit font-semibold text-foreground mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground font-outfit">
                  {stat.description}
                </p>

                {/* Decorative line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{
                    background: 'linear-gradient(90deg, transparent, hsl(187 60% 55%), transparent)',
                  }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full font-outfit font-medium text-lg"
            style={{
              background: 'transparent',
              border: '2px solid hsl(187 60% 55% / 0.5)',
              color: 'hsl(187 60% 65%)',
            }}
          >
            Faites-vous diagnostiquer →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
