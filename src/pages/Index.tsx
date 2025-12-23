import { useState, useEffect } from 'react';
import BreathingIntro from '@/components/intro/BreathingIntro';
import oxylifeLogo from '@/assets/oxylife-logo.svg';

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
      {showIntro && (
        <BreathingIntro 
          onComplete={handleIntroComplete} 
          onSkip={handleSkipIntro} 
        />
      )}
      
      {/* Main content (fades in after intro) */}
      <div 
        className={`min-h-screen bg-background transition-opacity duration-1000 ${
          introCompleted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
          {/* Background gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 40%, hsl(187 60% 55% / 0.08), transparent 70%)',
            }}
          />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute w-96 h-96 rounded-full opacity-10"
              style={{
                background: 'radial-gradient(circle, hsl(187 60% 55%), transparent 70%)',
                top: '10%',
                left: '10%',
                animation: 'float 12s ease-in-out infinite',
              }}
            />
            <div 
              className="absolute w-64 h-64 rounded-full opacity-5"
              style={{
                background: 'radial-gradient(circle, hsl(200 60% 50%), transparent 70%)',
                bottom: '20%',
                right: '15%',
                animation: 'float 10s ease-in-out infinite reverse',
                animationDelay: '-3s',
              }}
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="mb-8 animate-pulse-glow inline-block">
              <img 
                src={oxylifeLogo} 
                alt="OxyLife" 
                className="w-48 md:w-64 lg:w-80 h-auto mx-auto"
                style={{
                  filter: 'drop-shadow(0 0 20px hsl(187 60% 55% / 0.3))',
                }}
              />
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-semibold mb-6 leading-tight">
              <span className="text-foreground">Libérez votre </span>
              <span className="text-breath-gradient">respiration</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-outfit font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              Solutions innovantes contre l'apnée du sommeil. 
              Redécouvrez le repos réparateur que vous méritez.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                className="group px-8 py-4 rounded-full font-outfit font-medium text-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, hsl(187 60% 55%), hsl(200 60% 50%))',
                  color: 'hsl(220 25% 6%)',
                  boxShadow: '0 0 30px hsl(187 60% 55% / 0.3)',
                }}
              >
                Découvrir nos solutions
                <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
              
              <button 
                className="px-8 py-4 rounded-full font-outfit font-medium text-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: 'transparent',
                  border: '1px solid hsl(187 60% 55% / 0.5)',
                  color: 'hsl(187 60% 65%)',
                }}
              >
                En savoir plus
              </button>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60"
            style={{ animation: 'float 3s ease-in-out infinite' }}
          >
            <span className="text-sm font-outfit text-muted-foreground">Scroll</span>
            <div 
              className="w-6 h-10 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1.5"
            >
              <div 
                className="w-1.5 h-3 rounded-full bg-breath animate-bounce"
                style={{ animationDuration: '1.5s' }}
              />
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="py-24 px-6 relative">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, transparent, hsl(220 25% 8%) 20%, hsl(220 25% 8%) 80%, transparent)',
            }}
          />
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-semibold mb-4 text-foreground">
                Comprendre l'<span className="text-breath-gradient">apnée du sommeil</span>
              </h2>
              <p className="text-lg text-muted-foreground font-outfit font-light max-w-2xl mx-auto">
                Un trouble respiratoire qui affecte des millions de personnes chaque nuit
              </p>
            </div>
            
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: '1.5M', label: 'Français touchés', icon: '👥' },
                { number: '80%', label: 'Non diagnostiqués', icon: '⚠️' },
                { number: '30+', label: 'Arrêts par heure', icon: '💨' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl text-center transition-all duration-500 hover:scale-105 group"
                  style={{
                    background: 'hsl(220 25% 10%)',
                    border: '1px solid hsl(210 20% 18%)',
                    boxShadow: '0 0 0 hsl(187 60% 55% / 0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 40px hsl(187 60% 55% / 0.15)';
                    e.currentTarget.style.borderColor = 'hsl(187 60% 55% / 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 hsl(187 60% 55% / 0)';
                    e.currentTarget.style.borderColor = 'hsl(210 20% 18%)';
                  }}
                >
                  <span className="text-4xl mb-4 block">{stat.icon}</span>
                  <div 
                    className="text-4xl md:text-5xl font-outfit font-bold mb-2"
                    style={{ color: 'hsl(187 60% 55%)' }}
                  >
                    {stat.number}
                  </div>
                  <p className="text-muted-foreground font-outfit">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <img 
              src={oxylifeLogo} 
              alt="OxyLife" 
              className="w-32 h-auto opacity-70"
            />
            <p className="text-sm text-muted-foreground font-outfit">
              © 2024 OxyLife. Respirez mieux. Vivez mieux.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
