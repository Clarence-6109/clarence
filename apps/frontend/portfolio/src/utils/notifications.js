// src/utils/notifications.js
export function showNotification(message, type = "info") {
  const el = document.createElement("div");
  el.className = `notification notification-${type}`;
  el.textContent = message;

  Object.assign(el.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "12px 18px",
    borderRadius: "8px",
    zIndex: 10000,
  });

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}
