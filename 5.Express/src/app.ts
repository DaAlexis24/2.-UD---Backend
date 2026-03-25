import debug from 'debug';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './middleware/error-handler.ts';
import { customHeaders } from './middleware/customs.ts';
import notesRouter from './router/notes.ts';

const log = debug('Express-App:app');

export const app = express();
// Nos ayuda a deshabilitar cabeceras
app.disable('x-powered-by');
log('Create App');

app.use(customHeaders('ElDiavlo'));

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

// Para controlar los ficheros estáticos del servidor
app.use(express.static('public'));

app.get('/', (_req, res) => {
  res.send('Hello World!');
  return;
});

app.post('/', (req, res) => {
  log(req.body);
  res.statusCode = 201;
  res.send('Hello Post');
  return;
});

app.get('/api', (_req, res) => {
  res.setHeader('X-owner', 'ElHueso');
  res.send('API REST');
  return;
});

app.use('/api/notes', notesRouter);

app.use((_req, res) => {
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.json({
    message: 'Resource Not Found',
  });
  return;
});

app.use(errorHandler);
