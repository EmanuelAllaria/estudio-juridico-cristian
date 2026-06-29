"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { getWhatsAppUrl } from "@/lib/urls";

export function Header() {
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
            width={148}
            height={52}
            priority
          />
        </Link>

        <nav className="header__nav" id="main-nav" aria-label="Navegación principal">
          <ul className="header__nav-list">
            <li>
              <a href="#servicios" className="header__nav-link">
                Servicios
              </a>
            </li>
            <li>
              <a href="#resenas" className="header__nav-link">
                Reseñas
              </a>
            </li>
            <li>
              <a href="#proceso" className="header__nav-link">
                Cómo funciona
              </a>
            </li>
            <li>
              <a href="#faq" className="header__nav-link">
                Preguntas
              </a>
            </li>
          </ul>
        </nav>

        <a
          href={getWhatsAppUrl()}
          className="btn btn--primary btn--sm header__cta"
          data-track="cta-header-wa"
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultá gratis
        </a>
      </div>
    </header>
  );
}
