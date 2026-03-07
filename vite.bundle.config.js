import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': JSON.stringify({ NODE_ENV: 'production' }),
  },
  build: {
    lib: {
      entry: 'bundle-all.js',
      formats: ['iife'],
      name: 'DesignKit',
      fileName: () => 'designkit-all.js',
    },
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
