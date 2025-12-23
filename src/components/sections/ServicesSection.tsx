import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <defs>
          <linearGradient id="cpap-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(187, 70%, 55%)" />
            <stop offset="100%" stopColor="hsl(200, 60%, 45%)" />
          </linearGradient>
        </defs>
        <rect x="8" y="20" width="48" height="32" rx="6" fill="none" stroke="url(#cpap-grad)" strokeWidth="2" />
        <circle cx="20" cy="36" r="6" fill="none" stroke="url(#cpap-grad)" strokeWidth="2" />
        <path d="M28 36 H48" stroke="url(#cpap-grad)" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 10 C32 10, 20 16, 20 20" stroke="url(#cpap-grad)" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    ),
    title: 'Appareils CPAP',
    description:
      'Machines à pression positive continue de dernière génération pour un traitement efficace de l\'apnée du sommeil.',
    features: ['Silencieux', 'Connectés', 'Automatiques'],
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <defs>
          <linearGradient id="mask-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(187, 70%, 55%)" />
            <stop offset="100%" stopColor="hsl(200, 60%, 45%)" />
          </linearGradient>
        </defs>
        <ellipse cx="32" cy="38" rx="20" ry="16" fill="none" stroke="url(#mask-grad)" strokeWidth="2" />
        <path d="M20 30 Q32 24, 44 30" fill="none" stroke="url(#mask-grad)" strokeWidth="2" />
        <circle cx="26" cy="34" r="3" fill="url(#mask-grad)" />
        <circle cx="38" cy="34" r="3" fill="url(#mask-grad)" />
        <path d="M12 38 L6 32 M52 38 L58 32" stroke="url(#mask-grad)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Masques Respiratoires',
    description:
      'Large gamme de masques nasaux, faciaux et narinaires pour un confort optimal durant le sommeil.',
    features: ['Confortables', 'Ajustables', 'Hypoallergéniques'],
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <defs>
          <linearGradient id="oxy-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(187, 70%, 55%)" />
            <stop offset="100%" stopColor="hsl(200, 60%, 45%)" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="20" fill="none" stroke="url(#oxy-grad)" strokeWidth="2" />
        <text x="22" y="38" fontSize="16" fill="url(#oxy-grad)" fontFamily="Arial" fontWeight="bold">O₂</text>
        <path d="M32 8 V14 M32 50 V56 M8 32 H14 M50 32 H56" stroke="url(#oxy-grad)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Oxygénothérapie',
    description:
      'Solutions d\'oxygénothérapie à domicile pour les patients souffrant d\'insuffisance respiratoire chronique.',
    features: ['Portable', 'Sécurisé', 'Surveillance'],
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <defs>
          <linearGradient id="diag-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(187, 70%, 55%)" />
            <stop offset="100%" stopColor="hsl(200, 60%, 45%)" />
          </linearGradient>
        </defs>
        <rect x="12" y="16" width="40" height="32" rx="4" fill="none" stroke="url(#diag-grad)" strokeWidth="2" />
        <path d="M12 28 L20 28 L24 20 L28 36 L32 24 L36 32 L40 28 L52 28" fill="none" stroke="url(#diag-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="54" r="2" fill="url(#diag-grad)" />
      </svg>
    ),
    title: 'Diagnostic & Suivi',
    description:
      'Tests de sommeil à domicile et suivi personnalisé par notre équipe de techniciens qualifiés.',
    features: ['À domicile', 'Précis', 'Personnalisé'],
  },
];

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-32 px-6 relative overflow-hidden">
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
          }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
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
            Nos Services
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold mb-6">
            <span className="text-foreground">Solutions </span>
            <span
              style={{
                background: 'linear-gradient(135deg, hsl(187 70% 55%), hsl(200 60% 50%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              complètes
            </span>
          </h2>

          <p className="text-lg text-muted-foreground font-outfit max-w-2xl mx-auto">
            De l'équipement au suivi médical, nous vous accompagnons à chaque étape de votre traitement.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index + 0.3, duration: 0.6 }}
            >
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
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mb-6 p-4 rounded-2xl inline-block"
                  style={{
                    background: 'hsl(187 60% 55% / 0.1)',
                    border: '1px solid hsl(187 60% 55% / 0.2)',
                  }}
                >
                  {service.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-outfit font-semibold mb-3 text-foreground group-hover:text-breath-light transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground font-outfit text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.1 * index + 0.5 + i * 0.1 }}
                      className="px-3 py-1 rounded-full text-xs font-outfit"
                      style={{
                        background: 'hsl(220 25% 15%)',
                        color: 'hsl(187 60% 65%)',
                      }}
                    >
                      {feature}
                    </motion.span>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
