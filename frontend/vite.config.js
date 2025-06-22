// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000, 
    open: true, 
  },
  define: {
    'process.env': {}, 
  }
});
