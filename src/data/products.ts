export interface ProductVariant {
  id: string
  title: string
  description: string
  image: string
}

export interface Product {
  id: string
  title: string
  description: string  // Courte et impactante → visible sur la carte animée
  gradient: string     // Couleurs vives et modernes pour un effet wow au scroll
  variants: ProductVariant[]
  features: string[]   // Avec émojis pour plus de vie
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
      },
      {
        id: "helios-plus",
        title: "🎒 Portable HELiOS Plus",
        description: "Mobilité sans limite ! Ultra-léger et discret, accompagnez vos sorties quotidiennes avec une oxygénothérapie continue en toute liberté.",
        image: "Bouteilles-oxigene.jpg",
      },
      {
        id: "bottles",
        title: "🧳 Bouteilles d’Oxygène",
        description: "Réserve flexible ! Disponibles en plusieurs tailles pour un usage d’appoint pratique et facile à transporter.",
        image: "oxygene.jpg",
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
      },
      {
        id: "simplygo-mini",
        title: "✈️ SimplyGo Mini",
        description: "Liberté de mouvement ! Le plus léger du marché, batterie longue durée, certifié avion – votre oxygène vous suit partout.",
        image: "simpligo mini.webp",
      },
      {
        id: "invacare",
        title: "🛡️ Invacare Perfecto2",
        description: "Fiabilité clinique ! Débit constant et autonomie longue durée pour une oxygénothérapie sécurisée et sans interruption.",
        image: "INVACARE.webp",
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
      },
      {
        id: "prisma-20a",
        title: "🇩🇪 Löwenstein Prisma 20A",
        description: "Précision allemande ! Algorithme avancé et humidification optimale pour une thérapie douce et parfaitement adaptée.",
        image: "Löwenstein Prisma 20A.webp",
      },
      {
        id: "resvent",
        title: "🖥️ Resvent BiPAP",
        description: "Innovation moderne ! Écran tactile intuitif et design compact pour une prise en charge personnalisée et confortable.",
        image: "Resvent.jpg",
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
      },
      {
        id: "dreamstation",
        title: "❤️ DreamStation AVAPS",
        description: "Ventilation douce et intelligente ! Volume respiratoire constant pour une prise en charge stable et confortable à domicile.",
        image: "Dreamstation AVAPS.jpg",
      },
      {
        id: "dreamstation-alt",
        title: "🏠 DreamStation BiPAP",
        description: "Confort quotidien ! Interface intuitive et humidification adaptative pour une ventilation non invasive agréable et efficace.",
        image: "Dreamstation AVAPS.webp",
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
      },
      {
        id: "facial-f10",
        title: "👀 Masque Facial F10",
        description: "Vision panoramique ! Joint InfinitySeal s’adapte parfaitement pour une étanchéité optimale, même à haute pression.",
        image: "Masque Facial F10.webp",
      },
      {
        id: "harnais",
        title: "🎀 Harnais & Accessoires",
        description: "Ajustement sur mesure ! Harnais respirants et coussins hypoallergéniques pour un port prolongé sans irritation.",
        image: "HARNAIS.jpeg",
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
      },
      {
        id: "protheses",
        title: "🦾 Prothèses Respiratoires",
        description: "Respiration naturelle ! Prothèses en silicone biocompatible qui maintiennent ouvertes les voies aériennes avec un confort optimal.",
        image: "endo-prothèses.jpg",
      },
      {
        id: "bronchoscope",
        title: "🔍 Bronchoscope Rigide",
        description: "Précision diagnostique exceptionnelle ! Instrument innovant pour explorations et interventions bronchiques sécurisées et efficaces.",
        image: "rigid-bronchoscope-set-1000x1000.webp",
      },
    ],
    features: ["🔬 Diagnostic précis", "🩺 Intervention sécurisée", "🛡️ Stérile médical", "😌 Confort patient", "⭐ Fiabilité clinique"],
  },
];