"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const TransitionContext = createContext(null);

// Lets any client component trigger a "paper grows to fill the screen" wipe
// before navigating, instead of a hard route cut. `rect` (from
// getBoundingClientRect) is where the paper should grow from — pass none for
// a plain fade.
export function useTransitionNav() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("useTransitionNav must be used within <PageTransition>");
  }
  return ctx;
}

const COVER_DURATION = 0.5;
const REVEAL_DURATION = 0.3;

export default function PageTransition({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const [covering, setCovering] = useState(false);
  const [rect, setRect] = useState(null);
  const pendingHref = useRef(null);

  function beginTransition({ href, rect: startRect }) {
    if (pendingHref.current) return;
    pendingHref.current = href;
    setRect(startRect ?? null);
    setCovering(true);

    const coverMs = reducedMotion ? 80 : COVER_DURATION * 1000;
    setTimeout(() => router.push(href), coverMs);

    // Safety net in case the pathname never matches (e.g. navigating to the
    // same route) so we never get stuck covering the page forever.
    setTimeout(() => {
      setCovering(false);
      pendingHref.current = null;
    }, coverMs + 4000);
  }

  useEffect(() => {
    if (pendingHref.current && pathname === pendingHref.current) {
      const revealDelay = reducedMotion ? 20 : 120;
      const t = setTimeout(() => {
        setCovering(false);
        pendingHref.current = null;
      }, revealDelay);
      return () => clearTimeout(t);
    }
  }, [pathname, reducedMotion]);

  const fromRect = rect
    ? {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: 3,
      }
    : { top: 0, left: 0, width: "100vw", height: "100vh", borderRadius: 0 };

  return (
    <TransitionContext.Provider value={{ beginTransition }}>
      {children}
      <AnimatePresence>
        {covering && (
          <motion.div
            key="page-cover"
            aria-hidden="true"
            style={{
              position: "fixed",
              zIndex: 100,
              background: "var(--paper-soft)",
              pointerEvents: "none",
            }}
            initial={{ ...fromRect, opacity: 1 }}
            animate={{
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              borderRadius: 0,
              opacity: 1,
              transition: {
                duration: reducedMotion ? 0.08 : COVER_DURATION,
                ease: [0.65, 0, 0.35, 1],
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: reducedMotion ? 0.08 : REVEAL_DURATION,
              },
            }}
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
