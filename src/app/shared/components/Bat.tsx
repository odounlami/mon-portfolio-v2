"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const BAT_IMAGES = ["/bats/bat1.png", "/bats/bat2.png", "/bats/bat3.png"];
const NUM_BATS = 8;

export default function Bats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const bats: HTMLImageElement[] = [];

    // Crée les images chauves-souris
    for (let i = 0; i < NUM_BATS; i++) {
      const img = document.createElement("img");
      img.src = BAT_IMAGES[i % BAT_IMAGES.length];
      img.className = "bat absolute w-12 h-12 opacity-100";
      img.style.left = `${Math.random() * window.innerWidth}px`;
      img.style.top = `${Math.random() * 200 + 50}px`;
      containerRef.current.appendChild(img);
      bats.push(img);

      // Animation de vol aléatoire
      gsap.to(img, {
        x: window.innerWidth + 100,
        y: "+=" + (Math.random() * 200 - 100),
        rotation: Math.random() * 360,
        duration: 6 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: i * 1.5,
      });
    }

    // Interaction souris
    function handleMouseMove() {
      bats.forEach(bat => {
        gsap.to(bat, { opacity: 0, duration: 0.3 });
      });

      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => {
        bats.forEach(bat => {
          gsap.to(bat, { opacity: 1, duration: 0.5 });
        });
      }, 3000);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      bats.forEach(b => b.remove());
    };
  }, []);

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-10" />;
}
