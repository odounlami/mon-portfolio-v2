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
    image: "/assets/images/football.png",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "IA"],
    features: [
      "Saisie dynamique du budget et des cotes",
      "Génération automatique de coupons de pronostics",
      "Interface responsive et intuitive",
      "Conseils de jeu responsable intégrés",
    ],
    challenges:
      "Optimiser les combinaisons générées par l'IA pour qu'elles respectent le budget et la cote tout en restant réalistes, et maintenir la performance avec des requêtes fréquentes à l'API.",
    screenshots: [
      "/assets/images/football2.png",
      "/assets/images/football3.png",
    ],
    liveUrl: "https://football-generateur.vercel.app/",
    githubUrl: "https://github.com/odounlami/FootballGenerateur",
  },

 {
    id: 3,
    title: "ArchRoot",
    role: "Développeur Front-End",
    description:
      "Site vitrine pour un studio d'architecture et d'aménagement d'intérieur (interface en anglais).",
    fullDescription:
      "Une interface moderne mettant en valeur les projets du studio, avec galerie dynamique, informations détaillées sur les réalisations et responsive design adapté à tous les écrans.",
    image:
      "/assets/images/studio.png",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Responsive Design"],
    features: [
      "Galerie interactive des projets d'aménagement",
      "Navigation fluide et responsive",
      "Sections détaillées pour chaque projet",
      "Animations légères pour l'expérience utilisateur",
    ],
    challenges:
      "Organiser une présentation visuelle des projets de manière élégante tout en maintenant un temps de chargement optimal et une compatibilité mobile complète.",   
    screenshots: ["/assets/images/studio.png", "/assets/images/studio2.png"],
    liveUrl: "https://archroot.netlify.app/",
    githubUrl: "https://github.com/odounlami/architecture-studio",
  },


  {
    id: 4,
    title: "La Maison",
    role: "Développeur Front-End",
    description:
      "Site vitrine pour un restaurant avec menu interactif et informations pratiques.",
    fullDescription:
      "Un site responsive présentant le restaurant, son menu, ses horaires et son emplacement, avec une interface attractive et facile à naviguer pour les clients potentiels.",
    image: "/assets/images/restaurant.png",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Responsive Design"],
    features: [
      "Affichage dynamique du menu avec sections et images",
      "Carte interactive et informations de contact",
      "Animations d'apparition et transitions fluides",
      "Design orienté conversion et expérience client",
    ],
    challenges:
      "Créer une interface claire et appétissante qui reflète l'identité du restaurant tout en restant légère et rapide à charger sur mobile et desktop.",
    liveUrl: "https://mmaison.netlify.app/",
    githubUrl: "https://github.com/odounlami/restaurant-app",
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
