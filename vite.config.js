// vite.config.js
import { resolve, join } from 'path';
import { defineConfig } from 'vite';
import { readdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const examplesDir = join(__dirname, 'examples')

const input = readdirSync(examplesDir, {encoding: 'utf8', withFileTypes: true})
  .filter(file => file.name.endsWith('.html'))
  .reduce((previous, current) => {
    previous[current.name] = resolve(examplesDir, current.name);
    return previous;
  }, {});

export default defineConfig({
  base: '',
  build: {
    rollupOptions: {
      input
    },
    outDir: 'public/dist',
  }
})