import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgLoader from 'vite-svg-loader';

// @ts-ignore
import vue from '@vitejs/plugin-vue';

// @ts-ignore
// import fs from 'fs'; // только для разработки

export default defineConfig({
  // Относительные URL позволяют использовать один dist как в корне сайта,
  // так и в /play/. Конкретный префикс браузер определит по URL index.html.
  base: './',
  plugins: [
    vue(),
    svgLoader(),
    checker({
      vueTsc: true,
      typescript: true,
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
      { find: '@layout', replacement: fileURLToPath(new URL('./src/components/layout', import.meta.url)) },
      { find: '@icons', replacement: fileURLToPath(new URL('./src/components/shared/icons', import.meta.url)) },
      { find: '@ui', replacement: fileURLToPath(new URL('./src/components/shared/ui', import.meta.url)) },
    ],
  },
  server: {
    host: '0.0.0.0',
    port: 8010,
  /*\  https: { // только для разработки (https)
      key: fs.readFileSync('./certs/localhost-key.pem'),
      cert: fs.readFileSync('./certs/localhost.pem'),
    },*/
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
      }
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
});
