"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const parcours = [
  {
    type: "formation" as const,
    titre: "Licence en Architecture Logicielle",
    lieu: "ESGIS · Cotonou",
    periode: "2021 – 2024",
    points: [
      "Conception et modélisation de systèmes logiciels complexes",
      "Algorithmique avancée, UML, Merise",
      "Gestion de projets Agile",
    ],
    actuel: false,
  },
  {
    type: "experience" as const,
    titre: "Stagiaire Dev Web & Mobile",
    lieu: "SEED-SARL · Houéyihô",
    periode: "mars – juin 2024",
    points: [
      "Interfaces React.js orientées ergonomie",
      "API REST avec Laravel",
      "Intégration FedaPay & cartes interactives",
    ],
    actuel: false,
  },
  {
    type: "experience" as const,
    titre: "Développeur Front-end",
    lieu: "OBIDON SOLUTIONS· Cotonou",
    periode: "avr. 2025 – présent",
    points: [
      "Intégration pixel-perfect depuis maquettes Figma",
      "Composants génériques réutilisables (inputs, cards, formulaires)",
      "Modélisation UML fonctionnelle et technique",
    ],
    actuel: true,
  },
];

export default function Parcours() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement | null>(null);
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
    if (!headRef.current || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (prefersReducedMotion) {
              gsap.set([headRef.current, lineRef.current, ...items], {
                opacity: 1,
                y: 0,
                scaleY: 1,
              });
            } else {
              const tl = gsap.timeline();
              tl.fromTo(
                headRef.current!,
                { opacity: 0, y: 32 },
                { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }
              )
                .fromTo(
                  lineRef.current!,
                  { scaleY: 0, opacity: 0 },
                  {
                    scaleY: 1,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.inOut",
                    transformOrigin: "top",
                  },
                  "-=0.2"
                )
                .fromTo(
                  items,
                  { opacity: 0, y: 30 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.65,
                    stagger: 0.16,
                    ease: "power2.out",
                  },
                  "-=0.3"
                );
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="parcours"
      className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
      aria-labelledby="parcours-heading"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header — même style que Projets */}
        <div ref={headRef} className="text-center mb-10 sm:mb-14 md:mb-16 px-1">
          <h2
            id="parcours-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4"
          >
            Mon{" "}
            <span
              className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
             
            >
              Parcours
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            De l&apos;architecture logicielle au code qui dure — quelqu&apos;un qui pense
            les fondations avant de poser le premier composant.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Ligne verticale mobile — gauche fixe */}
          <div
            className="absolute md:hidden top-0 bottom-0 left-4 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--color-accent) 10%, #818cf8 90%, transparent)",
            }}
            aria-hidden="true"
          />

          {/* Ligne verticale desktop — centre */}
          <div
            ref={lineRef}
            className="absolute hidden md:block top-0 bottom-0 left-1/2 w-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--color-accent) 15%, #818cf8 85%, transparent)",
            }}
            aria-hidden="true"
          />

          <div className="space-y-6 sm:space-y-8 md:space-y-16">
            {parcours.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  ref={(el) => { itemsRef.current[i] = el; }}
                  className="relative"
                >
                  {/* ── MOBILE : colonne simple avec ligne à gauche ── */}
                  <div className="flex md:hidden items-start gap-4 pl-10">
                    {/* Point */}
                    <div
                      className="absolute left-[0.65rem] top-4 w-3.5 h-3.5 rounded-full border-2 z-10 flex-shrink-0"
                      style={{
                        backgroundColor: item.actuel ? "var(--color-accent)" : "#1e293b",
                        borderColor: item.actuel ? "var(--color-accent)" : "#475569",
                        boxShadow: item.actuel ? "0 0 10px rgba(56,189,248,0.6)" : "none",
                      }}
                    />
                    <CardMobile item={item} />
                  </div>

                  {/* ── DESKTOP : alternance gauche/droite ── */}
                  <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-8">
                    {isLeft ? <CardDesktop item={item} align="right" /> : <div />}
                    <Dot item={item} />
                    {!isLeft ? <CardDesktop item={item} align="left" /> : <div />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Card Mobile (toujours left-aligned, taille confortable) ───

function CardMobile({ item }: { item: (typeof parcours)[number] }) {
  return (
    <div
      className="w-full rounded-xl p-5 border transition-all duration-300"
      style={{
        background: "rgba(30,41,59,0.55)",
        backdropFilter: "blur(10px)",
        borderColor: item.actuel ? "rgba(56,189,248,0.4)" : "rgba(100,116,139,0.2)",
      }}
    >
      {/* Badges */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span
          className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded"
          style={{
            color: item.type === "formation" ? "#818cf8" : "var(--color-accent)",
            backgroundColor:
              item.type === "formation"
                ? "rgba(129,140,248,0.12)"
                : "rgba(56,189,248,0.1)",
          }}
        >
          {item.type === "formation" ? "Formation" : "Expérience"}
        </span>
        {item.actuel && (
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "var(--color-accent)", color: "#0f172a" }}
          >
            Actuel
          </span>
        )}
      </div>

      {/* Titre */}
      <h3 className="text-base sm:text-lg font-bold text-white mb-1 leading-snug">
        {item.titre}
      </h3>

      {/* Lieu · Période */}
      <p
        className="text-sm mb-4"
        style={{ color: "var(--color-accent)", opacity: 0.75 }}
      >
        {item.lieu} · {item.periode}
      </p>

      {/* Points */}
      <ul className="space-y-2">
        {item.points.map((point, j) => (
          <li
            key={j}
            className="flex items-start gap-2.5 text-sm leading-relaxed"
            style={{ color: "#94a3b8" }}
          >
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{
                backgroundColor:
                  item.type === "formation" ? "#818cf8" : "var(--color-accent)",
              }}
              aria-hidden="true"
            />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Card Desktop (alignement alterné) ───

type CardDesktopProps = {
  item: (typeof parcours)[number];
  align: "left" | "right";
};

function CardDesktop({ item, align }: CardDesktopProps) {
  return (
    <div className={`w-full ${align === "right" ? "text-right" : "text-left"}`}>
      <div
        className="inline-block w-full rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 cursor-default"
        style={{
          background: "rgba(30,41,59,0.45)",
          backdropFilter: "blur(10px)",
          borderColor: item.actuel ? "rgba(56,189,248,0.4)" : "rgba(100,116,139,0.2)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = "rgba(56,189,248,0.55)";
          el.style.boxShadow = "0 8px 32px rgba(56,189,248,0.09)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = item.actuel
            ? "rgba(56,189,248,0.4)"
            : "rgba(100,116,139,0.2)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Badges */}
        <div
          className={`flex items-center gap-2 mb-3 flex-wrap ${
            align === "right" ? "justify-end" : "justify-start"
          }`}
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded"
            style={{
              color: item.type === "formation" ? "#818cf8" : "var(--color-accent)",
              backgroundColor:
                item.type === "formation"
                  ? "rgba(129,140,248,0.12)"
                  : "rgba(56,189,248,0.1)",
            }}
          >
            {item.type === "formation" ? "Formation" : "Expérience"}
          </span>
          {item.actuel && (
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "var(--color-accent)", color: "#0f172a" }}
            >
              Actuel
            </span>
          )}
        </div>

        {/* Titre */}
        <h3 className="text-lg font-bold text-white mb-1 leading-snug">{item.titre}</h3>

        {/* Lieu · Période */}
        <p className="text-sm mb-4" style={{ color: "var(--color-accent)", opacity: 0.75 }}>
          {item.lieu} · {item.periode}
        </p>

        {/* Points */}
        <ul className="space-y-2">
          {item.points.map((point, j) => (
            <li
              key={j}
              className={`flex items-start gap-2.5 text-sm leading-relaxed ${
                align === "right" ? "flex-row-reverse" : "flex-row"
              }`}
              style={{ color: "#94a3b8" }}
            >
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor:
                    item.type === "formation" ? "#818cf8" : "var(--color-accent)",
                }}
                aria-hidden="true"
              />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Dot desktop ───

function Dot({ item }: { item: (typeof parcours)[number] }) {
  return (
    <div className="flex items-center justify-center flex-shrink-0">
      <div
        className="w-4 h-4 rounded-full border-2 z-10"
        style={{
          backgroundColor: item.actuel ? "var(--color-accent)" : "#1e293b",
          borderColor: item.actuel ? "var(--color-accent)" : "#475569",
          boxShadow: item.actuel ? "0 0 14px rgba(56,189,248,0.65)" : "none",
        }}
        aria-hidden="true"
      />
    </div>
  );
}