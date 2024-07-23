import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://blogapp-9w7m.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
