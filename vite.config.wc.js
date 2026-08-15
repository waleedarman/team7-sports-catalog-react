import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Separate Vite config for the Web Component library build.
 * Does not replace the default vite.config.js used by `npm run build`.
 */
export default defineConfig({
  plugins: [react()],
  define: {
    // Avoid process.env references blowing up in the browser bundle
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: 'src/webcomponent-entry.jsx',
      name: 'Pulse7Catalog',
      formats: ['es'],
      fileName: () => 'pulse7-catalog.js',
    },
    rollupOptions: {
      // Bundle React + MUI into the WC so the shell does not need to provide them
      external: [],
      output: {
        assetFileNames: 'pulse7-catalog.[ext]',
      },
    },
    cssCodeSplit: false,
  },
});
