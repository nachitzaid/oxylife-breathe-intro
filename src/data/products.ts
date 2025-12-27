export interface ProductVariant {
  id: string
  title: string
  description: string
  image: string
}

export interface Product {
  id: string
  title: string
  description: string
  gradient: string
  variants: ProductVariant[]
  features: string[]
}

export const products: Product[] = [
  {
    id: "oxygene-liquide",
    title: "Oxygène Liquide",
    description: "Solutions d'oxygénothérapie liquide à domicile.",
    gradient: "from-blue-500 to-cyan-500",
    variants: [
      {
        id: "helios-s46",
        title: "Stationnaire HELiOS S46",
        description: "Solution robuste pour un usage prolongé à domicile avec une autonomie exceptionnelle.",
        image: "medical oxygen stationary tank",
      },
      {
        id: "helios-plus",
        title: "Portable HELiOS Plus",
        description: "Légèreté et mobilité accrues pour vos déplacements quotidiens en toute sécurité.",
        image: "portable medical oxygen tank",
      },
      {
        id: "bottles",
        title: "Bouteilles d'Oxygène",
        description: "Différentes tailles disponibles pour un stockage et un usage d'appoint flexibles.",
        image: "oxygen therapy bottles",
      },
    ],
    features: ["🏠 Domicile", "🚶 Mobilité", "❄️ Cryogénie", "🕒 24/7 Support"],
  },
  {
    id: "concentrateur-doxygene",
    title: "Concentrateur d'Oxygène",
    description: "Autonomie respiratoire fixe et portable.",
    gradient: "from-cyan-500 to-teal-500",
    variants: [
      {
        id: "everflo",
        title: "Philips EverFlo",
        description: "Usage stationnaire performant avec un niveau sonore extrêmement faible.",
        image: "Philips EverFlo concentrator",
      },
      {
        id: "simplygo-mini",
        title: "SimplyGo Mini",
        description: "Liberté totale avec batterie intégrée pour une mobilité sans compromis.",
        image: "portable oxygen concentrator",
      },
      {
        id: "perfecto2",
        title: "Invacare Perfecto2",
        description: "Technologie avancée pour une autonomie longue durée et une fiabilité clinique.",
        image: "Invacare Perfecto2 concentrator",
      },
    ],
    features: ["🔊 Silencieux", "🔋 Portable", "⚡ Économe", "✈️ Approuvé Vol"],
  },
  {
    id: "ppc",
    title: "Les PPC",
    description: "Traitement de l'apnée du sommeil.",
    gradient: "from-teal-500 to-emerald-500",
    variants: [
      {
        id: "resmed-s10",
        title: "ResMed S10 AirSense",
        description: "Réglages automatiques intelligents pour un confort de sommeil inégalé.",
        image: "ResMed CPAP machine",
      },
      {
        id: "prisma-20a",
        title: "Löwenstein Prisma 20A",
        description: "Excellence clinique et précision pour un traitement personnalisé.",
        image: "Prisma CPAP device",
      },
      {
        id: "simulation",
        title: "Utilisation réelle",
        description: "Visualisez l'intégration et l'ajustement du dispositif pour un patient.",
        image: "patient using CPAP machine",
      },
    ],
    features: ["🌙 Sommeil", "🛏️ Confort", "📊 Suivi App", "🌬️ Auto-CPAP"],
  },
  {
    id: "vni",
    title: "Ventilation (VNI)",
    description: "Assistance respiratoire sécurisée.",
    gradient: "from-emerald-500 to-green-500",
    variants: [
      {
        id: "astral",
        title: "ResMed Astral",
        description: "Modes respiratoires variés pour s'adapter à chaque besoin spécifique.",
        image: "ResMed Astral ventilator",
      },
      {
        id: "dreamstation",
        title: "Dreamstation AVAPS",
        description: "Réglages avancés pour une ventilation douce et efficace à domicile.",
        image: "Philips Dreamstation ventilator",
      },
      {
        id: "home-usage",
        title: "Usage Domicile",
        description: "Installation simplifiée et sécurité maximale pour une tranquillité d'esprit.",
        image: "home mechanical ventilation",
      },
    ],
    features: ["🫁 Soins Domicile", "🛡️ Sécurisé", "📉 Modes Multiples"],
  },
  {
    id: "masques-respiratoires",
    title: "Masques",
    description: "Confort et étanchéité maximale.",
    gradient: "from-green-500 to-lime-500",
    variants: [
      {
        id: "nasal-n10",
        title: "Masque Nasal N10",
        description: "Design léger et discret pour une liberté de mouvement optimale.",
        image: "nasal CPAP mask",
      },
      {
        id: "facial-f10",
        title: "Masque Facial F10",
        description: "Confort complet et étanchéité parfaite pour une thérapie efficace.",
        image: "full face CPAP mask",
      },
      {
        id: "accessories",
        title: "Accessoires & Harnais",
        description: "Pièces de rechange et harnais ergonomiques pour un ajustement sur mesure.",
        image: "CPAP mask headgear",
      },
    ],
    features: ["😷 Tous Visages", "✨ Silicone Premium", "🤫 Silencieux"],
  },
  {
    id: "autres-produits",
    title: "Autres Produits",
    description: "Accessoires et diagnostics avancés.",
    gradient: "from-lime-500 to-yellow-500",
    variants: [
      {
        id: "talc",
        title: "Talc Novatech",
        description: "Solution spécifique pour les soins post-opératoires et la protection.",
        image: "medical talc bottle",
      },
      {
        id: "protheses",
        title: "Prothèses Respiratoires",
        description: "Confort et esthétique pour une intégration naturelle et fonctionnelle.",
        image: "tracheal prosthesis",
      },
      {
        id: "bronchoscope",
        title: "Bronchoscope",
        description: "Précision clinique pour les examens et diagnostics approfondis.",
        image: "medical bronchoscope",
      },
    ],
    features: ["🔍 Diagnostic", "🩹 Post-Soin", "🦾 Prothèses"],
  },
]
