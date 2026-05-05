import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { youwareVitePlugin } from "@youware/vite-plugin-react";
import path from "path";
import compression from 'vite-plugin-compression';
import strip from '@rollup/plugin-strip';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    youwareVitePlugin(), 
    react(),
    compression({ algorithm: 'gzip', ext: '.gz' }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  build: {
    // PERF: No sourcemaps in production — halves output size
    sourcemap: false,
    // PERF: Optimize chunk splitting for faster initial load
    rollupOptions: {
      plugins: [
        strip({ include: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'] })
      ],
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-spline': ['@splinetool/react-spline', '@splinetool/runtime'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // PERF: Target modern browsers for smaller bundles and less polyfills
    target: 'esnext',
    // PERF: Enable CSS code splitting
    cssCodeSplit: true,
    // PERF: Terser for aggressive minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    } as any,
    // PERF: Performance budget — warn on chunks > 250KB
    chunkSizeWarningLimit: 250,
  },
});
