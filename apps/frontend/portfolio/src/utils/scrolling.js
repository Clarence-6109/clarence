// src/utils/scrolling.js

export function initSmoothScroll() {
  // Select all anchor links that start with #
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      // Get the target ID (e.g., "#about")
      const targetId = this.getAttribute("href");

      // Ignore empty or invalid hashes
      if (targetId === "#," || targetId === "#!") return;

      // Find the target element
      const target = document.querySelector(targetId);
      if (!target) {
        console.warn(`Smooth scroll target not found: ${targetId}`);
        return;
      }

      // Prevent default jump behavior
      e.preventDefault();

      // Calculate position with offset for fixed header
      const headerOffset = 90; // ← Adjust this if needed (90–120px usually works)
      const elementPosition =
        target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      // Smooth scroll to the calculated position
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });
  console.log("initSmoothScroll called");
  const anchors = document.querySelectorAll('a[href^="#"]');
  console.log("Found anchors:", anchors.length);
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      console.log("Click on link:", this.getAttribute("href"));
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "#!") return;
      const target = document.querySelector(targetId);
      console.log("Target found:", !!target);
      if (!target) {
        console.warn(`Smooth scroll target not found: ${targetId}`);
        return;
      }
      e.preventDefault();
      const headerOffset = 100;
      const elementPosition =
        target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });
}
