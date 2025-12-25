import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const contactInfo = [
  {
    type: 'emergency',
    label: 'Urgence',
    phone: '+212 6 00 00 00 00',
    icon: '🚨',
  },
  {
    type: 'secretariat',
    label: 'Secrétariat',
    phone: '+212 5 22 00 00 00',
    icon: '📞',
  },
  {
    type: 'general',
    label: 'Contact général',
    phone: '+212 5 22 00 00 01',
    email: 'contact@oxylife.ma',
    icon: '✉️',
  },
];

const hours = [
  { day: 'Lundi - Vendredi', time: '8h00 - 18h00' },
  { day: 'Samedi', time: '9h00 - 13h00' },
  { day: 'Dimanche', time: 'Fermé' },
];

const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section ref={containerRef} className="py-32 px-6 relative overflow-hidden" id="contact">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(187 60% 55% / 0.06), transparent 60%)',
            top: '-30%',
            left: '50%',
            transform: 'translateX(-50%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
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
            {t('contact.title')}
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold mb-6">
            <span className="text-foreground">{t('contact.subtitle')}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            {/* Contact cards */}
            {contactInfo.map((contact, index) => (
              <motion.div
                key={contact.type}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="p-6 rounded-2xl"
                style={{
                  background: 'linear-gradient(145deg, hsl(220 25% 10%), hsl(220 25% 8%))',
                  border: '1px solid hsl(210 20% 15%)',
                }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="text-3xl"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {contact.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-outfit font-semibold text-foreground mb-2">
                      {contact.label}
                    </h3>
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className="text-breath-light font-outfit hover:underline block mb-1"
                    >
                      {contact.phone}
                    </a>
                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-muted-foreground font-outfit hover:text-breath-light transition-colors text-sm"
                      >
                        {contact.email}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(145deg, hsl(220 25% 10%), hsl(220 25% 8%))',
                border: '1px solid hsl(210 20% 15%)',
              }}
            >
              <h3 className="font-outfit font-semibold text-foreground mb-4">
                {t('contact.hours')}
              </h3>
              <div className="space-y-2">
                {hours.map((hour, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm font-outfit"
                  >
                    <span className="text-muted-foreground">{hour.day}</span>
                    <span className="text-foreground">{hour.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex gap-4"
            >
              {['📘', '📸', '💼', '🐦'].map((icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                  style={{
                    background: 'hsl(220 25% 12%)',
                    border: '1px solid hsl(210 20% 18%)',
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, hsl(220 25% 10%), hsl(220 25% 8%))',
              border: '1px solid hsl(210 20% 15%)',
              minHeight: '500px',
            }}
          >
            {/* Map placeholder with animated pin */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  📍
                </motion.div>
                <p className="text-muted-foreground font-outfit">
                  Carte interactive
                </p>
                <p className="text-sm text-muted-foreground font-outfit mt-2">
                  Adresse complète à afficher
                </p>
              </div>
            </div>

            {/* Pulsing circles */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: `${60 + i * 40}px`,
                  height: `${60 + i * 40}px`,
                  border: `2px solid hsl(187 60% 55% / ${0.3 - i * 0.1})`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;


