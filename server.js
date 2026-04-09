import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import bookingsHandler from './api/bookings.js';
import newsletterHandler from './api/newsletter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.all('/api/bookings', async (req, res) => {
    try {
      await bookingsHandler(req, res);
    } catch (error) {
      console.error('Error in bookings handler:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.all('/api/newsletter', async (req, res) => {
    try {
      await newsletterHandler(req, res);
    } catch (error) {
      console.error('Error in newsletter handler:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
