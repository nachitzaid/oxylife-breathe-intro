import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MagneticCursor from '@/components/ui/MagneticCursor';
import { useLanguage } from '@/contexts/LanguageContext';
import ScrollReveal from '@/components/ui/ScrollReveal';
import WordReveal from '@/components/ui/WordReveal';
import { useParallax } from '@/hooks/useScrollReveal';

const services = [
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <defs>
          <linearGradient id="install-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(187, 70%, 55%)" />
            <stop offset="100%" stopColor="hsl(200, 60%, 45%)" />
          </linearGradient>
        </defs>
        <rect x="12" y="20" width="40" height="32" rx="4" fill="none" stroke="url(#install-grad)" strokeWidth="2" />
        <path d="M20 28 L28 20 L36 28 M28 20 L28 40" stroke="url(#install-grad)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="44" cy="36" r="4" fill="url(#install-grad)" opacity="0.5" />
      </svg>
    ),
    title: 'Installation de dispositifs médicaux',
    description: 'Installation professionnelle et sécurisée de tous vos équipements respiratoires à domicile.',
    features: ['À domicile', 'Professionnel', 'Sécurisé'],
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <defs>
          <linearGradient id="training-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(187, 70%, 55%)" />
            <stop offset="100%" stopColor="hsl(200, 60%, 45%)" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="28" r="12" fill="none" stroke="url(#training-grad)" strokeWidth="2" />
        <path d="M20 40 L32 48 L44 40" stroke="url(#training-grad)" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 52 L32 48 L40 52" stroke="url(#training-grad)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Formation des patients et des partenaires',
    description: 'Formation complète sur l\'utilisation et l\'entretien de vos équipements respiratoires.',
    features: ['Complète', 'Personnalisée', 'Suivi'],
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <defs>
          <linearGradient id="maintenance-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(187, 70%, 55%)" />
            <stop offset="100%" stopColor="hsl(200, 60%, 45%)" />
          </linearGradient>
        </defs>
        <rect x="16" y="18" width="32" height="28" rx="3" fill="none" stroke="url(#maintenance-grad)" strokeWidth="2" />
        <circle cx="32" cy="32" r="6" fill="none" stroke="url(#maintenance-grad)" strokeWidth="2" />
        <path d="M26 32 L30 36 L38 26" stroke="url(#maintenance-grad)" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 50 L44 50" stroke="url(#maintenance-grad)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Entretien préventif des appareils',
    description: 'Maintenance régulière et préventive pour garantir le bon fonctionnement de vos équipements.',
    features: ['Régulier', 'Préventif', 'Garanti'],
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <defs>
          <linearGradient id="repair-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(187, 70%, 55%)" />
            <stop offset="100%" stopColor="hsl(200, 60%, 45%)" />
          </linearGradient>
        </defs>
        <rect x="14" y="20" width="36" height="24" rx="3" fill="none" stroke="url(#repair-grad)" strokeWidth="2" />
        <path d="M20 28 L28 20 L36 28" stroke="url(#repair-grad)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="44" cy="32" r="3" fill="url(#repair-grad)" />
        <path d="M18 48 L46 48" stroke="url(#repair-grad)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Mise à jour / réparations',
    description: 'Mise à jour des logiciels et réparations rapides de vos équipements par nos techniciens experts.',
    features: ['Rapide', 'Expert', 'Garanti'],
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <defs>
          <linearGradient id="rental-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(187, 70%, 55%)" />
            <stop offset="100%" stopColor="hsl(200, 60%, 45%)" />
          </linearGradient>
        </defs>
        <rect x="12" y="16" width="40" height="32" rx="4" fill="none" stroke="url(#rental-grad)" strokeWidth="2" />
        <path d="M20 24 L32 16 L44 24" stroke="url(#rental-grad)" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 24 L20 40 L44 40 L44 24" stroke="url(#rental-grad)" strokeWidth="2" />
        <circle cx="32" cy="32" r="4" fill="url(#rental-grad)" opacity="0.5" />
      </svg>
    ),
    title: 'Location et vente de dispositifs',
    description: 'Location ou achat de dispositifs médicaux respiratoires adaptés à vos besoins.',
    features: ['Location', 'Vente', 'Adapté'],
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <defs>
          <linearGradient id="eval-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(187, 70%, 55%)" />
            <stop offset="100%" stopColor="hsl(200, 60%, 45%)" />
          </linearGradient>
        </defs>
        <rect x="16" y="18" width="32" height="28" rx="3" fill="none" stroke="url(#eval-grad)" strokeWidth="2" />
        <path d="M24 28 L28 32 L32 28 L36 32 L40 28" stroke="url(#eval-grad)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="40" r="2" fill="url(#eval-grad)" />
        <path d="M20 50 L44 50" stroke="url(#eval-grad)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Évaluation technique à domicile',
    description: 'Évaluation complète de vos besoins respiratoires directement à votre domicile.',
    features: ['À domicile', 'Complète', 'Personnalisée'],
  },
];

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { t } = useLanguage();
  const { y: parallaxY } = useParallax(0.3);

  return (
    <section ref={containerRef} className="py-32 px-6 relative overflow-hidden" id="services">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, hsl(187 60% 55% / 0.3), transparent)',
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(187 60% 55% / 0.05), transparent 60%)',
            top: '20%',
            right: '-10%',
            filter: 'blur(60px)',
            y: parallaxY,
          }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <ScrollReveal direction="scale" delay={0.1}>
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-outfit font-medium mb-6"
              style={{
                background: 'hsl(187 60% 55% / 0.1)',
                border: '1px solid hsl(187 60% 55% / 0.2)',
                color: 'hsl(187 60% 60%)',
              }}
            >
              {t('services.title')}
            </motion.span>
          </ScrollReveal>

          <WordReveal
            text={t('services.subtitle')}
            className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold mb-6 block"
            stagger={0.06}
          />

          <ScrollReveal direction="fade" delay={0.3}>
            <p className="text-lg text-muted-foreground font-outfit max-w-2xl mx-auto">
              De l'équipement au suivi médical, nous vous accompagnons à chaque étape de votre traitement.
            </p>
          </ScrollReveal>
        </div>

        {/* Services grid with variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollReveal
              key={index}
              direction="up"
              delay={index * 0.1}
            >
              <MagneticCursor strength={0.15}>
                <motion.div
                  whileHover={{
                    y: -10,
                    boxShadow: '0 30px 60px hsl(187 60% 55% / 0.15)',
                  }}
                  className="h-full p-8 rounded-3xl transition-all duration-500 group cursor-pointer"
                  style={{
                    background: 'linear-gradient(145deg, hsl(220 25% 10%), hsl(220 25% 8%))',
                    border: '1px solid hsl(210 20% 15%)',
                  }}
                >
                  {/* Icon with breathing animation */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="mb-6 p-4 rounded-2xl inline-block"
                    style={{
                      background: 'hsl(187 60% 55% / 0.1)',
                      border: '1px solid hsl(187 60% 55% / 0.2)',
                    }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Title */}
                  <WordReveal
                    text={service.title}
                    className="text-xl font-outfit font-semibold mb-3 text-foreground group-hover:text-breath-light transition-colors block"
                    stagger={0.03}
                  />

                  {/* Description */}
                  <ScrollReveal direction="fade" delay={0.2}>
                    <p className="text-muted-foreground font-outfit text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </ScrollReveal>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, i) => (
                      <ScrollReveal
                        key={i}
                        direction="scale"
                        delay={0.3 + i * 0.1}
                      >
                        <motion.span
                          className="px-3 py-1 rounded-full text-xs font-outfit"
                          style={{
                            background: 'hsl(220 25% 15%)',
                            color: 'hsl(187 60% 65%)',
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {feature}
                        </motion.span>
                      </ScrollReveal>
                    ))}
                  </div>

                  {/* Hover line */}
                  <motion.div
                    className="mt-6 h-0.5 rounded-full"
                    style={{ background: 'hsl(187 60% 55% / 0.3)' }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </MagneticCursor>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
