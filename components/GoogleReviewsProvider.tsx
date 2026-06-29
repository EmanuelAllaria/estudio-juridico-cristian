"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { GoogleReviewsPayload } from "@/lib/stars";

interface GoogleReviewsContextValue {
  data: GoogleReviewsPayload;
  isLive: boolean;
}

const GoogleReviewsContext = createContext<GoogleReviewsContextValue | null>(
  null
);

export function GoogleReviewsProvider({
  initialData,
  children,
}: {
  initialData: GoogleReviewsPayload;
  children: ReactNode;
}) {
  const [data, setData] = useState(initialData);
  const [isLive, setIsLive] = useState(isGoogleSource(initialData.source));

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      try {
        const res = await fetch("/api/google-reviews", { cache: "no-store" });
        if (!res.ok || cancelled) return;

        const payload: GoogleReviewsPayload = await res.json();
        if (!isGoogleSource(payload.source)) return;

        setData(payload);
        setIsLive(true);
      } catch {
        // Mantener datos del servidor
      }
    }

    refresh();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <GoogleReviewsContext.Provider value={{ data, isLive }}>
      {children}
    </GoogleReviewsContext.Provider>
  );
}

export function useGoogleReviews() {
  const ctx = useContext(GoogleReviewsContext);
  if (!ctx) {
    throw new Error("useGoogleReviews debe usarse dentro de GoogleReviewsProvider");
  }
  return ctx;
}

function isGoogleSource(source?: string): boolean {
  return Boolean(
    source &&
      source !== "static" &&
      source !== "config-fallback"
  );
}
