/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const valuesRef = useRef<HTMLDivElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Détecter la préférence de mouvement réduit
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Animation d'entrée au scroll
  useEffect(() => {
    if (!titleRef.current || !contentRef.current || !valuesRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (prefersReducedMotion) {
              gsap.set(
                [titleRef.current, contentRef.current, valuesRef.current],
                { opacity: 1, y: 0 }
              );
            } else {
              const tl = gsap.timeline();
              tl.fromTo(
                titleRef.current!,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
              )
                .fromTo(
                  contentRef.current ? Array.from(contentRef.current.children) : [],
                  { opacity: 0, y: 20 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power2.out",
                  },
                  "-=0.4"
                )
                .fromTo(
                  valuesRef.current ? Array.from(valuesRef.current.children) : [],
                  { opacity: 0, x: -20 },
                  {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                  },
                  "-=0.2"
                );
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const values = [
    {
      icon: "⚡",
      title: "Performance",
      description: "Code optimisé, temps de chargement minimal",
    },
    {
      icon: "♿",
      title: "Accessibilité",
      description: "Interfaces inclusives et conformes WCAG",
    },
    {
      icon: "🎨",
      title: "Design System",
      description: "Cohérence visuelle et composants réutilisables",
    },
    {
      icon: "🔧",
      title: "Maintenabilité",
      description: "Code propre, documenté et évolutif",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-20 px-4 relative overflow-hidden"
      aria-labelledby="about-title"
    >
      {/* Background décoratif */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[120px]" />
      </div>

      {/* Pattern de grille subtil */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>

      <div className="max-w-6xl w-full space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2
            id="about-title"
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold"
          >
            À propos de{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              moi
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Contenu principal */}
        <div
          ref={contentRef}
          className="space-y-6 text-slate-300 text-base md:text-lg leading-relaxed max-w-5xl mx-auto"
        >
          <p className="text-xl md:text-2xl text-slate-200 font-medium">
            Développeur <strong className="text-blue-400">front-end</strong>{" "}
            passionné par la création d'expériences web{" "}
            <strong className="text-purple-400">modernes</strong>,{" "}
            <strong className="text-purple-400">performantes</strong> et{" "}
            <strong className="text-purple-400">accessibles</strong>.
          </p>

          <p>
            Mon approche se concentre sur la{" "}
            <strong className="text-blue-400">qualité du code</strong> et
            l'expérience utilisateur. Je conçois des interfaces intuitives avec
            des composants réutilisables, en privilégiant la simplicité et
            l'efficacité plutôt que la complexité inutile.
          </p>

          <p>
            Spécialisé en{" "}
            <strong className="text-purple-400">Angular</strong> et{" "}
            <strong className="text-purple-400">Next.js</strong>, je maîtrise
            l'écosystème JavaScript moderne (TypeScript, React, TailwindCSS,
            GSAP) et possède une solide compréhension du back-end, me permettant
            de collaborer efficacement sur des projets full-stack.
          </p>

          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-l-4 border-blue-500 rounded-r-lg p-6 my-8">
            <p className="text-slate-200 italic">
              "Je m'investis dans des projets où la{" "}
              <strong className="text-blue-400">qualité du produit</strong>, la{" "}
              <strong className="text-purple-400">vision long terme</strong> et
              l'<strong className="text-blue-400">impact réel</strong> comptent
              vraiment."
            </p>
          </div>
        </div>

        {/* Valeurs / Principes */}
        <div className="space-y-8">
          <h3 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Mes principes de développement
          </h3>

          <div
            ref={valuesRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-semibold text-blue-400 mb-2 group-hover:text-purple-400 transition-colors duration-300">
                      {value.title}
                    </h4>
                    <p className="text-slate-400 text-sm md:text-base">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          >
            Discutons de votre projet
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Styles pour animations */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
