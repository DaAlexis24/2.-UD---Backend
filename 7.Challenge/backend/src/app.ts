import express from 'express';
import debug from 'debug';
import morgan from 'morgan';
import cors from 'cors';

const log = debug('DS-CRM:app');
const author = 'Vichama';

// Create app
export const app = express();
app.disable('x-powered-by');
log('Create App');

// Middleware Utilities
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
// Definimos acá el tipo de archivo donde vamos a guardar los datos
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

// GET sample
app.get('/api', (req, res) => {
  res.setHeader('X-owner', author);
  res.send('Create API REST');
  return;
});
