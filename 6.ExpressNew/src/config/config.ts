import { join, resolve } from 'node:path';
import debug from 'debug';

const log = debug('NewExpress:config');

export const config = () => {
  log('Running config connection');
  // Define el archivo donde vamos a guardar la información
  const __dirname = resolve('.');
  const file = join(__dirname, 'src', 'data', 'db.json');
  return file;
};
