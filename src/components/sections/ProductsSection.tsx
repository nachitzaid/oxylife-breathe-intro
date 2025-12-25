import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import MagneticCursor from '@/components/ui/MagneticCursor';
import ScrollReveal from '@/components/ui/ScrollReveal';
import WordReveal from '@/components/ui/WordReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useParallax } from '@/hooks/useScrollReveal';

const products = [
  {
    id: 'oxygene-liquide',
    title: 'Oxygène Liquide',
    description: 'Solutions d\'oxygénothérapie liquide pour un traitement efficace à domicile.',
    image: '💨',
    gradient: 'from-blue-500 to-cyan-500',
    link: '/oxygene-liquide',
  },
  {
    id: 'concentrateur-doxygene',
    title: 'Concentrateur d\'Oxygène',
    description: 'Concentrateurs d\'oxygène portables et fixes pour une autonomie maximale.',
    image: '🔬',
    gradient: 'from-cyan-500 to-teal-500',
    link: '/concentrateur-doxygene',
  },
  {
    id: 'ppc',
    title: 'Les PPC',
    description: 'Appareils de pression positive continue pour le traitement de l\'apnée du sommeil.',
    image: '🌙',
    gradient: 'from-teal-500 to-emerald-500',
    link: '/les-ppc',
  },
  {
    id: 'vni',
    title: 'VNI',
    description: 'Ventilation non invasive pour les patients en insuffisance respiratoire.',
    image: '💊',
    gradient: 'from-emerald-500 to-green-500',
    link: '/vni',
  },
  {
    id: 'masques-respiratoires',
    title: 'Masques Respiratoires',
    description: 'Large gamme de masques adaptés à tous les besoins et morphologies.',
    image: '😷',
    gradient: 'from-green-500 to-lime-500',
    link: '/les-masques-respiratoires',
  },
  {
    id: 'autres-produits',
    title: 'Autres Produits',
    description: 'Accessoires et équipements complémentaires pour votre traitement.',
    image: '📦',
    gradient: 'from-lime-500 to-yellow-500',
    link: '/autres-produits',
  },
];

const ProductsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { t } = useLanguage();
  const { y: parallaxY } = useParallax(0.2);

  return (
    <section ref={containerRef} className="py-32 px-6 relative overflow-hidden" id="products">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(187 60% 55% / 0.08), transparent 60%)',
            top: '-20%',
            left: '-10%',
            filter: 'blur(60px)',
            y: parallaxY,
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
          <ScrollReveal direction="scale" delay={0.1}>
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-outfit font-medium mb-6"
              style={{
                background: 'hsl(187 60% 55% / 0.1)',
                border: '1px solid hsl(187 60% 55% / 0.2)',
                color: 'hsl(187 60% 60%)',
              }}
            >
              {t('products.title')}
            </motion.span>
          </ScrollReveal>

          <WordReveal
            text={t('products.subtitle')}
            className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold mb-6 block"
            stagger={0.06}
          />

          <ScrollReveal direction="fade" delay={0.3}>
            <p className="text-lg text-muted-foreground font-outfit max-w-2xl mx-auto">
              Des solutions innovantes pour tous vos besoins en soins respiratoires.
            </p>
          </ScrollReveal>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ScrollReveal
              key={product.id}
              direction="up"
              delay={index * 0.1}
            >
              <MagneticCursor strength={0.2}>
                <Link to={product.link}>
                  <motion.div
                    className="h-full p-8 rounded-3xl transition-all duration-500 group cursor-pointer relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(145deg, hsl(220 25% 10%), hsl(220 25% 8%))',
                      border: '1px solid hsl(210 20% 15%)',
                    }}
                    whileHover={{
                      y: -10,
                      boxShadow: '0 30px 60px hsl(187 60% 55% / 0.2)',
                      borderColor: 'hsl(187 60% 55%)',
                    }}
                  >
                    {/* Gradient overlay on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10`}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Icon */}
                    <motion.div
                      className="text-6xl mb-6 relative z-10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.3,
                        ease: 'easeInOut',
                        type: 'spring',
                        stiffness: 300,
                      }}
                    >
                      {product.image}
                    </motion.div>

                    {/* Title */}
                    <WordReveal
                      text={product.title}
                      className="text-xl font-outfit font-semibold mb-3 text-foreground group-hover:text-[hsl(187,60%,65%)] transition-colors block relative z-10"
                      stagger={0.03}
                    />

                    {/* Description */}
                    <ScrollReveal direction="fade" delay={0.2}>
                      <p className="text-muted-foreground font-outfit text-sm leading-relaxed mb-6 relative z-10">
                        {product.description}
                      </p>
                    </ScrollReveal>

                    {/* Arrow */}
                    <motion.div
                      className="flex items-center gap-2 text-[hsl(187,60%,55%)] relative z-10"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm font-outfit font-medium">Découvrir</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.div>

                    {/* Hover line */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
                      style={{ background: 'hsl(187 60% 55% / 0.3)' }}
                      initial={{ scaleX: 0, originX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              </MagneticCursor>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
