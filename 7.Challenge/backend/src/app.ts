import express from 'express';
import debug from 'debug';
import morgan from 'morgan';
import cors from 'cors';
import { env } from './models/env.ts';
import { customHeaders } from './middlewares/custom.ts';
import { errorHandler } from './middlewares/error-handler.ts';

const moduleName = env.DEBUG.slice(0, -1);
const log = debug(`${moduleName}:app`);
const author = 'Vichama';

// Create app
export const app = express();
app.disable('x-powered-by');
log('Create App');

app.use(customHeaders(author));

// Middleware Utilities
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
// Definimos acá el tipo de archivo donde vamos a guardar los datos
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

// GET sample
app.get('/api', (_req, res) => {
  res.send('Create API REST');
  return;
});

app.use(errorHandler);
