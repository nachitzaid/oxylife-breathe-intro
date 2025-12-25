import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import MagneticButton from '@/components/ui/MagneticButton';

const productData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  features: string[];
  specifications: { label: string; value: string }[];
  benefits: string[];
  images: string[];
  gradient: string;
  icon: string;
}> = {
  'oxygene-liquide': {
    title: 'Oxygène Liquide',
    subtitle: 'Solutions d\'oxygénothérapie liquide pour un traitement efficace à domicile',
    description: 'L\'oxygène liquide est une solution innovante pour les patients nécessitant une oxygénothérapie continue.',
    longDescription: 'L\'oxygène liquide est une solution innovante pour les patients nécessitant une oxygénothérapie continue. Nos systèmes d\'oxygène liquide offrent une grande autonomie et une portabilité optimale. Stocké à très basse température, l\'oxygène liquide se transforme en gaz lors de l\'utilisation, offrant une pureté maximale.',
    features: [
      'Grande autonomie - jusqu\'à plusieurs jours',
      'Portable et léger - réservoirs de différentes tailles',
      'Haute pureté d\'oxygène - 99.5% minimum',
      'Système de sécurité avancé avec alarmes',
      'Service à domicile - livraison et installation',
      'Maintenance régulière incluse',
    ],
    specifications: [
      { label: 'Pureté', value: '99.5% minimum' },
      { label: 'Capacité', value: '10L à 50L' },
      { label: 'Poids', value: '2.5kg à 15kg' },
      { label: 'Autonomie', value: 'Jusqu\'à 7 jours' },
      { label: 'Garantie', value: '2 ans' },
    ],
    benefits: [
      'Amélioration de la qualité de vie',
      'Réduction de l\'essoufflement',
      'Meilleur sommeil',
      'Augmentation de l\'endurance',
      'Prévention des complications',
    ],
    images: ['💨', '🔬', '💊'],
    gradient: 'from-blue-500 to-cyan-500',
    icon: '💨',
  },
  'concentrateur-doxygene': {
    title: 'Concentrateur d\'Oxygène',
    subtitle: 'Concentrateurs d\'oxygène portables et fixes pour une autonomie maximale',
    description: 'Nos concentrateurs d\'oxygène extraient l\'oxygène de l\'air ambiant pour fournir une oxygénothérapie continue.',
    longDescription: 'Nos concentrateurs d\'oxygène extraient l\'oxygène de l\'air ambiant pour fournir une oxygénothérapie continue. Disponibles en modèles fixes et portables pour s\'adapter à tous les besoins. Les concentrateurs sont la solution idéale pour les patients nécessitant une oxygénothérapie à long terme, offrant une indépendance totale sans besoin de recharges.',
    features: [
      'Modèles fixes et portables disponibles',
      'Fonctionnement silencieux - moins de 45dB',
      'Consommation énergétique optimisée',
      'Interface intuitive avec écran LCD',
      'Maintenance facile et pièces disponibles',
      'Connexion possible pour suivi à distance',
    ],
    specifications: [
      { label: 'Débit', value: '1L/min à 10L/min' },
      { label: 'Pureté', value: '93% ± 3%' },
      { label: 'Poids portable', value: '2.2kg à 4.5kg' },
      { label: 'Batterie', value: 'Jusqu\'à 8h d\'autonomie' },
      { label: 'Niveau sonore', value: '< 45dB' },
    ],
    benefits: [
      'Indépendance totale',
      'Pas de recharges nécessaires',
      'Économique à long terme',
      'Facilité d\'utilisation',
      'Portable pour voyages',
    ],
    images: ['🔬', '⚡', '📱'],
    gradient: 'from-cyan-500 to-teal-500',
    icon: '🔬',
  },
  'les-ppc': {
    title: 'Les PPC - Pression Positive Continue',
    subtitle: 'Appareils de pression positive continue pour le traitement de l\'apnée du sommeil',
    description: 'Les appareils PPC sont la solution de référence pour le traitement de l\'apnée obstructive du sommeil.',
    longDescription: 'Les appareils PPC (Pression Positive Continue) sont la solution de référence pour le traitement de l\'apnée obstructive du sommeil. Nos modèles dernière génération offrent confort et efficacité. Les PPC maintiennent les voies respiratoires ouvertes pendant le sommeil en délivrant une pression d\'air constante, éliminant ainsi les apnées et les ronflements.',
    features: [
      'Technologie auto-ajustable (APAP)',
      'Connexion Bluetooth et WiFi',
      'Masques inclus dans le pack',
      'Suivi des données via application',
      'Formation complète incluse',
      'Humidificateur intégré',
    ],
    specifications: [
      { label: 'Pression', value: '4-20 cmH2O' },
      { label: 'Mode', value: 'CPAP, APAP, BiPAP' },
      { label: 'Niveau sonore', value: '< 26dB' },
      { label: 'RAMP', value: '0-45 minutes' },
      { label: 'Garantie', value: '3 ans' },
    ],
    benefits: [
      'Élimination des apnées',
      'Amélioration du sommeil',
      'Réduction de la fatigue',
      'Meilleure concentration',
      'Prévention des complications cardiaques',
    ],
    images: ['🌙', '😴', '💤'],
    gradient: 'from-teal-500 to-emerald-500',
    icon: '🌙',
  },
  'vni': {
    title: 'VNI - Ventilation Non Invasive',
    subtitle: 'Ventilation non invasive pour les patients en insuffisance respiratoire',
    description: 'La ventilation non invasive (VNI) permet d\'assister la respiration sans intubation.',
    longDescription: 'La ventilation non invasive (VNI) permet d\'assister la respiration sans intubation. Nos appareils VNI sont adaptés pour un usage à domicile avec un suivi médical personnalisé. La VNI est indiquée pour les patients souffrant d\'insuffisance respiratoire chronique, offrant un support ventilatoire efficace tout en préservant le confort du patient.',
    features: [
      'Modes ventilatoires multiples (CPAP, BiPAP, AVAPS)',
      'Alarmes de sécurité avancées',
      'Interface utilisateur simple et intuitive',
      'Portable et compact',
      'Support technique 24/7',
      'Formation médicale incluse',
    ],
    specifications: [
      { label: 'Pression inspiratoire', value: '4-30 cmH2O' },
      { label: 'Pression expiratoire', value: '4-25 cmH2O' },
      { label: 'Fréquence', value: '4-60 cycles/min' },
      { label: 'Volume courant', value: 'Jusqu\'à 1500ml' },
      { label: 'Poids', value: '3.5kg à 8kg' },
    ],
    benefits: [
      'Amélioration de la fonction respiratoire',
      'Réduction des hospitalisations',
      'Confort du patient préservé',
      'Utilisation à domicile',
      'Suivi médical personnalisé',
    ],
    images: ['💊', '🏥', '❤️'],
    gradient: 'from-emerald-500 to-green-500',
    icon: '💊',
  },
  'les-masques-respiratoires': {
    title: 'Masques Respiratoires',
    subtitle: 'Large gamme de masques adaptés à tous les besoins et morphologies',
    description: 'Le choix du masque est crucial pour le confort et l\'efficacité du traitement.',
    longDescription: 'Le choix du masque est crucial pour le confort et l\'efficacité du traitement. Nous proposons une large gamme de masques nasaux, faciaux et narinaires de différentes marques. Chaque patient a des besoins spécifiques, c\'est pourquoi nous offrons un service de conseil personnalisé pour trouver le masque parfait qui s\'adapte à votre morphologie et à vos habitudes de sommeil.',
    features: [
      'Masques nasaux - confortables et discrets',
      'Masques faciaux - pour respiration buccale',
      'Masques narinaires - ultra-légers',
      'Toutes tailles disponibles (XS à XXL)',
      'Matériaux hypoallergéniques',
      'Sangles ajustables et confortables',
    ],
    specifications: [
      { label: 'Types', value: 'Nasal, Facial, Narinaire' },
      { label: 'Tailles', value: 'XS, S, M, L, XL, XXL' },
      { label: 'Matériau', value: 'Silicone médical' },
      { label: 'Compatibilité', value: 'Tous appareils CPAP/PPC' },
      { label: 'Garantie', value: '1 an' },
    ],
    benefits: [
      'Confort optimal pendant le sommeil',
      'Étanchéité parfaite',
      'Réduction des fuites d\'air',
      'Compatibilité universelle',
      'Facilité d\'entretien',
    ],
    images: ['😷', '😴', '✨'],
    gradient: 'from-green-500 to-lime-500',
    icon: '😷',
  },
  'autres-produits': {
    title: 'Autres Produits & Accessoires',
    subtitle: 'Accessoires et équipements complémentaires pour votre traitement',
    description: 'Nous proposons également une gamme complète d\'accessoires et d\'équipements complémentaires.',
    longDescription: 'Nous proposons également une gamme complète d\'accessoires et d\'équipements complémentaires pour optimiser votre traitement respiratoire. Des tubulures aux humidificateurs, en passant par les nettoyants spécialisés, tous nos accessoires sont sélectionnés pour leur qualité et leur compatibilité avec vos équipements.',
    features: [
      'Tubulures et filtres de rechange',
      'Humidificateurs et chauffe-tubulures',
      'Nettoyants spécialisés et désinfectants',
      'Accessoires de confort (coussinets, etc.)',
      'Pièces de rechange authentiques',
      'Kits de démarrage complets',
    ],
    specifications: [
      { label: 'Tubulures', value: 'Standard et chauffantes' },
      { label: 'Filtres', value: 'Standard et HEPA' },
      { label: 'Humidificateurs', value: 'Intégrés et externes' },
      { label: 'Nettoyants', value: 'Spécialisés CPAP' },
      { label: 'Garantie', value: 'Selon produit' },
    ],
    benefits: [
      'Optimisation du traitement',
      'Confort amélioré',
      'Hygiène maximale',
      'Compatibilité garantie',
      'Prix compétitifs',
    ],
    images: ['📦', '🧹', '💧'],
    gradient: 'from-lime-500 to-yellow-500',
    icon: '📦',
  },
  'cpap-maroc': {
    title: 'CPAP Maroc',
    subtitle: 'Appareils CPAP de dernière génération au Maroc',
    description: 'OxyLife est le leader au Maroc en solutions CPAP.',
    longDescription: 'OxyLife est le leader au Maroc en solutions CPAP (Continuous Positive Airway Pressure). Nous proposons les meilleurs appareils du marché avec un service d\'installation et de suivi à domicile. Avec plus de 15 ans d\'expérience, nous avons aidé des milliers de patients à retrouver un sommeil réparateur grâce à nos solutions CPAP de pointe.',
    features: [
      'Gamme complète de CPAP - toutes marques',
      'Installation à domicile par techniciens qualifiés',
      'Formation personnalisée du patient',
      'Suivi technique régulier',
      'Service après-vente réactif',
      'Partenariats avec les meilleures marques',
    ],
    specifications: [
      { label: 'Marques', value: 'ResMed, Philips, Fisher & Paykel' },
      { label: 'Pression', value: '4-20 cmH2O' },
      { label: 'Garantie', value: '3 ans' },
      { label: 'Service', value: 'À domicile' },
      { label: 'Support', value: '24/7' },
    ],
    benefits: [
      'Leader au Maroc',
      'Expertise reconnue',
      'Service à domicile',
      'Suivi personnalisé',
      'Partenariats médicaux',
    ],
    images: ['🌙', '🇲🇦', '⭐'],
    gradient: 'from-teal-500 to-emerald-500',
    icon: '🌙',
  },
  'apnee-du-sommeil-maroc': {
    title: 'Apnée du Sommeil Maroc',
    subtitle: 'Solutions complètes pour le traitement de l\'apnée du sommeil au Maroc',
    description: 'L\'apnée du sommeil affecte de nombreuses personnes au Maroc.',
    longDescription: 'L\'apnée du sommeil affecte de nombreuses personnes au Maroc. OxyLife propose des solutions complètes : diagnostic, équipement CPAP, masques et suivi médical personnalisé. Nous travaillons en étroite collaboration avec les médecins et les cliniques pour offrir un parcours de soin complet, de la détection à la prise en charge.',
    features: [
      'Diagnostic à domicile - tests de sommeil',
      'Traitement CPAP personnalisé',
      'Suivi médical régulier',
      'Support technique 24/7',
      'Partenariats médicaux étendus',
      'Prise en charge possible',
    ],
    specifications: [
      { label: 'Diagnostic', value: 'Polygraphie à domicile' },
      { label: 'Traitement', value: 'CPAP/PPC adapté' },
      { label: 'Suivi', value: 'Mensuel les 3 premiers mois' },
      { label: 'Support', value: '24/7' },
      { label: 'Partenaires', value: 'Cliniques et hôpitaux' },
    ],
    benefits: [
      'Parcours de soin complet',
      'Diagnostic accessible',
      'Traitement efficace',
      'Suivi personnalisé',
      'Amélioration de la qualité de vie',
    ],
    images: ['😴', '🏥', '💤'],
    gradient: 'from-indigo-500 to-purple-500',
    icon: '😴',
  },
  'oxygenotherapie-a-domicile': {
    title: 'Oxygénothérapie à Domicile',
    subtitle: 'Services d\'oxygénothérapie à domicile au Maroc',
    description: 'Nous offrons un service complet d\'oxygénothérapie à domicile.',
    longDescription: 'Nous offrons un service complet d\'oxygénothérapie à domicile : installation d\'équipements, formation, maintenance et suivi régulier par nos techniciens qualifiés. Notre équipe se déplace chez vous pour installer votre équipement, vous former à son utilisation, et assurer un suivi régulier pour garantir l\'efficacité de votre traitement.',
    features: [
      'Installation à domicile - techniciens qualifiés',
      'Formation complète du patient et de la famille',
      'Maintenance régulière - contrôles périodiques',
      'Livraison d\'oxygène - service de livraison',
      'Urgences 24/7 - support technique permanent',
      'Suivi médical coordonné',
    ],
    specifications: [
      { label: 'Service', value: 'À domicile' },
      { label: 'Disponibilité', value: '24/7' },
      { label: 'Techniciens', value: 'Qualifiés et formés' },
      { label: 'Maintenance', value: 'Mensuelle' },
      { label: 'Urgences', value: 'Intervention sous 2h' },
    ],
    benefits: [
      'Confort du patient préservé',
      'Pas de déplacement nécessaire',
      'Formation personnalisée',
      'Suivi régulier',
      'Intervention rapide en cas de besoin',
    ],
    images: ['🏠', '🚑', '👨‍⚕️'],
    gradient: 'from-blue-500 to-indigo-500',
    icon: '🏠',
  },
};

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (!productId || !productData[productId]) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Produit non trouvé</h1>
          <Link to="/" className="text-primary">Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  const product = productData[productId];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Image */}
      <motion.section
        ref={containerRef}
        className="pt-32 pb-20 px-6 relative overflow-hidden"
        style={{ opacity }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0">
          <motion.div
            className={`absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br ${product.gradient} opacity-10`}
            style={{
              top: '-30%',
              right: '-20%',
              filter: 'blur(80px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center gap-2 mb-8 text-muted-foreground"
          >
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main Image */}
              <motion.div
                style={{ y: imageY }}
                className="relative rounded-3xl overflow-hidden mb-6"
              >
                <motion.div
                  className={`aspect-square rounded-3xl flex items-center justify-center bg-gradient-to-br ${product.gradient} relative overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className="text-9xl"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    {product.icon}
                  </motion.div>
                  
                  {/* Decorative rings */}
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border-2 border-white/20"
                      style={{
                        width: `${40 + i * 20}%`,
                        height: `${40 + i * 20}%`,
                      }}
                      animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                      transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear' }}
                    />
                  ))}
                </motion.div>
              </motion.div>

              {/* Image Gallery Thumbnails */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-3 gap-4"
              >
                {product.images.map((img, index) => (
                  <motion.div
                    key={index}
                    className={`aspect-square rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center text-4xl cursor-pointer`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {img}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="text-5xl md:text-6xl font-outfit font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                {product.title}
              </motion.h1>

              <motion.p
                className="text-xl text-muted-foreground font-outfit mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                {product.subtitle}
              </motion.p>

              <motion.p
                className="text-lg text-foreground font-outfit mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                {product.longDescription}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <MagneticButton variant="primary" size="lg">
                  Demander un devis
                </MagneticButton>
                <MagneticButton variant="secondary" size="lg">
                  Nous contacter
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-outfit font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Caractéristiques principales
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-2xl"
                style={{
                  background: 'linear-gradient(145deg, hsl(220 25% 10%), hsl(220 25% 8%))',
                  border: '1px solid hsl(210 20% 15%)',
                }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-2 h-2 rounded-full mt-2"
                    style={{ background: 'hsl(187 60% 55%)' }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  />
                  <span className="font-outfit text-foreground leading-relaxed">{feature}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Specifications & Benefits Grid */}
      <motion.section
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Specifications */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl"
            style={{
              background: 'linear-gradient(145deg, hsl(220 25% 10%), hsl(220 25% 8%))',
              border: '1px solid hsl(210 20% 15%)',
            }}
          >
            <h3 className="text-3xl font-outfit font-bold mb-8">Spécifications techniques</h3>
            <div className="space-y-4">
              {product.specifications.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center py-3 border-b border-[hsl(210,20%,15%)]"
                >
                  <span className="font-outfit text-muted-foreground">{spec.label}</span>
                  <span className="font-outfit font-semibold text-foreground">{spec.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl"
            style={{
              background: 'linear-gradient(145deg, hsl(220 25% 10%), hsl(220 25% 8%))',
              border: '1px solid hsl(210 20% 15%)',
            }}
          >
            <h3 className="text-3xl font-outfit font-bold mb-8">Avantages</h3>
            <div className="space-y-4">
              {product.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: 'hsl(220 25% 10% / 0.5)' }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'hsl(187 60% 55% / 0.2)' }}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-lg">✓</span>
                  </motion.div>
                  <span className="font-outfit text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="p-12 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, hsl(187 70% 50% / 0.1), hsl(200 60% 45% / 0.1))',
              border: '1px solid hsl(187 60% 55% / 0.3)',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-outfit font-bold mb-4">
              Prêt à améliorer votre qualité de vie ?
            </h3>
            <p className="text-lg text-muted-foreground font-outfit mb-8">
              Contactez-nous dès aujourd'hui pour une consultation gratuite
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton variant="primary" size="lg">
                Demander un devis gratuit
              </MagneticButton>
              <MagneticButton variant="secondary" size="lg">
                Appeler maintenant
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default ProductPage;
