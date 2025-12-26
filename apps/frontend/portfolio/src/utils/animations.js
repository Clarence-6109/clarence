// src/utils/animations.js
export function typeWriter(element, text, speed = 50, callback) {
  if (!element || !text) {
    callback?.();
    return;
  }
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i++);
      setTimeout(type, speed);
    } else {
      callback?.();
    }
  }
  type();
}
