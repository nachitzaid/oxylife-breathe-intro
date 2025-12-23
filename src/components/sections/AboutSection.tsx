import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: '🏥',
    title: 'Expertise Médicale',
    description: 'Équipe de techniciens qualifiés et formés aux dernières technologies respiratoires.',
  },
  {
    icon: '🏠',
    title: 'Service à Domicile',
    description: 'Installation, formation et suivi directement chez vous pour votre confort.',
  },
  {
    icon: '📞',
    title: 'Disponibilité 24/7',
    description: 'Support technique disponible à tout moment pour répondre à vos besoins.',
  },
  {
    icon: '🤝',
    title: 'Partenariats Médicaux',
    description: 'Collaboration étroite avec médecins, cliniques et hôpitaux au Maroc.',
  },
];

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    <section ref={containerRef} className="py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(187 60% 55% / 0.03), transparent 50%)',
            bottom: '-30%',
            left: '-20%',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              style={{ y: imageY }}
              className="relative rounded-3xl overflow-hidden"
            >
              {/* Placeholder visual - abstract lungs visualization */}
              <div
                className="aspect-square rounded-3xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, hsl(220 25% 10%), hsl(220 25% 8%))',
                  border: '1px solid hsl(210 20% 15%)',
                }}
              >
                {/* Animated breathing visualization */}
                <svg viewBox="0 0 200 200" className="w-3/4 h-3/4">
                  <defs>
                    <linearGradient id="about-lung-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(187, 70%, 55%)" />
                      <stop offset="100%" stopColor="hsl(200, 60%, 45%)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Left lung */}
                  <motion.path
                    d="M70 50 C40 60, 30 90, 35 120 C40 145, 55 155, 70 150 C82 147, 85 135, 85 120 L85 60 C85 52, 78 48, 70 50Z"
                    fill="none"
                    stroke="url(#about-lung-grad)"
                    strokeWidth="2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: 'center' }}
                  />
                  
                  {/* Right lung */}
                  <motion.path
                    d="M130 50 C160 60, 170 90, 165 120 C160 145, 145 155, 130 150 C118 147, 115 135, 115 120 L115 60 C115 52, 122 48, 130 50Z"
                    fill="none"
                    stroke="url(#about-lung-grad)"
                    strokeWidth="2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                    style={{ transformOrigin: 'center' }}
                  />
                  
                  {/* Trachea */}
                  <motion.path
                    d="M100 25 L100 55 C100 60, 85 60, 85 55 M100 55 C100 60, 115 60, 115 55"
                    fill="none"
                    stroke="url(#about-lung-grad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  
                  {/* Air flow particles */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.circle
                      key={i}
                      r="3"
                      fill="hsl(187 70% 55%)"
                      opacity={0.6}
                      animate={{
                        cy: [20, 100],
                        cx: [100, i < 2 ? 60 + i * 10 : 130 + (i - 2) * 10],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                </svg>

                {/* Decorative rings */}
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: `${40 + i * 20}%`,
                      height: `${40 + i * 20}%`,
                      border: '1px solid hsl(187 60% 55% / 0.1)',
                    }}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear' }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -right-6 p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, hsl(187 70% 50%), hsl(200 60% 45%))',
                boxShadow: '0 20px 40px hsl(187 60% 55% / 0.3)',
              }}
            >
              <div className="text-3xl font-outfit font-bold text-background">15+</div>
              <div className="text-sm font-outfit text-background/80">Années d'expertise</div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-outfit font-medium mb-6"
              style={{
                background: 'hsl(187 60% 55% / 0.1)',
                border: '1px solid hsl(187 60% 55% / 0.2)',
                color: 'hsl(187 60% 60%)',
              }}
            >
              Qui sommes-nous
            </motion.span>

            <h2 className="text-4xl md:text-5xl font-outfit font-bold mb-6 leading-tight">
              <span className="text-foreground">Votre partenaire </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, hsl(187 70% 55%), hsl(200 60% 50%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                santé respiratoire
              </span>
            </h2>

            <p className="text-lg text-muted-foreground font-outfit mb-10 leading-relaxed">
              OxyLife est une entreprise marocaine spécialisée dans les soins respiratoires à domicile. 
              Notre mission : améliorer la qualité de vie des patients souffrant de maladies 
              respiratoires chroniques avec des solutions innovantes et un accompagnement personnalisé.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  whileHover={{ x: 10 }}
                  className="flex gap-4 p-4 rounded-xl transition-colors cursor-pointer"
                  style={{ background: 'hsl(220 25% 10% / 0.5)' }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <h3 className="font-outfit font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-outfit">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
