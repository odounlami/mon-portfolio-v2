"use client";

import { useEffect, useRef, ReactNode } from "react";
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

    gsap.fromTo(
      heroRef.current.querySelectorAll("h1, p"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    );

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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Projet non trouvé</h1>
          <button
            type="button"
            onClick={() => router.push("/#projets")}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition active:scale-[0.98]"
          >
            <ArrowLeft className="w-5 h-5 shrink-0" />
            Retour aux projets
          </button>
        </div>
      </div>
    );
  }

  const hasHeroLinks = !!(project.liveUrl || project.githubUrl);

  const actionLinkClass =
    "inline-flex flex-1 sm:flex-none min-h-[48px] items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base transition-colors active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900";

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Décalage sous le header fixe (z-50) pour que le retour reste visible */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-16 md:pb-24">

        {/* Back */}
        <button
          type="button"
          onClick={() => router.back()}
          className="relative z-20 inline-flex items-center gap-2 min-h-[44px] px-3 py-2 mb-5 sm:mb-8 rounded-lg text-slate-200 hover:text-white bg-slate-800/40 hover:bg-slate-800/80 border border-slate-600/50 transition-colors w-fit"
        >
          <ArrowLeft className="w-5 h-5 shrink-0" aria-hidden />
          <span>Retour aux projets</span>
        </button>

        {/* HERO — hauteur fluide + image responsive */}
        <div
          ref={heroRef}
          className="relative w-full h-[clamp(200px,40vh,380px)] sm:h-[320px] md:h-[420px] lg:h-[520px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1152px"
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

          {/* TEXT — laisse la place aux boutons sur mobile */}
          <div
            className={`absolute left-4 right-4 sm:left-8 sm:right-8 md:max-w-2xl ${
              hasHeroLinks
                ? "bottom-[7.5rem] sm:bottom-8 md:bottom-10"
                : "bottom-6 sm:bottom-8 md:bottom-10"
            }`}
          >
            <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              {project.title}
            </h1>
            {project.description && (
              <p className="mt-2 text-sm sm:text-lg text-slate-200 line-clamp-3 sm:line-clamp-none max-w-xl">
                {project.description}
              </p>
            )}
          </div>

          {/* ACTION BUTTONS — toujours visibles sur mobile, hover sur md+ */}
          {hasHeroLinks && (
            <div
              className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:bottom-6 md:right-6 md:left-auto md:p-0 flex flex-row sm:flex-wrap md:flex-nowrap gap-2 md:gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 bg-black/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none"
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${actionLinkClass} bg-purple-600 hover:bg-purple-700 text-white`}
                >
                  <ExternalLink size={18} className="shrink-0" aria-hidden />
                  Live
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${actionLinkClass} bg-slate-800 hover:bg-slate-700 text-white border border-slate-600/80`}
                >
                  <Github size={18} className="shrink-0" aria-hidden />
                  Code
                </a>
              )}
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div ref={contentRef} className="mt-10 sm:mt-16 space-y-10 sm:space-y-12">

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
            <p className="text-slate-300 leading-relaxed">
              {project.fullDescription}
            </p>
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
                <p className="text-slate-300">{project.challenges}</p>
              </div>
            </ProjectSection>
          )}

          {project.screenshots && project.screenshots.length > 0 && (
            <ProjectSection title="Captures d'écran">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                {project.screenshots.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative w-full aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900"
                  >
                    <Image
                      src={src}
                      alt={`Screenshot ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </ProjectSection>
          )}

        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl border border-purple-500/20 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
            Intéressé par ce projet ?
          </h3>
          <p className="text-slate-300 mb-6 text-sm sm:text-base">
            N&apos;hésitez pas à me contacter pour en discuter davantage.
          </p>
          <button
            type="button"
            onClick={() => router.push("/#contact")}
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition active:scale-[0.98]"
          >
            Me contacter
          </button>
        </div>

      </div>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function ProjectSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
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
