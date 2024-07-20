import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://blog-cqzj2oboq-vaibhavs-projects-26baaa7d.vercel.app",
      },
    },
  },
});
