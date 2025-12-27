import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import OxylifeLogo from '@/components/ui/OxylifeLogo';

type Language = 'fr' | 'en' | 'ar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t('nav.home'), href: '#hero', key: 'nav.home', id: 'hero' },
    { label: t('nav.services'), href: '#services', key: 'nav.services', id: 'services' },
    { label: t('nav.products'), href: '#products', key: 'nav.products', id: 'products' },
    { label: t('nav.about'), href: '#about', key: 'nav.about', id: 'about' },
    { label: t('nav.contact'), href: '#contact', key: 'nav.contact', id: 'contact' },
  ];

  // Détection du scroll et de la section active
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Détection de la section active
      const scrollPosition = currentScrollY + window.innerHeight / 3;
      
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const section = document.getElementById(navLinks[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(navLinks[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            href="#hero"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center group relative"
            whileHover={{ scale: 1.03 }}
          >
            <motion.div
              animate={isScrolled ? { scale: 0.92 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              className="h-12 w-auto relative z-10"
              style={{ color: 'hsl(200 20% 95%)' }}
            >
              <OxylifeLogo className="h-full w-auto" animate={true} />
            </motion.div>
            
            {/* Effet de lueur pulsante au hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, hsl(187 60% 55% / 0.3), transparent 60%)',
                filter: 'blur(15px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.id;
              
              return (
                <motion.a
                  key={link.key}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative font-outfit text-sm transition-colors group"
                  style={{
                    color: isActive ? 'hsl(187 60% 65%)' : 'hsl(200 20% 70%)',
                  }}
                >
                  {link.label}
                  
                  {/* Underline animé - toujours visible pour la section active */}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    style={{ 
                      background: 'linear-gradient(90deg, hsl(187 70% 50%), hsl(200 60% 55%))',
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ 
                      scaleX: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    whileHover={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Point lumineux pour la section active */}
                  {isActive && (
                    <motion.span
                      className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
                      style={{ 
                        background: 'hsl(187 70% 55%)',
                        boxShadow: '0 0 8px hsl(187 70% 55%)',
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </motion.a>
              );
            })}
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

            {/* CTA Button avec effet de brillance */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 rounded-full font-outfit font-medium text-sm relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, hsl(187 70% 50%), hsl(200 60% 45%))',
                color: 'hsl(220 30% 8%)',
              }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {/* Effet de brillance animé */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                }}
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                }}
              />
              <span className="relative z-10">{t('nav.contactUs')}</span>
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
          {navLinks.map((link, index) => {
            const isActive = activeSection === link.id;
            
            return (
              <motion.a
                key={link.key}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={isOpen ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="font-outfit text-lg transition-colors py-2 pl-4 relative"
                style={{
                  color: isActive ? 'hsl(187 60% 65%)' : 'hsl(200 20% 70%)',
                  borderLeft: isActive ? '3px solid hsl(187 60% 55%)' : '3px solid transparent',
                }}
              >
                {link.label}
                
                {/* Point actif pour mobile */}
                {isActive && (
                  <motion.span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full -ml-1"
                    style={{ 
                      background: 'hsl(187 70% 55%)',
                      boxShadow: '0 0 8px hsl(187 70% 55%)',
                    }}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.a>
            );
          })}
          
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
            onClick={() => {
              setIsOpen(false);
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-4 w-full py-4 rounded-full font-outfit font-medium relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(187 70% 50%), hsl(200 60% 45%))',
              color: 'hsl(220 30% 8%)',
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              }}
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
            <span className="relative z-10">{t('nav.contactUs')}</span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;