import { setServer } from './server.ts';
import debug from 'debug';
import { env } from './models/env.ts';

const moduleName = env.DEBUG.slice(0, -1);
const log = debug(`${moduleName}:index`);

setServer();
log('App running');
