// src/utils/navigation.js
import { dom } from "./domSelectors";
import { throttle } from "./utils";

export function initNavigation() {
  const { navToggle, navMenu, navLinks, mainHeader } = dom;

  navToggle?.addEventListener("click", () => {
    navMenu?.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      navMenu?.classList.remove("active");
      navToggle?.classList.remove("active");
    })
  );

  window.addEventListener("scroll", () => {
    if (!mainHeader) return;
    mainHeader.classList.toggle("scrolled", window.scrollY > 50);
  });

  window.addEventListener("scroll", throttle(updateActiveNavLink, 150));
  document.addEventListener("DOMContentLoaded", updateActiveNavLink);
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop;
    if (window.scrollY >= top - 120) current = section.id;
  });
  dom.navLinks.forEach((link) =>
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`)
  );
}
