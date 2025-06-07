// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import path from 'path';
import { fileURLToPath } from 'url'; // Added to support __dirname in ESM
import tailwindcss from '@tailwindcss/vite';
const __filename = fileURLToPath(import.meta.url); // Added to support __dirname in ESM
const __dirname = path.dirname(__filename); // Added to support __dirname in ESM

// https://astro.build/config
export default defineConfig({
    site: 'https://realdameer.com',
    base: '/.',
    trailingSlash: 'always',
    output: 'static',
    markdown: {
        syntaxHighlight: 'prism',
        shikiConfig: {
            theme: 'github-light',
            wrap: true,
        },
    },
    vite: {
      server: {
          fs: {
              allow: ['..'], // Allow access to parent directories
          },
      },

      build: {
          outDir: 'dist', // Output directory
          assetsDir: 'assets', // Directory for assets
          sourcemap: false, // Disable sourcemaps
          rollupOptions: {
              output: {
                  manualChunks: undefined, // Disable manual chunking
              },
          },
      },

      resolve: {
          alias: {
              '@images': path.resolve(__dirname, './src/assets/images'), // Alias for images
          },
      },

      plugins: [tailwindcss()],
    },
    // Add integrations here
    integrations: [mdx(), sitemap(), react()],
});