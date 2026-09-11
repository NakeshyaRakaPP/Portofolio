import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const fromRoot = path => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  // Relative build paths work on a GitHub Pages project URL and remain safe
  // when the repository is later attached to a custom domain.
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: fromRoot('./index.html'),
        relaska: fromRoot('./case-study-relaska.html'),
        ecommerce: fromRoot('./case-study-ecommerce.html'),
        notFound: fromRoot('./404.html')
      }
    }
  }
});
