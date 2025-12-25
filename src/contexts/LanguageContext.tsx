import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.products': 'Produits',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.contactUs': 'Nous contacter',
    // Hero
    'hero.breathe': 'Respirer…',
    'hero.notAutomatic': '…n\'est pas toujours automatique',
    'hero.apnea': 'Apnée du sommeil',
    'hero.insufficiency': 'Insuffisance respiratoire',
    'hero.discover': 'Découvrir nos solutions',
    'hero.contact': 'Contactez-nous',
    // About
    'about.title': 'Qui sommes-nous',
    'about.subtitle': 'Votre partenaire santé respiratoire',
    'about.description': 'Entreprise de soins à domicile spécialisée dans le domaine respiratoire. Mission : améliorer la qualité de vie des patients souffrant de maladies respiratoires chroniques.',
    'about.values': 'Valeurs',
    'about.partners': 'Partenaires',
    // Services
    'services.title': 'Nos Services',
    'services.subtitle': 'Solutions complètes',
    'services.installation': 'Installation de dispositifs médicaux',
    'services.training': 'Formation des patients et des partenaires',
    'services.maintenance': 'Entretien préventif des appareils',
    'services.repairs': 'Mise à jour / réparations',
    'services.rental': 'Location et vente de dispositifs',
    'services.evaluation': 'Évaluation technique à domicile',
    // Products
    'products.title': 'Nos Produits',
    'products.subtitle': 'Gamme complète d\'équipements',
    // Oxygen Therapy
    'oxygen.title': 'Oxygénothérapie à Domicile',
    'oxygen.subtitle': 'Traitement personnalisé',
    'oxygen.description': 'Traitement par oxygénothérapie pour l\'apnée du sommeil et les insuffisances respiratoires chroniques. Suivi personnalisé par notre équipe technique.',
    // Team
    'team.title': 'Notre Équipe',
    'team.subtitle': 'Techniciens experts',
    'team.description': 'Une équipe de techniciens qualifiés dédiés à votre bien-être respiratoire.',
    // Contact
    'contact.title': 'Contact & Localisation',
    'contact.subtitle': 'Nous sommes à votre écoute',
    'contact.emergency': 'Urgence',
    'contact.secretariat': 'Secrétariat',
    'contact.general': 'Contact général',
    'contact.hours': 'Horaires d\'ouverture',
    // Footer
    'footer.copyright': 'Tous droits réservés',
    'footer.privacy': 'Politique de confidentialité',
    'footer.legal': 'Mentions légales',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.contactUs': 'Contact Us',
    // Hero
    'hero.breathe': 'Breathe…',
    'hero.notAutomatic': '…is not always automatic',
    'hero.apnea': 'Sleep Apnea',
    'hero.insufficiency': 'Respiratory Insufficiency',
    'hero.discover': 'Discover our solutions',
    'hero.contact': 'Contact Us',
    // About
    'about.title': 'Who We Are',
    'about.subtitle': 'Your respiratory health partner',
    'about.description': 'Home healthcare company specialized in respiratory care. Mission: improve the quality of life for patients with chronic respiratory diseases.',
    'about.values': 'Values',
    'about.partners': 'Partners',
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Complete Solutions',
    'services.installation': 'Medical device installation',
    'services.training': 'Patient and partner training',
    'services.maintenance': 'Preventive equipment maintenance',
    'services.repairs': 'Updates / Repairs',
    'services.rental': 'Device rental and sales',
    'services.evaluation': 'Technical evaluation at home',
    // Products
    'products.title': 'Our Products',
    'products.subtitle': 'Complete Equipment Range',
    // Oxygen Therapy
    'oxygen.title': 'Home Oxygen Therapy',
    'oxygen.subtitle': 'Personalized Treatment',
    'oxygen.description': 'Oxygen therapy treatment for sleep apnea and chronic respiratory insufficiency. Personalized follow-up by our technical team.',
    // Team
    'team.title': 'Our Team',
    'team.subtitle': 'Expert Technicians',
    'team.description': 'A team of qualified technicians dedicated to your respiratory well-being.',
    // Contact
    'contact.title': 'Contact & Location',
    'contact.subtitle': 'We are here for you',
    'contact.emergency': 'Emergency',
    'contact.secretariat': 'Secretariat',
    'contact.general': 'General Contact',
    'contact.hours': 'Opening Hours',
    // Footer
    'footer.copyright': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.legal': 'Legal Notice',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.products': 'المنتجات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.contactUs': 'اتصل بنا',
    // Hero
    'hero.breathe': 'تنفس…',
    'hero.notAutomatic': '…ليس دائماً تلقائياً',
    'hero.apnea': 'انقطاع النفس أثناء النوم',
    'hero.insufficiency': 'قصور تنفسي',
    'hero.discover': 'اكتشف حلولنا',
    'hero.contact': 'اتصل بنا',
    // About
    'about.title': 'من نحن',
    'about.subtitle': 'شريكك في الصحة التنفسية',
    'about.description': 'شركة رعاية صحية منزلية متخصصة في مجال الجهاز التنفسي. المهمة: تحسين جودة حياة المرضى الذين يعانون من أمراض الجهاز التنفسي المزمنة.',
    'about.values': 'القيم',
    'about.partners': 'الشركاء',
    // Services
    'services.title': 'خدماتنا',
    'services.subtitle': 'حلول شاملة',
    'services.installation': 'تركيب الأجهزة الطبية',
    'services.training': 'تدريب المرضى والشركاء',
    'services.maintenance': 'الصيانة الوقائية للأجهزة',
    'services.repairs': 'التحديثات / الإصلاحات',
    'services.rental': 'تأجير وبيع الأجهزة',
    'services.evaluation': 'التقييم التقني في المنزل',
    // Products
    'products.title': 'منتجاتنا',
    'products.subtitle': 'مجموعة كاملة من المعدات',
    // Oxygen Therapy
    'oxygen.title': 'العلاج بالأكسجين في المنزل',
    'oxygen.subtitle': 'علاج مخصص',
    'oxygen.description': 'علاج بالأكسجين لانقطاع النفس أثناء النوم والقصور التنفسي المزمن. متابعة مخصصة من قبل فريقنا التقني.',
    // Team
    'team.title': 'فريقنا',
    'team.subtitle': 'فنيون خبراء',
    'team.description': 'فريق من الفنيين المؤهلين مكرسون لرفاهيتك التنفسية.',
    // Contact
    'contact.title': 'اتصل بنا والموقع',
    'contact.subtitle': 'نحن هنا من أجلك',
    'contact.emergency': 'طوارئ',
    'contact.secretariat': 'الأمانة',
    'contact.general': 'اتصال عام',
    'contact.hours': 'ساعات العمل',
    // Footer
    'footer.copyright': 'جميع الحقوق محفوظة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.legal': 'الإشعار القانوني',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

