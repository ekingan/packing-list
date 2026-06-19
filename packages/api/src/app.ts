import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import healthRouter from './routes/health';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import { AppError } from './errors';
import path from 'path';

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: config.isProduction
      ? process.env.CLIENT_ORIGIN
      : 'http://localhost:5173',
    credentials: true,
  })
);

app.use(morgan(config.isProduction ? 'combined' : 'dev'));
app.use(express.json());

app.use('/api/v1/health', healthRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);
app.use((_req, _res, next) => {
  next(AppError.notFound('Route not found'));
});

if (config.isProduction) {
  const clientDist = path.resolve(__dirname, '../../client/dist');
  app.use(express.static(clientDist));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.use(errorHandler);

export default app;
