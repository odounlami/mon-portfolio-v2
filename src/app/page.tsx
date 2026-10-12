"use client";

import { useEffect } from "react";
import CompetenceSection from "../../components/competences/CompetenceSection";
import Contact from "../../components/contact/Contact";
import IntroSection from "../../components/Intro/IntroSection";
import Parcours from "../../components/parcours/Parcours";
import MesProjets from "./projets/projets";
import ProductCard from "../../components/ProductCard/ProductCard";

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

   
      {/* <ProductCard
        name="Produit 1"
        price={10000}
        imageUrl="/images/produit1.jpg"
        inStock={true}
        isLoading={true}
      /> */}
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
