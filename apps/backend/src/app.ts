import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from './config';
import { routes } from './routes';
import { AppError } from './utils/errors';

const app = express();

app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());

app.use('/api', routes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      ...('details' in err ? { details: (err as any).details } : {}),
    });
  } else {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { app };
