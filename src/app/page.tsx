"use client";

import CompetenceSection from "../../components/competences/CompetenceSection";
import Contact from "../../components/contact/Contact";
import IntroSection from "../../components/Intro/IntroSection";
import MesProjets from "./projets/projets";

export default function HomePage() {
  return (
    <div className="scroll-smooth">
      <section id="intro">
        <IntroSection />
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
