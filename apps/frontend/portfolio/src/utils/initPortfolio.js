// src/utils/initPortfolio.js
import { typeWriter } from "./animations";
import { initCounters } from "./counters";
import { initContactForm } from "./forms";
import { initSmoothScroll } from "./scrolling"; // Add this
import { initTheme } from "./theme";

export function initPortfolio() {
  if (window.__portfolioInitialized) return;
  window.__portfolioInitialized = true;

  const h = document.getElementById("headline-text")?.textContent || "";
  const t = document.getElementById("tagline-text")?.textContent || "";
  const w = document.getElementById("welcomeline-text")?.textContent || "";

  if (document.getElementById("headline-text"))
    document.getElementById("headline-text").textContent = "";
  if (document.getElementById("tagline-text"))
    document.getElementById("tagline-text").textContent = "";
  if (document.getElementById("welcomeline-text"))
    document.getElementById("welcomeline-text").textContent = "";

  typeWriter(document.getElementById("headline-text"), h, 70, () =>
    typeWriter(document.getElementById("tagline-text"), t, 50, () =>
      typeWriter(document.getElementById("welcomeline-text"), w, 30)
    )
  );

  initContactForm();
  initCounters();
  initTheme();

  // Add this: Call smooth scroll after DOM ready
  setTimeout(initSmoothScroll, 500);
}

// Cursor glow (keep this)
document.addEventListener("mousemove", (e) => {
  document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
  document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
});
