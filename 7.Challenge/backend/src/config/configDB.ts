import { join, resolve } from 'node:path';
import debug from 'debug';
import { env } from '../models/env.ts';

const moduleName = env.DEBUG.slice(0, -1);
const log = debug(`${moduleName}:config`);

export const configDB = () => {
  log('Running config db/file connection');
  const __dirname = resolve('.');
  const file = join(__dirname, 'src', 'data', 'db.json');

  return file;
};
