import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

if (window.location.pathname !== "/" || window.location.search || window.location.hash) {
  window.history.replaceState({}, "", "/");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
