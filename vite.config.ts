import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4002,
    open: true,
    watch: {
      usePolling: true,
      ignored: ['**/node_modules/**', '**/dist/**']
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['react-redux', 'redux-persist'],
          'ui-vendor': ['react-bootstrap', 'bootstrap', 'react-select', 'react-slick', 'slick-carousel'],
          'gsap-vendor': ['gsap', '@gsap/react'],
          'chart-vendor': ['recharts'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
