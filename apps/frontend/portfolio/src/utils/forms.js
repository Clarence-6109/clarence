// src/utils/forms.js
import { dom } from "./domSelectors";
import { showNotification } from "./notifications";

export function initContactForm() {
  const form = dom.contactForm;
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      name: form.querySelector('input[type="text"]')?.value || "",
      email: form.querySelector('input[type="email"]')?.value || "",
      message: form.querySelector("textarea")?.value || "",
    };

    if (!data.name || !data.email || !data.message) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    showNotification("Message sent successfully!", "success");
    form.reset();
  });
}
