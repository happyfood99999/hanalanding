import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LHome } from "./screens/LHome";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <LHome />
  </StrictMode>,
);
