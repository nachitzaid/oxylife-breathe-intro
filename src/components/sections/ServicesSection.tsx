import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Icon components using inline SVG
const InstallIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M2 12h20M12 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4M12 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
  </svg>
);

const TrainingIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="6" r="3" />
    <path d="M12 9c-3 0-6 2-6 5v5h12v-5c0-3-3-5-6-5" />
    <path d="M4 20h16" />
  </svg>
);

const MaintenanceIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 4v4M12 16v4M20 12h-4M8 12H4M18.36 5.64l-2.83 2.83M8.47 15.53l-2.83 2.83M18.36 18.36l-2.83-2.83M8.47 8.47l-2.83-2.83" />
  </svg>
);

const RepairIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.5 2h9l1.5 3v2h-12v-2l1.5-3z" />
    <path d="M2 7h20v12H2z" />
    <path d="M6 15h12M8 11h8" />
  </svg>
);

const PackageIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const EvaluationIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const services = [
  {
    Icon: InstallIcon,
    title: 'Installation de dispositifs médicaux',
    description: 'Installation professionnelle et sécurisée de tous vos équipements respiratoires à domicile.',
    features: ['À domicile', 'Professionnel', 'Sécurisé'],
    color: 'from-blue-500 to-cyan-500',
    shadowColor: '#0891b2',
    lightColor: 'rgba(6, 182, 212, 0.1)',
  },
  {
    Icon: TrainingIcon,
    title: 'Formation des patients et des partenaires',
    description: 'Formation complète sur l\'utilisation et l\'entretien de vos équipements respiratoires.',
    features: ['Complète', 'Personnalisée', 'Suivi'],
    color: 'from-cyan-500 to-teal-500',
    shadowColor: '#14b8a6',
    lightColor: 'rgba(20, 184, 166, 0.1)',
  },
  {
    Icon: MaintenanceIcon,
    title: 'Entretien préventif des appareils',
    description: 'Maintenance régulière et préventive pour garantir le bon fonctionnement de vos équipements.',
    features: ['Régulier', 'Préventif', 'Garanti'],
    color: 'from-teal-500 to-emerald-500',
    shadowColor: '#10b981',
    lightColor: 'rgba(16, 185, 129, 0.1)',
  },
  {
    Icon: RepairIcon,
    title: 'Mise à jour / réparations',
    description: 'Mise à jour des logiciels et réparations rapides de vos équipements par nos techniciens experts.',
    features: ['Rapide', 'Expert', 'Garanti'],
    color: 'from-emerald-500 to-green-500',
    shadowColor: '#22c55e',
    lightColor: 'rgba(34, 197, 94, 0.1)',
  },
  {
    Icon: PackageIcon,
    title: 'Location et vente de dispositifs',
    description: 'Location ou achat de dispositifs médicaux respiratoires adaptés à vos besoins.',
    features: ['Location', 'Vente', 'Adapté'],
    color: 'from-green-500 to-lime-500',
    shadowColor: '#84cc16',
    lightColor: 'rgba(132, 204, 22, 0.1)',
  },
  {
    Icon: EvaluationIcon,
    title: 'Évaluation technique à domicile',
    description: 'Évaluation complète de vos besoins respiratoires directement à votre domicile.',
    features: ['À domicile', 'Complète', 'Personnalisée'],
    color: 'from-lime-500 to-yellow-500',
    shadowColor: '#eab308',
    lightColor: 'rgba(234, 179, 8, 0.1)',
  },
];

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-32 px-6 relative overflow-hidden" id="services">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(187 60% 55% / 0.05), transparent 60%)',
            top: '20%',
            right: '-10%',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
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

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold mb-6"
          >
            <span className="text-foreground">Solutions complètes </span>
            <span
              style={{
                background: 'linear-gradient(135deg, hsl(187 70% 55%), hsl(200 60% 50%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              pour votre bien-être
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground font-outfit max-w-2xl mx-auto"
          >
            De l'équipement au suivi médical, nous vous accompagnons à chaque étape de votre traitement.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.Icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{
                  y: -10,
                }}
                className="h-full p-8 rounded-3xl transition-all duration-500 group cursor-pointer relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, hsl(220 25% 10%), hsl(220 25% 8%))',
                  border: '1px solid hsl(210 20% 15%)',
                }}
                onMouseEnter={() => {
                  // Hover effect handled by whileHover
                }}
              >
                {/* Animated gradient background on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5`}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon Container with color accent */}
                <motion.div
                  className="mb-6 p-4 rounded-2xl inline-block relative"
                  style={{
                    background: service.lightColor,
                    border: `2px solid ${service.shadowColor}40`,
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotate: 10,
                  }}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.2,
                  }}
                >
                  <div style={{ color: service.shadowColor }}>
                    <Icon />
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-outfit font-semibold mb-3 text-foreground group-hover:text-[hsl(187,60%,65%)] transition-colors relative z-10">
                  {service.title}
                </h3>

                <p className="text-muted-foreground font-outfit text-sm leading-relaxed mb-6 relative z-10">
                  {service.description}
                </p>

                {/* Features with color dots */}
                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                  {service.features.map((feature, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-outfit"
                      style={{
                        background: `${service.shadowColor}20`,
                        border: `1px solid ${service.shadowColor}40`,
                        color: service.shadowColor,
                      }}
                      whileHover={{
                        scale: 1.1,
                      }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="h-0.5 w-0 rounded-full group-hover:w-full transition-all duration-300 relative z-10"
                  style={{
                    background: service.shadowColor,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;