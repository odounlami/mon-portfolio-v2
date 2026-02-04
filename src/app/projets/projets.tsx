"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project, PROJECTS } from "@/libs/projects-data";


gsap.registerPlugin(ScrollTrigger);

// =========================
// PROJECT CARD
// =========================

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <article
      ref={cardRef}
      tabIndex={0}
      className="relative group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay sombre fixe */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none" />

        {/* Overlay liens */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label={`Voir ${project.title} en live`}
            >
              Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label={`Code source de ${project.title}`}
            >
              Code
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
        
        {/* Techs + Détails button */}
        <div className="flex items-center gap-3">
          {/* Techs (max 3) */}
          <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
            {project.tech.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-purple-500/10 text-purple-300 text-xs font-medium rounded-full border border-purple-500/20 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-3 py-1 bg-purple-500/10 text-purple-300 text-xs font-medium rounded-full border border-purple-500/20 whitespace-nowrap">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
          
          {/* Détails button */}
          <a
            href={`/projets/${project.id}`}
            className="flex-shrink-0 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 whitespace-nowrap"
            aria-label={`Voir les détails de ${project.title}`}
          >
            Détails
          </a>
        </div>
      </div>
    </article>
  );
}

// =========================
// MAIN SECTION
// =========================

export default function MesProjets() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20 px-4 md:px-8">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            Mes{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Projets
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Découvrez une sélection de mes réalisations récentes
          </p>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}