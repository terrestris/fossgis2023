// vite.config.js
import { resolve, join } from 'path';
import { defineConfig } from 'vite';
import { readdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const dirs = [
  join(__dirname, 'examples'),
  join(__dirname, 'talks')
];

const input = {
  main: resolve(__dirname, 'index.html')
}

dirs.forEach(dir => {readdirSync(dir, {encoding: 'utf8', withFileTypes: true})
  .filter(file => file.name.endsWith('.html'))
  .forEach((file) => {
    input[file.name] = resolve(dir, file.name);
  });
});

export default defineConfig({
  base: '',
  build: {
    rollupOptions: {
      input
    }
  }
})