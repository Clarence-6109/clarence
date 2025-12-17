// script.js — theme toggle + mobile menu + light helpers
const root = document.documentElement;
const rightNavSelector = '.nav-right-first';
const iconSelector = '[data-theme-toggle], i.fa-sun, i.fa-moon';

function findThemeIcon() {
  const rightNav = document.querySelector(rightNavSelector);
  if (!rightNav) return null;
  return rightNav.querySelector(iconSelector);
}

function setThemeUI(isDark) {
  const icon = findThemeIcon();
  if (!icon) return;
  if (icon.classList) {
    icon.classList.remove('fa-sun', 'fa-moon');
    icon.classList.add(isDark ? 'fa-moon' : 'fa-sun');
  } else {
    icon.setAttribute('data-theme-state', isDark ? 'dark' : 'light');
  }
  icon.setAttribute('role', 'button');
  icon.setAttribute('tabindex', '0');
  icon.setAttribute('aria-pressed', String(isDark));
  icon.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
}

function applySavedOrPreferredTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    root.classList.add('dark-theme'); setThemeUI(true); return;
  }
  if (saved === 'light') {
    root.classList.remove('dark-theme'); setThemeUI(false); return;
  }
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.classList.toggle('dark-theme', prefersDark);
  setThemeUI(prefersDark);
}

function toggleTheme() {
  const isDark = root.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  setThemeUI(isDark);
}

// Delegated handlers for theme toggle
document.addEventListener('click', (ev) => {
  const target = ev.target;
  if (!target) return;
  const themeIcon = findThemeIcon();
  if (!themeIcon) return;
  // if clicked on icon or inside it, toggle
  if (target === themeIcon || target.closest && target.closest(iconSelector) === themeIcon) {
    toggleTheme();
  }
});

// keyboard support on theme icon (Enter/Space)
document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar') {
    const active = document.activeElement;
    const themeIcon = findThemeIcon();
    if (themeIcon && (active === themeIcon || active.closest && active.closest(rightNavSelector))) {
      ev.preventDefault();
      toggleTheme();
    }
  }
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-menu-button');
const navMid = document.querySelector('.nav-mid-first');
if (mobileToggle && navMid) {
  mobileToggle.addEventListener('click', () => {
    navMid.classList.toggle('active'); // CSS will handle show/hide
    mobileToggle.setAttribute('aria-expanded', String(navMid.classList.contains('active')));
  });
}

// simple performance: prevent heavy mutation code; set theme on DOMContentLoaded
document.addEventListener('DOMContentLoaded', applySavedOrPreferredTheme);
// Fade-in observer for promotional feature cards (adds .is-visible)
(function setupFadeInObserver() {
  try {
    const nodes = Array.from(document.querySelectorAll('.fade-in'));
    if (!nodes.length) return;

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    nodes.forEach(n => io.observe(n));
  } catch (e) {
    // silent fallback for older browsers
    nodes.forEach(n => n.classList.add('is-visible'));
  }
})();
/* Enhanced Features carousel initializer
   - Autoplay with visual progress
   - Pause on hover / focus
   - Keyboard navigation + indicators
   - Touch swipe
   - Respects prefers-reduced-motion
*/
(function () {
  const carousels = document.querySelectorAll('[data-carousel]');
  if (!carousels.length) return;

  carousels.forEach(initCarousel);

  function initCarousel(root) {
    const track = root.querySelector('.features-track');
    const slides = Array.from(root.querySelectorAll('.features-slide'));
    const prevBtn = root.querySelector('.features-control.prev');
    const nextBtn = root.querySelector('.features-control.next');
    const indicators = Array.from(root.querySelectorAll('.features-indicator'));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = slides.length;
    let active = slides.findIndex(s => s.classList.contains('is-active'));
    if (active < 0) active = 0;
    let isAnimating = false;
    const baseDelay = prefersReducedMotion ? 0 : 6000;
    let autoplayDelay = baseDelay;
    let autoplayTimer = null;
    let progressTick = null;
    const progressStepMs = 50;

    // create progress bar if missing
    let progress = root.querySelector('.features-progress');
    if (!progress) {
      progress = document.createElement('div');
      progress.className = 'features-progress';
      const fill = document.createElement('div');
      fill.className = 'features-progress-fill';
      progress.appendChild(fill);
      root.appendChild(progress);
    }
    const progressFill = progress.querySelector('.features-progress-fill');

    // set initial slide positions
    function position(toIndex) {
      const idx = ((toIndex % total) + total) % total;
      track.style.transform = `translateX(${-idx * 100}%)`;
      slides.forEach((s, i) => {
        const on = i === idx;
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-hidden', !on);
        s.tabIndex = -1;
      });
      indicators.forEach((btn, i) => {
        const on = i === idx;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      active = idx;
    }

    // advance with bounds and debounce
    function go(index) {
      if (isAnimating) return;
      isAnimating = true;
      position(index);
      resetAutoplay();
      setTimeout(() => { isAnimating = false; }, 420);
    }

    // Autoplay management
    function startAutoplay() {
      if (prefersReducedMotion || autoplayDelay <= 0) return;
      clearTimeout(autoplayTimer);
      const start = Date.now();
      let elapsed = 0;
      // use a tick to update progress smoothly
      progressFill.style.transition = `width ${autoplayDelay}ms linear`;
      progressFill.style.width = '100%';
      autoplayTimer = setTimeout(() => {
        progressFill.style.transition = 'width 200ms ease';
        progressFill.style.width = '0%';
        go(active + 1);
      }, autoplayDelay);
    }
    function resetAutoplay() {
      if (prefersReducedMotion) return;
      clearTimeout(autoplayTimer);
      progressFill.style.transition = 'width 120ms linear';
      progressFill.style.width = '0%';
      // small delay to allow transition reset
      setTimeout(() => { startAutoplay(); }, 120);
    }
    function stopAutoplay() {
      clearTimeout(autoplayTimer);
      progressFill.style.transition = 'width 120ms linear';
      progressFill.style.width = '0%';
    }

    // Event wiring
    prevBtn && prevBtn.addEventListener('click', () => go(active - 1));
    nextBtn && nextBtn.addEventListener('click', () => go(active + 1));

    indicators.forEach((btn, i) => {
      btn.addEventListener('click', () => go(i));
    });

    // keyboard navigation (left/right)
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
    });

    // pause on hover / focus for desktop
    ['mouseenter','focusin'].forEach(evt => {
      root.addEventListener(evt, () => stopAutoplay());
    });
    ['mouseleave','focusout'].forEach(evt => {
      root.addEventListener(evt, () => resetAutoplay());
    });

    // touch support: simple swipe detection
    let startX = 0, dx = 0;
    track.addEventListener('touchstart', (ev) => {
      startX = ev.touches[0].clientX;
      dx = 0;
      stopAutoplay();
    }, {passive: true});
    track.addEventListener('touchmove', (ev) => {
      dx = ev.touches[0].clientX - startX;
    }, {passive: true});
    track.addEventListener('touchend', () => {
      if (Math.abs(dx) > 40) { dx < 0 ? go(active + 1) : go(active - 1); }
      resetAutoplay();
    });

    // deep link support: read hash like #features-slide-2
    if (location.hash && location.hash.startsWith('#features-slide-')) {
      const idx = Number(location.hash.split('-').pop());
      if (!Number.isNaN(idx) && idx >= 0 && idx < total) position(idx);
    } else {
      position(active);
    }

    // respect reduced motion: disable autoplay and set progress hidden
    if (prefersReducedMotion) {
      progress.style.display = 'none';
    } else {
      // start autoplay
      startAutoplay();
    }
  }
})();