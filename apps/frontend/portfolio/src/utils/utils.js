// src/utils/utils.js
export function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(null, args), wait);
  };
}

export function throttle(fn, limit = 100) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= limit) {
      fn.apply(null, args);
      last = now;
    }
  };
}

export function fadeInElement(element, duration = 500) {
  if (!element) return;
  element.style.opacity = 0;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    element.style.opacity = p;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
