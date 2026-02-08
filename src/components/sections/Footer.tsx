import { motion } from 'framer-motion';
import OxylifeLogo from '@/components/ui/OxylifeLogo';
import { useLanguage } from '@/contexts/LanguageContext';

const footerLinks = {
  services: [
    { label: 'Installation', href: '#services' },
    { label: 'Formation', href: '#services' },
    { label: 'Entretien', href: '#services' },
    { label: 'Réparations', href: '#services' },
  ],
  products: [
    { label: 'Oxygène liquide', href: '#products' },
    { label: 'Concentrateurs', href: '#products' },
    { label: 'PPC', href: '#products' },
    { label: 'VNI', href: '#products' },
  ],
  company: [
    { label: 'À propos', href: '#about' },
    { label: 'Notre équipe', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ],
};

const socialLinks = [
  { icon: '📘', label: 'Facebook', href: '#' },
  { icon: '📸', label: 'Instagram', href: '#' },
  { icon: '💼', label: 'LinkedIn', href: '#' },
  { icon: '🐦', label: 'Twitter', href: '#' },
];

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="pt-24 pb-12 px-6 relative overflow-hidden bg-black/40">
      {/* Top border gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(187 60% 55% / 0.3), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              {/* Animated logo */}
              <motion.div
                className="mb-6"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ color: 'hsl(200 20% 95%)' }}
              >
                <OxylifeLogo className="h-20 w-auto" animate={true} />
              </motion.div>
            </motion.div>

            <p className="text-muted-foreground font-outfit text-sm leading-relaxed mb-8 max-w-sm">
              Leader au Maroc dans le traitement de l'apnée du sommeil et des maladies
              respiratoires. Nous vous accompagnons pour une meilleure qualité de vie.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.15, y: -5, backgroundColor: 'hsl(187 60% 55% / 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-xl transition-all duration-300"
                  style={{
                    background: 'hsl(220 25% 10% / 0.8)',
                    border: '1px solid hsl(210 20% 18%)',
                  }}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns - Stacked on tiny mobile, 2 cols on medium mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:col-span-3 text-center md:text-left">
            {/* Services */}
            <div className="col-span-1">
              <h4 className="font-outfit font-bold text-foreground text-base mb-6 uppercase tracking-wider">Services</h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-breath-light font-outfit text-sm transition-colors block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div className="col-span-1">
              <h4 className="font-outfit font-bold text-foreground text-base mb-6 uppercase tracking-wider">Produits</h4>
              <ul className="space-y-4">
                {footerLinks.products.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-breath-light font-outfit text-sm transition-colors block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company - Centered on mobile below the two columns */}
            <div className="col-span-2 lg:col-span-1 mt-4 lg:mt-0">
              <h4 className="font-outfit font-bold text-foreground text-base mb-6 uppercase tracking-wider">Entreprise</h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-breath-light font-outfit text-sm transition-colors block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Big Brand Text in Background - 21st.dev Style */}
        <div className="relative mt-8 mb-12 flex justify-center overflow-hidden pointer-events-none select-none">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 0.03, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[14vw] font-black font-outfit tracking-tighter leading-none text-white whitespace-nowrap"
          >
            OXYLIFE
          </motion.h2>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderTop: '1px solid hsl(210 20% 15% / 0.5)' }}
        >
          <div className="order-2 md:order-1 text-center md:text-left">
            <p className="text-xs text-muted-foreground font-outfit mb-1">
              © {new Date().getFullYear()} OxyLife Maroc. {t('footer.copyright')}.
            </p>
            <p className="text-[10px] text-muted-foreground/50 font-outfit">
              Made with 💙 by Zaid Project in Casablanca
            </p>
          </div>

          <div className="flex gap-8 order-1 md:order-2">
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-breath-light font-outfit transition-colors"
            >
              {t('footer.privacy')}
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-breath-light font-outfit transition-colors"
            >
              {t('footer.legal')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
