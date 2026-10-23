import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
//
// `base` controls the public path assets are served from.
//  - Vercel / custom domain / user-site (username.github.io): leave as '/'.
//  - GitHub Pages *project* site (username.github.io/<repo>/):
//      set BASE_PATH=/<repo>/  (the GitHub Actions workflow does this for you).
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
});
