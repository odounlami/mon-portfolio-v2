"use client";

import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "#intro", label: "Accueil" },
    { href: "#competences", label: "Compétences" },
    { href: "#projets", label: "Projets" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-md border-b border-white/10 text-white z-50">
      <nav className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-lg sm:text-xl font-bold">
            <a
              href="#intro"
              className="hover:text-[#38BDF8] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              NEMESIS
            </a>
          </h1>

          {/* Menu Desktop */}
          <ul className="hidden md:flex space-x-6 lg:space-x-8">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="hover:text-[#38BDF8] transition-colors text-sm lg:text-base"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Burger Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-transform ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-opacity ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-transform ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <ul className="flex flex-col space-y-4 mt-4">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="block hover:text-[#38BDF8] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
