import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://reposistemasback-production.up.railway.app',
        changeOrigin: true,
        secure: true, // Cambia a false si el servidor no usa HTTPS
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
