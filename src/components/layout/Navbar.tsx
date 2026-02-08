import { motion, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import OxylifeLogo from '@/components/ui/OxylifeLogo';
import NavbarFloating from '@/components/ui/navbar-floating';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

type Language = 'fr' | 'en' | 'ar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t('nav.home'), href: '#hero', id: 'hero' },
    { label: t('nav.services'), href: '#services', id: 'services' },
    { label: t('nav.products'), href: '#products', id: 'products' },
    { label: t('nav.about'), href: '#about', id: 'about' },
    { label: t('nav.contact'), href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  const logo = (
    <motion.div
      className="h-10 w-auto relative z-10"
      style={{ color: 'hsl(200 20% 95%)' }}
      whileHover={{ scale: 1.05 }}
    >
      <OxylifeLogo className="h-full w-auto" animate={true} />
    </motion.div>
  );

  const desktopActions = (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-white/10 bg-white/5">
        {(['fr', 'en', 'ar'] as Language[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${language === lang
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      <Button
        className="rounded-full bg-primary font-bold text-primary-foreground hover:bg-primary/90 hidden sm:flex px-6"
        size="sm"
        onClick={() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        {t('nav.contactUs')}
      </Button>

      {/* Mobile Menu Trigger */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="md:hidden p-2 rounded-full hover:bg-white/5 text-primary">
            <Menu className="w-5 h-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="top" className="w-full bg-background/95 backdrop-blur-xl border-b border-white/10 pt-20">
          <nav className="flex flex-col gap-6 items-center">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-outfit font-bold transition-colors ${activeSection === link.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
              >
                {link.label}
              </a>
            ))}

            <div className="flex items-center gap-4 mt-8">
              {(['fr', 'en', 'ar'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${language === lang
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'border border-white/10 text-muted-foreground'
                    }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <Button
              className="mt-4 w-full max-w-xs rounded-full py-6 text-lg font-bold"
              onClick={() => {
                setIsOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('nav.contactUs')}
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );

  return (
    <NavbarFloating
      logo={logo}
      links={navLinks.map(l => ({ ...l, active: activeSection === l.id }))}
      actions={desktopActions}
    />
  );
};

export default Navbar;