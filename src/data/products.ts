export interface ProductVariant {
  id: string
  title: string
  description: string
  image: string
  features: string[]   // Caractéristiques spécifiques à chaque variante, enrichies via recherches
}

export interface Product {
  id: string
  title: string
  description: string  // Courte et impactante → visible sur la carte animée
  gradient: string     // Couleurs vives et modernes pour un effet wow au scroll
  variants: ProductVariant[]
  features: string[]   // Avec émojis pour plus de vie (gardées au niveau produit, mais maintenant per-variant aussi)
}

export const products: Product[] = [
  {
    id: "oxygene-liquide",
    title: "🌬️ Oxygène Liquide",
    description: "Liberté totale, respirez où vous voulez !",
    gradient: "from-blue-600 to-cyan-400",
    variants: [
      {
        id: "helios-s46",
        title: "🛡️ Stationnaire HELiOS S46",
        description: "Autonomie exceptionnelle ! Réservoir cryogénique robuste pour une oxygénothérapie continue à domicile, fiable et sécurisée jour et nuit.",
        image: "portable helios.jpg",
        features: ["❄️ Capacité 46L", "⚖️ Poids vide 27kg", "📏 Hauteur 95cm, diamètre 39cm", "💨 Flux 0-10 LPM", "🛡️ Sécurisé pour usage domicile", "🔋 Autonomie prolongée jusqu'à 22h avec portable"]
      },
      {
        id: "helios-plus",
        title: "🎒 Portable HELiOS Plus",
        description: "Mobilité sans limite ! Ultra-léger et discret, accompagnez vos sorties quotidiennes avec une oxygénothérapie continue en toute liberté.",
        image: "Bouteilles-oxigene.jpg",
        features: ["⚖️ Poids 1.6kg plein", "🕒 Jusqu'à 9h autonomie", "🎒 Ultra-portable (308L oxygène)", "💨 Pulse dose jusqu'à 4", "🚶 Idéal pour mobilité", "🛡️ Valve une voie"]
      },
      {
        id: "bottles",
        title: "🧳 Bouteilles d’Oxygène",
        description: "Réserve flexible ! Disponibles en plusieurs tailles pour un usage d’appoint pratique et facile à transporter.",
        image: "oxygene.jpg",
        features: ["📏 Tailles variées (165L à 22.9 cu ft)", "🛡️ Aluminium léger (DOT-approved)", "🚀 Portable avec valve CGA870", "🔒 Pression 200 bar", "🩺 Usage médical USP", "⚖️ Poids variable (ex: 80kg pour 40L)"]
      },
    ],
    features: ["🏠 À domicile", "🚶 Mobilité totale", "❄️ Technologie cryogénique", "🕒 Support 24/7", "🔒 Sécurité maximale"],
  },
  {
    id: "concentrateur-doxygene",
    title: "💨 Concentrateur d’Oxygène",
    description: "Silence et liberté, respirez sans contrainte !",
    gradient: "from-cyan-500 to-teal-600",
    variants: [
      {
        id: "everflo",
        title: "🤫 Philips EverFlo",
        description: "Silence absolu ! Concentrateur stationnaire ultra-silencieux, économe et fiable pour une oxygénothérapie sereine à domicile.",
        image: "philips everflo.png",
        features: ["💨 Débit 0.5-5 LPM", "🔇 45dB", "⚖️ 14kg", "⚡ 350W", "📏 58x38x24 cm", "🛡️ OPI (indicateur oxygène)", "🔋 Fonctionne 120V/60Hz"]
      },
      {
        id: "simplygo-mini",
        title: "✈️ SimplyGo Mini",
        description: "Liberté de mouvement ! Le plus léger du marché, batterie longue durée, certifié avion – votre oxygène vous suit partout.",
        image: "simpligo mini.webp",
        features: ["🔋 Batterie 4.5h standard (9h étendue)", "⚖️ 2.3kg", "✈️ Approuvé avion FAA", "💨 Pulse 1-5 (87-96%)", "📏 24x21x9 cm", "🛡️ Alarmes multiples", "📱 Écran tactile"]
      },
      {
        id: "invacare",
        title: "🛡️ Invacare Perfecto2",
        description: "Fiabilité clinique ! Débit constant et autonomie longue durée pour une oxygénothérapie sécurisée et sans interruption.",
        image: "INVACARE.webp",
        features: ["💨 Débit jusqu'à 5 LPM", "⚖️ 19.5kg", "📏 58x33x29 cm", "🔇 Silencieux", "🛡️ Système pression-based", "⚡ 280W moyen", "🔋 Diagnostic auto"]
      },
    ],
    features: ["🔇 Ultra-silencieux", "🔋 Portable", "⚡ Économe en énergie", "✈️ Approuvé avion", "❤️ Confort quotidien"],
  },
  {
    id: "ppc",
    title: "😴 Les PPC",
    description: "Retrouvez des nuits profondes et réparatrices !",
    gradient: "from-teal-600 to-emerald-500",
    variants: [
      {
        id: "resmed-s10",
        title: "🌟 ResMed AirSense 10",
        description: "Confort intelligent ! Ajustement automatique de la pression, humidification et suivi connecté pour un sommeil naturel et reposant.",
        image: "RESMED AIRSENSE10.webp",
        features: ["🌬️ Pression 4-20 cmH2O", "🔇 26dB", "📱 Bluetooth/app", "💧 Humidificateur intégré", "🛏️ Modes CPAP/AutoSet", "⚖️ 1.24kg", "📏 25x15x11 cm"]
      },
      {
        id: "prisma-20a",
        title: "🇩🇪 Löwenstein Prisma 20A",
        description: "Précision allemande ! Algorithme avancé et humidification optimale pour une thérapie douce et parfaitement adaptée.",
        image: "Löwenstein Prisma 20A.webp",
        features: ["🌬️ Pression 4-20 cmH2O", "🔇 26.5dB", "⚖️ 1.34kg", "📱 Écran tactile/4G", "🛡️ FOT (oscillation forcée)", "🛏️ Modes CPAP/APAP", "📏 17x13.5x18 cm"]
      },
      {
        id: "resvent",
        title: "🖥️ Resvent BiPAP",
        description: "Innovation moderne ! Écran tactile intuitif et design compact pour une prise en charge personnalisée et confortable.",
        image: "Resvent.jpg",
        features: ["🌬️ Pression 4-30 cmH2O", "🔇 26dB", "⚖️ 1.37kg", "📱 WiFi/écran tactile", "🛏️ Modes CPAP/S/ST/AVAPS", "💧 Humidificateur", "📏 22x12.5x12 cm"]
      },
    ],
    features: ["🌙 Sommeil réparateur", "🛏️ Confort nocturne", "📱 Suivi par app", "🌬️ Auto-ajustement", "🤫 Silence total"],
  },
  {
    id: "vni",
    title: "🫁 Ventilation Non Invasive",
    description: "Respiration assistée, sereine et sécurisée !",
    gradient: "from-emerald-600 to-green-500",
    variants: [
      {
        id: "astral",
        title: "🚀 ResMed Astral",
        description: "Polyvalence maximale ! Modes invasifs/non-invasifs, batterie longue durée pour une assistance respiratoire portable et fiable.",
        image: "ResMed Astral.webp",
        features: ["🔋 16h batterie (8h interne + externe)", "⚖️ 3.2kg", "🫁 Modes invasif/non-invasif", "📏 28.5x21.5x9.3 cm", "🛡️ Connexion RCM", "💨 Pression jusqu'à 50 cmH2O", "📱 Suivi avancé"]
      },
      {
        id: "dreamstation",
        title: "❤️ DreamStation AVAPS",
        description: "Ventilation douce et intelligente ! Volume respiratoire constant pour une prise en charge stable et confortable à domicile.",
        image: "Dreamstation AVAPS.jpg",
        features: ["🌬️ Pression jusqu'à 30 cmH2O", "🫁 Volume 200-1500ml (AVAPS)", "🔇 28dB", "📱 Bluetooth/app", "🛏️ Modes CPAP/S/ST/T/PC", "💧 Humidificateur", "⚖️ 2kg"]
      },
      {
        id: "dreamstation-alt",
        title: "🏠 DreamStation BiPAP",
        description: "Confort quotidien ! Interface intuitive et humidification adaptative pour une ventilation non invasive agréable et efficace.",
        image: "Dreamstation AVAPS.webp",
        features: ["🌬️ Pression 4-25 cmH2O", "🔇 26dB", "⚖️ 2kg", "💧 Humidificateur adaptatif", "🛏️ Modes CPAP/S/ST", "📱 Connecté", "🛡️ Digital Auto-Trak"]
      },
    ],
    features: ["🫁 Assistance personnalisée", "🏠 Usage domicile", "🔋 Portable", "🛡️ Sécurité renforcée", "📊 Suivi précis"],
  },
  {
    id: "masques-respiratoires",
    title: "😷 Masques Respiratoires",
    description: "Confort absolu et étanchéité parfaite toute la nuit !",
    gradient: "from-green-500 to-lime-400",
    variants: [
      {
        id: "nasal-n10",
        title: "🌬️ Masque Nasal N10",
        description: "Légèreté et discrétion ! Design minimaliste sans marques sur le visage, pour une thérapie respiratoire naturelle et confortable.",
        image: "nasal n10.jpg",
        features: ["👃 Nasal compact", "🌟 Vision claire (cadre sous-yeux)", "😌 Coussin Spring Air", "📏 Tailles S/M/L", "🧼 Réutilisable domicile", "🛡️ Pression 4-40 cmH2O", "⚖️ Léger"]
      },
      {
        id: "facial-f10",
        title: "👀 Masque Facial F10",
        description: "Vision panoramique ! Joint InfinitySeal s’adapte parfaitement pour une étanchéité optimale, même à haute pression.",
        image: "Masque Facial F10.webp",
        features: ["👀 Facial panoramique", "🔒 InfinitySeal adaptatif", "😌 Coussin Spring Air", "📏 Tailles S/M/L", "🧼 Facile à nettoyer", "🛡️ Haute pression", "⚖️ Léger (137g)"]
      },
      {
        id: "harnais",
        title: "🎀 Harnais & Accessoires",
        description: "Ajustement sur mesure ! Harnais respirants et coussins hypoallergéniques pour un port prolongé sans irritation.",
        image: "HARNAIS.jpeg",
        features: ["🎀 Ajustable 4 points", "🌬️ Respirant", "🧼 Hypoallergénique", "🛡️ Confort prolongé", "🔧 Clips magnétiques/velcro", "📏 Universel pour masques", "🛡️ Remplacer tous 6-9 mois"]
      },
    ],
    features: ["😌 Confort toute la nuit", "🔒 Étanchéité parfaite", "🌟 Silicone premium", "👃 Nasal ou facial", "🧼 Facile à nettoyer"],
  },
  {
    id: "autres-produits",
    title: "🔬 Diagnostics & Accessoires",
    description: "Précision et confort à chaque étape de vos soins !",
    gradient: "from-lime-400 to-yellow-500",
    variants: [
      {
        id: "talc",
        title: "💉 Talc Novatech",
        description: "Soulagement durable ! Talc stérile de grade médical pour une pléurodèse efficace contre les épanchements pleuraux récidivants.",
        image: "Talc Novatech.webp",
        features: ["💉 Talc stérile (STERITALC®)", "🩺 Pléurodèse (2-5g effusion)", "📏 Dose 1-5g", "🛡️ Grade médical non-soluble", "🔒 Sûr (prévention ARDS)", "🧪 Particules grandes"]
      },
      {
        id: "protheses",
        title: "🦾 Prothèses Respiratoires",
        description: "Respiration naturelle ! Prothèses en silicone biocompatible qui maintiennent ouvertes les voies aériennes avec un confort optimal.",
        image: "endo-prothèses.jpg",
        features: ["🦾 Silicone biocompatible", "🫁 Maintien voies aériennes", "📏 Diamètres 10-20mm, longueurs 20-160mm", "🛡️ Permanent/compliant", "😌 Confort patient", "🔧 Placement bronchoscopique"]
      },
      {
        id: "bronchoscope",
        title: "🔍 Bronchoscope Rigide",
        description: "Précision diagnostique exceptionnelle ! Instrument innovant pour explorations et interventions bronchiques sécurisées et efficaces.",
        image: "rigid-bronchoscope-set-1000x1000.webp",
        features: ["🔍 Diamètre 3-18mm", "📏 Longueur 30-45cm", "🩺 Interventions/tumeurs/stents", "🛡️ Métal rigide", "🔧 Compatible instruments", "📐 Tailles multiples (7-9mm adulte)"]
      },
    ],
    features: ["🔬 Diagnostic précis", "🩺 Intervention sécurisée", "🛡️ Stérile médical", "😌 Confort patient", "⭐ Fiabilité clinique"],
  },
];