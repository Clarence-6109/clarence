import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
<button
  className="theme-toggle"
  onClick={() => {
    const body = document.body;
    if (body.classList.contains("light")) {
      body.classList.replace("light", "dark");
    } else {
      body.classList.replace("dark", "light");
    }
  }}
>
  Toggle Theme
</button>;
