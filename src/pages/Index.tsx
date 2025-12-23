import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BreathingIntro from '@/components/intro/BreathingIntro';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import StatsSection from '@/components/sections/StatsSection';
import AboutSection from '@/components/sections/AboutSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [introCompleted, setIntroCompleted] = useState(false);

  // Check if user has already seen the intro
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('oxylife-intro-seen');
    if (hasSeenIntro) {
      setShowIntro(false);
      setIntroCompleted(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroCompleted(true);
    sessionStorage.setItem('oxylife-intro-seen', 'true');
  };

  const handleSkipIntro = () => {
    handleIntroComplete();
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BreathingIntro
              onComplete={handleIntroComplete}
              onSkip={handleSkipIntro}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introCompleted ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="min-h-screen bg-background"
      >
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <AboutSection />
        <CTASection />
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
