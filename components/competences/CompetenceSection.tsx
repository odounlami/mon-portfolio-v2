/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { skillGroups } from "@/data/skills";

export default function CompetenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const skillsTitleRef = useRef<HTMLHeadingElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const INITIAL_SKILLS_COUNT = 7;
  const AUTO_PLAY_INTERVAL = 6000;

  // Préférences utilisateur
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Visibilité onglet
  useEffect(() => {
    const handleVisibilityChange = () => setIsTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Détection section visible
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsSectionVisible(true);
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Expansion
  const toggleCategoryExpansion = useCallback((categoryTitle: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryTitle)) newSet.delete(categoryTitle);
      else newSet.add(categoryTitle);
      return newSet;
    });
  }, []);

  // Couleurs
  const getColorClasses = useCallback((color: string) => {
    const colors: { [key: string]: string } = {
      blue: "bg-blue-500/20 text-blue-400",
      green: "bg-green-500/20 text-green-400",
      red: "bg-red-500/20 text-red-400",
      purple: "bg-purple-500/20 text-purple-400",
      yellow: "bg-yellow-500/20 text-yellow-400",
      orange: "bg-orange-500/20 text-orange-400",
      cyan: "bg-cyan-500/20 text-cyan-400",
      pink: "bg-pink-500/20 text-pink-400",
      indigo: "bg-indigo-500/20 text-indigo-400",
      teal: "bg-teal-500/20 text-teal-400",
      slate: "bg-slate-500/20 text-slate-400",
      gray: "bg-gray-500/20 text-gray-400",
    };
    return colors[color] || colors.blue;
  }, []);

  // Auto-play
  const startAutoPlay = useCallback(() => {
    if (prefersReducedMotion || isPaused || !isTabVisible || !isSectionVisible) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % skillGroups.length);
      setExpandedCategories(new Set());
    }, AUTO_PLAY_INTERVAL);
  }, [prefersReducedMotion, isPaused, isTabVisible, isSectionVisible]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetAutoPlay = useCallback(() => {
    stopAutoPlay();
    startAutoPlay();
  }, [stopAutoPlay, startAutoPlay]);

  // Navigation
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % skillGroups.length);
    setExpandedCategories(new Set());
    resetAutoPlay();
  }, [resetAutoPlay]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + skillGroups.length) % skillGroups.length);
    setExpandedCategories(new Set());
    resetAutoPlay();
  }, [resetAutoPlay]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setExpandedCategories(new Set());
    resetAutoPlay();
  }, [resetAutoPlay]);

  // Interactions souris
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
    stopAutoPlay();
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  }, [stopAutoPlay]);

  const handleMouseLeave = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setIsPaused(false), 2000);
  }, []);

  // Effet auto-play
  useEffect(() => {
    if (!prefersReducedMotion && !isPaused && isTabVisible && isSectionVisible) startAutoPlay();
    else stopAutoPlay();
    return () => {
      stopAutoPlay();
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [prefersReducedMotion, isPaused, isTabVisible, isSectionVisible, startAutoPlay, stopAutoPlay]);

  // Animations cartes
  useEffect(() => {
    if (!carouselRef.current || prefersReducedMotion || !isSectionVisible) return;
    const currentCards = carouselRef.current.querySelectorAll(`.slide-${currentIndex} .skill-card`);
    gsap.fromTo(currentCards, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" });
  }, [currentIndex, prefersReducedMotion, isSectionVisible]);

  // Carousel
  useEffect(() => {
    if (!carouselRef.current) return;
    const transform = `translateX(-${currentIndex * 100}%)`;
    const transition = prefersReducedMotion ? "none" : "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)";
    carouselRef.current.style.transform = transform;
    carouselRef.current.style.transition = transition;
  }, [currentIndex, prefersReducedMotion]);

  // Titre
  useEffect(() => {
    if (!skillsTitleRef.current) return;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (prefersReducedMotion) gsap.set(skillsTitleRef.current, { opacity: 1, y: 0 });
            else gsap.fromTo(skillsTitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(skillsTitleRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      else if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col justify-center items-center bg-[#0F172A] text-white py-20 px-4"
      aria-labelledby="skills-title"
    >
      {/* Titre */}
      <div className="w-full max-w-5xl mb-16">
        <h2
          id="skills-title"
          ref={skillsTitleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center"
        >
          Mes{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Compétences
          </span>
        </h2>
      </div>

      {/* Container */}
      <div className="relative w-full max-w-5xl">
        {/* Flèches */}
        <button onClick={prevSlide} className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 z-20 focus:outline-none focus:ring-4 focus:ring-blue-500/50" aria-label="Compétences précédentes">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button onClick={nextSlide} className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 z-20 focus:outline-none focus:ring-4 focus:ring-blue-500/50" aria-label="Compétences suivantes">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel */}
        <div className="overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} role="region" aria-label="Carrousel de compétences" aria-live="polite">
          <div ref={carouselRef} className="flex">
            {skillGroups.map((group, groupIndex) => {
              const isExpanded = expandedCategories.has(group.title);
              const visibleSkills = isExpanded ? group.skills : group.skills.slice(0, INITIAL_SKILLS_COUNT);
              const hasMore = group.skills.length > INITIAL_SKILLS_COUNT;

              return (
                <div key={group.title} className={`w-full flex-shrink-0 px-4 slide-${groupIndex}`} aria-hidden={groupIndex !== currentIndex}>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-blue-400">{group.title}</h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6" role="list" aria-label={`Compétences ${group.title}`}>
                    {visibleSkills.map((skill) => {
                      const colorClass = getColorClasses(skill.color);
                      return (
                        <div key={skill.name} className="skill-card group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 min-h-[140px] flex flex-col items-center justify-center text-center hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300" role="listitem">
                          <div className={`w-10 h-10 mb-3 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${colorClass}`} aria-hidden="true">
                            {skill.iconType === "image" ? <img src={skill.icon as string} alt="" className="w-5 h-5 object-contain" /> : (() => {
                              const IconComponent = skill.icon as React.ComponentType<{ className?: string }>;
                              return <IconComponent className="w-5 h-5" />;
                            })()}
                          </div>
                          <p className="text-sm font-medium text-slate-300 group-hover:text-blue-300 transition-colors">{skill.name}</p>
                        </div>
                      );
                    })}

                    {hasMore && (
                      <button onClick={() => toggleCategoryExpansion(group.title)} className="skill-card group relative bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border-2 border-dashed border-slate-600/50 rounded-xl p-4 min-h-[140px] flex flex-col items-center justify-center text-center hover:border-blue-500/50 hover:bg-slate-800/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50" aria-expanded={isExpanded} aria-label={isExpanded ? "Afficher moins de compétences" : `Afficher ${group.skills.length - INITIAL_SKILLS_COUNT} compétences supplémentaires`}>
                        <div className="w-10 h-10 mb-3 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                          <span className="text-2xl font-light text-blue-400">{isExpanded ? "×" : "+"}</span>
                        </div>
                        <p className="text-sm font-medium text-blue-300 group-hover:text-blue-200 transition-colors">{isExpanded ? "Moins" : `${group.skills.length - INITIAL_SKILLS_COUNT} de plus`}</p>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Indicateurs */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          {skillGroups.map((_, index) => (
            <button key={index} onClick={() => goToSlide(index)} className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${index === currentIndex ? "w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-500" : "w-2 h-2 bg-white/30 hover:bg-white/50"}`} aria-label={`Aller à ${skillGroups[index].title}`} aria-current={index === currentIndex ? "true" : "false"} />
          ))}
        </div>
        <p className="text-sm text-white/40">{currentIndex + 1} / {skillGroups.length}</p>
      </div>

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
