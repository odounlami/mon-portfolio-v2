"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  type CSSProperties,
} from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import Link from "next/link";

gsap.registerPlugin(SplitText);

interface Star {
  x: number;
  y: number;
  rotation: number;
  id: number;
  visible: boolean;
  size: number;
}

const ROLES = [
  "Développeur Front-End",
  "Architecte logiciel",
  "Designer UX/UI",
];

export default function IntroSection() {
  const [patternSize, setPatternSize] = useState(20);
  const [stars, setStars] = useState<Star[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const heroCtasRef = useRef<HTMLDivElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const btn1Ref = useRef<HTMLAnchorElement>(null);
  const btn2Ref = useRef<HTMLAnchorElement>(null);
  const lastActivityTime = useRef<number>(0);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const starsRef = useRef<Star[]>([]);
  const mousePosRef = useRef({ x: -999, y: -999 });

  // ─── Reduced motion ───────────────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // ─── Role crossfade ───────────────────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setRoleVisible(false);
      const t = setTimeout(() => {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setRoleVisible(true);
      }, 600);
      return () => clearTimeout(t);
    }, 3000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // ─── Scroll smooth ────────────────────────────────────────────────────────
  const scrollToHomeSection = useCallback(
    (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", "/");
    },
    [prefersReducedMotion],
  );

  // ─── Pattern grid ─────────────────────────────────────────────────────────
  const updatePatternSize = useCallback(() => {
    const w = window.innerWidth;
    setPatternSize(w < 640 ? 20 : w < 768 ? 30 : w < 1024 ? 45 : 60);
  }, []);

  useEffect(() => {
    updatePatternSize();
    const onResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(updatePatternSize, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, [updatePatternSize]);

  // ─── Stars generation ─────────────────────────────────────────────────────
  const launchStars = useCallback(() => {
    if (prefersReducedMotion) return;
    const w = window.innerWidth;
    const isMobile = w < 768;
    const numStars = isMobile
      ? Math.floor(Math.random() * 3) + 2
      : Math.floor(Math.random() * 8) + 5;
    const margin = isMobile ? 16 : 40;
    const textPad = isMobile ? 60 : 100;

    const cRect = starsContainerRef.current?.getBoundingClientRect();
    const textRect = heroTextRef.current?.getBoundingClientRect();

    const textZone =
      cRect && textRect
        ? {
            left: textRect.left - cRect.left - textPad,
            right: textRect.right - cRect.left + textPad,
            top: textRect.top - cRect.top - textPad,
            bottom: textRect.bottom - cRect.top + textPad,
          }
        : null;

    const cw = cRect?.width ?? w;
    const ch = cRect?.height ?? window.innerHeight;

    const overlapsText = (x: number, y: number, size: number) =>
      !!textZone &&
      x + size > textZone.left &&
      x < textZone.right &&
      y + size > textZone.top &&
      y < textZone.bottom;

    const newStars: Star[] = Array.from({ length: numStars }, (_, i) => {
      let x = 0, y = 0, size = 0, attempts = 0;
      do {
        size = isMobile ? 8 + Math.random() * 6 : 10 + Math.random() * 10;
        x = Math.random() * (cw - margin * 2) + margin;
        y = Math.random() * (ch - margin * 2) + margin;
        attempts++;
      } while (attempts < 40 && overlapsText(x, y, size));
      return { x, y, rotation: Math.random() * 360, id: Date.now() + i, visible: true, size };
    });

    setStars(newStars);
    starsRef.current = newStars;
  }, [prefersReducedMotion]);

  // ─── Activity / inactivity ────────────────────────────────────────────────
  const handleActivity = useCallback(() => {
    if (prefersReducedMotion) return;
    const now = Date.now();
    if (now - lastActivityTime.current < 100) return;
    lastActivityTime.current = now;
    setStars([]);
    starsRef.current = [];
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
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
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [handleActivity]);

  // ─── Canvas — lignes entre nœuds ─────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    let t = 0;
    let rafId = 0;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = starsRef.current;
      if (nodes.length >= 2) {
        const MAX_DIST = 180;
        const mouse = mousePosRef.current;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MAX_DIST) {
              const mdx = mouse.x - (a.x + b.x) / 2;
              const mdy = mouse.y - (a.y + b.y) / 2;
              const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
              const mouseBoost = Math.max(0, 1 - mouseDist / 250);
              const baseAlpha = (1 - dist / MAX_DIST) * 0.18;
              const alpha = Math.min(baseAlpha + mouseBoost * 0.35, 0.6);
              const pulse = 0.85 + 0.15 * Math.sin(t * 0.02 + i * 0.5);
              ctx.beginPath();
              ctx.moveTo(a.x + a.size / 2, a.y + a.size / 2);
              ctx.lineTo(b.x + b.size / 2, b.y + b.size / 2);
              ctx.strokeStyle = `rgba(56,189,248,${alpha * pulse})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }
      t++;
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion]);

  // ─── Mouse tracking ───────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ─── Magnetic buttons ─────────────────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion) return;
    const buttons = [btn1Ref.current, btn2Ref.current].filter(
      (b): b is HTMLAnchorElement => b !== null,
    );

    const handlers: Array<{
      el: HTMLAnchorElement;
      move: (e: MouseEvent) => void;
      leave: () => void;
    }> = [];

    buttons.forEach((btn) => {
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.28;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
        gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
      };
      const onLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
      };
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      handlers.push({ el: btn, move: onMove, leave: onLeave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
        gsap.set(el, { x: 0, y: 0 });
      });
    };
  }, [prefersReducedMotion]);

  // ─── GSAP entrance ────────────────────────────────────────────────────────
  useEffect(() => {
    const name = nameRef.current;
    const text = textRef.current;
    const ctas = heroCtasRef.current;
    if (!name || !text || !ctas) return;

    if (prefersReducedMotion) {
      gsap.set([name, text, ctas], { opacity: 1, y: 0 });
      return;
    }

    gsap.set([text, ctas], { opacity: 0, y: 24 });
    gsap.set(name, { opacity: 0 });

    let nameSplit: SplitText | null = null;
    const raf = requestAnimationFrame(() => {
      nameSplit = new SplitText(name, { type: "chars" });
      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(name, { opacity: 1, duration: 0 })
        .from(nameSplit.chars, {
          duration: 0.5,
          opacity: 0,
          y: 20,
          stagger: 0.03,
          ease: "power3.out",
        })
        .to(text, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.1")
        .to(ctas, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" }, "-=0.3")
        .to(
          name,
          {
            textShadow: "0px 0px 12px rgba(56,189,248,0.5)",
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
          "-=0.2",
        );
    });

    return () => {
      cancelAnimationFrame(raf);
      nameSplit?.revert();
      gsap.killTweensOf([name, text, ctas]);
    };
  }, [prefersReducedMotion]);

  // ─── Name click explosion ─────────────────────────────────────────────────
  const handleNameClick = useCallback(() => {
    if (!nameRef.current || prefersReducedMotion) return;
    const nameRect = nameRef.current.getBoundingClientRect();
    const cRect = starsContainerRef.current?.getBoundingClientRect();
    if (!cRect) return;

    const cx = nameRect.left + nameRect.width / 2 - cRect.left;
    const cy = nameRect.top + nameRect.height / 2 - cRect.top;

    const explosionStars: Star[] = Array.from({ length: 10 }, (_, i) => {
      const size = 10 + Math.random() * 8;
      return { x: cx - size / 2, y: cy - size / 2, rotation: Math.random() * 360, id: Date.now() + i, visible: true, size };
    });

    setStars(explosionStars);
    starsRef.current = explosionStars;

    const raf = requestAnimationFrame(() => {
      const t = setTimeout(() => {
        const starEls = starsContainerRef.current?.querySelectorAll("svg");
        if (starEls) {
          gsap.to(starEls, {
            x: () => (Math.random() - 0.5) * 240,
            y: () => (Math.random() - 0.5) * 240,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          });
        }
      }, 30);
      return () => clearTimeout(t);
    });

    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    el.addEventListener("click", handleNameClick);
    return () => el.removeEventListener("click", handleNameClick);
  }, [handleNameClick]);

  // ─── Initial stars ────────────────────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion) return;
    const t = setTimeout(launchStars, 3500);
    return () => clearTimeout(t);
  }, [launchStars, prefersReducedMotion]);

  // ─── Stars elements ───────────────────────────────────────────────────────
  const starsElements = useMemo(
    () =>
      stars.map((star) => (
        <svg
          key={star.id}
          className={`absolute transition-all duration-700 ${
            star.visible ? "opacity-100 animate-bounce-slow" : "opacity-0"
          }`}
          style={
            {
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              fill: "#38BDF8",
              willChange: "transform, opacity",
              ["--rotation" as string]: `${star.rotation}deg`,
            } as CSSProperties
          }
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="presentation"
        >
          <path d="M12 2l3 6h6l-4 4 1 6-5-3-5 3 1-6-4-4h6z" />
        </svg>
      )),
    [stars],
  );

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <section
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155]"
      aria-labelledby="hero-title"
    >
      {/* Grille de fond */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.10] pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
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
                strokeWidth="0.4"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Halo radial */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(56,189,248,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Canvas graphe de connexions */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Étoiles / nœuds */}
      <div
        ref={starsContainerRef}
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
      >
        {starsElements}
      </div>

      {/* ── Contenu centré ── */}
      <div
        ref={heroTextRef}
        className="relative z-20 flex flex-col items-center text-center w-full px-4 sm:px-8 md:px-16"
        style={{ paddingTop: "max(5rem, env(safe-area-inset-top, 0px) + 5rem)" }}
      >
        {/* Titre */}
        <h1
          id="hero-title"
          className="w-full font-black tracking-tight leading-none mb-4 sm:mb-6"
        >
          <span className="block text-slate-400 text-xs sm:text-sm font-light tracking-[0.3em] uppercase mb-3 sm:mb-4">
            Je suis
          </span>
          <span
            ref={nameRef}
            className="block text-sky-400 cursor-pointer select-none w-full leading-[1.05] tracking-tight text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl"
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

        {/* Role morphing */}
        <div className="h-7 sm:h-8 mb-6 sm:mb-8 overflow-hidden">
          <p
            className="text-sky-300 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase transition-all duration-500"
            style={{
              opacity: roleVisible ? 1 : 0,
              transform: roleVisible ? "translateY(0)" : "translateY(8px)",
            }}
          >
            {ROLES[roleIndex]}
          </p>
        </div>

        {/* Séparateur décoratif — largeur calée sur la description */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8 w-full max-w-xs sm:max-w-md md:max-w-xl">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-sky-400/40" />
          <div className="w-1 h-1 rounded-full bg-sky-400/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <div className="w-1 h-1 rounded-full bg-sky-400/60" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-sky-400/40" />
        </div>

        {/* Description */}
        <p
          ref={textRef}
          className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed tracking-wide mb-8 sm:mb-10 mx-auto max-w-xs sm:max-w-md md:max-w-xl"
        >
          Développeur spécialisé en{" "}
          <span className="text-slate-200 font-medium">architecture logicielle</span>
          , je conçois des systèmes web et mobile{" "}
          <span className="text-slate-200 font-medium">robustes, évolutifs</span>{" "}
          et orientés métier.
        </p>

        {/* CTAs */}
        <div
          ref={heroCtasRef}
          className="flex flex-row items-center justify-center gap-3 sm:gap-4 w-full"
        >
          <Link
            ref={btn1Ref}
            href="/#contact"
            onClick={scrollToHomeSection("contact")}
            className="inline-flex justify-center items-center font-semibold tracking-wide rounded-xl transition-colors duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-sky-400/40 bg-sky-400 hover:bg-sky-300 hover:shadow-[0_0_28px_rgba(56,189,248,0.4)] text-slate-900 text-sm sm:text-base px-6 sm:px-8 py-3"
            aria-label="Me contacter"
          >
            Me contacter
          </Link>
          <Link
            ref={btn2Ref}
            href="/#projets"
            onClick={scrollToHomeSection("projets")}
            className="inline-flex justify-center items-center font-semibold tracking-wide rounded-xl border-2 border-sky-400 text-sky-400 hover:bg-sky-400/10 transition-colors duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-sky-400/40 text-sm sm:text-base px-6 sm:px-8 py-3"
            aria-label="Mes projets"
          >
            Mes projets
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-12 sm:mt-16 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div className="w-px h-10 sm:h-14 bg-gradient-to-b from-sky-400/50 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-sky-400/50" />
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) rotate(var(--rotation, 0deg)); }
          50%       { transform: translateY(-5px) rotate(var(--rotation, 0deg)); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-bounce-slow { animation: none; }
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