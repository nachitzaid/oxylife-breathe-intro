import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

const navLinks = [
  { label: 'Accueil', href: '#' },
  { label: 'Services', href: '#services' },
  { label: 'Produits', href: '#products' },
  { label: 'À propos', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['hsl(220 25% 6% / 0)', 'hsl(220 25% 6% / 0.95)']
  );

  const backdropBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(20px)']);

  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

  return (
    <>
      <motion.nav
        style={{
          backgroundColor,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
        }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: 'hsl(187 60% 55%)',
            opacity: borderOpacity,
          }}
        />

        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-2xl font-outfit font-bold">
              <span style={{ color: 'hsl(187 60% 55%)' }}>Oxy</span>
              <span className="text-foreground">Life</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
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

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:block px-6 py-2.5 rounded-full font-outfit font-medium text-sm"
            style={{
              background: 'linear-gradient(135deg, hsl(187 70% 50%), hsl(200 60% 45%))',
              color: 'hsl(220 30% 8%)',
            }}
          >
            Nous contacter
          </motion.button>

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
              key={index}
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
          <motion.button
            initial={{ opacity: 0 }}
            animate={isOpen ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-4 w-full py-4 rounded-full font-outfit font-medium"
            style={{
              background: 'linear-gradient(135deg, hsl(187 70% 50%), hsl(200 60% 45%))',
              color: 'hsl(220 30% 8%)',
            }}
          >
            Nous contacter
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
