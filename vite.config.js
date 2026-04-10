import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/colorado-coffee/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        heritage: resolve(__dirname, 'heritage.html'),
        investor: resolve(__dirname, 'investor.html')
      }
    }
  }
});
