import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import OxylifeLogo from '@/components/ui/OxylifeLogo';

type Language = 'fr' | 'en' | 'ar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t('nav.home'), href: '#', key: 'nav.home' },
    { label: t('nav.services'), href: '#services', key: 'nav.services' },
    { label: t('nav.products'), href: '#products', key: 'nav.products' },
    { label: t('nav.about'), href: '#about', key: 'nav.about' },
    { label: t('nav.contact'), href: '#contact', key: 'nav.contact' },
  ];

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['hsl(220 25% 6% / 0)', 'hsl(220 25% 6% / 0.95)']
  );

  const backdropBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(20px)']);

  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

  const navbarHeight = useTransform(scrollY, [0, 100], ['80px', '70px']);

  return (
    <>
      <motion.nav
        style={{
          backgroundColor,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
          height: navbarHeight,
        }}
        className="fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300"
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: 'hsl(187 60% 55%)',
            opacity: borderOpacity,
          }}
        />

        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <motion.div
              animate={isScrolled ? { scale: 0.95 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              className="h-10 w-auto"
              style={{ color: 'hsl(200 20% 95%)' }}
            >
              <OxylifeLogo className="h-full w-auto" />
            </motion.div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.key}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative font-outfit text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: 'hsl(187 60% 55%)' }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-2 px-2 py-1 rounded-full"
              style={{
                background: 'hsl(220 25% 10% / 0.5)',
                border: '1px solid hsl(210 20% 18%)',
              }}
            >
              {(['fr', 'en', 'ar'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded-full text-xs font-outfit font-medium transition-all ${
                    language === lang
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  style={{
                    background: language === lang ? 'hsl(187 60% 55% / 0.2)' : 'transparent',
                  }}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 rounded-full font-outfit font-medium text-sm"
              style={{
                background: 'linear-gradient(135deg, hsl(187 70% 50%), hsl(200 60% 45%))',
                color: 'hsl(220 30% 8%)',
              }}
            >
              {t('nav.contactUs')}
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
              className="w-6 h-0.5 rounded-full"
              style={{ background: 'hsl(187 60% 55%)' }}
            />
            <motion.span
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="w-6 h-0.5 rounded-full"
              style={{ background: 'hsl(187 60% 55%)' }}
            />
            <motion.span
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
              className="w-6 h-0.5 rounded-full"
              style={{ background: 'hsl(187 60% 55%)' }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -20,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        className="fixed top-[72px] left-4 right-4 z-40 md:hidden rounded-2xl p-6"
        style={{
          background: 'hsl(220 25% 8% / 0.98)',
          backdropFilter: 'blur(20px)',
          border: '1px solid hsl(210 20% 15%)',
        }}
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.key}
              href={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={isOpen ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              onClick={() => setIsOpen(false)}
              className="font-outfit text-lg text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              {link.label}
            </motion.a>
          ))}
          
          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-2 px-2 py-2 rounded-full mt-2"
            style={{
              background: 'hsl(220 25% 10% / 0.5)',
              border: '1px solid hsl(210 20% 18%)',
            }}
          >
            {(['fr', 'en', 'ar'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded-full text-xs font-outfit font-medium transition-all ${
                  language === lang
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={{
                  background: language === lang ? 'hsl(187 60% 55% / 0.2)' : 'transparent',
                }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={isOpen ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full py-4 rounded-full font-outfit font-medium"
            style={{
              background: 'linear-gradient(135deg, hsl(187 70% 50%), hsl(200 60% 45%))',
              color: 'hsl(220 30% 8%)',
            }}
          >
            {t('nav.contactUs')}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
