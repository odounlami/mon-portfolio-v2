"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getProjectById, Project } from "@/libs/projects-data";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const projectId = parseInt(params.id as string);
  const project: Project | undefined = getProjectById(projectId);

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;

    // Hero animation
    gsap.fromTo(
      heroRef.current.querySelectorAll("h1, p"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    );

    // Sections animation on scroll
    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Projet non trouvé</h1>
          <p className="text-slate-400">
            Ce projet n&apos;existe pas ou a été supprimé.
          </p>
          <button
            onClick={() => router.push("/projets")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour aux projets
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Background decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 group transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Retour aux projets
        </button>

        {/* Hero */}
        <div ref={heroRef} className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          {/* Texte sur l'image */}
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 lg:bottom-16 lg:left-16">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-xl">
              {project.title}
            </h1>
            {project.description && (
              <p className="mt-2 text-lg md:text-xl text-slate-200 drop-shadow-md max-w-xl">
                {project.description}
              </p>
            )}
          </div>
        </div>

        {/* Sections */}
        <div ref={contentRef} className="mt-16 space-y-12">
          <ProjectSection title="Rôle">
            <p className="text-slate-300 text-lg">{project.role}</p>
          </ProjectSection>

          <ProjectSection title="Technologies utilisées">
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech, idx) => (
                <TechBadge key={idx} name={tech} />
              ))}
            </div>
          </ProjectSection>

          <ProjectSection title="À propos du projet">
            <p className="text-slate-300 leading-relaxed">{project.fullDescription}</p>
          </ProjectSection>

          <ProjectSection title="Fonctionnalités principales">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, idx) => (
                <FeatureItem key={idx} text={feature} />
              ))}
            </ul>
          </ProjectSection>

          {project.challenges && (
            <ProjectSection title="Défis techniques">
              <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <p className="text-slate-300 leading-relaxed">{project.challenges}</p>
              </div>
            </ProjectSection>
          )}

          {project.screenshots && project.screenshots.length > 0 && (
            <ProjectSection title="Captures d'écran">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.screenshots.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative h-64 rounded-xl overflow-hidden border border-slate-700/50 shadow-lg"
                  >
                    <Image src={src} alt={`Screenshot ${idx + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </ProjectSection>
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl border border-purple-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Intéressé par ce projet ?
          </h3>
          <p className="text-slate-300 mb-6">
            N&apos;hésitez pas à me contacter pour en discuter davantage.
          </p>
          <button
            onClick={() => router.push("/contact")}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
          >
            Me contacter
          </button>
        </div>
      </div>
    </main>
  );
}

// ----------------- Components -----------------
function ProjectSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function TechBadge({ name }: { name: string }) {
  return (
    <span className="px-4 py-2 bg-purple-500/10 text-purple-300 text-sm font-medium rounded-full border border-purple-500/20">
      {name}
    </span>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-400 text-sm font-bold mt-0.5">
        ✓
      </span>
      <span className="text-slate-300">{text}</span>
    </li>
  );
}
