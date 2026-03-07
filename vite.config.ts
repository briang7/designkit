import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DesignKit',
      fileName: (format) => format === 'umd' ? 'designkit.umd.cjs' : 'index.js',
      formats: ['es', 'umd'],
    },
    outDir: 'dist',
    emptyOutDir: false,
    sourcemap: true,
  },
  plugins: [
    {
      name: 'copy-themes',
      closeBundle() {
        const themesDir = resolve(__dirname, 'dist/themes');
        mkdirSync(themesDir, { recursive: true });
        for (const file of ['tokens.css', 'light.css', 'dark.css', 'auto.css']) {
          copyFileSync(resolve(__dirname, 'src/themes', file), resolve(themesDir, file));
        }
      },
    },
  ],
});
