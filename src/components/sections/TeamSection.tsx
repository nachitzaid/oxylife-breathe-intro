import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const teamMembers = [
  {
    role: 'Technicien Installation',
    description: 'Installation et configuration de vos équipements respiratoires.',
    icon: '🔧',
  },
  {
    role: 'Technicien Maintenance',
    description: 'Entretien préventif et réparations de vos appareils.',
    icon: '🛠️',
  },
  {
    role: 'Technicien Suivi',
    description: 'Suivi personnalisé et accompagnement de votre traitement.',
    icon: '👨‍⚕️',
  },
];

const values = [
  { icon: '👂', text: 'Écoute' },
  { icon: '⏰', text: 'Disponibilité' },
  { icon: '🎓', text: 'Expertise' },
];

const TeamSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section ref={containerRef} className="py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(187 60% 55% / 0.05), transparent 60%)',
            bottom: '-20%',
            right: '-10%',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
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
            {t('team.title')}
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold mb-6">
            <span className="text-foreground">{t('team.subtitle')}</span>
          </h2>

          <p className="text-lg text-muted-foreground font-outfit max-w-2xl mx-auto">
            {t('team.description')}
          </p>
        </motion.div>

        {/* Team members grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-8 rounded-3xl text-center relative overflow-hidden group"
              style={{
                background: 'linear-gradient(145deg, hsl(220 25% 10%), hsl(220 25% 8%))',
                border: '1px solid hsl(210 20% 15%)',
              }}
            >
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at center, hsl(187 60% 55% / 0.1), transparent 70%)',
                }}
              />

              {/* Icon */}
              <motion.div
                className="text-6xl mb-4 relative z-10"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                {member.icon}
              </motion.div>

              {/* Role */}
              <h3 className="text-xl font-outfit font-semibold mb-3 text-foreground relative z-10">
                {member.role}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground font-outfit text-sm leading-relaxed relative z-10">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-outfit font-semibold mb-8 text-foreground">
            Valeurs humaines
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl"
                style={{
                  background: 'hsl(220 25% 10% / 0.5)',
                  border: '1px solid hsl(210 20% 18%)',
                }}
              >
                <motion.span
                  className="text-4xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
                >
                  {value.icon}
                </motion.span>
                <span className="text-sm font-outfit font-medium text-foreground">
                  {value.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;


