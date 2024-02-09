import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      api: `${path.resolve(__dirname, "./src/api/")}`,
      components: `${path.resolve(__dirname, "./src/components/")}`,
      assets: `${path.resolve(__dirname, "./src/assets/")}`,
      context: `${path.resolve(__dirname, "./src/context/")}`,
      pages: `${path.resolve(__dirname, "./src/pages/")}`,
      firebaseapp: `${path.resolve(__dirname, "./src/firebase/")}`,
      hooks: `${path.resolve(__dirname, "./src/hooks/")}`,
      utils: `${path.resolve(__dirname, "./src/utils/")}`,
      types: `${path.resolve(__dirname, "./src/types/")}`,
      config: `${path.resolve(__dirname, "./src/config/")}`,
    },
  },
});
