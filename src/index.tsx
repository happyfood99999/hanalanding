import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LHome } from "./screens/LHome";
import { Tapes } from "./screens/Tapes";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LHome />} />
        <Route path="/tapes" element={<Tapes />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
