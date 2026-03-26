import debug from 'debug';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './middleware/error-handler.ts';
import { customHeaders } from './middleware/customs.ts';
import notesRouter from './router/notes.ts';

const log = debug('NewExpress:app');

export const app = express();
// Nos ayuda a deshabilitar cabeceras
app.disable('x-powered-by');
log('Create ExpressApp');

app.use(customHeaders('Daniel-Soledad'));

// Middlewares Utilities
app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

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
