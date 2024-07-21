import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
    outDir: "./dist", // direktori output
    sourcemap: true,
  },
  base: "https://lost-and-found.pages.dev/",
});
