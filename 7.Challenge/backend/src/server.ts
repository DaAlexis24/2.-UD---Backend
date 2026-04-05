import { app } from './app.ts';
import { createServer } from 'node:http';
import { env } from './models/env.ts';
import debug from 'debug';

const moduleName = env.DEBUG.slice(0, -1);
const log = debug(`${moduleName}:server`);

export const PORT = env.PORT || 3000;

export const server = createServer(app);
log('Server raised');

export const listenManager = () => {
  const addr = server.address();

  if (addr === null) return;
  let bind;
  if (typeof addr === 'string') {
    bind = 'pipe' + addr;
  } else {
    bind =
      addr.address === '::'
        ? `http://localhost:${addr.port}`
        : `${addr.address}:${addr.port}`;
  }

  if (env.NODE_ENV !== 'dev') {
    console.log(`Server listening on ${bind}`);
  } else {
    log(`Server listening on ${bind}`);
  }
};
