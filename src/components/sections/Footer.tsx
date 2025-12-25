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
    <footer className="pt-20 pb-8 px-6 relative overflow-hidden">
      {/* Top border gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(187 60% 55% / 0.5), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              {/* Animated logo */}
              <motion.div
                className="mb-4"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ color: 'hsl(200 20% 95%)' }}
              >
                <OxylifeLogo className="h-16 w-auto" animate={true} />
              </motion.div>
            </motion.div>

            <p className="text-muted-foreground font-outfit text-sm leading-relaxed mb-6 max-w-sm">
              Leader au Maroc dans le traitement de l'apnée du sommeil et des maladies 
              respiratoires. Nous vous accompagnons pour une meilleure qualité de vie.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors"
                  style={{
                    background: 'hsl(220 25% 12%)',
                    border: '1px solid hsl(210 20% 18%)',
                  }}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-outfit font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-breath-light font-outfit text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-outfit font-semibold text-foreground mb-4">Produits</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-breath-light font-outfit text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-outfit font-semibold text-foreground mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-breath-light font-outfit text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid hsl(210 20% 15%)' }}
        >
          <p className="text-sm text-muted-foreground font-outfit">
            © {new Date().getFullYear()} OxyLife Maroc. {t('footer.copyright')}.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-breath-light font-outfit transition-colors"
            >
              {t('footer.privacy')}
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-breath-light font-outfit transition-colors"
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
