import debug from 'debug';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './middleware/error-hanlder.ts';
import { HttpError } from './errors/http-errors.ts';

// Nuestro logger
// import { customLogger } from './middleware/custom-logger.ts';

const log = debug('Express-App:app');

export const app = express();
log('Create App');

// app.use(customLogger());

// Morgan logger en modo Dev
app.use(morgan('dev'));

// CORS. Middleware para definir los requisitos que debe de tener una ruta para acceder al backend
app.use(
  cors({
    origin: '*',
  }),
);

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (_req, res) => {
  res.send('Hello World!');
  return;
});

app.get('/patata', (_req, res, next) => {
  next(new HttpError(401, 'Unauthorized', 'Patatas not allowed'));
  return;
});

app.post('/', (req, res) => {
  log(req.body);
  res.statusCode = 201;
  res.send('Hello Post');
  return;
});

app.get('/api', (req, res) => {
  res.send('API REST');
  return;
});

app.get('/api/notes', (req, res) => {
  const notes = [{ id: 1 }, { id: 2 }];
  res.json(notes);
  return;
});

app.use(errorHandler);
