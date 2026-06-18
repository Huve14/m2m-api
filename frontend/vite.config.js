import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const fromFrontend = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^react$/, replacement: fromFrontend("./node_modules/react/index.js") },
      { find: /^react\/jsx-runtime$/, replacement: fromFrontend("./node_modules/react/jsx-runtime.js") },
      { find: /^react\/jsx-dev-runtime$/, replacement: fromFrontend("./node_modules/react/jsx-dev-runtime.js") },
      { find: /^react-dom$/, replacement: fromFrontend("./node_modules/react-dom/index.js") },
      { find: /^react-dom\/client$/, replacement: fromFrontend("./node_modules/react-dom/client.js") },
    ],
  },
});
