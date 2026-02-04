"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

interface Star {
  x: number;
  y: number;
  rotation: number;
  id: number;
  visible: boolean;
  size: number;
}

export default function IntroSection() {
  const [patternSize, setPatternSize] = useState(60);
  const [stars, setStars] = useState<Star[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const lastActivityTime = useRef<number>(0);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

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

  // Ajuster la taille du pattern selon largeur écran
  const updatePatternSize = useCallback(() => {
    const width = window.innerWidth;
    setPatternSize(
      width < 640 ? 20 : 
      width < 768 ? 30 : 
      width < 1024 ? 45 : 
      60
    );
  }, []);

  useEffect(() => {
    updatePatternSize();
    
    const debouncedResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(updatePatternSize, 150);
    };

    window.addEventListener("resize", debouncedResize, { passive: true });
    return () => {
      window.removeEventListener("resize", debouncedResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [updatePatternSize]);

  const launchStars = useCallback(() => {
    if (prefersReducedMotion) return;

    setStars([]);
    const width = window.innerWidth;
    const isMobile = width < 768;
    const numStars = isMobile 
      ? Math.floor(Math.random() * 3) + 2 
      : Math.floor(Math.random() * 8) + 5;
    const margin = isMobile ? 10 : 40;
    const rect = document.querySelector(".hero-text-container")?.getBoundingClientRect();

    const newStars: Star[] = Array.from({ length: numStars }, (_, i) => {
      let x = 0, y = 0, attempts = 0;
      
      do {
        x = Math.random() * (window.innerWidth - margin * 2) + margin;
        y = Math.random() * (window.innerHeight - margin * 2) + margin;
        attempts++;
      } while (
        attempts < 10 && 
        rect && 
        x >= rect.left - 50 && 
        x <= rect.right + 50 && 
        y >= rect.top - 50 && 
        y <= rect.bottom + 50
      );

      return {
        x,
        y,
        rotation: Math.random() * 360,
        id: Date.now() + i,
        visible: true,
        size: isMobile ? 10 + Math.random() * 8 : 15 + Math.random() * 15,
      };
    });

    setStars(newStars);
  }, [prefersReducedMotion]);

  const handleActivity = useCallback(() => {
    if (prefersReducedMotion) return;

    const now = Date.now();
    if (now - lastActivityTime.current < 100) return;
    
    lastActivityTime.current = now;
    setStars([]);
    
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    
    inactivityTimer.current = setTimeout(launchStars, 3000);
  }, [launchStars, prefersReducedMotion]);

  useEffect(() => {
    window.addEventListener("mousemove", handleActivity, { passive: true });
    window.addEventListener("touchstart", handleActivity, { passive: true });
    window.addEventListener("scroll", handleActivity, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("scroll", handleActivity);
    };
  }, [handleActivity]);

  // Animations d'entrée
  useEffect(() => {
    if (!nameRef.current || !textRef.current || !ctaRef.current) return;
    if (prefersReducedMotion) {
      gsap.set([nameRef.current, textRef.current, ctaRef.current], { opacity: 1 });
      return;
    }

    gsap.set(ctaRef.current, { opacity: 0, scale: 0.9 });

    requestAnimationFrame(() => {
      const nameSplit = new SplitText(nameRef.current, { type: "chars" });
      const textSplit = new SplitText(textRef.current, { type: "lines" });

      const tl = gsap.timeline();
      tl.from(nameSplit.chars, {
        duration: 0.5,
        opacity: 0,
        y: 12,
        stagger: 0.025,
        ease: "power3.out",
      })
        .from(textSplit.lines, {
          duration: 0.8,
          yPercent: 100,
          opacity: 0,
          stagger: 0.06,
          ease: "expo.out",
        }, 0.2)
        .to(ctaRef.current, {
          duration: 0.6,
          opacity: 1,
          scale: 1,
          ease: "back.out(1.4)",
        }, 0.4)
        .to(nameRef.current, {
          textShadow: "0px 0px 12px #38BDF8",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }, 0.6);
    });
  }, [prefersReducedMotion]);

  const handleNameClick = useCallback(() => {
    if (!nameRef.current || prefersReducedMotion) return;

    const rect = nameRef.current.getBoundingClientRect();
    const explosionStars: Star[] = Array.from({ length: 8 }, (_, i) => ({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      rotation: Math.random() * 360,
      id: Date.now() + i,
      visible: true,
      size: 12 + Math.random() * 8,
    }));

    setStars(explosionStars);

    requestAnimationFrame(() => {
      setTimeout(() => {
        const starEls = starsContainerRef.current?.querySelectorAll("svg");
        if (starEls) {
          gsap.to(starEls, {
            x: () => (Math.random() - 0.5) * 200,
            y: () => (Math.random() - 0.5) * 200,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          });
        }
      }, 30);
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    const nameElement = nameRef.current;
    if (!nameElement) return;

    nameElement.addEventListener("click", handleNameClick);
    return () => nameElement.removeEventListener("click", handleNameClick);
  }, [handleNameClick]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setTimeout(launchStars, 3500);
    return () => clearTimeout(timer);
  }, [launchStars, prefersReducedMotion]);

  const starsElements = useMemo(
    () =>
      stars.map((star) => (
        <svg
          key={star.id}
          className={`absolute transition-all duration-700 ${
            star.visible ? "opacity-100 animate-bounce-slow" : "opacity-0"
          }`}
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            transform: `rotate(${star.rotation}deg)`,
            fill: "#38BDF8",
            willChange: "transform, opacity",
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="presentation"
        >
          <path d="M12 2l3 6h6l-4 4 1 6-5-3-5 3 1-6-4-4h6z" />
        </svg>
      )),
    [stars]
  );

  return (
    <section
      className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-[var(--color-secondary)] relative overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background graphique - décoratif uniquement */}
      <div
        className="absolute inset-0 -z-10 opacity-15 sm:opacity-20 pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          role="presentation"
        >
          <defs>
            <pattern
              id="grid"
              width={patternSize}
              height={patternSize}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M${patternSize} 0L0 0 0 ${patternSize}`}
                stroke="#38BDF8"
                strokeWidth="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Étoiles décoratives */}
      <div
        ref={starsContainerRef}
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
      >
        {starsElements}
      </div>

      {/* Texte principal */}
      <div className="hero-text-container flex flex-col justify-center items-center text-center w-full px-4 sm:px-6 md:px-8 z-20 max-w-full sm:max-w-lg md:max-w-3xl mx-auto">
        <h1
          id="hero-title"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-snug sm:leading-tight mb-3 sm:mb-4"
        >
          Je suis{" "}
          <span
            ref={nameRef}
            className="text-[var(--color-accent)] font-extrabold block sm:inline whitespace-nowrap cursor-pointer select-none"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleNameClick();
              }
            }}
            aria-label="ODOUNLAMI OSCAR - Cliquez pour un effet visuel"
          >
            ODOUNLAMI OSCAR
          </span>
        </h1>
        <p
          ref={textRef}
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-xs sm:max-w-xl md:max-w-2xl mx-auto mb-5 sm:mb-6 lg:mb-8 text-slate-300/90 leading-relaxed px-2 sm:px-0"
        >
          Développeur web passionné, spécialisé en{" "}
          <strong className="text-[var(--color-accent)]">Next.js</strong> et{" "}
          <strong className="text-[var(--color-accent)]">Angular</strong>, je
          conçois des interfaces modernes, claires et orientées produit.
        </p>
        <a
          ref={ctaRef}
          href="/contact"
          className="inline-block bg-[var(--color-accent)] hover:bg-[#22ccee] transition-all duration-300 text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-[0_0_20px_#38bdf8] text-base sm:text-lg transform hover:scale-105 will-change-transform focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)] focus:ring-opacity-50"
          aria-label="Me contacter - Accéder au formulaire de contact"
        >
          Me contacter
        </a>
        <div
          className="mt-6 sm:mt-10 h-1 w-16 sm:w-20 lg:w-24 mx-auto bg-[var(--color-accent)] rounded-full animate-pulse"
          aria-hidden="true"
        />
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0) rotate(var(--rotation, 0deg));
          }
          50% {
            transform: translateY(-4px) rotate(var(--rotation, 0deg));
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-bounce-slow,
          .animate-pulse {
            animation: none;
          }
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        @media (max-width: 640px) {
          .hero-text-container h1 {
            line-height: 1.2;
            font-size: 1.75rem;
          }
          .hero-text-container p {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </section>
  );
}