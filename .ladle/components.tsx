import type { GlobalProvider } from "@ladle/react";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import "../src/app/globals.css";

export const Provider: GlobalProvider = ({ children, globalState }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  
  // Inject custom CSS into Ladle's parent window to match styleguide menu
  useEffect(() => {
    try {
      if (window.parent && window.parent.document) {
        const parentDoc = window.parent.document;
        if (!parentDoc.getElementById('myrilo-ladle-styles')) {
          const style = parentDoc.createElement('style');
          style.id = 'myrilo-ladle-styles';
          style.innerHTML = `
            nav.ladle-nav {
              background: rgba(15, 23, 42, 0.1) !important;
              border-right: 1px solid rgba(255,255,255,0.1) !important;
              font-family: 'Inter', system-ui, sans-serif !important;
            }
            .ladle-nav a {
              color: rgba(255, 255, 255, 0.7) !important;
              font-size: 13.5px !important;
              text-transform: none !important;
              padding: 8px 16px !important;
              font-weight: 500 !important;
              letter-spacing: 0.01em !important;
            }
            .ladle-nav a:hover, .ladle-nav a.ladle-active {
              color: #a7f3d0 !important; /* Deep Emerald accent */
              background: rgba(255, 255, 255, 0.05) !important;
            }
            .ladle-nav .ladle-search {
               background: transparent !important;
               border-bottom: 1px solid rgba(255,255,255,0.1) !important;
               color: #fff !important;
            }
          `;
          parentDoc.head.appendChild(style);
        }
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    const isDark = globalState.theme === "dark";
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      document.body.style.removeProperty("background");
      document.body.style.removeProperty("background-attachment");
      document.body.style.removeProperty("min-height");
      const ladleBgDark = document.querySelector(".ladle-background") as HTMLElement | null;
      if (ladleBgDark) ladleBgDark.style.removeProperty("background");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      // Apply aurora paper background directly — Tailwind base layer overrides
      // the [data-theme="light"] body rule in the Ladle iframe context.
      const auroraLight = [
        "radial-gradient(90% 70% at 8% 8%, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0) 55%)",
        "radial-gradient(80% 65% at 92% 12%, rgba(0,200,255,0.28) 0%, rgba(0,200,255,0) 52%)",
        "radial-gradient(100% 80% at 70% 92%, rgba(0,255,200,0.24) 0%, rgba(0,255,200,0) 58%)",
        "linear-gradient(160deg, #ede8ff 0%, #e2f5ff 40%, #e2fff8 70%, #f0e8ff 100%)",
      ].join(", ");
      document.body.style.background = auroraLight;
      document.body.style.backgroundAttachment = "fixed";
      document.body.style.minHeight = "100vh";
      // Remove Ladle's own white background override div
      const ladleBg = document.querySelector(".ladle-background") as HTMLElement | null;
      if (ladleBg) ladleBg.style.background = "transparent";
    }
  }, [globalState.theme]);

  // Track native fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <>
      {children}
      {isFullscreen && (
        <button
          onClick={exitFullScreen}
          aria-label="Exit Full Screen"
          title="Exit Full Screen"
          className="fixed top-4 left-4 z-[99999] flex items-center justify-center p-2 bg-[var(--surface-2)] hover:bg-[var(--surface)] text-[var(--ink)] rounded-full shadow-[var(--shadow-3)] backdrop-blur-md border border-[var(--line-strong)] transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </>
  );
};
