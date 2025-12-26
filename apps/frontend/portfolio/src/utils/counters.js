// src/utils/counters.js
export function initCounters() {
  const stats = document.querySelectorAll(".stat-number");
  if (!stats.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((s) => io.observe(s));
}

function animate(el) {
  const end = parseInt(el.textContent.replace(/\D/g, "")) || 0;
  let start = 0;
  const startTime = performance.now();

  function tick(now) {
    const p = Math.min((now - startTime) / 1400, 1);
    el.textContent = Math.floor(p * end);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
