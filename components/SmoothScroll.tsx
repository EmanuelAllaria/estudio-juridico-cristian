"use client";

import { useEffect } from "react";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const anchors = document.querySelectorAll('a[href^="#"]');

    const handlers = Array.from(anchors).map((anchor) => {
      const handler = (e: Event) => {
        const targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      anchor.addEventListener("click", handler);
      return { anchor, handler };
    });

    return () => {
      handlers.forEach(({ anchor, handler }) => {
        anchor.removeEventListener("click", handler);
      });
    };
  }, []);

  return null;
}
