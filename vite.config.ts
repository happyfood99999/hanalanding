import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";
import netlifyPlugin from "@netlify/vite-plugin-react-router";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), netlifyPlugin()],
  publicDir: "./static",
  base: "./",
  server: {
    port: 3000,
    host: true,
    open: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
