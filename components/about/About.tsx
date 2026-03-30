"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const parcours = [
  {
    type: "formation",
    titre: "Licence en Architecture Logicielle",
    lieu: "ESGIS · Cotonou",
    periode: "sept. 2021 – juin 2024",
    points: [
      "Conception et modélisation de systèmes logiciels complexes",
      "Algorithmique avancée et structures de données",
      "Gestion de projets Agile, UML, Merise",
    ],
    actuel: false,
  },
  {
    type: "experience",
    titre: "Stagiaire Dev Web & Mobile",
    lieu: "SEED-SARL · Houéyihô",
    periode: "mars 2024 – juin 2024",
    points: [
      "Interfaces utilisateur avec React.js",
      "API REST back-end avec Laravel",
      "Intégration FedaPay & cartes interactives",
    ],
    actuel: false,
  },
  {
    type: "experience",
    titre: "Développeur Front-end",
    lieu: "OBIDON · Cotonou",
    periode: "avr. 2025 – présent",
    points: [
      "Interfaces responsives depuis maquettes Figma",
      "Composants génériques réutilisables",
      "Modélisation UML fonctionnelle et technique",
    ],
    actuel: true,
  },
];

export default function Parcours() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const items = itemsRef.current.filter(Boolean);
    if (!titleRef.current || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (prefersReducedMotion) {
              gsap.set([titleRef.current, ...items], { opacity: 1, y: 0 });
            } else {
              const tl = gsap.timeline();
              tl.fromTo(
                titleRef.current!,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
              ).fromTo(
                items,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: "power2.out" },
                "-=0.4"
              );
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="parcours"
      className="w-full min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)" }}
      aria-labelledby="parcours-heading"
    >
      {/* Blobs décoratifs */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 right-10 w-80 h-80 bg-blue-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-sky-400 rounded-full blur-[120px]" />
      </div>

      {/* Grille subtile */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="parcours-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#parcours-grid)" />
        </svg>
      </div>

      <div className="max-w-4xl w-full relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2
            id="parcours-heading"
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white"
          >
            Mon{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(to right, #38bdf8, #818cf8)" }}
            >
              Parcours
            </span>
          </h2>
          <div
            className="w-20 h-1 mx-auto rounded-full"
            style={{ backgroundImage: "linear-gradient(to right, #38bdf8, #818cf8)" }}
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Ligne verticale centrale */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #38bdf8 20%, #818cf8 80%, transparent)",
            }}
            aria-hidden="true"
          />

          <div className="space-y-12">
            {parcours.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  ref={(el) => { itemsRef.current[i] = el; }}
                  className="relative flex flex-col md:flex-row items-center gap-6 md:gap-0"
                >
                  {/* Côté gauche */}
                  <div className={`w-full md:w-1/2 ${isLeft ? "md:pr-12" : "md:order-3 md:pl-12"}`}>
                    <div
                      className="rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(30,41,59,0.6), rgba(15,23,42,0.6))",
                        backdropFilter: "blur(8px)",
                        borderColor: item.actuel
                          ? "rgba(56,189,248,0.5)"
                          : "rgba(100,116,139,0.25)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.borderColor = "rgba(56,189,248,0.6)";
                        el.style.boxShadow = "0 8px 30px rgba(56,189,248,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.borderColor = item.actuel
                          ? "rgba(56,189,248,0.5)"
                          : "rgba(100,116,139,0.25)";
                        el.style.boxShadow = "none";
                      }}
                    >
                      {/* Badges */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span
                          className="text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded"
                          style={{
                            color: item.type === "formation" ? "#818cf8" : "#38bdf8",
                            backgroundColor:
                              item.type === "formation"
                                ? "rgba(129,140,248,0.1)"
                                : "rgba(56,189,248,0.1)",
                          }}
                        >
                          {item.type === "formation" ? "Formation" : "Expérience"}
                        </span>
                        {item.actuel && (
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: "#38bdf8", color: "#0F172A" }}
                          >
                            Actuel
                          </span>
                        )}
                      </div>

                      {/* Titre */}
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                        {item.titre}
                      </h3>

                      {/* Lieu · Période */}
                      <p className="text-sm mb-4" style={{ color: "#38bdf8", opacity: 0.75 }}>
                        {item.lieu} · {item.periode}
                      </p>

                      {/* Points */}
                      <ul className="space-y-1.5">
                        {item.points.map((point, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm"
                            style={{ color: "#94a3b8" }}
                          >
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{
                                backgroundColor:
                                  item.type === "formation" ? "#818cf8" : "#38bdf8",
                              }}
                              aria-hidden="true"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Point central */}
                  <div
                    className="hidden md:flex md:order-2 absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10"
                    style={{
                      backgroundColor: item.actuel ? "#38bdf8" : "#1E293B",
                      borderColor: item.actuel ? "#38bdf8" : "#475569",
                      boxShadow: item.actuel
                        ? "0 0 14px rgba(56,189,248,0.7)"
                        : "none",
                      top: "1.75rem",
                    }}
                    aria-hidden="true"
                  />

                  {/* Spacer côté opposé */}
                  <div className={`hidden md:block w-1/2 ${isLeft ? "md:order-3" : "md:order-1"}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}