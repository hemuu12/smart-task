import express from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middleware/errorHandler';
import { getSessionConfig } from './config/session';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for Vercel deployment (required for secure cookies)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://smart-task-3gwn.vercel.app',
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(session(getSessionConfig()));

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Smart Task Manager API' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Smart Task Manager API with Session Auth & RAG' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Features: Session Auth + Vector DB + RAG Pattern');
  });
}

export default app;
