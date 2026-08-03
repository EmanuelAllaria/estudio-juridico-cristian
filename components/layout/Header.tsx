"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { WhatsAppCtaLink } from "@/components/ui/WhatsAppCtaLink";
import { SITE_CONFIG } from "@/lib/site-config";

const NAV_LINKS = [
  { href: "#penal", label: "Servicios" },
  { href: "#penal", label: "Penal" },
  { href: "#accidentes", label: "Accidentes de tránsito" },
  { href: "#proceso", label: "Cómo funciona" },
  { href: "#faq", label: "Preguntas Frecuentes" },
] as const;

export function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeNav = useCallback(() => {
    setNavOpen(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    setMounted(true);
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && navOpen) {
        closeNav();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [navOpen, closeNav]);

  const toggleNav = () => {
    setNavOpen((open) => {
      const next = !open;
      document.body.style.overflow = next ? "hidden" : "";
      return next;
    });
  };

  const headerClassName = [
    "header",
    entered && "header--entered",
    scrolled && "header--scrolled",
    navOpen && "header--menu-open",
  ]
    .filter(Boolean)
    .join(" ");

  const mobileMenu =
    mounted && navOpen
      ? createPortal(
          <div
            className="mobile-menu"
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <nav aria-label="Menú móvil">
              <ul className="mobile-menu__list">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="mobile-menu__link"
                      onClick={closeNav}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <WhatsAppCtaLink
              className="btn btn--whatsapp btn--wrap mobile-menu__wa"
              track="cta-mobile-menu-wa"
              iconSize={22}
              pulse
            />
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <header className={headerClassName} id="header">
        <div className="container header__inner">
          <Link
            href="#inicio"
            className="header__logo"
            aria-label={`${SITE_CONFIG.brand} — Inicio`}
            onClick={closeNav}
          >
            <Image
              src="/images/logo.svg"
              alt={SITE_CONFIG.brand}
              className="header__logo-img"
              width={220}
              height={44}
              priority
            />
          </Link>

          <nav
            className="header__nav header__nav--desktop"
            id="main-nav"
            aria-label="Navegación principal"
          >
            <ul className="header__nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="header__nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <WhatsAppCtaLink
              className="btn btn--whatsapp btn--sm header__cta"
              track="cta-header-wa"
              pulse
            />

            <button
              type="button"
              className="header__toggle"
              id="nav-toggle"
              aria-expanded={navOpen}
              aria-controls="mobile-nav"
              aria-label={navOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={toggleNav}
            >
              <span className="header__toggle-bar" />
              <span className="header__toggle-bar" />
              <span className="header__toggle-bar" />
            </button>
          </div>
        </div>
      </header>

      {mobileMenu}
    </>
  );
}
