/**
 * theme.js
 * Handles Dark/Light mode switching and global notifications.
 */

export const initTheme = () => {
  const themeToggleBtn = document.querySelector(".theme-toggle-btn");
  const rootElement = document.documentElement;

  // 1. Optimized Theme Detection
  const getStoredTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    // 2025 standard: fallback to system preference
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  };

  // 2. Apply theme immediately on call
  if (getStoredTheme() === "light") {
    rootElement.classList.add("light-mode");
  } else {
    rootElement.classList.remove("light-mode");
  }

  // 3. Toggle Listener with Guard (prevents double listeners in React Strict Mode)
  if (themeToggleBtn && !themeToggleBtn.dataset.listenerAdded) {
    themeToggleBtn.addEventListener("click", () => {
      rootElement.classList.toggle("light-mode");
      const isLight = rootElement.classList.contains("light-mode");
      localStorage.setItem("theme", isLight ? "light" : "dark");

      showNotification(
        `Switched to ${isLight ? "Light" : "Dark"} Mode`,
        "info"
      );
    });
    // Mark as handled for development environments
    themeToggleBtn.dataset.listenerAdded = "true";
  }
};

/**
 * Global Notification System
 * Uses 2025 theme variables for styling
 */
export const showNotification = (message, type = "info") => {
  // Prevent duplicate notifications if one is already showing
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `<div class="notification-inner">${message}</div>`;

  const baseStyles = {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "12px 18px",
    borderRadius: "8px",
    fontSize: "0.95rem",
    zIndex: "10000",
    boxShadow: "var(--shadow-md)",
    transition: "opacity 220ms ease, transform 220ms ease",
    transform: "translateY(0)",
  };

  Object.assign(notification.style, baseStyles);

  if (type === "success") {
    notification.style.background = "linear-gradient(90deg, #00BCD4, #7C4DFF)";
    notification.style.color = "#000000";
  } else if (type === "error") {
    notification.style.background = "#FF4136";
    notification.style.color = "#ffffff";
  } else {
    notification.style.background = "var(--tertiary-bg)";
    notification.style.color = "var(--text-light)";
    notification.style.border = "1px solid var(--accent-color)";
  }

  document.body.appendChild(notification);

  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateY(-10px)";
    setTimeout(() => notification.remove(), 260);
  }, 3000);
};
