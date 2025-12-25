import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'hero', label: 'Accueil' },
  { id: 'services', label: 'Services' },
  { id: 'products', label: 'Produits' },
  { id: 'about', label: 'À propos' },
  { id: 'contact', label: 'Contact' },
];

// Note: StatsSection n'a pas d'ID, donc elle n'apparaîtra pas dans l'indicateur

const ScrollIndicator = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-4">
      {/* Progress bar */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-muted-foreground/20">
        <motion.div
          className="absolute top-0 left-0 w-full bg-primary origin-top"
          style={{ scaleY: scaleX }}
        />
      </div>

      {/* Section dots */}
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="relative group"
          aria-label={section.label}
        >
          <motion.div
            className={`w-3 h-3 rounded-full transition-all ${
              activeSection === section.id
                ? 'bg-primary scale-125'
                : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
          {/* Tooltip */}
          <span
            className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-xs font-outfit text-foreground bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-md border border-border pointer-events-none"
          >
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ScrollIndicator;

