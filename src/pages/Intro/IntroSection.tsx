"use client";

import { useEffect, useRef, useState } from "react";
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
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);

  // Ajuster la taille du pattern selon l'écran
  useEffect(() => {
    function updateSize() {
      setPatternSize(window.innerWidth < 768 ? 40 : 60);
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Gestion de l'inactivité pour lancer les étoiles
  useEffect(() => {
    function handleActivity() {
      // Cacher les étoiles existantes
      setStars([]);

      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => {
        launchStars();
      }, 3000);
    }

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("touchstart", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
    };
  }, []);

  // Animation SplitText sur le texte
  useEffect(() => {
    if (!textRef.current) return;
    document.fonts.ready.then(() => {
      const split = new SplitText(textRef.current, {
        type: "words,lines",
        linesClass: "line",
      });
      gsap.from(split.lines, {
        duration: 2,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
      });
    });
  }, []);

  // Animation glow / lettre par lettre sur le nom
  useEffect(() => {
    if (!nameRef.current) return;
    const split = new SplitText(nameRef.current, { type: "chars" });
    gsap.from(split.chars, {
      duration: 0.8,
      opacity: 0,
      y: 20,
      stagger: 0.05,
      ease: "power3.out",
    });
    gsap.to(nameRef.current, {
      textShadow: "0px 0px 20px #38BDF8",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  // Créer / lancer les étoiles aléatoires (hors texte)
  function launchStars() {
    setStars([]);

    const numStars = Math.floor(Math.random() * 8) + 5;

    const textContainer = document.querySelector(".text-center") as HTMLElement;
    const rect = textContainer?.getBoundingClientRect();

    const newStars: Star[] = Array.from({ length: numStars }).map((_, i) => {
      let x = 0;
      let y = 0;

      do {
        // Limiter X et Y à la taille de la fenêtre
        x = Math.random() * (window.innerWidth - 40); // marge 40px pour ne pas dépasser
        y = Math.random() * (window.innerHeight - 40); // idem

        // Exclure la zone du texte
      } while (
        rect &&
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      );

      return {
        x,
        y,
        rotation: Math.random() * 360,
        id: Date.now() + i,
        visible: true,
        size: 20 + Math.random() * 20,
      };
    });

    setStars(newStars);
  }

  // Apparition initiale 5s après chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      launchStars();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-24 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-[var(--color-secondary)] relative overflow-hidden">
      {/* Background graphique */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none select-none">
        <svg
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
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
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Étoiles */}
      <div
        ref={starsContainerRef}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        {stars.map((star) => (
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
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3 6h6l-4 4 1 6-5-3-5 3 1-6-4-4h6z" />
          </svg>
        ))}
      </div>

      {/* Texte principal */}
      <div className="text-center max-w-4xl w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 px-2 sm:px-0">
          Je suis{" "}
          <span
            ref={nameRef}
            className="text-[var(--color-accent)] font-extrabold whitespace-nowrap"
          >
            ODOUNLAMI OSCAR
          </span>
        </h1>

        <p
          ref={textRef}
          className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-10 px-4 sm:px-0 text-slate-300/90 leading-relaxed"
        >
          Développeur web passionné, expert en{" "}
          <strong className="text-[var(--color-accent)]">Next.js</strong> et{" "}
          <strong className="text-[var(--color-accent)]">React</strong>, je crée
          des expériences numériques modernes et performantes.
        </p>

        <a
          href="/contact"
          className="inline-block bg-[var(--color-accent)] hover:bg-[#22ccee] transition-colors duration-300 text-black font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-lg shadow-lg hover:shadow-[0_0_20px_#38bdf8]"
        >
          Me contacter
        </a>

        <div className="mt-12 sm:mt-16 h-1 w-20 sm:w-24 mx-auto bg-[var(--color-accent)] rounded-full animate-pulse" />
      </div>

      {/* Animation bounce lente via Tailwind (CSS) */}
      <style>
        {`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 1.5s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
}
