// src/utils/initPortfolio.js
import { typeWriter } from "./animations";
import { initCounters } from "./counters";
import { dom } from "./domSelectors";
import { initContactForm } from "./forms";
import { initNavigation } from "./navigation";
import { initSmoothScroll } from "./scrolling";
import { initTheme } from "./theme";

export function initPortfolio() {
  if (window.__portfolioInitialized) return;
  window.__portfolioInitialized = true;
  const h = dom.headlineEl?.textContent || "";
  const t = dom.taglineEl?.textContent || "";
  const w = dom.welcomeEl?.textContent || "";

  if (dom.headlineEl) dom.headlineEl.textContent = "";
  if (dom.taglineEl) dom.taglineEl.textContent = "";
  if (dom.welcomeEl) dom.welcomeEl.textContent = "";

  typeWriter(dom.headlineEl, h, 70, () =>
    typeWriter(dom.taglineEl, t, 50, () => typeWriter(dom.welcomeEl, w, 30))
  );

  initNavigation();
  initSmoothScroll();
  initContactForm();
  initCounters();
  initTheme();
}
