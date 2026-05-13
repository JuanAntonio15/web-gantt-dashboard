import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs/promises';
import path from 'node:path';

function saveJsonPlugin() {
  return {
    name: 'save-json',
    configureServer(server: any) {
      server.middlewares.use('/api/save', async (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end('Method Not Allowed');
        }
        let body = '';
        req.on('data', (c: Buffer) => (body += c));
        req.on('end', async () => {
          try {
            JSON.parse(body);
            await fs.writeFile(
              path.resolve(__dirname, 'public/data.json'),
              body,
              'utf-8'
            );
            res.statusCode = 200;
            res.end('ok');
          } catch {
            res.statusCode = 400;
            res.end('Invalid JSON');
          }
        });
      });
    },
  };
}

export default defineConfig({
  base: '/web-gantt-dashboard/',
  plugins: [react(), tailwindcss(), saveJsonPlugin()],
  server: {
    watch: {
      ignored: ['**/public/data.json'],
    },
  },
});
