// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// vite.config.js or vitest.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Set the test environment to jsdom
    globals: true,         // To use Jest-like globals like beforeAll, afterEach, etc.
    setupFiles: './src/setupTests.js', // Path to your setup file
  },
});

