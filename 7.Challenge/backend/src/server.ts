import { app } from './app.ts';
import { createServer, ServerResponse } from 'node:http';
import { env } from './models/env.ts';
import { HttpError } from './errors/http-errors.ts';
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

const errorManager = (error: HttpError, response: ServerResponse) => {
  if (!('statusCode' in error)) {
    error = {
      ...new Error('Internal Server Error'),
      status: 500,
      statusMessage: 'Internal Server Error',
    };
  }

  const errorInfo = `Error ${error.status}: ${error.statusMessage}`;
  response.statusCode = error.status;
  response.statusMessage = error.statusMessage;
  log(errorInfo, error.message);
  response.end(errorInfo);
};

export function setServer() {
  server.on('listening', listenManager);
  server.on('error', errorManager);
  server.listen(PORT);
}
