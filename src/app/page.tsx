"use client";

import { useEffect } from "react";
import CompetenceSection from "../../components/competences/CompetenceSection";
import Contact from "../../components/contact/Contact";
import IntroSection from "../../components/Intro/IntroSection";
import Parcours from "../../components/parcours/Parcours";
import MesProjets from "./projets/projets";

const SECTION_IDS = ["intro", "parcours", "competences", "projets", "contact"];

export default function HomePage() {
  /** Arrivée sur /#section (menu, lien externe) : scroll puis URL propre sans # */
  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "");
    if (!raw || !SECTION_IDS.includes(raw)) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    requestAnimationFrame(() => {
      document.getElementById(raw)?.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", "/");
    });
  }, []);

  return (
    <div className="scroll-smooth">
      <section id="intro">
        <IntroSection />
      </section>

      <section id="parcours">
        <Parcours />
      </section>

      <section id="competences">
        <CompetenceSection />
      </section>

      <section id="projets">
        <MesProjets />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}
