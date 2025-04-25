import { defineConfig, loadEnv } from 'vite'
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.API': JSON.stringify(env.API)
    },
    plugins: [react()],
    server: {
      host: true,
      strictPort: true,
      port: process.env.PORT || "8080",
    },
    test: {
      globals: true,
      environment: "jsdom",
      css: true,
    }
  }
});
