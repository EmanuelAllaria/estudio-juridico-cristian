"use client";

import { useEffect, useRef } from "react";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setStaggerIndex(elements: HTMLElement[]) {
  elements.forEach((el, i) => {
    el.style.setProperty("--i", String(i));
  });
}

function revealAll(elements: NodeListOf<Element> | HTMLElement[]) {
  elements.forEach((el) => el.classList.add("is-visible"));
}

function addReveal(el: Element, modifier?: string) {
  el.classList.add("reveal");
  if (modifier) el.classList.add(modifier);
}

function markRevealTargets() {
  document.querySelectorAll(".trust-bar .trust-badge").forEach((el) => {
    addReveal(el);
  });

  const serviciosHeader = document.querySelector("#servicios .section-header");
  if (serviciosHeader) addReveal(serviciosHeader, "reveal--fade");

  document.querySelectorAll("#servicios .specialty-card").forEach((el) => {
    addReveal(el);
  });

  const resenasHeader = document.querySelector("#resenas .section-header");
  if (resenasHeader) addReveal(resenasHeader, "reveal--fade");

  const reviewsPanel = document.querySelector(".reviews-panel");
  if (reviewsPanel) addReveal(reviewsPanel, "reveal--fade");

  document.querySelectorAll("#resenas .review-card").forEach((el) => {
    addReveal(el);
  });

  const procesoHeader = document.querySelector("#proceso .section-header");
  if (procesoHeader) addReveal(procesoHeader, "reveal--fade");

  document.querySelectorAll("#proceso .process-step").forEach((el) => {
    addReveal(el);
  });

  document.querySelectorAll(".why-list__item").forEach((el) => {
    addReveal(el);
  });

  document.querySelectorAll(".why-grid__stats .stat-card").forEach((el) => {
    addReveal(el, "reveal--scale");
  });

  const faqHeader = document.querySelector("#faq .section-header");
  if (faqHeader) addReveal(faqHeader, "reveal--fade");

  document.querySelectorAll("#faq .faq-item").forEach((el) => {
    addReveal(el);
  });

  const ctaInner = document.querySelector(".cta-final__inner");
  if (ctaInner) addReveal(ctaInner, "reveal--fade");
}

function animateStatNumber(
  el: HTMLElement,
  target: number,
  suffix: string,
  isFloat: boolean
) {
  const duration = 1200;
  const start = performance.now();

  function tick(now: number) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent =
      (isFloat ? current.toFixed(1) : Math.round(current).toString()) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function initStatCounters(container: Element) {
  if (prefersReducedMotion()) return;

  container.querySelectorAll(".stat-card__number").forEach((el) => {
    const htmlEl = el as HTMLElement;
    const text = htmlEl.textContent?.trim() ?? "";
    if (text.startsWith("$") || text.includes("hs")) return;

    const match = text.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;

    const target = parseFloat(match[1]);
    const suffix = match[2] || "";
    const isFloat = match[1].includes(".");
    htmlEl.textContent = (isFloat ? "0.0" : "0") + suffix;
    animateStatNumber(htmlEl, target, suffix, isFloat);
  });
}

function initHero() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const reveals = hero.querySelectorAll(".reveal");
  setStaggerIndex(Array.from(reveals) as HTMLElement[]);

  if (prefersReducedMotion()) {
    hero.classList.add("hero--ready");
    return;
  }

  requestAnimationFrame(() => {
    hero.classList.add("hero--ready");
  });
}

function initScrollReveal() {
  markRevealTargets();

  if (prefersReducedMotion()) {
    revealAll(document.querySelectorAll(".reveal"));
    return;
  }

  const groupSelectors = [
    ".trust-bar",
    "#servicios",
    "#resenas",
    "#proceso",
    "section:has(.why-grid)",
    "#faq",
    ".cta-final",
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const group = entry.target;
        const reveals = group.querySelectorAll(".reveal");
        setStaggerIndex(Array.from(reveals) as HTMLElement[]);
        revealAll(reveals);

        const stats = group.querySelector(".why-grid__stats");
        if (stats) initStatCounters(stats);

        observer.unobserve(group);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  groupSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => observer.observe(el));
  });
}

export function ScrollReveal() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    initHero();
    initScrollReveal();
  }, []);

  return null;
}

export function revealReviewCards() {
  document.querySelectorAll("#resenas .review-card").forEach((el) => {
    el.classList.add("reveal", "is-visible");
  });
}
