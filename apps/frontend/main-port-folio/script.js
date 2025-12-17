// Centralized portfolio script — cleaned and safe-guarded

// ============ SAFE SELECTORS ============
const headlineEl = document.getElementById('headline-text');
const taglineEl = document.getElementById('tagline-text');
const welcomeEl = document.getElementById('welcomeline-text');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const mainHeader = document.querySelector('.main-header');

// ============ TEXT ANIMATION ============
const headlineText = headlineEl ? headlineEl.textContent : '';
const taglineText = taglineEl ? taglineEl.textContent : '';
const welcomeText = welcomeEl ? welcomeEl.textContent : '';

if (headlineEl) headlineEl.textContent = '';
if (taglineEl) taglineEl.textContent = '';
if (welcomeEl) welcomeEl.textContent = '';

function typeWriter(element, text, speed = 50, callback) {
    if (!element || !text) {
        if (callback) callback();
        return;
    }
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i++);
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

typeWriter(headlineEl, headlineText, 70, () => {
    typeWriter(taglineEl, taglineText, 50, () => {
        typeWriter(welcomeEl, welcomeText, 30, () => {
            if (welcomeEl) {
                welcomeEl.style.animation = 'none';
                welcomeEl.style.borderRightColor = 'transparent';
            }
        });
    });
});

// ============ MOBILE MENU TOGGLE ============
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close menu when nav link is clicked (mobile friendly)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    });
});

// ============ SMOOTH SCROLL FOR INTERNAL ANCHORS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const targetElement = document.querySelector(href);
        if (!targetElement) return;
        e.preventDefault();
        const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
});

// ============ NAVBAR SCROLL EFFECT ============
window.addEventListener('scroll', () => {
    if (!mainHeader) return;
    if (window.scrollY > 50) mainHeader.classList.add('scrolled');
    else mainHeader.classList.remove('scrolled');
});

// ============ INTERSECTION OBSERVER FOR ENTRY ANIMATIONS ============
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            obs.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .service-item, .portfolio-card, .skill-category, .stat-item').forEach(el => {
    observer.observe(el);
});

// ============ UPDATE ACTIVE NAV LINK ============
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY >= (top - 120)) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}
window.addEventListener('scroll', throttle(updateActiveNavLink, 150));
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ============ CONTACT FORM HANDLING ============
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('input[type="text"]')?.value || '';
        const email = contactForm.querySelector('input[type="email"]')?.value || '';
        const message = contactForm.querySelector('textarea')?.value || '';
        const formData = { name, email, message };
        if (!validateForm(formData)) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        submitForm(formData);
    });
}

function validateForm(data) {
    return data.name.trim() && data.email.trim() && data.message.trim();
}

function submitForm(data) {
    const submitBtn = document.querySelector('.form-submit');
    if (!submitBtn) return;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    setTimeout(() => {
        console.log('Form submitted:', data);
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        showNotification("Message sent successfully! I'll get back to you soon.", 'success');
    }, 1400);
}

// ============ SIMPLE NOTIFICATION SYSTEM ============
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `<div class="notification-inner">${message}</div>`;
    const base = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 18px',
        borderRadius: '8px',
        fontSize: '0.95rem',
        zIndex: 10000,
        boxShadow: '0 8px 20px rgba(2,6,23,0.2)'
    };
    Object.assign(notification.style, base);
    if (type === 'success') {
        notification.style.background = 'linear-gradient(90deg,#00BCD4,#7C4DFF)';
        notification.style.color = '#06121a';
    } else if (type === 'error') {
        notification.style.background = '#FF4136';
        notification.style.color = '#fff';
    } else {
        notification.style.background = '#111827';
        notification.style.color = '#fff';
    }
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 220ms ease';
        setTimeout(() => notification.remove(), 260);
    }, 3000);
}

// ============ SCROLL PROGRESS BAR ============
function updateScrollProgress() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const percent = (window.scrollY / docHeight) * 100;
    let bar = document.getElementById('scroll-progress');
    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'scroll-progress';
        Object.assign(bar.style, {
            position: 'fixed', top: '0', left: '0', height: '3px',
            background: 'linear-gradient(90deg,#00BCD4,#7C4DFF)', zIndex: 9999, width: '0%'
        });
        document.body.appendChild(bar);
    }
    bar.style.width = `${percent}%`;
}
window.addEventListener('scroll', throttle(updateScrollProgress, 50));

// ============ PARALLAX SUPPORT (data-parallax) ============
function parallaxScroll() {
    document.querySelectorAll('[data-parallax]').forEach(el => {
        const rect = el.getBoundingClientRect();
        const value = (window.scrollY - (el.offsetTop || 0)) * 0.2;
        el.style.transform = `translateY(${value}px)`;
    });
}
window.addEventListener('scroll', throttle(parallaxScroll, 40));

// ============ COUNTER ANIMATION ============
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;
    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const text = entry.target.textContent || '';
                const num = parseInt(text.replace(/\D/g, '')) || 0;
                animateValue(entry.target, 0, num, 1400, text.replace(/\d/g, ''));
                entry.target.classList.add('counted');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    stats.forEach(s => io.observe(s));
}
function animateValue(element, start, end, duration, suffix = '') {
    let startTime = null;
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start) + suffix;
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}
document.addEventListener('DOMContentLoaded', animateCounters);

// ============ KEYBOARD SHORTCUTS ============
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (e.key === 'Escape') {
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    }
});

// ============ DARK MODE TOGGLE (optional) ============
function initDarkModeToggle() {
    const btn = document.getElementById('dark-mode-toggle');
    if (!btn) return;
    const prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDark = localStorage.getItem('darkMode') !== 'false';
    if (prefers && localStorage.getItem('darkMode') === null) isDark = true;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.addEventListener('click', () => {
        isDark = !isDark;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('darkMode', isDark);
        btn.textContent = isDark ? '☀️' : '🌙';
    });
}
document.addEventListener('DOMContentLoaded', initDarkModeToggle);

// ============ LAZY IMAGE LOADER ============
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;
    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                obs.unobserve(img);
            }
        });
    }, { rootMargin: '0px 0px 200px 0px' });
    images.forEach(img => io.observe(img));
}
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ============ PERFORMANCE LOGGING ============
function monitorPerformance() {
    if (!window.performance || !performance.timing) return;
    setTimeout(() => {
        const t = performance.timing;
        const load = t.loadEventEnd - t.navigationStart;
        console.log('Page Load Time:', load, 'ms');
    }, 2000);
}
document.addEventListener('DOMContentLoaded', monitorPerformance);

// ============ CV (DOCX) LINK TRACKING ============
document.querySelectorAll('a.cta-link[href$=".docx"]').forEach(a => {
    a.addEventListener('click', () => {
        try {
            const key = 'cv_clicks';
            const count = parseInt(localStorage.getItem(key) || '0', 10) + 1;
            localStorage.setItem(key, String(count));
            showNotification('Opening CV... (saved locally)', 'success');
        } catch (err) {
            // ignore storage errors
        }
    });
});

// ============ UTILITY: debounce & throttle ============
function debounce(fn, wait = 200) {
    let t;
    return function(...args) { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), wait); };
}
function throttle(fn, limit = 100) {
    let last = 0;
    return function(...args) {
        const now = Date.now();
        if (now - last >= limit) {
            fn.apply(this, args);
            last = now;
        }
    };
}

// ============ FADE-IN HELPER (no external lib) ============
function fadeInElement(element, duration = 500) {
    if (!element) return;
    element.style.opacity = 0;
    element.style.display = element.style.display || 'block';
    const start = performance.now();
    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        element.style.opacity = progress;
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

// ============ INITIALIZATION ON LOAD ============
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    lazyLoadImages();
    animateCounters();
    initDarkModeToggle();
    monitorPerformance();
    // Add slight stagger to section animations
    document.querySelectorAll('section').forEach((s, i) => s.style.animationDelay = `${i * 0.08}s`);
});
window.addEventListener('load', () => { document.documentElement.style.scrollBehavior = 'smooth'; });