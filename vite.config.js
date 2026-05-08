import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { pathToFileURL } from 'url';
import { resolve } from 'path';

const apiDevPlugin = () => ({
  name: 'api-dev-plugin',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/chat' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
          try {
            req.body = body ? JSON.parse(body) : {};
          } catch(e) {
            req.body = {};
          }
          
          res.status = function(code) {
            this.statusCode = code;
            return this;
          };
          res.json = function(data) {
            this.setHeader('Content-Type', 'application/json');
            this.end(JSON.stringify(data));
          };

          try {
            const filePath = resolve(process.cwd(), './api/chat.js');
            const handlerObj = await import(pathToFileURL(filePath).href + '?t=' + Date.now());
            const handler = handlerObj.default || handlerObj;
            await handler(req, res);
          } catch (err) {
            console.error('API Handler Error:', err);
            res.status(500).json({ reply: "Internal API Error" });
          }
        });
        return;
      }
      next();
    });
  }
});

export default defineConfig({
  plugins: [react(), apiDevPlugin()],
})
