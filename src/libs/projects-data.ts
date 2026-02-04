// =========================
// TYPES
// =========================

export interface Project {
  id: number;
  title: string;
  role: string;
  description: string;
  fullDescription: string;
  image: string;
  tech: string[];
  features: string[];
  challenges?: string;
  screenshots?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

// =========================
// DATA
// =========================

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Terminal Web Interactif",
    role: "Développeur Frontend",
    description:
      "Interface de terminal moderne et entièrement interactive intégrée dans le navigateur.",
    fullDescription:
      "Un terminal web dynamique construit avec Next.js et Tailwind CSS, offrant une expérience proche d’un terminal natif directement dans le navigateur. Le projet inclut un moteur de commandes personnalisées, un historique complet, l’autocomplétion, une documentation intégrée, ainsi qu’une structure modulaire permettant d’ajouter facilement de nouvelles commandes. L’objectif est de créer une interface réactive, immersive et extensible, destinée à démontrer des compétences avancées en développement frontend.",
    image: "/assets/images/terminal.png",
    tech: ["Next.js ", "React", "Tailwind CSS", "TypeScript"],
    features: [
      "Moteur de commandes personnalisées",
      "Historique de commandes avec navigation",
      "Autocomplétion intelligente",
      "Documentation intégrée",
      "Scroll automatique contextuel",
    ],
    challenges:
      "Le défi principal a été de gérer correctement les effets liés au scroll et au rendu dynamique des lignes de terminal, tout en assurant une UX cohérente et fluide lors de l'exécution des commandes.",
    screenshots: ["/assets/images/documentation_terminal.png"],
    liveUrl: "https://terminal-six-blush.vercel.app/",
    githubUrl: "https://github.com/odounlami/terminal",
  },
  {
    id: 2,
    title: "Générateur de Pronostics IA",
    role: "Développeur Full-Stack (Front-End oriented)",
    description:
      "Application générant des coupons de pronostics personnalisés selon le budget et les cotes souhaitées.",
    fullDescription:
      "Une application intelligente qui prend en entrée le budget de l'utilisateur et la cote désirée pour générer automatiquement des pronostics optimisés.",
    image:
      "/assets/images/football.png",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "IA"],
    features: [
      "Saisie dynamique du budget et des cotes",
      "Génération automatique de coupons de pronostics",
      "Interface responsive et intuitive",
      "Conseils de jeu responsable intégrés",
    ],
    challenges:
      "Optimiser les combinaisons générées par l'IA pour qu'elles respectent le budget et la cote tout en restant réalistes, et maintenir la performance avec des requêtes fréquentes à l'API.",   
    screenshots: ["/assets/images/football2.png", "/assets/images/football3.png"],
      liveUrl: "https://football-generateur.vercel.app/",
    githubUrl: "https://github.com/odounlami/FootballGenerateur",
  },
  {
    id: 3,
    title: "Mobile Banking App",
    role: "Développeur Mobile",
    description:
      "Application bancaire mobile sécurisée avec authentification biométrique.",
    fullDescription:
      "Application bancaire mobile cross-platform offrant une expérience sécurisée et intuitive. Intègre l'authentification biométrique (Face ID/Touch ID) et le chiffrement de bout en bout.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    tech: ["React Native", "Firebase", "TypeScript", ""],
    features: [
      "Authentification biométrique",
      "Transferts instantanés",
      "Historique des transactions",
      "Notifications push intelligentes",
      "Gestion multi-comptes",
    ],
    challenges:
      "Assurer la sécurité maximale tout en maintenant une expérience utilisateur simple et rapide.",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "AI Content Generator",
    role: "Développeur Full Stack",
    description:
      "Générateur de contenu IA pour les réseaux sociaux avec prévisualisation.",
    fullDescription:
      "Outil de génération de contenu alimenté par l'IA (OpenAI GPT-4) permettant de créer des publications optimisées pour différentes plateformes sociales avec prévisualisation en temps réel.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    tech: ["Next.js", "OpenAI", "Tailwind", "Prisma", "NextAuth"],
    features: [
      "Génération de contenu multi-plateforme",
      "Prévisualisation en temps réel",
      "Optimisation SEO automatique",
      "Planification de posts",
      "Analyse de performance",
    ],
    challenges:
      "Gérer les coûts d'API OpenAI tout en offrant une génération rapide et de qualité.",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Fitness Tracker",
    role: "Développeur Mobile",
    description:
      "Application de suivi fitness avec synchronisation wearables et coaching personnalisé.",
    fullDescription:
      "Application complète de suivi fitness qui se synchronise avec les appareils portables populaires et offre un coaching personnalisé basé sur l'IA.",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80",
    tech: ["Flutter", "Python", "TensorFlow", "FastAPI", "PostgreSQL"],
    features: [
      "Synchronisation avec Apple Watch et Fitbit",
      "Plans d'entraînement personnalisés par IA",
      "Suivi nutritionnel",
      "Analyse de la récupération",
      "Communauté et défis",
    ],
    challenges:
      "Développer des algorithmes de ML précis pour la recommandation d'exercices basés sur les données physiologiques.",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Real Estate CRM",
    role: "Développeur Full Stack",
    description:
      "CRM immobilier avec géolocalisation et visites virtuelles 360°.",
    fullDescription:
      "Système CRM complet pour agences immobilières incluant la géolocalisation, des visites virtuelles 360° et un système de gestion des leads intelligent.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    tech: ["Angular", "Laravel", "MySQL", "Mapbox", "Three.js"],
    features: [
      "Visites virtuelles 360°",
      "Carte interactive avec géolocalisation",
      "Gestion automatisée des leads",
      "Système de rendez-vous intégré",
      "Rapports et analytics",
    ],
    challenges:
      "Optimiser le chargement des visites 360° haute résolution pour une expérience fluide même sur mobile.",
    liveUrl: "#",
    githubUrl: "#",
  },
];

// Fonction helper pour récupérer un projet par ID
export function getProjectById(id: number): Project | undefined {
  return PROJECTS.find((project) => project.id === id);
}
