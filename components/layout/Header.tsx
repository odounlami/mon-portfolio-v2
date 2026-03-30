"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleSectionNav = useCallback(
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      const m = /^\/#([\w-]+)$/.exec(href);
      if (!m) return;
      const id = m[1];
      if (pathname !== "/") return;
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", "/");
    },
    [pathname]
  );

  const links = [
    { href: "/#parcours", label: "Parcours" },
    { href: "/#competences", label: "Compétences" },
    { href: "/#projets", label: "Projets" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-md border-b border-white/10 text-[color:var(--color-secondary)] z-50">
      <nav className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <h1 className="text-lg sm:text-xl font-bold">
            <Link
              href="/#intro"
              className="hover:text-[color:var(--color-accent)] transition-colors"
              onClick={(e) => {
                handleSectionNav("/#intro")(e);
                setIsMenuOpen(false);
              }}
            >
              NEMESIS
            </Link>
          </h1>

          {/* Menu Desktop */}
          <ul className="hidden md:flex space-x-6 lg:space-x-8">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-[color:var(--color-accent)] transition-colors text-sm lg:text-base"
                  onClick={handleSectionNav(href)}
                >
                  {label}
                </Link>
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
              className={`w-6 h-0.5 bg-[var(--color-secondary)] transition-transform ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[var(--color-secondary)] transition-opacity ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[var(--color-secondary)] transition-transform ${
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
                  <Link
                    href={href}
                    className="block hover:text-[color:var(--color-accent)] transition-colors"
                    onClick={(e) => {
                      handleSectionNav(href)(e);
                      setIsMenuOpen(false);
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
