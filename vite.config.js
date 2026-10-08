import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const fromRoot = path => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  // GitHub Pages project URL: https://nakeshyarakapp.github.io/Portofolio/
  base: '/Portofolio/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: fromRoot('./index.html'),
        relaska: fromRoot('./case-study-relaska.html'),
        ecommerce: fromRoot('./case-study-ecommerce.html'),
        logoJokirif: fromRoot('./logo-jokirif.html'),
        logoRajaIblis: fromRoot('./logo-raja-1blis.html'),
        logoMinara: fromRoot('./logo-minara.html'),
        logoRelaska: fromRoot('./logo-relaska.html'),
        logoPtm: fromRoot('./logo-ptm-lumba-lumba.html'),
        notFound: fromRoot('./404.html')
      }
    }
  }
});
