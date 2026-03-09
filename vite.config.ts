import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

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
      name: 'copy-assets',
      closeBundle() {
        // Copy theme CSS
        const themesDir = resolve(__dirname, 'dist/themes');
        mkdirSync(themesDir, { recursive: true });
        for (const file of ['tokens.css', 'light.css', 'dark.css', 'auto.css']) {
          copyFileSync(resolve(__dirname, 'src/themes', file), resolve(themesDir, file));
        }
        // Copy React JSX types and wire into main types entry
        const typesDir = resolve(__dirname, 'dist/types');
        copyFileSync(resolve(__dirname, 'src/react.d.ts'), resolve(typesDir, 'react.d.ts'));
        const indexDts = resolve(typesDir, 'index.d.ts');
        const content = readFileSync(indexDts, 'utf-8');
        if (!content.includes('react.d.ts')) {
          writeFileSync(indexDts, `/// <reference path="./react.d.ts" />\n${content}`);
        }
      },
    },
  ],
});
