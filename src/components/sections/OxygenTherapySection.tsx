import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const features = [
  {
    icon: '💨',
    title: 'Traitement par oxygénothérapie',
    description: 'Solutions adaptées pour l\'apnée du sommeil et les insuffisances respiratoires chroniques.',
  },
  {
    icon: '👨‍⚕️',
    title: 'Suivi personnalisé',
    description: 'Accompagnement par notre équipe technique tout au long de votre traitement.',
  },
  {
    icon: '🏠',
    title: 'À domicile',
    description: 'Tous nos services sont disponibles directement chez vous pour votre confort.',
  },
];

const OxygenTherapySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section ref={containerRef} className="py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(187 60% 55% / 0.08), transparent 60%)',
            top: '10%',
            left: '-15%',
            filter: 'blur(70px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-outfit font-medium mb-6"
            style={{
              background: 'hsl(187 60% 55% / 0.1)',
              border: '1px solid hsl(187 60% 55% / 0.2)',
              color: 'hsl(187 60% 60%)',
            }}
          >
            {t('oxygen.title')}
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold mb-6">
            <span className="text-foreground">{t('oxygen.subtitle')}</span>
          </h2>

          <p className="text-lg text-muted-foreground font-outfit max-w-3xl mx-auto">
            {t('oxygen.description')}
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-8 rounded-3xl text-center"
              style={{
                background: 'linear-gradient(145deg, hsl(220 25% 10%), hsl(220 25% 8%))',
                border: '1px solid hsl(210 20% 15%)',
              }}
            >
              <motion.div
                className="text-5xl mb-4"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-outfit font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-outfit text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Slider/Animation area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, hsl(220 25% 10%), hsl(220 25% 8%))',
            border: '1px solid hsl(210 20% 18%)',
            minHeight: '400px',
          }}
        >
          {/* Animated background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center, hsl(187 60% 55% / 0.1), transparent 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 p-12 md:p-16 flex flex-col items-center justify-center text-center">
            {/* Icon animations */}
            <div className="flex gap-8 mb-8">
              {['💨', '🌬️', '💨'].map((icon, i) => (
                <motion.div
                  key={i}
                  className="text-4xl"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeInOut',
                  }}
                >
                  {icon}
                </motion.div>
              ))}
            </div>

            <h3 className="text-2xl md:text-3xl font-outfit font-bold mb-4">
              <span className="text-foreground">Solutions </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, hsl(187 70% 55%), hsl(200 60% 50%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                respiratoires
              </span>
            </h3>

            <p className="text-muted-foreground font-outfit max-w-2xl">
              Notre équipe technique vous accompagne dans votre traitement avec des solutions 
              adaptées à vos besoins spécifiques.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OxygenTherapySection;


