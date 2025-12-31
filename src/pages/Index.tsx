"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BreathingIntro from '@/components/intro/BreathingIntro';
import Navbar from '@/components/layout/Navbar';
import ScrollIndicator from '@/components/layout/ScrollIndicator';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProductsSection from '@/components/sections/ProductsSection';
import StatsSection from '@/components/sections/StatsSection';
import AboutSection from '@/components/sections/AboutSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  const [showIntro, setShowIntro] = useState(false); // Par défaut false
  const [introCompleted, setIntroCompleted] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur a déjà vu l'intro (une fois par session)
    const hasSeenIntro = sessionStorage.getItem('oxylife-intro-seen');

    if (hasSeenIntro) {
      setShowIntro(false);
      setIntroCompleted(true);
    } else {
      setShowIntro(true); // Affiche l'intro seulement la première fois
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
      {/* Intro animée */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-background"
          >
            <BreathingIntro
              onComplete={handleIntroComplete}
              onSkip={handleSkipIntro}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenu principal */}
      <AnimatePresence mode="wait">
        {introCompleted && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative min-h-screen bg-background"
          >
            <Navbar />
            <ScrollIndicator />

            <main>
              <HeroSection />
              <ServicesSection />
              <ProductsSection />
              <StatsSection />
              <AboutSection />
              <CTASection />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}