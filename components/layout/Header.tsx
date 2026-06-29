"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { getWhatsAppUrl } from "@/lib/urls";

export function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const closeNav = useCallback(() => {
    setNavOpen(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const header = document.getElementById("header");
    if (!header) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle("header--scrolled", window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

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

  return (
    <header className="header" id="header">
      <div className="container header__inner">
        <Link
          href="#inicio"
          className="header__logo"
          aria-label="Abogados Laborales & Asoc. — Inicio"
        >
          <Image
            src="/images/logo.svg"
            alt="Abogados Laborales"
            className="header__logo-img"
            width={200}
            height={44}
            priority
          />
        </Link>

        <nav
          className={`header__nav${navOpen ? " header__nav--open" : ""}`}
          id="main-nav"
          aria-label="Navegación principal"
        >
          <ul className="header__nav-list">
            <li>
              <a
                href="#servicios"
                className="header__nav-link"
                onClick={closeNav}
              >
                Servicios
              </a>
            </li>
            <li>
              <a
                href="#resenas"
                className="header__nav-link"
                onClick={closeNav}
              >
                Opiniones
              </a>
            </li>
            <li>
              <a
                href="#proceso"
                className="header__nav-link"
                onClick={closeNav}
              >
                Cómo funciona
              </a>
            </li>
            <li>
              <a href="#faq" className="header__nav-link" onClick={closeNav}>
                Preguntas Frecuentes
              </a>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          <a
            href={getWhatsAppUrl()}
            className="btn btn--whatsapp btn--sm btn--pulse header__cta"
            data-track="cta-header-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            <span className="header__cta-text">
              Iniciar Consulta Gratuita por WhatsApp
            </span>
          </a>

          <button
            type="button"
            className="header__toggle"
            id="nav-toggle"
            aria-expanded={navOpen}
            aria-controls="main-nav"
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
  );
}
